--
-- Initial database schema
--
-- @encoding UTF-8
--

--
-- Stores app records
--
CREATE TABLE IF NOT EXISTS record
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    text       TEXT      NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    updated_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
