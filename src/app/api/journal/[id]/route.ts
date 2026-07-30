import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if ID is a UUID (for edit mode) or a slug (for public view)
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
    
    let post;
    if (isUUID) {
      const result = await sql`SELECT * FROM journal_posts WHERE id = ${id}`;
      post = result.rows[0];
    } else {
      // It's a slug
      const result = await sql`SELECT * FROM journal_posts WHERE slug = ${id} AND published = true`;
      post = result.rows[0];
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, slug, description, category, content, published, date } = data;

    const result = await sql`
      UPDATE journal_posts 
      SET 
        title = ${title},
        slug = ${slug},
        description = ${description},
        category = ${category},
        content = ${content},
        published = ${published},
        date = ${date},
        updated_at = timezone('utc'::text, now())
      WHERE id = ${id}::uuid
      RETURNING *
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await sql`DELETE FROM journal_posts WHERE id = ${id}::uuid RETURNING id`;
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
