import './Explorer.css';
import Item from '../Item/Item';
import { request, gql } from 'graphql-request';
import { ChangeEvent, useState } from 'react';

function Explorer() {
  //const endpoint = 'https://rickandmortyapi.com/graphql';
  const [fields, setFields] = useState([]);
  const [endpoint, setEndpoint] = useState('');

  const apiChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  // get fields from type Character
  const getSchema = () => {
    const introspectionQuery = gql`
      query {
        __type(name: "Character") {
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
    request(endpoint, introspectionQuery)
      .then((data) => {
        const t = data.__type.fields;
        setFields(t);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div className="explorer-panel">
        <div className="flex api-block">
          <span className="margin-right-small">API: </span>
          <input
            className="margin-right-small input font-small"
            type="text"
            placeholder="enter API url..."
            onChange={apiChangeHandler}
          />
          <button className="button color-mediumlight" onClick={getSchema}>
            Get schema
          </button>
        </div>
        <div className="font-large documentation-header">Documentation</div>
        <div className="font-medium">Fields</div>
        {fields?.length ? (
          fields?.map((item) => <Item item={item} />)
        ) : (
          <h2 data-testid="empty-text">No items</h2>
        )}
      </div>
    </>
  );
}

export default Explorer;
