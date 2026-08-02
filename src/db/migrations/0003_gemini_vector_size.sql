TRUNCATE TABLE document_chunks;
ALTER TABLE document_chunks ALTER COLUMN embedding TYPE vector(768);
