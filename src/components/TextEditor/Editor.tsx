import './Editor.css';

function Editor() {
  return (
    <>
      <div className="container">
        <textarea
          cols={100}
          rows={30}
          className="paddingSmall font-small border"
        ></textarea>
      </div>
    </>
  );
}

export default Editor;
