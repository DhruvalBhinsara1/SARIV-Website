import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Since this is deployed to Vercel (serverless), writing to the local filesystem
    // will not persist for static serving. To fix the broken images without requiring
    // an external Blob store, we encode the image directly as a base64 Data URI.
    
    const mimeType = file.type || 'image/png';
    const base64Data = buffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    
    // Return the base64 URL to be embedded in the markdown
    return NextResponse.json({ url: dataUri });
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
