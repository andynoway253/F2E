export class Todo {
  constructor(title: string) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
  }
  /**
   * 事項名稱
   *
   * @private
   * @memberof Todo
   */
  private title = '';

  /**
   * 完成與否
   *
   * @private
   * @memberof Todo
   */
  private done = false;

  /**
   * 是否處於編輯模式
   *
   * @private
   * @memberof Todo
   */
  private editMode = false;

  /**
   * 此事項是否已經完成
   *
   * @readonly
   * @type {boolean}
   * @memberof Todo
   */
  get completed(): boolean {
    return this.done;
  }

  /**
   * 取得此事項是否處於編輯模式
   *
   * @readonly
   * @type {boolean}
   * @memberof Todo
   */
  get editing(): boolean {
    return this.editMode;
  }

  /**
   * 設定此事項是否可被編輯
   *
   * @memberof Todo
   */
  set editable(bl: boolean) {
    this.editMode = bl;
  }

  /**
   * 設定事項名稱
   *
   * @returns {string}
   * @memberof Todo
   */
  set itemTitle(title: string) {
    this.title = title;
  }

  /**
   * 取得事項名稱
   *
   * @returns {string}
   * @memberof Todo
   */
  get itemTitle(): string {
    return this.title;
  }

  /**
   * 來回切換完成狀態
   *
   * @memberof Todo
   */
  toggleCompletion(): void {
    this.done = !this.done;
  }
}
