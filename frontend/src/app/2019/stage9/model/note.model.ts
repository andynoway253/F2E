export interface Note {
  title: string;
  content: any;

  createDate: string;
  editorDate: string;

  tag: string[];
  favorite: boolean;
  selected: boolean;
}
