import React, { Component } from 'react';
import './App.css';
import Tabset from './Tabset';

import { parseDiff, Diff, Hunk, tokenize } from 'react-diff-view';
import 'react-diff-view/style/index.css';

import Jumbotron from 'react-bootstrap/Jumbotron'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ProgressBar from "@ramonak/react-progress-bar";

import axios from 'axios';

//add pretty progress bar: https://reactjsexample.com/a-library-to-create-stunning-progress-bars-and-steps-in-react/
//or this one with a label: https://www.npmjs.com/package/@ramonak/react-progress-bar

class App extends Component {
  state = {
    next_sha: null,
    message: null,
    files: [], 
    theory: null
  }


  //is there a theory resource?
  //  if yes, is it a url? --> check if url valid --> if not valid grey out theory button
  //  if no theory resource, grey out the theory button
  componentDidMount() {

    axios.get('http://localhost:3030/commits')
      .then(response => {
        console.log("IN COMPONENT DID MOUNT")
        console.log(response.data)
        this.setState({
          next_sha: response.data.next_sha,
          message: response.data.message,
          files: parseDiff(response.data.files), 
          theory: response.data.theory
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
          message: response.data.message,
          files: parseDiff(response.data.files), 
          theory: response.data.theory
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  

  //check whether theory ressource is a url or a document and render accordingly
  handleTheory = () => {
    console.log("Handle theory called")
    console.log(this.state.theory)
    /*if (this.valid_URL(this.state.theory)) {*/
      console.log("Inside valid URL")
      let newPageUrl = "https://www.youtube.com/watch?v=BrQKM_uaZKE"
      window.open(newPageUrl, "_blank")
    /*} else {
      console.log("Inside else")
      let newWindow = window.open();
      newWindow.document.write(this.state.theory)
    }*/

    

const blobUrl = create_blob_url(this.state.theory.file, this.state.theory.type);
      window.open(blobUrl, "_blank") 
    
    
  }



  render() {
  
    return (
      <div className="App">
        <ProgressBar
          completed={60}
          bgcolor="#6a1b9a"
          baseBgColor="#e0e0de"
          margin="10px"
        />
        <Jumbotron>
          <Container>
            <Row>
              <Col sm={9}><p>{this.state.message}</p></Col>
              <Col sm={2}>
                <ButtonGroup vertical>
                  <Button onClick={this.handleNext} variant="primary">NEEEEXT</Button>
                  <Button onClick={this.handleTheory} variant="info" >THEORY</Button>
                </ButtonGroup>
              </Col>
            </Row>

          </Container>

        </Jumbotron>

        {
          this.state.files.length > 0 ?
            <Tabset files={this.state.files}></Tabset>
            :
            <p>Loading ...</p>
        }
      </div>
    );

  }
}


function convert_to_base64(img_data, type) {
  console.log(img_data)
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

export default App;
