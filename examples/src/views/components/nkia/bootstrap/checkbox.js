'use strict';

import React, { Component, PropTypes } from 'react';

import CheckboxDemo from './checkbox/demo';

/** Class representing a Checkbox. */
class Checkbox extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        // this.checkboxChange = this.checkboxChange.bind(this);       
    }
    
    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Checkbox</span>
                </div>

                <div className="page-body">
                    <Puf.TabStrip>
                        <Puf.Tabs>
                            <Puf.Tab>DEMO</Puf.Tab>
                            <Puf.Tab>API</Puf.Tab>
                        </Puf.Tabs>
                        <Puf.TabContent>
                            <CheckboxDemo />
                        </Puf.TabContent>
                        <Puf.TabContent>

                        </Puf.TabContent>
                    </Puf.TabStrip>
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default Checkbox;