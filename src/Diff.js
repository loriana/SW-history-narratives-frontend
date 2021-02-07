import React, { PureComponent } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
 
const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')
 
if(a > 10) {
  console.log('bar')
}
 
console.log('done')
`;
const newCode = `const a = 10
const boo = 10
 
if(a === 10) {
  console.log('bar')
}`;


/*const oldCode = `// I had a little too much fun playing with composition here
// that I created an ad-hoc DOM abstraction library
// (It's certainly not perfect, but it provides many
// helpers to construct and compose DOM elements)
export function list(listItems, ordered=false) {
    const tag = ordered ? 'ol' : 'ul';
    return container(listItems.map(text => textElement('li', text)), tag);
}

export function setAttributes(element, attributes) {
    for(let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if(typeof(attributes[key]) === 'object') {
            setAttributes(element[key], attributes[key]);
        } else {
            element[key] = attributes[key];
        }
    }
    return element;
}

export function textElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

export function container(elements, tag='div') {
    const container = document.createElement(tag);
    for(let element of elements) {
        container.appendChild(element);
    }
    return container;
}`;
const newCode = `// I had a little too much fun playing with composition here
// that I created an ad-hoc DOM abstraction library
// (It's certainly not perfect, but it provides many
// helpers to construct and compose DOM elements)
export function list(listItems, ordered=false) {
    const tag = ordered ? 'ol' : 'ul';
    return container(listItems.map(
        el => typeof(el) === 'string' ?
            textElement('li', el) :
            container([el], 'li')), tag);
}

export function setAttributes(element, attributes) {
    for(let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if(typeof(attributes[key]) === 'object') {
            setAttributes(element[key], attributes[key]);
        } else {
            element[key] = attributes[key];
        }
    }
    return element;
}

export function textElement(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

export function container(elements, tag='div') {
    const container = document.createElement(tag);
    for(let element of elements) {
        container.appendChild(element);
    }
    return container;
}`; */
 
class Diff extends PureComponent {
    
    highlightSyntax = (str) => {
        if (!str) return;
        return (
          <pre
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(str, Prism.languages.javascript)
            }}
          />
        );
      };
 
  render = () => {
    let { oldCode } = this.props
    let { newCode } = this.props
    return (
      <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={false}
        renderContent={this.highlightSyntax}
        useDarkTheme={false}
        showDiffOnly={false}
        disableWordDiff={true}
        compareMethod={DiffMethod.SENTENCES}
      />
    );
  };
}

export default Diff;