-- Stores per-message thumbs up/down from the chat widget. Kept independent of
-- messages/conversations content (question+answer copied in directly) so a
-- rating survives even if the conversation row is later pruned.
create table if not exists message_feedback (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete set null,
  question text not null,
  answer text not null,
  rating text not null check (rating in ('up', 'down')),
  created_at timestamptz not null default now()
);

create index if not exists message_feedback_rating_idx on message_feedback (rating);
