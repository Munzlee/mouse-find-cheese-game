import { ISquare } from "../App";
import { FieldType } from "../Square";

interface ISquareKordinates {
  x: number;
  y: number;
  neighbours: Array<ISquare>;
}

export class Bfs {
  private squares: ISquare[];
  private adjacencyList: ISquareKordinates[];
  constructor(_squares: ISquare[]) {
    this.squares = _squares;
    this.adjacencyList = [
      ..._squares
        .filter((pr) => pr.fieldType !== FieldType.Wall)
        .map(({ x, y, fieldType }) => ({
          x: x,
          y: y,
          neighbours: this.getNeighbours({ x, y, fieldType }),
        })),
    ];
  }

  public solve(
    startNode: ISquareKordinates,
    endNode: ISquareKordinates
  ): ISquareKordinates[] | undefined {
    let tmp = new Array<ISquareKordinates>();
    let prev = new Array<ISquareKordinates>();
    let visited = new Array<ISquareKordinates>();

    const isVisitedNotFunc = (pr: Partial<ISquareKordinates>) => {
      return (
        visited.filter((item) => pr.x === item.x && pr.y === item.y).length ===
        0
      );
    };
    tmp.push({ ...startNode });
    while (tmp.length > 0 || isVisitedNotFunc(endNode)) {
      let node = tmp.shift() as ISquareKordinates;
      prev.push(node);
      if (node.x === endNode.x && node.y === endNode.y) {
        return prev;
      }

      if ((node.neighbours?.length ?? 0) > 0) {
        tmp.push(
          ...(
            node.neighbours
              .map(
                (n) =>
                  this.adjacencyList.find(
                    (element) => n.x === element.x && element.y === n.y
                  ) as ISquareKordinates
              )
              .filter((pr) => pr) ?? []
          )
            .filter(isVisitedNotFunc)
            .filter((pr) => !tmp.includes(pr))
        );

        if (prev.find(({ x, y }) => endNode.x === x && endNode.y === y)) {
          return visited;
        }
      }
      visited.push(node);
    }
    return visited;
  }

  private getNeighbours(item: ISquare) {
    let neigbors = this.squares
      .filter((pr) => pr.fieldType !== FieldType.Wall)
      .filter(
        (pr) => pr.x === item.x && (pr.y - item.y === 1 || pr.y - item.y === -1)
      );
    neigbors.push(
      ...this.squares
        .filter((pr) => pr.fieldType !== FieldType.Wall)
        .filter(
          (pr) =>
            pr.y === item.y && (pr.x - item.x === 1 || pr.x - item.x === -1)
        )
    );
    return neigbors.map<ISquare>(({ x, y, fieldType }) => ({
      x,
      y,
      fieldType,
    }));
  }
  public calc() {
    let startNode = this.adjacencyList.find(
      (item) =>
        this.squares.find((pr) => pr.fieldType === FieldType.Mouse)?.x +
          "," +
          this.squares.find((pr) => pr.fieldType === FieldType.Mouse)?.y ===
        item.x + "," + item.y
    );
    let endNode = this.adjacencyList.find(
      (item) =>
        this.squares.find((pr) => pr.fieldType === FieldType.Cheese)?.x +
          "," +
          this.squares.find((pr) => pr.fieldType === FieldType.Cheese)?.y ===
        item.x + "," + item.y
    );
    if (startNode && endNode) {
      let prev = this.solve(startNode, endNode);
      if (prev) {
        return this.reconstructPath(prev, startNode, endNode);
      }
    }
    return [];
  }

  private reconstructPath(
    visited: ISquareKordinates[],
    startNode: ISquareKordinates,
    endNode: ISquareKordinates
  ) {
    let path = new Array<ISquareKordinates>();
    let prev = visited.reverse();
    debugger;
    let currennext = 0;
    prev.forEach((e, i) => {
      if (e === endNode || e === startNode) {
        path.push(e);
        currennext = e.neighbours
          .map((q) => prev.findIndex((ele) => ele.x === q.x && q.y === ele.y))
          .filter(
            (num) => !(prev.findIndex((dibder) => dibder === endNode) === num)
          )
          .filter((n) => !(n <= i))
          .sort((a, b) => {
            return a - b;
          })[0];
      } else {
        if (i === currennext) {
          path.push(e);

          currennext = e.neighbours
            .map((q) => prev.findIndex((ele) => ele.x === q.x && q.y === ele.y))
            .filter(
              (num) => !(prev.findIndex((dibder) => dibder === endNode) === num)
            )
            .filter((n) => !(n <= i))
            .sort((a, b) => {
              return a - b;
            })[0];
        }
      }
    });

    return this.squares.map((pr) =>
      path.find((px) => px.x === pr.x && px.y === pr.y)
        ? { ...pr, fieldType: FieldType.Way }
        : pr
    );
  }
}
