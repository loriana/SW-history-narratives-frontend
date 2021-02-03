import './App.css';
import Tabset from './Tabset';

/**TODO
 * - request array of files from backend through ajax 
 * - pass this info to Tabset (somehow)
 * - for each file, create a tab with a Diff, by passing a single ChangedFile object to each Tab's Diff
 */
function App() {
  return (
    <div className="App">
      <Tabset></Tabset>
    </div>
  );
}

export default App;
