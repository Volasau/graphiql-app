import './Explorer.css';
import Item from '../Item/Item';
import { useLanguage } from '../../context/contextLanguage';

interface ExplorerProps {
  fields: [];
}

function Explorer(props: ExplorerProps) {
  const { lan } = useLanguage();
  return (
    <>
      <div className="explorer-panel">
        <div className="font-large documentation-header">
          {lan === 'en' ? 'Documentation' : 'Документация'}
        </div>
        <div className="font-medium">Fields</div>
        {props.fields?.length ? (
          // eslint-disable-next-line react/jsx-key
          props.fields?.map((item) => <Item item={item} />)
        ) : (
          <h2 data-testid="empty-text">No items</h2>
        )}
      </div>
    </>
  );
}

export default Explorer;
