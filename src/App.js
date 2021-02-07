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
    files: []
  }

  componentDidMount() {

    axios.get('http://localhost:3030/commits')
      .then(response => {
        console.log("IN COMPONENT DID MOUNT")
        console.log(parseDiff(response.data.files))
        this.setState({
          next_sha: response.data.next_sha,
          message: response.data.message,
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
          message: response.data.message,
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
                  <Button onClick={this.handleNext} variant="info" >THEORY</Button>
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

export default App;
