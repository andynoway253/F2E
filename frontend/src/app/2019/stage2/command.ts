import {Card, Pile} from './models';

interface Command {
  do(): void;
  undo(): void;
}

export class MoveCommand implements Command{
  private from: Pile;
  private to: Pile;
  private readonly cards: Card[];

  constructor(from: Pile, to: Pile, cards: Card[]) {
    this.from = from;
    this.to = to;
    this.cards = cards;
  }

  do(): void {
    this.from.removeCards(this.cards);
    this.to.addCards(this.cards);
  }

  undo(): void {
    this.to.removeCards(this.cards);
    this.from.addCards(this.cards);
  }
}

export class CommandManager {
  private commands: Command[] = [];
  constructor() { }

  get hasCommand(): boolean {
    return this.commands.length > 0;
  }
  execute(cmd: Command) {
    cmd.do();
    this.commands.push(cmd);
  }
  undo(): void {
    if (this.hasCommand) {
      const cmd = this.commands.pop();
      cmd.undo();
    }
  }
}
