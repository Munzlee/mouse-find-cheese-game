import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PrimaryButton, TextField } from "@fluentui/react";
import { Square } from "./Square";

function App() {
  const [size, setSize] = useState(2);
  const [squares, setSquares] = useState<{ x: number; y: number }[]>([
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ]);
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
          }>();
          for (let i = 1; i <= size; i++) {
            for (let j = 1; j <= size; j++) {
              tmp.push({ x: i, y: j });
            }
          }
          setSquares(tmp);
        }}
      />
      <div className="Grid">
        {squares.map(({ x, y }) => (
          <Square x={x} y={y} />
        ))}
      </div>
    </div>
  );
}

export default App;
