import './Viewer.css';

interface ViewerProps {
  widthHalf: boolean;
}

function Viewer(props: ViewerProps) {
  return (
    <div className={props.widthHalf ? 'width-half' : 'width-full'}>
      <div className="width100">
        <textarea
          cols={100}
          rows={20}
          readOnly
          className="paddingSmall border width100"
          value="readony response viewer"
        >
          Readonly response
        </textarea>
      </div>
    </div>
  );
}

export default Viewer;
