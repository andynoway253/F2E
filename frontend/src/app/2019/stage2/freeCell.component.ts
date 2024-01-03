import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Card, ColumnCell, HomeCell, Pile, Suit, TempCell } from './models';
import { CommandManager, MoveCommand } from './command';
import { shuffle } from 'lodash';

interface Hint {
  fromCell: Pile;
  toCell: Pile;
  cards: Card[];
}

@Component({
  templateUrl: './freeCell.component.html',
  styleUrls: ['./freeCell.component.scss'],
})
export class FreeCellComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}

  private commandManager: CommandManager;

  private initPiles: Card[][];

  columnCells: ColumnCell[];

  tempCells: TempCell[];

  homeCells: HomeCell[];

  hint: Hint;

  nowMin = '00'; //  分

  nowSec = '00'; //  秒

  canDrogCount = 0;

  cards: Array<Array<string>> = [[], [], [], [], [], [], [], []];

  //  空白框
  tempStorages: Array<Array<string>> = [[], [], [], []];

  //  本位框
  originStorages: Array<{ [key: string]: [] }> = [
    { C: [] },
    { D: [] },
    { H: [] },
    { S: [] },
  ];

  // allCards = [
  //   'AC',
  //   '2C',
  //   '3C',
  //   '4C',
  //   '5C',
  //   '6C',
  //   '7C',
  //   '8C',
  //   '9C',
  //   '10C',
  //   'JC',
  //   'QC',
  //   'KC',
  //   'AD',
  //   '2D',
  //   '3D',
  //   '4D',
  //   '5D',
  //   '6D',
  //   '7D',
  //   '8D',
  //   '9D',
  //   '10D',
  //   'JD',
  //   'QD',
  //   'KD',
  //   'AH',
  //   '2H',
  //   '3H',
  //   '4H',
  //   '5H',
  //   '6H',
  //   '7H',
  //   '8H',
  //   '9H',
  //   '10H',
  //   'JH',
  //   'QH',
  //   'KH',
  //   'AS',
  //   '2S',
  //   '3S',
  //   '4S',
  //   '5S',
  //   '6S',
  //   '7S',
  //   '8S',
  //   '9S',
  //   '10S',
  //   'JS',
  //   'QS',
  //   'KS',
  // ];

  // dragData: {
  //   selectCard: string;
  //   selectIndex?: number;
  //   selectLineIndex?: number;
  // };

  ngOnInit(): void {
    this.startNewGame();

    // this.shuffle();

    // this.dealCards();
  }

  private startNewGame(piles: Card[][] | null = null): void {
    if (!piles) {
      const deck = this.createDeck();
      piles = this.shuffleCardToPiles(deck);

      this.initPiles = piles;
    }
    this.commandManager = new CommandManager();
    // this.tempCells = Array(4)
    //   .fill(null)
    //   .map((_) => new TempCell());

    // this.homeCells = [Suit.club, Suit.heart, Suit.diamond, Suit.spade].map(
    //   (suit) => new HomeCell(suit)
    // );
    this.columnCells = Array(8)
      .fill(0)
      .map((_, index) => {
        return new ColumnCell(piles[index]);
      });
  }

  // // 洗牌
  // shuffle() {
  //   for (let i = this.allCards.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [this.allCards[i], this.allCards[j]] = [
  //       this.allCards[j],
  //       this.allCards[i],
  //     ];
  //   }
  // }

  // // 發牌
  // dealCards() {
  //   for (let i = 0; i < 7; i++) {
  //     for (let j = 0; j < 8; j++) {
  //       if (this.allCards.length > 0) {
  //         const card = this.allCards.pop();
  //         this.cards[j].push(card);
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // }

  //  處理放置事件
  onCellDropped(e: CdkDragDrop<any>) {    console.log(3)

    const previousCell: Pile = e.previousContainer.data;
    const cell = e.container.data;
    const movedCard = previousCell.cards.slice(e.previousIndex);

    if (previousCell === cell && cell.canAdd(movedCard)) {
      const cmd = new MoveCommand(previousCell, cell, movedCard);
      this.commandManager.execute(cmd);
    }

    this.updateHint();
  }

  onDragStart(e: CdkDragStart) {
    console.log(1)
    const cell: ColumnCell = e.source.data.cell;
    const card: Card = e.source.data.card;
    cell.dragIndex = cell.cards.indexOf(card);
  }

  onDragEnd(e: CdkDragEnd) {    console.log(2)
    const cell: ColumnCell = e.source.data.cell;
    cell.dragIndex = -1;
  }

  updateHint() {
    this.hint =
      // this.getMovable(this.columnCells, this.homeCells) ||
      // this.getMovable(this.tempCells, this.homeCells) ||
      // this.getMovable(this.tempCells, this.columnCells) ||
      this.getMovable(this.columnCells, this.columnCells);
    // this.getMovable(this.columnCells, this.tempCells);
    console.log(this.hint);
  }

  getMovable(fromCells: Pile[], toCells: Pile[]): Hint {
    for (const fromCell of fromCells) {
      for (const toCell of toCells) {
        if (fromCell !== toCell) {
          for (let start = fromCell.cards.length - 1; start >= 0; start--) {
            const cards = fromCell.cards.slice(start);
            if (fromCell.canMove(cards[0]) && toCell.canAdd(cards)) {
              console.log(`move card: ${cards[0].suit} ${
                cards[0].rank
              } from column cell
             to column cell ${toCells.indexOf(toCell)}`);
              return { fromCell, toCell, cards };
            }
          }
        }
      }
    }
    return null;
  }

  // //  處理拖曳開始事件
  // drag(selectCard: string, selectIndex?: number, selectLineIndex?: number) {
  //   this.dragData = { selectCard, selectIndex, selectLineIndex };
  // }

  // dragEnd(e: any) {
  //   console.log(e);
  // }

  // //  處理放置事件
  // drop(e: any, targetLineIndex: number) {
  //   e.preventDefault();
  //   if (this.dragData) {
  //     const targetCardIndex = this.cards[targetLineIndex].length - 1;

  //     if (
  //       this.isValidMove(
  //         this.dragData.selectCard,
  //         targetLineIndex,
  //         targetCardIndex
  //       )
  //     ) {
  //       //  移動後，目標行push新資料，原始行把資料篩掉
  //       const { selectCard, selectLineIndex } = this.dragData;

  //       this.cards[targetLineIndex].push(selectCard);

  //       //  從空白框拖曳回來的卡片沒有 selectLineIndex，而且也不需要拿掉任何東西
  //       if (selectLineIndex) {
  //         this.cards[selectLineIndex] = this.cards[selectLineIndex].filter(
  //           (c) => c !== selectCard
  //         );
  //       } else {
  //         this.tempStorages[
  //           this.tempStorages.findIndex((item) => item[0] === selectCard)
  //         ] = [];
  //       }
  //     }

  //     // Reset dragData
  //     this.dragData = null;

  //     console.log(this.cards);
  //   }
  // }

  // //  處理放置事件 - 空白框
  // dropEmpty(e: any, targetTempAreaIndex: number) {
  //   e.preventDefault();

  //   if (this.dragData && this.tempStorages[targetTempAreaIndex].length === 0) {
  //     //  移動後，目標行push新資料，原始行把資料篩掉
  //     const { selectCard, selectLineIndex: originalLineIndex } = this.dragData;

  //     this.tempStorages[targetTempAreaIndex].push(selectCard);

  //     this.cards[originalLineIndex] = this.cards[originalLineIndex].filter(
  //       (c) => c !== selectCard
  //     );
  //   }

  //   // Reset dragData
  //   this.dragData = null;
  // }

  // //  處理放置事件 - 本位框
  // dropOrigin(e: any, targetSuit: string) {
  //   e.preventDefault();

  //   console.log(targetSuit);

  //   if (this.dragData) {
  //     //  移動後，目標行push新資料，原始行把資料篩掉
  //     const { selectCard, selectLineIndex: originalLineIndex } = this.dragData;

  //     this.cards[originalLineIndex] = this.cards[originalLineIndex].filter(
  //       (c) => c !== selectCard
  //     );
  //   }

  //   this.dragData = null;
  // }

  // //  處理允許放置事件
  // allowDrop(e: any) {
  //   e.preventDefault();
  // }

  getSuitByIndex(index: number): string {
    return Object.keys(this.originStorages[index])[0];
  }

  // private isValidMove(
  //   draggedCard: string,
  //   targetLineIndex: number,
  //   targetCardIndex: number
  // ): boolean {
  //   return (
  //     targetCardIndex >= 0 &&
  //     targetCardIndex < this.cards[targetLineIndex].line.length &&
  //     this.areCardsAdjacent(
  //       this.cards[targetLineIndex].line[targetCardIndex],
  //       draggedCard
  //     )
  //   );
  // }

  // private areCardsAdjacent(targetCard: string, fromCard: string): boolean {
  //   // 花色和點數的比較邏輯，數字必須相鄰且紅黑交錯
  //   const values: { [key: string]: number } = {
  //     A: 1,
  //     '2': 2,
  //     '3': 3,
  //     '4': 4,
  //     '5': 5,
  //     '6': 6,
  //     '7': 7,
  //     '8': 8,
  //     '9': 9,
  //     '10': 10,
  //     J: 11,
  //     Q: 12,
  //     K: 13,
  //   };
  //   const suits: Record<string, string> = {
  //     C: 'black',
  //     D: 'red',
  //     H: 'red',
  //     S: 'black',
  //   };
  //   const value1 = targetCard.substring(0, targetCard.length - 1);
  //   const suit1 = targetCard.charAt(targetCard.length - 1);
  //   const value2 = fromCard.substring(0, fromCard.length - 1);
  //   const suit2 = fromCard.charAt(fromCard.length - 1);

  //   return (
  //     values[value1] - values[value2] === 1 && suits[suit1] !== suits[suit2]
  //   );
  // }

  private createDeck(): Card[] {
    const deck: Card[] = [];
    [Suit.club, Suit.diamond, Suit.heart, Suit.spade].forEach((suit) => {
      Array(13)
        .fill(0)
        .forEach((_, index) => {
          deck.push(new Card(suit, index + 1));
        });
    });
    return deck;
  }

  private shuffleCardToPiles(cards: Card[], size: number = 8): Card[][] {
    const shuffledCards = shuffle(cards);
    const output = Array(size);
    shuffledCards.forEach((card: any, i: number) => {
      const idx = i % size;
      output[idx] = output[idx] ? [...output[idx], card] : [card];
    });
    return output;
  }
}
