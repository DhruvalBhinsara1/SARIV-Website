import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sql } from '@vercel/postgres';

export type JournalPost = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
  published?: boolean;
};

const contentDirectory = path.join(process.cwd(), 'content', 'journal');

async function getLocalPosts(): Promise<JournalPost[]> {
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
        published: true, // Local posts are considered published
      };
    })
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      return -1;
    });
    
  return posts;
}

async function getLocalPostBySlug(slug: string): Promise<JournalPost | undefined> {
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
    published: true,
  };
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM journal_posts 
      WHERE published = true 
      ORDER BY created_at DESC
    `;
    return rows as JournalPost[];
  } catch (error) {
    console.error("Failed to fetch posts from Neon, falling back to local files:", error);
    return getLocalPosts();
  }
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | undefined> {
  try {
    const { rows } = await sql`
      SELECT * FROM journal_posts 
      WHERE slug = ${slug} AND published = true
    `;
    if (rows.length === 0) return getLocalPostBySlug(slug);
    return rows[0] as JournalPost;
  } catch (error) {
    console.error("Failed to fetch post from Neon, falling back to local files:", error);
    return getLocalPostBySlug(slug);
  }
}

export async function getJournalCategories(): Promise<string[]> {
  const posts = await getJournalPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ["All", ...Array.from(categories)];
}
