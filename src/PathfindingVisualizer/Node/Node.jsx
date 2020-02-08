import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseUp,
      onMouseEnter,
      onMouseDown
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}

export default Node;
