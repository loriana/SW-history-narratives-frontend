import React, { Component } from 'react';
import './App.css';
import Tabset from './Tabset';

import {parseDiff, Diff, Hunk, tokenize} from 'react-diff-view';
import 'react-diff-view/style/index.css';

import axios from 'axios';


class App extends Component {
  state = {  
    next_sha: null,
    files: []
  }

  componentDidMount() {

    axios.get('http://localhost:3030/commits')
    .then(response => {
      console.log("IN COMPONENT DID MOUNT")
      console.log(parseDiff(response.data.files))
      this.setState({
        next_sha: response.data.next_sha,
        files: parseDiff(response.data.files)
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
        files: parseDiff(response.data.files)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  

  render() { 
    return (  
      <div className="App"> 
        <button onClick={this.handleNext }>NEEEEXT</button>
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
