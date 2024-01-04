export interface SchemaObjectField {
  name: string;
  type: string;
}

export interface SchemaObject {
  name: string;
  type: string;
  args: SchemaObjectField[];
  fields: SchemaObjectField[] | undefined;
}

export interface TypeObject {
  name: string;
  kind: string;
  ofType?: TypeObject;
}

export interface SchemaFieldData {
  args: [];
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
  type: TypeObject;
}

export interface InputFieldData {
  name: string;
  description: string;
  defaultValue: unknown;
  type: TypeObject;
}

export interface SchemaTypeData {
  description: string;
  enumValues: [];
  fields: [];
  inputFields: InputFieldData[];
  interfaces: [];
  kind: string;
  name: string;
  possibleTypes: [];
}

export interface ErrorLocation {
  line: string;
  column: string;
}

export interface ResponseError {
  message: string;
  locations: ErrorLocation[];
}
