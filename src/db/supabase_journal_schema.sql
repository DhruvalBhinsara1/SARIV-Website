-- Create the journal_posts table
CREATE TABLE IF NOT EXISTS public.journal_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  date text NOT NULL, -- Storing as text for simple formatting (e.g. 'Oct 23, 2024')
  published boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts" ON public.journal_posts
  FOR SELECT USING (published = true);

-- Allow authenticated/service_role full access (handled automatically by service_role key)
-- but for anon access it's strictly read-only on published

-- Create the Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('journal_images', 'journal_images', true);

-- Storage RLS policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'journal_images');
