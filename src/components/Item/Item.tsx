import { useState } from 'react';
import './Item.css';
import SchemaType from '../SchemaType/Type';

interface ItemProps {
  item: {
    name: string;
    type: string;
    args: [];
    fields: [];
  };
  endpoint: string;
}

function Item(props: ItemProps) {
  const [typeVisible, setTypeVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);

  // get fields from given type
  const getFields = (type: string) => {
    const introspectionQuery = `
      query {
        __type(name: "${type}") {
          name
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `;

    fetch(props.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: introspectionQuery }),
    })
      .then((response) => {
        response.json().then(({ data }) => {
          const t = data.__type ? data.__type.fields : [];
          setFields(t);
        });
      })
      .catch((error) => console.error(error));
  };

  const itemClickHandler = () => {
    getFields(props.item.type);
    setTypeVisible(!typeVisible);
  };

  const nameClickHandler = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="margin-bottom">
      <div className="flex item" data-testid="item">
        <div className="font-medium margin-small" onClick={nameClickHandler}>
          Object: {props.item.name}
        </div>
        <div className="font-medium type" onClick={itemClickHandler}>
          Type: {props.item.type}
        </div>
      </div>
      {infoVisible ? (
        <div>
          <div className="font-medium">Arguments:</div>
          {props.item.args?.map((item, index) => (
            <div className="flex">
              <div className="font-small padding"> {item.name}: </div>
              <div className="font-small padding"> {item.type}</div>
            </div>
          ))}
          <div className="font-medium">Fields:</div>
          {props.item.fields?.map((item, index) => (
            <div className="flex">
              <div className="font-small padding"> {item.name}: </div>
              <div className="font-small padding"> {item.type}</div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {/* {typeVisible ? (
        <SchemaType fields={fields} endpoint={props.endpoint}></SchemaType>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default Item;
