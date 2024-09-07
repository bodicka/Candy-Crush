import { useAppDispatch } from "../store/hooks";
import { dragDrop, dragEnd, dragStart } from "../store/store";

type TileProps = {
  candy: string;
  candyId: number;
};

const Tile = ({ candy, candyId }: TileProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        boxShadow: "inset 5px 5px 15px #062525, inset -5px -5px 15px #aaaab7bb",
      }}
      className="h-24 w-24 flex justify-center items-center m-0.5 rounded-lg select-none"
    >
      {candy && (
        <img 
          src={candy} 
          alt="candy" 
          className="h-20 w-20" 
          candy-id={candyId} 
          draggable={true}
          onDragStart={(e) => dispatch(dragStart(e.target))}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => dispatch(dragDrop(e.target))}
          onDragEnd={() => dispatch(dragEnd())}
        />
      )}
    </div>
  );
};

export default Tile;
