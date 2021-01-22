import React, { useCallback, useState } from "react";
import "./App.css";
import { BaseButton, PrimaryButton, TextField } from "@fluentui/react";
import { FieldType, Square } from "./Square";
import { Bfs } from "./functionality/BFS";

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

  const handleGenerateSquares = useCallback(
    (
      event: React.MouseEvent<
        | HTMLAnchorElement
        | HTMLButtonElement
        | HTMLDivElement
        | BaseButton
        | HTMLSpanElement,
        MouseEvent
      >
    ) => {
      setSquares(generateSquares(size));
    },
    [size]
  );

  const handleFind = useCallback(
    (
      event: React.MouseEvent<
        | HTMLAnchorElement
        | HTMLButtonElement
        | HTMLDivElement
        | BaseButton
        | HTMLSpanElement,
        MouseEvent
      >
    ) => {
      setSquares(new Bfs(squares).calc());
    },
    [squares]
  );
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
        disabled={
          !!squares.find((square) => square.fieldType === FieldType.Way)
        }
        onClick={handleFind}
      >
        Calc
      </PrimaryButton>

      <PrimaryButton onClick={handleGenerateSquares}>Generate</PrimaryButton>
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

function generateSquares(size: number) {
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
  return tmp;
}

export default App;
