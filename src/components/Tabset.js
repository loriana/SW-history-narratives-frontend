import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Diff, tokenize } from 'react-diff-view';
import 'react-diff-view/style/index.css';
import refractor from 'refractor';

/**
 * Creates and displays a set of tabs based on files associated with a commit.
 * Each tab shows a unified diff view of a file.
 * The tab name is the file's path in the repository.
 */

class Tabset extends Component {

  renderToken = (token, defaultRender, i) => {
    switch (token.type) {
      case 'space':
        console.log(token);
        return (
          <span key={i} className="space">
            {token.children && token.children.map((token, i) => this.renderToken(token, defaultRender, i))}
          </span>
        );
      default:
        return defaultRender(token, i);
    }
  };

  /**
   * Customizes displaying options based on coding language.
   * Uses the file's extension to determine the coding language.
   * @param {*} file 
   */
  customize_options(file) {
    let file_path = file.newPath.split('.')
    let extension = file_path[file_path.length - 1]

    let options = {
      highlight: true,
      refractor: refractor,
      language: extension
    }
    return options
  }

  /**
   * Filters the array of files belonging to a commit, so that only files that can be displayed as a diff remain.
   * Basically, those are code or text files.
   * @param {*} files 
   */
  filter_files(files) {
    let filtered_files = []
    for (let file of files) {
      let check = is_supported_extension(file.hunks, this.customize_options(file))
      if (check.supported) {
        filtered_files.push({
          file: file,
          check: check
        })
      }
    }
    return filtered_files
  }


  render() {
    let { files } = this.props
    let filtered_files = this.filter_files(files)

    return (

      <Tabs defaultActiveKey={filtered_files[0].file.newPath}>
        {
          filtered_files.map(item => {

            let file = item.file
            let check = item.check

            if (check.supported) {

              return (
                <Tab key={file.newPath} eventKey={file.newPath} title={file.newPath}>
                  <div key={file.newPath} className="tab-item-wrapper">
                    <Diff
                      key={file.oldRevision + '-' + file.newRevision}
                      viewType="unified" diffType={file.type}
                      hunks={file.hunks}
                      tokens={check.tokens}></Diff>
                  </div>
                </Tab>

              );
            }
            return null;
          })
        }
      </Tabs>
    );
  }
}


/**
 * Checks if the commited files has a supported extension that allows for it to be displayed in a diff tab.
 * If the file is not a code file but for example an image file,
 * calling tokenize() will give an error, which will then be caught.
 * The file is then ignored.
 * @param {*} hunks 
 * @param {*} options 
 */
function is_supported_extension(hunks, options) {
  let supported = true;
  let tokens;
  try {
    tokens = tokenize(hunks, options)
  } catch (error) { //read explanation below
    //this error is could happen without anything wrong going on
    //the code automatically parses commited files presuming they are code files
    //if a commit has a file that is not code (like an image), then this error happens and is caught
    //and the file isn't displayed in a diff tab
    supported = false;
    tokens = null;
    //console.log(error); 
  }
  return {
    supported: supported,
    tokens: tokens,
  };
}

export default Tabset;


