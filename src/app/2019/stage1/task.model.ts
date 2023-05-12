export class Task {
  constructor(
    title: string,
    originWorkTime?: number,
    originBreakTime?: number
  ) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
    this.conduct = false;
    this.done = false;
    this.break = false;
    this.editMode = false;
    this.remainingTime = originWorkTime || 0;

    this.originWorkTime = originWorkTime || 0;
    this.originBreakTime = originBreakTime || 0;

    this.dashoffset = 1570;
  }

  private title = '';
  private conduct = false; //  任務是否為進行或暫停狀態，true為進行、false為暫停
  private done = false; // 任務是否為完成狀態
  private break = false; // 任務是否為休息狀態
  private editMode = false; //  是否處於編輯模式
  private remainingTime: number; //  任務剩餘時間
  public originWorkTime: number; //  任務工作時間
  public originBreakTime: number; //  任務休息時間

  private dashoffset = 1570;

  /**
   * 取得此事項的進行狀態
   */
  get isStart(): boolean {
    return this.conduct;
  }

  /**
   * 設定此事項是否為進行狀態
   */
  set isStart(bl: boolean) {
    this.conduct = bl;
  }

  /**
   *  取得此事項是否處於休息狀態
   */
  get breakStatus(): boolean {
    return this.break;
  }

  /**
   * 此事項是否已經完成
   */
  get completed(): boolean {
    return this.done;
  }

  /**
   * 取得此事項是否處於編輯模式
   */
  get editing(): boolean {
    return this.editMode;
  }

  /**
   * 設定此事項是否可被編輯
   */
  set editable(bl: boolean) {
    this.editMode = bl;
  }

  /**
   * 設定事項名稱
   */
  set itemName(title: string) {
    this.title = title;
  }

  /**
   * 取得事項名稱
   */
  get itemName(): string {
    return this.title;
  }

  /**
   * 更新剩餘時間
   */
  set leftTime(remainingTime) {
    this.remainingTime = remainingTime--;
  }

  /**
   * 取得剩餘時間
   */
  get leftTime(): number {
    return this.remainingTime;
  }

  /**
   * 更新
   */
  set test(dashoffset) {
    this.dashoffset = dashoffset;
  }

  get test(): number {
    return this.dashoffset;
  }

  /**
   * 來回切換休息狀態
   */
  toggleBreak(): void {
    this.break = !this.break;
  }

  /**
   * 切換完成狀態
   */
  toggleCompletion(e: boolean): void {
    this.done = e;
    this.isStart = false;
    // this.break = true;
  }
}
