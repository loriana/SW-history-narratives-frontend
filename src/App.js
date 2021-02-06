import React, { Component } from 'react';
import './App.css';
import Tabset from './Tabset';

import axios from 'axios';

/**TODO
 * - request array of files from backend through ajax 
 * - pass this info to Tabset (somehow)
 * - for each file, create a tab with a Diff, by passing a single ChangedFile object to each Tab's Diff
 */

class App extends Component {
  state = {  
    files:[]
  }

  componentDidMount() {
    axios.get('http://localhost:3030/commits')
    .then(response => {
      console.log(response)
      this.setState({files: response.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() { 
    return (  
      <div className="App">
        {
          this.state.files.length > 0?
          <Tabset files={this.state.files}></Tabset>
          :
          <p>Loading ...</p>
        }
    </div>
    );
  }
}
 
export default App;
