export class Task {
  constructor(title: string) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
  }
  /**
   * 事項名稱
   *
   * @private
   * @memberof Task
   */
  private title = '';

  /**
   * 完成與否
   *
   * @private
   * @memberof Task
   */
  private done = false;

  /**
   * 是否處於編輯模式
   *
   * @private
   * @memberof Task
   */
  private editMode = false;

  /**
   * 此事項是否已經完成
   *
   * @readonly
   * @type {boolean}
   * @memberof Task
   */
  get completed(): boolean {
    return this.done;
  }

  /**
   * 取得此事項是否處於編輯模式
   *
   * @readonly
   * @type {boolean}
   * @memberof Task
   */
  get editing(): boolean {
    return this.editMode;
  }

  /**
   * 設定此事項是否可被編輯
   *
   * @memberof Task
   */
  set editable(bl: boolean) {
    this.editMode = bl;
  }

  /**
   * 設定事項名稱
   *
   * @memberof Task
   */
  set itemTitle(title: string) {
    this.title = title;
  }

  /**
   * 取得事項名稱
   *
   * @returns {string}
   * @memberof Task
   */
  get itemTitle(): string {
    return this.title;
  }

  /**
   * 來回切換完成狀態
   *
   * @memberof Task
   */
  toggleCompletion(): void {
    this.done = !this.done;
  }
}
