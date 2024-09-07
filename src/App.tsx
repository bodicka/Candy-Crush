import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { createBoard } from "./utils/createBoard";
import { moveBelow, updateBoard } from "./store/store";
import Board from "./components/Board";
import {
  checkForColumnOfThree,
  checkRowOfFour,
  checkRowOfThree,
  isColumnOfFour,
} from "./utils/moveCheckLogick";
import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "./utils/formula";

const App = () => {
  const dispathc = useAppDispatch();

  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );

  useEffect(() => {
    dispathc(updateBoard(createBoard(boardSize)));
  }, [boardSize, dispathc]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize));
      checkRowOfFour(newBoard, boardSize,  generateInvalidMoves(boardSize, true));
      checkForColumnOfThree(newBoard, boardSize, formulaForColumnOfThree(boardSize));
      checkRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize, true));
      dispathc(updateBoard(newBoard));
      dispathc(moveBelow());
    }, 150);
    return () => clearInterval(timeout);
  }, [board, boardSize, dispathc]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Board />
    </div>
  );
};

export default App;
