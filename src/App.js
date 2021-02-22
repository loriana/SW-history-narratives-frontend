import React, { Component } from 'react';
import './App.css';
import Tabset from './Tabset';
import ArcComponent from './ArcComponent';
import TextDisplay from './TextDisplay';

import { parseDiff, Diff, Hunk, tokenize } from 'react-diff-view';
import 'react-diff-view/style/index.css';

import Jumbotron from 'react-bootstrap/Jumbotron'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import axios from 'axios';

//add pretty progress bar: https://reactjsexample.com/a-library-to-create-stunning-progress-bars-and-steps-in-react/
//or this one with a label: https://www.npmjs.com/package/@ramonak/react-progress-bar
//also check out this one: https://bit.dev/nexxtway/react-rainbow/progress-step

class App extends Component {
  state = {
    first_sha: null,
    type: null,
    next_sha: null,
    current_sha: null,
    prev_sha: null,
    message: null,
    files: [], 
    theory: []
  }



  render() {
  
    if (this.state.type === "arc") {

      return (
        <div className="App">
          <ArcComponent 
          title={this.state.message} 
          description={this.state.files} 
          next={this.handleNext} previous={this.handleBack}
          disableNext={this.state.next_sha === this.state.current_sha}
          disablePrevious={this.state.prev_sha === null}
          ></ArcComponent>
        </div>
      )
    }


//<TextDisplay text={this.state.message}></TextDisplay>
    return (
      <div className="App">
        <Jumbotron>
          <Container>
            <Row>
              <Col sm={9}><TextDisplay text={this.state.message}></TextDisplay></Col>
              <Col sm={2}>
                <ButtonGroup vertical>
                  <Button onClick={this.handleNext} variant="primary" disabled={this.state.next_sha === this.state.current_sha}>NEEEEXT</Button>
                  <Button onClick={this.handleBack} variant="danger" disabled={this.state.prev_sha === null}>PREVIOUS</Button>
                  <Button onClick={this.handleTheory} variant="info" disabled={this.state.theory.length === 0}>THEORY</Button>
                </ButtonGroup>
              </Col>
            </Row>

          </Container>

        </Jumbotron>

        {
          this.state.files.length > 0 ?
            <Tabset key={this.state.current_sha} files={remove_theory(this.state.theory, this.state.files)}></Tabset>
            :
            <p>Loading ...</p>
        }
      </div>
    );

  }





  //is there a theory resource?
  //  if no theory resource, grey out the theory button
  componentDidMount() {

    this.get_first_commit_data()
    
  }

  handleNext = () => {
    console.log("HANDLE NEXT")
    console.log(`Requesting sha: ${this.state.next_sha}`)
    console.log(`Current sha: ${this.state.current_sha}`)
    
    this.get_commit_data(this.state.next_sha)
  }

  handleBack = () => {
    console.log("Handle prev")
    console.log(`Requesting sha: ${this.state.prev_sha}`)
    if (this.state.prev_sha === this.state.first_sha) {

      this.get_first_commit_data()

    } else {
     
      this.get_commit_data(this.state.prev_sha)
    }
    

      console.log("after api call")
      console.log(this.state)
  }

  handleTheory = () => {

    axios.get(`http://localhost:3030/commits/theory/${this.state.current_sha}`)
      .then(response => {
        console.log(response)
        
        display_theory(response.data)

      })
      .catch(error => {
        console.log(error)
      })
    
  }

  get_commit_data(sha) {
    axios.get(`http://localhost:3030/commits/${sha}`)
      .then(response => {
       // console.log(response)
        this.setState({
          first_sha: this.state.first_sha,
          type: response.data.type,
          next_sha: response.data.next_sha,
          current_sha: response.data.current_sha,
          prev_sha: this.state.current_sha,
          message: response.data.message,
          files: response.data.type === "normal" ? parseDiff(response.data.files) : response.data.files, 
          theory: response.data.theory
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  get_first_commit_data() {
    axios.get('http://localhost:3030/commits')
      .then(response => {
        console.log("IN COMPONENT DID MOUNT")
        console.log(response.data)
        this.setState({
          first_sha: response.data.current_sha,
          type:  response.data.type,
          next_sha: response.data.next_sha,
          current_sha: response.data.current_sha,
          prev_sha: null,
          message: response.data.message,
          files: response.data.type === "normal" ? parseDiff(response.data.files) : response.data.files, 
          theory: response.data.theory
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

}










function convert_to_base64(img_data, type) {
  let img = Buffer.from(img_data, 'binary').toString('base64')
  return `data:${type};base64,${img}`;
}



function create_blob_url(img_data, contentType) {
  const base64ImageData = convert_to_base64(img_data, contentType);

const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
const byteArrays = [];

for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
}
const blob = new Blob(byteArrays, {type: contentType});
const blobUrl = URL.createObjectURL(blob);

return blobUrl;
}


function display_theory(theory_array) {
  console.log("THEORY ARRAY")
  console.log(theory_array)

  for (let theory_piece of theory_array) {
    if (theory_piece.type.startsWith("URL")) {
      window.open(theory_piece.file, "_blank")

    } else if (theory_piece.type.startsWith("text/") || theory_piece.type.startsWith("image/")) {
      const blobUrl = create_blob_url(theory_piece.file, theory_piece.type);
      window.open(blobUrl, "_blank")
    }
  }

}

function remove_theory(theory_array, files) {

  let filtered_files = []
  for (let file of files) {
    if (!is_theory(file, theory_array)) {
      filtered_files.push(file)
    }
  }

  return filtered_files
}


/**
 * Returns true if:
 * the given file *doesn't* have a newPath prop (since binaries like images don't),
 * OR it is part of the array of theory paths,
 * OR if it is a file commited as part of an arc commit
 * @param {*} file 
 * @param {*} theory_array 
 */
function is_theory(file, theory_array) {
  if (file.newPath === null || file.newPath === undefined) {
    return true
  }

  return theory_array.includes(file.newPath) ||
    file.newPath.toLowerCase().startsWith("arc")
}



export default App;
