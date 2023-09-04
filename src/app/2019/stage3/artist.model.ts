export class Artist {
  constructor() {}

  name: string; //  歌手姓名

  hits: []; //  熱門歌曲

  highlight: []; //  歷年精選

  //  全部專輯
  albums: Array<{
    name: string; //  專輯名稱

    issueDate: string; //  發行日期

    tracks: Array<song>; //  專輯曲目

    description: string;  //  專輯介紹
  }>;
}

interface song {
  name: string; //  曲名

  lyrics: string[]; //  歌詞

  lyricist: string; //  作詞

  compose: string; //  作曲

  album: string; //  收錄專輯

  duration: string; //  時長

  hits: boolean; //  熱門

  highligh: boolean; //  精選
}
