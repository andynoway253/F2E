import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor() {}

  cells: string[] = Array(9).fill('');

  currentPlayer: string = 'O';

  winner: string | null = null;

  ngOnInit(): void {}

  handleCellClick(index: number): void {
    if (!this.cells[index] && !this.winner) {
      this.cells[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.cells[a] &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        return true;
      }
    }

    return false;
  }

  restartGame(): void {
    this.cells = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
