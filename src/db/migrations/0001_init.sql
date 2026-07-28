create extension if not exists vector;

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on messages (conversation_id);

-- embedding dimension matches OpenAI text-embedding-3-small (1536)
create table if not exists document_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  content text not null,
  embedding vector(1536),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists document_chunks_source_idx on document_chunks (source);
-- ponytail: no ANN index (ivfflat/hnsw) yet, exact search is fine at this row count;
-- add one once document_chunks grows past a few thousand rows.
