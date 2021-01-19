import React, { useCallback, useEffect, useState } from "react";
interface ISquareProps {
  x: number;
  y: number;
  fieldType: FieldType;
  onChange: (x: number, y: number, fieldType: FieldType) => void;
}
export enum FieldType {
  None,
  Cheese,
  Wall,
  Mouse,
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
      className="field"
      style={{
        gridColumn: props.x,
        gridRow: props.y,
        backgroundColor: getFieldColor(squareType),
      }}
    ></div>
  );
}
function getFieldColor(fieldType: FieldType) {
  switch (fieldType) {
    case FieldType.None:
      return "white";
    case FieldType.Wall:
      return "blue";
    case FieldType.Cheese:
      return "yellow";
    case FieldType.Mouse:
      return "gray";
    default:
      return "white";
  }
}
