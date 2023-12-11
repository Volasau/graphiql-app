import { useState } from 'react';
import './Item.css';
import request, { gql } from 'graphql-request';

interface ItemProps {
  item: {
    name: string;
    description: string;
    type: {
      name: string;
      kind: string;
    };
  };
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
    request('https://rickandmortyapi.com/graphql', introspectionQuery)
      .then((data) => {
        const t = data.__type ? data.__type.fields : [];
        setFields(t);
      })
      .catch((error) => console.error(error));
  };

  const itemClickHandler = () => {
    //paste field name in text area
    getFields(props.item.type.name);
    setTypeVisible(!typeVisible);
  };

  return (
    <>
      <div className="flex item" onClick={itemClickHandler}>
        <div className="font-small margin-small" title={props.item.description}>
          {props.item.name}
        </div>
        <div className="font-small margin-small">(...):</div>
        <div className="font-small grey">[{props.item.type.name}]</div>
      </div>
      {typeVisible ? fields?.map((item) => <div>{item.name}</div>) : <></>}
    </>
  );
}

export default Item;
