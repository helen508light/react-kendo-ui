'use strict';

import React, { Component, PropTypes } from 'react';

import ButtonDropdownDemo from './buttonDropdown/demo';

/** Class representing a ButtonDropdown. */
class ButtonDropdown extends Component {

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">ButtonDropdown</span>
                </div>

                <div className="page-body">
                    <Puf.TabStrip>
                        <Puf.Tabs>
                            <Puf.Tab>DEMO</Puf.Tab>
                            <Puf.Tab>API</Puf.Tab>
                        </Puf.Tabs>
                        <Puf.TabContent>
                            <ButtonDropdownDemo />
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

export default ButtonDropdown;