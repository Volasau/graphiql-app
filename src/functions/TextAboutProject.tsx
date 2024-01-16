interface DataObject {
  [key: string]: string[];
}

export function PrintText(lan: string, obj: DataObject) {
  return obj[lan].map((paragraph: string, index: number) => (
    <p key={index}>{paragraph}</p>
  ));
}
