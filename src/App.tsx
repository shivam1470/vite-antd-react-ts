import "./style.less";
import FileManager from "./view/page";

/**
 * This is the main component of the application
 *
 * @returns JSX.Element
 */
function App() {
  return (
    <div style={{ minWidth: "1300px" }}>
      <FileManager />
    </div>
  );
}

export default App;
