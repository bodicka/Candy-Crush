import { WritableDraft } from "immer/dist/types/types-external";
import { formulaForMoveBelow } from "../../utils/formula";
import { candies } from "../../utils/candyDate";

export const moveBelowReducer = (
  state: WritableDraft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: Element | undefined;
    squareBeingDragged: Element | undefined;
  }>
) => {
  const newBoard: string[] = [...state.board];
  const { boardSize } = state;
  let boardChange: boolean = false;
  const formulaForMove: number = formulaForMoveBelow(boardSize);

  for (let i: number = 0; i < formulaForMove; i++) {
    const firstRow = Array(boardSize).fill(0).map((_value: number, index: number) => index);
    const isFirstRow = firstRow.includes(i)

    if (isFirstRow && newBoard[i] === "") {
      let randomNumber = Math.floor(Math.random() * candies.length);
      newBoard[i] = candies[randomNumber];
      boardChange = true;
    }

    if (newBoard[i + boardSize] === "") {
      newBoard[i + boardSize] = newBoard[i];
      newBoard[i] = "";
      boardChange = true;
    }
    if (boardChange) state.board = newBoard;
  }
};

