import React, { useCallback, useEffect, useState } from "react";
import cheeseImg from "../images/swiss-cheese-575542_640.png";
import mouseImg from "../images/animal-1239398_640.jpg";

interface ISquareProps {
  x: number;
  y: number;
  fieldType: FieldType;
  className: string;
  onChange: (x: number, y: number, fieldType: FieldType) => void;
}
export enum FieldType {
  None,
  Cheese,
  Wall,
  Mouse,
  Way,
}

export function Square(props: ISquareProps) {
  const [squareType, setSquareType] = useState(props.fieldType);
  useEffect(() => {
    if (props.fieldType !== squareType) {
      setSquareType(props.fieldType);
    }
  }, [props.fieldType, squareType]);

  const handleOnclick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      props.onChange(props.x, props.y, props.fieldType);
      setSquareType(props.fieldType);
    },
    [props]
  );
  return (
    <div
      onClick={handleOnclick}
      className={props.className}
      style={{
        gridColumn: props.x,
        gridRow: props.y,
        ...getFieldTypeStyle(squareType),
      }}
    ></div>
  );
}
function getFieldTypeStyle(fieldType: FieldType) {
  switch (fieldType) {
    case FieldType.None:
      return { backgroundColor: "#252526" };
    case FieldType.Wall:
      return { backgroundColor: "blue" };
    case FieldType.Cheese:
      return {
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundImage: `url(${cheeseImg})`,
      };
    case FieldType.Mouse:
      return {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${mouseImg})`,
        backgroundPosition: "center",
      };
    case FieldType.Way:
      return { backgroundColor: "red" };
    default:
      return { backgroundColor: "#252526" };
  }
}
