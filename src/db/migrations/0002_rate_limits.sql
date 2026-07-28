create table if not exists rate_limits (
  key text primary key,
  count int not null default 1,
  window_start timestamptz not null default now()
);
