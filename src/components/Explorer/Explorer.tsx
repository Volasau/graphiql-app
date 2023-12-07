import './Explorer.css';
import Item from '../Item/Item';

interface ExplorerProps {
  fields: [];
}

function Explorer(props: ExplorerProps) {
  return (
    <>
      <div className="explorer-panel">
        <div className="font-large documentation-header">Documentation</div>
        <div className="font-medium">Fields</div>
        {props.fields?.length ? (
          props.fields?.map((item) => <Item item={item} />)
        ) : (
          <h2 data-testid="empty-text">No items</h2>
        )}
      </div>
    </>
  );
}

export default Explorer;
