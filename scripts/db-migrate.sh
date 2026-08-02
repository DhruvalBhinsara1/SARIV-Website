#!/usr/bin/env bash
# Applies each migration in src/db/migrations exactly once, tracked in
# schema_migrations. Without this, re-running the old inline script replayed
# every file every time — including destructive ones like the TRUNCATE TABLE
# in 0003/0004_gemini_vector_size.sql, silently wiping document_chunks.
set -euo pipefail
set -a && . ./.env.local && set +a

psql "$DATABASE_URL_UNPOOLED" -v ON_ERROR_STOP=1 -c \
  "create table if not exists schema_migrations (filename text primary key, applied_at timestamptz not null default now())"

for f in src/db/migrations/*.sql; do
  name=$(basename "$f")
  applied=$(psql "$DATABASE_URL_UNPOOLED" -tAc "select 1 from schema_migrations where filename = '$name'")
  if [ "$applied" = "1" ]; then
    echo "skipping $name (already applied)"
    continue
  fi
  echo "applying $f"
  psql "$DATABASE_URL_UNPOOLED" -v ON_ERROR_STOP=1 -f "$f"
  psql "$DATABASE_URL_UNPOOLED" -v ON_ERROR_STOP=1 -c \
    "insert into schema_migrations (filename) values ('$name')"
done
