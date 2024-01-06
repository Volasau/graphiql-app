import { getIntrospectionQuery } from 'graphql';
import {
  InputFieldData,
  SchemaFieldData,
  SchemaObject,
  SchemaTypeData,
  TypeObject,
} from '../../utils/types';

const getType = (obj: TypeObject): string => {
  if (obj.kind === 'OBJECT') {
    return obj.name;
  }
  return obj.ofType ? getType(obj.ofType) : '';
};

const getFieldType = (obj: TypeObject): string => {
  if (obj.name !== null) {
    return obj.name;
  }
  return obj.ofType ? getFieldType(obj.ofType) : '';
};

export const fetchSchema = async (
  endpoint: string
): Promise<{ error?: string; result: SchemaObject[] }> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    if (response.ok) {
      const schemaJSON = await response.json();
      const introspectionData = schemaJSON.data.__schema;
      const queryType = introspectionData.queryType.name;
      let arrTypes: SchemaFieldData[] = [];
      const schemaTypes: SchemaObject[] = [];
      const allTypes: SchemaTypeData[] = [];
      introspectionData.types.map((item: SchemaTypeData) => {
        if (item.name === queryType) {
          arrTypes = item.fields;
        }
      });
      introspectionData.types.map((item: SchemaTypeData) => {
        if (item.kind !== 'SCALAR') {
          allTypes.push(item);
        }
      });

      arrTypes.map((item: SchemaFieldData) => {
        schemaTypes.push({
          name: item.name,
          type: item.type.name || '[' + getType(item.type) + ']',
          args: item.args.map((el: InputFieldData) => {
            return {
              name: el.name,
              type: getFieldType(el.type),
            };
          }),
          fields: allTypes
            .filter((el) => el.name === getType(item.type))
            .at(0)
            ?.fields.map((elem: SchemaFieldData) => {
              return {
                name: elem.name,
                type: getFieldType(elem.type),
              };
            }),
        });
      });

      // add input objects
      allTypes.map((item: SchemaTypeData) => {
        if (item.kind === 'INPUT_OBJECT') {
          schemaTypes.push({
            name: item.name,
            type: item.name,
            args: [],
            fields: item.inputFields.map((elem: InputFieldData) => {
              return {
                name: elem.name,
                type: getFieldType(elem.type),
              };
            }),
          });
        }
      });

      return { result: schemaTypes };
    } else {
      const responseJSON = await response.json();
      return { error: responseJSON.message, result: [] };
    }
  } catch (error) {
    return { error: (error as Error).message ?? '', result: [] };
  }
};
