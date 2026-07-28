export type SourceDocument = {
  id: string; // stable id, e.g. "journal:my-slug" or "page:about"
  title: string;
  url: string;
  content: string;
};

export interface DocumentSource {
  readonly name: string;
  load(): Promise<SourceDocument[]>;
}
