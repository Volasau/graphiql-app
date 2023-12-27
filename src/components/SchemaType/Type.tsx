import './Type.css';
import { SchemaObject } from '../EditorPanel/Panel';
import Item from '../Item/Item';
import { useState } from 'react';

interface TypeProps {
  type: SchemaObject | undefined;
  allObjects: SchemaObject[];
  infoVisible?: boolean;
}

function SchemaType(props: TypeProps) {
  const [infoVisible, setInfoVisible] = useState(props.infoVisible);

  const nameClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInfoVisible(!infoVisible);
  };
  return (
    <>
      <div className="flex item" data-testid="item">
        <div className="font-medium margin-small" onClick={nameClickHandler}>
          Object: {props.type?.name}
        </div>
        <div className="font-medium">Type: {props.type?.type}</div>
      </div>
      {infoVisible ? (
        <div>
          <div className="font-medium">Arguments:</div>
          {props.type?.args?.map((item, index) => (
            <Item key={index} item={item} allObjects={props.allObjects} />
          ))}
          <div className="font-medium">Fields:</div>
          {props.type?.fields?.map((item, index) => (
            <Item key={index} item={item} allObjects={props.allObjects} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SchemaType;
