import './Viewer.css';

function Viewer() {
  return (
    <>
      <div>
        <textarea cols={100} rows={30} readOnly className="paddingSmall border">
          Readonly response
        </textarea>
      </div>
    </>
  );
}

export default Viewer;
