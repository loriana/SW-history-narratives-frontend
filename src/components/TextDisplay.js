import React, { Component } from 'react';
import nextId from "react-id-generator";


/**
 * Parses text as html, taking into consideration new lines.
 */

class TextDisplay extends Component {

  /**
   * Creates a piece of html code based on the input text,
   * converting newline characters into <br/> elements.
   * @param {*} text 
   */
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
        <div>
            {this.props.text !== null? this.parse(this.props.text) : ""}
        </div>
         );
    }
}
 
export default TextDisplay;