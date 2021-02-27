import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import TextDisplay from './TextDisplay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style/arcComponent.css';


/**  style={{backgroundColor: "#4CAF50", color: "red", borderColor: "#4CAF50"}}*/

class ArcComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="main-container">
                <Container>
                    <Row>
                        <h2 className="title">
                            <span className="html-tags">&lt; </span>
                            { this.props.title.replace("#arc#","").trim() }
                            <span className="html-tags"> /&gt;</span></h2>
                    </Row>
                    
                    <Row>
                        <Col sm={9}><TextDisplay text={this.props.description}></TextDisplay></Col>
                        <Col sm={2}>
                        <ButtonGroup vertical>
                    <Button onClick={this.props.next} disabled={this.props.disableNext} 
                    variant="primary" size="lg">
                        Start
                    </Button>
                    <Button onClick={this.props.previous} disabled={this.props.disablePrevious} 
                    variant="outline-primary" size="lg">
                        Back
                    </Button>
                </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
         );
    }
}

 
export default ArcComponent;