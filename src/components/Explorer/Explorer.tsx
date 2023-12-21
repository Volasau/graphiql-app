import './Explorer.css';
import { useLanguage } from '../../context/contextLanguage';
import { SchemaData } from '../EditorPanel/Panel';
import SchemaType from '../SchemaType/Type';

interface ExplorerProps {
  types: SchemaData[];
  endpoint: string;
}

function Explorer(props: ExplorerProps) {
  const { lan } = useLanguage();
  return (
    <>
      <div data-testid="expoler" className="explorer-panel">
        <div className="font-large documentation-header">
          {lan === 'en' ? 'Documentation' : 'Документация'}
        </div>
        <div className="font-medium">{lan === 'en' ? 'Types:' : 'Типы:'}</div>
        <div className="font-small grey-text">
          {lan === 'en'
            ? 'Click on type name to expand/collapse available fields.'
            : 'Кликните на название типа, чтобы раскрыть/свернуть доступные поля'}
        </div>
        <div className="types-block">
          {props.types?.length ? (
            // eslint-disable-next-line react/jsx-key
            <SchemaType
              fields={props.types}
              endpoint={props.endpoint}
            ></SchemaType>
          ) : (
            <h2 data-testid="empty-text">
              {lan === 'en' ? 'No items' : 'Нет записей'}
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Explorer;
