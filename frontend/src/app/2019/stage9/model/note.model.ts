export interface Note {
  id: string;
  title: string;
  content: any;

  createDate: string;
  editorDate: string;

  tag: string[];
  favorite: boolean;
  selected: boolean;
}

export interface Menu {
  title: string;
  icon: string;
  filter: string;
}
