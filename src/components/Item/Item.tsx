import './Item.css';

interface ItemProps {
  item: {
    name: string;
    type: {
      name: string;
      kind: string;
    };
  };
}

function Item(props: ItemProps) {
  const itemClickHandler = () => {
    //paste field name in text area
  };

  return (
    <>
      <div className="flex item" onClick={itemClickHandler}>
        <div className="font-small margin-small">{props.item.name}</div>
        <div className="font-small margin-small">(...):</div>
        <div className="font-small grey">[{props.item.type.name}]</div>
      </div>
    </>
  );
}

export default Item;
