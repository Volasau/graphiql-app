import { useState } from 'react';
import './Item.css';
import SchemaType from '../SchemaType/Type';

interface ItemProps {
  item: {
    name: string;
    type: {
      name: string;
      kind: string;
    };
  };
  endpoint: string;
}

function Item(props: ItemProps) {
  const [typeVisible, setTypeVisible] = useState(false);
  const [fields, setFields] = useState([]);

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
    getFields(props.item.type.name);
    setTypeVisible(!typeVisible);
  };

  return (
    <>
      <div className="flex item" data-testid="item">
        <div className="font-small margin-small">{props.item.name}</div>
        <div className="font-small type" onClick={itemClickHandler}>
          [{props.item.type.name}]
        </div>
      </div>
      {typeVisible ? (
        <SchemaType fields={fields} endpoint={props.endpoint}></SchemaType>
      ) : (
        <></>
      )}
    </>
  );
}

export default Item;
