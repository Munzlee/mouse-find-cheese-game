import React, { useCallback } from "react";
import "./PlayGrid.css";
import { FieldType, Square } from "./Square";

export interface ISquare {
  x: number;
  y: number;
  fieldType: FieldType;
}

function PlayGrid(props:{squares:ISquare[],onSquaresChange:(squareArr:ISquare[]) => void}) {
 
 
const {squares,onSquaresChange} =props;
  


  const handleOnSquareClick = useCallback(
    (x: number, y: number, f: FieldType) => {
      let index = squares.findIndex(
        (pred) => pred.fieldType === f && pred.x === x && pred.y === y
      );

      let item = squares[index];
      if (getNewFieldType({ ...item }) === FieldType.Mouse) {
        item.fieldType = getNewFieldType(item);
        squares[index] = item;
        onSquaresChange(
          squares.map((pr, i) => {
            if (i !== index && pr.fieldType === FieldType.Mouse) {
              return { ...pr, fieldType: FieldType.None };
            } else {
              return { ...pr };
            }
          })
        );
      } else if (getNewFieldType({ ...item }) === FieldType.Cheese) {
        item.fieldType = getNewFieldType(item);
        squares[index] = item;
        onSquaresChange(
          squares.map((pr, i) => {
            if (i !== index && pr.fieldType === FieldType.Cheese) {
              return { ...pr, fieldType: FieldType.None };
            } else {
              return { ...pr };
            }
          })
        );
      } else {
        item.fieldType = getNewFieldType(item);
        squares[index] = item;
        onSquaresChange([...squares]);
      }
    },
    [onSquaresChange, squares]
  );

  return (
    <div>
    
      <div className="Grid">
        {squares.map(({ x, y, fieldType }) => (
          <Square
            x={x}
            y={y}
            fieldType={fieldType}
            onChange={handleOnSquareClick}
          />
        ))}
      </div>
    </div>
  );
  function getNewFieldType(item: ISquare) {
    switch (item.fieldType) {
      case FieldType.None:
        return FieldType.Wall;
      case FieldType.Wall:
        return FieldType.Cheese;
      case FieldType.Cheese:
        return FieldType.Mouse;
      default:
        return FieldType.None;
    }
  }
}


export default PlayGrid;
