import './Type.css';
import { Field } from '../EditorPanel/Panel';
import Item from '../Item/Item';

interface TypeProps {
  fields: Field[];
  endpoint: string;
}

function SchemaType(props: TypeProps) {
  return (
    <>
      <div className="fields-block">
        {props.fields?.map((item, index) => (
          <Item key={index} item={item} endpoint={props.endpoint} />
        ))}
      </div>
    </>
  );
}

export default SchemaType;
