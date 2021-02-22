import React, { Component } from 'react';
import nextId from "react-id-generator";

class TextDisplay extends Component {

    parse(text) {
        console.log(`text: ${text}`)
        let text_lines = text.split("\n")
        
        return (<p>
          {
          text_lines.map(line => {
            return (
              <span key={nextId()}>{line}<br key={nextId()}/></span>
            )
          }
        )
        }
        </p>)
    }
    
    

    render() { 
        return ( 
        <div>{this.props.text !== null? this.parse(this.props.text) : ""}</div>
         );
    }
}
 
export default TextDisplay;