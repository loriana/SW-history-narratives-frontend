import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Diff from './Diff';


//use the map method to map each object to a diff
class Tabset extends Component {

  render() {
    let { files } = this.props

    /*return (

        <Tabs defaultActiveKey={ files[0].current_path }>
        {
          files.map(file => 
          <Tab  key={file.current_path} eventKey={file.current_path} title={file.current_path}>
            <div key={file.current_path} className="tab-item-wrapper">
              <Diff key={file.current_path} oldCode={file.previous} newCode={file.current}></Diff>
            </div>
          </Tab>)
        }
      </Tabs>

    );*/
    return (

      <Tabs>
      {
        files.map(file => 
        <Tab  key={file.current_path} eventKey={file.current_path} title={file.current_path}>
          <div key={file.current_path} className="tab-item-wrapper">
            <Diff key={file.current_path} oldCode={file.previous} newCode={file.current}></Diff>
          </div>
        </Tab>)
      }
      </Tabs>
    );
  }
}

export default Tabset;



/**
 * PREVIOUS
 *
 * return (
            <div className="tab-wrapper">
              <div className='container-fluid' >
                <div className="row">
                  <div className="col-sm-12">


                  <Tabs defaultActiveKey="profile">
                      <Tab eventKey="home" title="index.js">
                        <div className="tab-item-wrapper">
                          <Diff></Diff>
                        </div>
                      </Tab>

                      <Tab eventKey="contact" title="same_thing.js">
                        <div className="tab-item-wrapper">
                          <Diff></Diff>
                        </div>
                      </Tab>
                    </Tabs>

                  </div>
                </div>
              </div>
            </div>
          );
 */