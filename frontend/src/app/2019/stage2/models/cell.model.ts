import {Card, Suit} from './card.model';

export interface Pile {
  cards: Card[];
  canMove(card: Card): boolean;
  canAdd(newCards: Card[]): boolean;
  addCards(cards: Card[]): void;
  removeCards(cards: Card[]): Card[];
}

abstract class AbstractCell {
  static maxSize: number;
  protected _cards: Card[];

  protected constructor(card: Card[] = []) {
    this._cards = card;
  }

  get cards(): Card[] {
    return this._cards;
  }

  addCards(cards: Card[]) {
    console.log(cards)
    this._cards = [...this._cards, ...cards];
  }

  removeCards(cards: Card[]): Card[] {
    if (cards.length === 0) {
      return [];
    }
    const index = this._cards.indexOf(cards[0]);
    const removed = this._cards.slice(index);
    this._cards = [...this._cards.slice(0, index)];
    return removed;
  }
}

export class ColumnCell extends AbstractCell implements Pile {
  dragIndex = -1;
  private canMoves: boolean [];

  constructor(cards: Card[] = []) {
    super(cards);
    this.updateCanMoves();
  }

  private updateCanMoves(): void {
    const result = Array(this._cards.length).fill(true);
    if (this._cards.length <= 1) {
      return;
    }
    for (let i = this._cards.length - 2; i >= 0; i--) {
      const currentCard = this._cards[i];
      const nextCard = this._cards[i + 1];
      result[i] = result[i + 1] && (currentCard.rank - nextCard.rank) === 1 && !nextCard.isSameColor(currentCard);
    }
    this.canMoves = result;
  }

  canMove(card: Card): boolean {
    const index = this._cards.indexOf(card);
    return this.canMoves[index];
  }

  canAdd(newCards: Card[]): boolean {
    if (newCards.length === 0) {
      return false;
    }
    if (this._cards.length === 0) {
      return true;
    }

    const last: Card = this._cards[this._cards.length - 1];
    const next: Card = newCards[0];
    return last.rank - next.rank === 1 && !last.isSameColor(next);
  }

  addCards(cards: Card[]) {
    super.addCards(cards);
    this.updateCanMoves();
  }

  removeCards(cards: Card[]): Card[] {
    const result = super.removeCards(cards);
    this.updateCanMoves();
    return result;
  }
}

export class HomeCell extends AbstractCell implements Pile {
  static maxSize = 13;
  suit: Suit;
  readonly imgUrl: string;
  constructor(suit: Suit, cards: Card[] = []) {
    super(cards);
    this.suit = suit;
    this.imgUrl = `/assets/images/${Suit[this.suit][0].toUpperCase()}.png`;
  }

  canAdd(newCards: Card[]): boolean {
    const lastRank = this.cards.length === 0 ? 0 : this.cards[this.cards.length - 1].rank;
    // console.log(lastRank);
    return newCards.length === 1
      && this.suit === newCards[0].suit
      && newCards[0].rank - lastRank === 1;
  }

  canMove(card: Card): boolean {
    return false;
  }
}

export class TempCell extends AbstractCell implements Pile {
  constructor(cards: Card[] = [] ) {
    super(cards);
  }

  canAdd(newCards: Card[]): boolean {
    return this.cards.length === 0 && newCards.length === 1;
  }

  canMove(card: Card): boolean {
    return this.cards.indexOf(card) >= 0;
  }
}
