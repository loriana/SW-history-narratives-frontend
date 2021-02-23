import React, { Component } from 'react';

import TextDisplay from './TextDisplay';

import Jumbotron from 'react-bootstrap/Jumbotron';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MessageComponent extends Component {

    /**
     *         message={this.state.message}
        next={this.handleNext} disableNext={this.state.next_sha === this.state.current_sha}
        previous={this.handleBack} disablePrevious={this.state.prev_sha === null}
        theory={this.handleTheory} disableTheory={this.state.theory.length === 0}>
     */
    render() { 
        return ( 
            <Jumbotron>
            <Container>
                <Row>
                  <Col sm={9}><TextDisplay text={this.props.message}></TextDisplay></Col>
                  <Col sm={2}>
                    <ButtonGroup vertical>
                      <Button onClick={this.props.next} variant="primary" disabled={this.props.disableNext}>NEEEEXT</Button>
                      <Button onClick={this.props.previous} variant="danger" disabled={this.props.disablePrevious}>PREVIOUS</Button>
                      <Button onClick={this.props.theory} variant="info" disabled={this.props.disableTheory}>THEORY</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
    
              </Container>
    
            </Jumbotron>
         );
    }
}
 
export default MessageComponent;