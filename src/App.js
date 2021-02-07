import React, { Component } from 'react';
import './App.css';
import Tabset from './Tabset';

import {parseDiff, Diff, Hunk, tokenize} from 'react-diff-view';
import 'react-diff-view/style/index.css';
import refractor from 'refractor';

import axios from 'axios';

/**TODO
 * - request array of files from backend through ajax 
 * - pass this info to Tabset (somehow)
 * - for each file, create a tab with a Diff, by passing a single ChangedFile object to each Tab's Diff
 */

class App extends Component {
  state = {  
    next_sha: null,
    files: [],
    options: {
      highlight: true,
      refractor: refractor,
      //oldSource: oldSource,
      language: 'jsx'
     }

  }

  componentDidMount() {

    axios.get('http://localhost:3030/commits')
    .then(response => {
      console.log("IN COMPONENT DID MOUNT")
      console.log(response)
      this.setState({
        next_sha: response.data.next_sha,
        files: parseDiff(response.data.files),
        options: {
          highlight: true,
          refractor: refractor,
          //oldSource: oldSource,
          language: 'js'
         }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleNext = () => {
    console.log("Call me! Call me any, any time")
    axios.get(`http://localhost:3030/commits/${this.state.next_sha}`)
    .then(response => {
      console.log(response)
      this.setState({
        next_sha: response.data.next_sha,
        files: parseDiff(response.data.files),
        options: {
          highlight: true,
          refractor: refractor,
          //oldSource: oldSource,
          language: 'jsx'
         }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  

  renderToken = (token, defaultRender, i) => {
    switch (token.type) {
        case 'space':
            console.log(token);
            return (
                <span key={i} className="space">
                    {token.children && token.children.map((token, i) => renderToken(token, defaultRender, i))}
                </span>
            );
        default:
            return defaultRender(token, i);
    }
};

options = {
  highlight: true,
  refractor: refractor,
  //oldSource: oldSource,
  language: 'jsx'
 }


  render() { 
    /*return (  
      <div className="App"> 
        <button onClick={this.handleNext }>NEEEEXT</button>
        {
          this.state.files.length > 0?
          <Tabset files={this.state.files}></Tabset>
          :
          <p>Loading ...</p>
        }
    </div>
    ); */

    let { files } = this.state
    return (
      <div className="App">
       {
        files.map(file => 
          <Diff key={file.oldRevision + '-' + file.newRevision} viewType="unified" diffType={file.type} hunks={file.hunks} tokens={tokenize(file.hunks, this.state.options)}></Diff>
       )
       }
      </div>
    );
  }
}
 
export default App;
