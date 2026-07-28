import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    // If 'all' is true, return drafts as well (for admin)
    // Otherwise, only return published
    let posts;
    if (all) {
      posts = await sql`
        SELECT * FROM journal_posts 
        ORDER BY created_at DESC
      `;
    } else {
      posts = await sql`
        SELECT * FROM journal_posts 
        WHERE published = true 
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json(posts.rows);
  } catch (error: any) {
    console.error("Error fetching journal posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, slug, description, category, content, published, date } = data;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO journal_posts (title, slug, description, category, content, published, date)
      VALUES (${title}, ${slug}, ${description}, ${category}, ${content}, ${published || false}, ${date})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error("Error creating journal post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
