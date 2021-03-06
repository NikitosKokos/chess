import { Figure } from './figures/Figure';
import { Rook } from './figures/Rook';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Colors } from './Colors';
import { Cell } from './Cell';

export class Board{
   cells: Cell[][] = [];
   lostBlackFigures: Figure[] = [];
   lostWhiteFigures: Figure[] = [];
   whiteKing: Figure | null = null;
   blackKing: Figure | null = null;
   isChangePawn: boolean = false;


   public initSells(){
      for (let i = 0; i < 8; i++) {
         const row: Cell[]  = [];
         for (let j = 0; j < 8; j++) {
            if((i + j) % 2 !== 0){
               row.push(new Cell(this, j, i, Colors.BLACK, null))
            }else{
               row.push(new Cell(this, j, i, Colors.WHITE, null))
            }
         }
         this.cells.push(row);
      }
   }

   public getCopyBoard(): Board {
      const newBoard = new Board();
      newBoard.cells = this.cells;
      newBoard.lostBlackFigures = this.lostBlackFigures;
      newBoard.lostWhiteFigures = this.lostWhiteFigures;
      return newBoard;
   }

   public highLightCells(selectedSell: Cell | null){
      for (let i = 0; i < this.cells.length; i++) {
         const row = this.cells[i];
         for (let j = 0; j < row.length; j++) {
            const target = row[j];
            target.avaliable = !!selectedSell?.figure?.canMove(target);
         }
      }
   }

   public getCell(x: number,y: number){
      return this.cells[y][x];
   }

   private addPawns(){
      for (let i = 0; i < 8; i++) {
         new Pawn(Colors.BLACK, this.getCell(i, 1));
         new Pawn(Colors.WHITE, this.getCell(i, 6));
      }
   }

   private addKings(){
      this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
      this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
   }

   private addQueens(){
      new Queen(Colors.BLACK, this.getCell(3, 0));
      new Queen(Colors.WHITE, this.getCell(3, 7));
   }

   private addBishops(){
      new Bishop(Colors.BLACK, this.getCell(2, 0));
      new Bishop(Colors.BLACK, this.getCell(5, 0));
      new Bishop(Colors.WHITE, this.getCell(2, 7));
      new Bishop(Colors.WHITE, this.getCell(5, 7));
   }

   private addKnights(){
      new Knight(Colors.BLACK, this.getCell(1, 0));
      new Knight(Colors.BLACK, this.getCell(6, 0));
      new Knight(Colors.WHITE, this.getCell(1, 7));
      new Knight(Colors.WHITE, this.getCell(6, 7));
   }

   private addRooks(){
      new Rook(Colors.BLACK, this.getCell(0, 0));
      new Rook(Colors.BLACK, this.getCell(7, 0));
      new Rook(Colors.WHITE, this.getCell(0, 7));
      new Rook(Colors.WHITE, this.getCell(7, 7));
   }

   public addFigures(){
      this.addPawns();
      this.addKings();
      this.addQueens();
      this.addBishops();
      this.addKnights();
      this.addRooks();
   }

   public changePawn(type: string,color: string,currentChangePawn: Cell){
      switch (type) {
         case 'knight':
            currentChangePawn.figure = new Knight(color === Colors.BLACK ? Colors.BLACK : Colors.WHITE, this.getCell(currentChangePawn.x, currentChangePawn.y));
            break;
         case 'bishop':
            currentChangePawn.figure = new Bishop(color === Colors.BLACK ? Colors.BLACK : Colors.WHITE, this.getCell(currentChangePawn.x, currentChangePawn.y));
            break;
         case 'rook':
            currentChangePawn.figure = new Rook(color === Colors.BLACK ? Colors.BLACK : Colors.WHITE, this.getCell(currentChangePawn.x, currentChangePawn.y));
            break;
         case 'queen':
            currentChangePawn.figure = new Queen(color === Colors.BLACK ? Colors.BLACK : Colors.WHITE, this.getCell(currentChangePawn.x, currentChangePawn.y));
            break;
         default:
            break;
      }
      currentChangePawn.board.isChangePawn = false;
   }
}