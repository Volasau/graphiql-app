import './Editor.css';

function Editor() {
  return (
    <>
      <div className="max-width">
        <textarea
          cols={100}
          rows={20}
          className="paddingSmall font-small border width100"
        ></textarea>
      </div>
    </>
  );
}

export default Editor;
