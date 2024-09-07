import { useAppSelector } from "../store/hooks"
import Tile from "./Tile";

const Board = () => {
  const board = useAppSelector(({candyCrush: {board}}) => board);
  const boardSize = useAppSelector(({candyCrush: {boardSize}}) => boardSize);

  return (
    <div className="flex flex-wrap rounded-lg" style={{
      width: `${6.25 * boardSize}rem`
    }}>
      {
        board.map((candy: string, index: number) => (
          <Tile candy={candy} key={index} candyId={index} />
        ))
      }
    </div>
  )
}

export default Board