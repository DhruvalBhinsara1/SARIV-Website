import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
};

const contentDirectory = path.join(process.cwd(), 'content', 'journal');

export function getJournalPosts(): JournalPost[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const fileNames = fs.readdirSync(contentDirectory);
  
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        category: data.category || 'Uncategorized',
        date: data.date || '',
        content,
      };
    })
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      return -1;
    });
    
  return posts;
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return undefined;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    category: data.category || 'Uncategorized',
    date: data.date || '',
    content,
  };
}

export function getJournalCategories(): string[] {
  const posts = getJournalPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ["All", ...Array.from(categories)];
}
