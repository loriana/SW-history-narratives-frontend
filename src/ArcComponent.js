import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'



class ArcComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <Button onClick={this.props.next}>GO</Button>
            </div>
         );
    }
}
 
export default ArcComponent;