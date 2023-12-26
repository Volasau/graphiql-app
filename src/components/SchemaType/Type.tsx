import './Type.css';
import { SchemaObject } from '../EditorPanel/Panel';
import Item from '../Item/Item';
import { useState } from 'react';

interface TypeProps {
  types: SchemaObject[];
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
      {props.types?.map((item, index) => (
        <div className="margin-bottom" key={index}>
          <div className="flex item" data-testid="item">
            <div
              className="font-medium margin-small"
              onClick={nameClickHandler}
            >
              Object: {item.name}
            </div>
            <div className="font-medium">Type: {item.type}</div>
          </div>
          {infoVisible ? (
            <div>
              <div className="font-medium">Arguments:</div>
              {item.args?.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  types={props.types}
                  allObjects={props.allObjects}
                />
              ))}
              <div className="font-medium">Fields:</div>
              {item.fields?.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  types={props.types}
                  allObjects={props.allObjects}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}

export default SchemaType;
