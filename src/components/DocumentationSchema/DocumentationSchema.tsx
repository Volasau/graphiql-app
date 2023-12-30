import './DocumentationSchema.css';
import { useLanguage } from '../../context/contextLanguage';
import SchemaType from '../SchemaType/Type';
import { SchemaObject } from '../../utils/types';

interface DocumentationSchemaProps {
  objects: SchemaObject[];
}

function DocumentationSchema(props: DocumentationSchemaProps) {
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
            ? 'Click on object name to expand/collapse available fields.'
            : 'Кликните на название объекта, чтобы раскрыть/свернуть доступные поля'}
        </div>
        <div>
          {props.objects?.length ? (
            <div>
              {props.objects.map((item, index) => (
                <div className="margin-bottom" key={index}>
                  <SchemaType
                    type={item}
                    allObjects={props.objects}
                    infoVisible={false}
                  />
                </div>
              ))}
            </div>
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

export default DocumentationSchema;
