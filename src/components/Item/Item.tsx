import { useState } from 'react';
import './Item.css';
import request, { gql } from 'graphql-request';
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

  const getFields = (type: string) => {
    const introspectionQuery = gql`
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
    request(props.endpoint, introspectionQuery)
      .then((data) => {
        const t = data.__type ? data.__type.fields : [];
        setFields(t);
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
