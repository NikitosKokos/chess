import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure{
   constructor(color: Colors, cell: Cell){
      super(color,cell);
      this.logo = color === Colors.BLACK ?  blackLogo : whiteLogo;
      this.name = FigureNames.KING;
   }

   canMove(target: Cell): boolean {
      if(!super.canMove(target)){
        return false;
      }
      const otherKing = this.color === Colors.BLACK ? this.cell.board.whiteKing : this.cell.board.blackKing;
      const condition = (figure: Cell | undefined) => {
         if(figure){
            return (figure.y - 1 === target.y || figure.y + 1 === target.y)
            && (figure.x - 1 === target.x || figure.x + 1 === target.x)
            || (figure.y + 1 === target.y && figure.x === target.x)
            || (figure.y - 1 === target.y && figure.x === target.x)
            || (figure.y === target.y && figure.x + 1 === target.x)
            || (figure.y === target.y && figure.x - 1 === target.x)
         }
      }
      if(condition(otherKing?.cell)){
         return false;
      }
      if(condition(this.cell)){
            return true;
         }
      
      return false;
   }
}