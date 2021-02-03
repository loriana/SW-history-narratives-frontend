import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Diff from './Diff';

class Tabset extends Component {
  render() {
    return (

      <Tabs defaultActiveKey="code_1">
        <Tab eventKey="code_1" title="index.js">
          <div className="tab-item-wrapper">
            <Diff></Diff>
          </div>
        </Tab>

        <Tab eventKey="code_2" title="same_thing.js">
          <div className="tab-item-wrapper">
            <Diff></Diff>
          </div>
        </Tab>
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