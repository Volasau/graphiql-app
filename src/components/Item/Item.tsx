import { useState } from 'react';
import './Item.css';
import SchemaType from '../SchemaType/Type';
import { SchemaObject } from '../EditorPanel/Panel';

interface ItemProps {
  item: SchemaObject;
  types: SchemaObject[];
  allObjects: SchemaObject[];
}

function Item(props: ItemProps) {
  const [typeVisible, setTypeVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const typeClass = `font-small padding ${
    props.allObjects.find((item: SchemaObject) => item.type === props.item.type)
      ? 'type'
      : ''
  }`;

  const itemClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const typeName = target.innerText;
    const type: SchemaObject | undefined = props.allObjects.find(
      (item: SchemaObject) => item.type === typeName
    );
    if (type) {
      setTypes([type]);
      setTypeVisible(!typeVisible);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="font-small padding"> {props.item.name}: </div>
        <div className={typeClass} onClick={itemClickHandler}>
          {' '}
          {props.item.type}
        </div>
      </div>

      {typeVisible ? (
        <div className="nested-type-block">
          <SchemaType
            types={types}
            allObjects={props.allObjects}
            infoVisible={true}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Item;
