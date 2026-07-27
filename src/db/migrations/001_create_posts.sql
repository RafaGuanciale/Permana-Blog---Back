CREATE TABLE posts (
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug          TEXT        NOT NULL UNIQUE,
  title         TEXT        NOT NULL,
  category      TEXT        NOT NULL,
  preview       TEXT        NOT NULL,
  text          TEXT        NOT NULL,
  author        TEXT        NOT NULL,
  reading_time  INTEGER     NOT NULL,
  image         TEXT        NOT NULL,
  alt_image     TEXT        NOT NULL,
  published_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);