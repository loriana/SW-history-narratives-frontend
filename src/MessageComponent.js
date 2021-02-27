import React, { Component } from 'react';

import TextDisplay from './TextDisplay';

import './messageComponent.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MessageComponent extends Component {

    render() { 
        return ( 
            <div className="message-container">
            <Container>
                <Row>
                  <Col sm={9}>
                    {
                      this.props.arc ? 
                      <Row><h5 className="title">
                            <span className="html-tags">&lt; </span>
                            {this.props.arc.replace("#arc#","").trim()}
                            <span className="html-tags"> /&gt;</span></h5>
                    </Row>
                    :
                    null
                    }
                      <Row><TextDisplay text={this.props.message}></TextDisplay></Row></Col>
                  <Col sm={2}>
                    <ButtonGroup vertical>
                        <ButtonGroup>
                            <Button onClick={this.props.previous} variant="outline-primary" disabled={this.props.disablePrevious}>Back</Button>
                            <Button onClick={this.props.next} variant="primary" disabled={this.props.disableNext}>Next</Button>
                        </ButtonGroup>
                        {
                          this.props.disableTheory?
                          null
                          :
                          <Button onClick={this.props.theory} variant="info">Theory</Button>
                        }
                      
                    </ButtonGroup>
                  </Col>
                </Row>
    
              </Container>
            </div>
         );
    }
}
 
export default MessageComponent;