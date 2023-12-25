import './Explorer.css';
import { useLanguage } from '../../context/contextLanguage';

interface ExplorerProps {
  data: string;
}

function Explorer({ data }: ExplorerProps) {
  const { lan } = useLanguage();
  return (
    <>
      <div data-testid="expoler" className="explorer-panel">
        <div className="font-large documentation-header">
          {lan === 'en' ? 'Documentation' : 'Документация'}
        </div>
        <div className="font-medium">
          {lan === 'en' ? 'Types and input:' : 'Типы и ввод:'}
        </div>
        <div className="types-block">
          <div className="container">{data && <pre>{data}</pre>}</div>
        </div>
      </div>
    </>
  );
}

export default Explorer;
