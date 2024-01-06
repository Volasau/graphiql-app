import { useState } from 'react';
import './Item.css';
import SchemaType from '../SchemaType/Type';
import { SchemaObject, SchemaObjectField } from '../../utils/types';

interface ItemProps {
  item: SchemaObjectField;
  allObjects: SchemaObject[];
}

function Item(props: ItemProps) {
  const [typeVisible, setTypeVisible] = useState(false);
  const [type, setType] = useState<SchemaObject | undefined>();
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
      setType(type);
      setTypeVisible(!typeVisible);
    }
  };

  return (
    <div data-testid="item">
      <div className="flex">
        <div className="font-small padding "> {props.item.name}: </div>
        <div className={typeClass} onClick={itemClickHandler}>
          {' '}
          {props.item.type}
        </div>
      </div>

      {typeVisible ? (
        <div className="nested-type-block">
          <SchemaType
            type={type}
            allObjects={props.allObjects}
            infoVisible={true}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Item;
