import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@vercel/postgres';
// Env loaded via node --env-file=.env.local

if (!process.env.POSTGRES_URL) {
  console.error("Missing POSTGRES_URL in .env.local");
  process.exit(1);
}

const contentDirectory = path.join(process.cwd(), 'content', 'journal');

async function migrate() {
  if (!fs.existsSync(contentDirectory)) {
    console.error("content/journal directory not found!");
    process.exit(1);
  }

  const client = createClient();
  await client.connect();

  const fileNames = fs.readdirSync(contentDirectory);
  const mdxFiles = fileNames.filter(f => f.endsWith('.mdx'));

  console.log(`Found ${mdxFiles.length} MDX files to migrate...`);

  for (const fileName of mdxFiles) {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    const title = data.title || slug;
    const description = data.description || '';
    const category = data.category || 'Uncategorized';
    const date = data.date || '';
    
    try {
      await client.sql`
        INSERT INTO journal_posts (title, slug, description, category, content, published, date)
        VALUES (${title}, ${slug}, ${description}, ${category}, ${content}, true, ${date})
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          content = EXCLUDED.content,
          published = EXCLUDED.published,
          date = EXCLUDED.date,
          updated_at = timezone('utc'::text, now())
      `;
      console.log(`✅ Migrated ${slug}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${slug}:`, error.message);
    }
  }
  
  await client.end();
  console.log("Migration complete!");
}

migrate();
