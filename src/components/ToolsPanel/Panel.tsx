import './Panel.css';

function Panel() {
  return (
    <>
      <div className="column panel color-light">
        <div title="Run" className="run-button">
          <img className="icon" src="src/assets/images/runIcon.png" />
        </div>
        <div title="Prettify" className="prettify-button padding-top-small">
          <img className="icon" src="src/assets/images/prettifyIcon.png" />
        </div>
      </div>
    </>
  );
}

export default Panel;
