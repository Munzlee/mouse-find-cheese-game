import React, { useCallback, useState } from "react";
import "./App.css";
import { PrimaryButton, TextField } from "@fluentui/react";
import { FieldType, Square } from "./Square";

export interface ISquare {
  x: number;
  y: number;
  fieldType: FieldType;
}

function App() {
  const [size, setSize] = useState(2);
  const [squares, setSquares] = useState<ISquare[]>([
    { x: 1, y: 1, fieldType: FieldType.None },
    { x: 2, y: 1, fieldType: FieldType.None },
    { x: 1, y: 2, fieldType: FieldType.None },
    { x: 2, y: 2, fieldType: FieldType.None },
  ]);
  const handleOnSquareClick = useCallback(
    (x: number, y: number, f: FieldType) => {
      let index = squares.findIndex(
        (pred) => pred.fieldType === f && pred.x === x && pred.y === y
      );

      let item = squares[index];
      if (getNewFieldType({ ...item }) === FieldType.Mouse) {
        item.fieldType = getNewFieldType(item);
        squares[index] = item;
        setSquares(
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
        setSquares(
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
        setSquares([...squares]);
      }
    },
    [squares]
  );

  return (
    <div>
      <TextField
        label="Size"
        onChange={(e, str) => {
          setSize(Number(str ?? "2"));
        }}
        value={String(size)}
      />
      <PrimaryButton
        onClick={(e) => {
          let tmp = new Array<{
            x: number;
            y: number;
            fieldType: FieldType;
          }>();
          for (let i = 1; i <= size; i++) {
            for (let j = 1; j <= size; j++) {
              tmp.push({ x: i, y: j, fieldType: FieldType.None });
            }
          }
          setSquares(tmp);
        }}
      />
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

export default App;
