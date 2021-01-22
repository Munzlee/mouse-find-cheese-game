import {
  BaseButton,
  IStackItemStyles,
  PrimaryButton,
  Stack,
  StackItem,
  TextField,
} from "@fluentui/react";
import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Bfs } from "./functionality/BFS";
import PlayGrid, { ISquare } from "./Grid/PlayGrid";
import { FieldType } from "./Grid/Square";

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    padding: 5,
    display: "flex",
    height: 50,
    justifyContent: "center",
  },
};

function App() {
  const [size, setSize] = useState(2);
  const [squares, setSquares] = useState<ISquare[]>([
    { x: 1, y: 1, fieldType: FieldType.None },
    { x: 2, y: 1, fieldType: FieldType.None },
    { x: 1, y: 2, fieldType: FieldType.None },
    { x: 2, y: 2, fieldType: FieldType.None },
  ]);

  const handleSizeChange = useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string | undefined
    ) => {
      if (Number(newValue ?? "2") <= 35) {
        setSize(Number(newValue ?? "2"));
      } else {
        setSize(35);
      }
    },
    []
  );

  const handleOnSquareChange = useCallback((squareArray: ISquare[]) => {
    setSquares(squareArray);
  }, []);

  const generateDisabled = useMemo(() => {
    return (
      !squares.find((square) => square.fieldType === FieldType.Way) &&
      !squares.find((square) => square.fieldType === FieldType.Cheese) &&
      !squares.find((square) => square.fieldType === FieldType.Mouse)
    );
  }, [squares]);

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

  return (
    <div className="container">
      <div className="content">
        <div className="settings">
          <TextField
            label="Size:"
            onChange={handleSizeChange}
            value={String(size)}
          />
          <Stack horizontal disableShrink>
            <StackItem styles={stackItemStyles}>
              <PrimaryButton disabled={generateDisabled} onClick={handleFind}>
                Find Cheese
              </PrimaryButton>
            </StackItem>
            <StackItem styles={stackItemStyles}>
              <PrimaryButton onClick={handleGenerateSquares}>
                Generate
              </PrimaryButton>
            </StackItem>
          </Stack>
        </div>
        <div className="grid-container">
          <PlayGrid onSquaresChange={handleOnSquareChange} squares={squares} />
        </div>
      </div>
    </div>
  );
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
