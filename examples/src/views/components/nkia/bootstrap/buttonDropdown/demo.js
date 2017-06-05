'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a ButtonDropdownDemo. */
class ButtonDropdownDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        // this.onClick = this.onClick.bind(this);       
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">ButtonDropdown</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.ButtonDropdown>
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </Puf.ButtonDropdown>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'// js\n' +
                                    '안형로'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />
            </div>
        );
    }
}

ButtonDropdownDemo.propTypes = propTypes;
ButtonDropdownDemo.defaultProps = defaultProps;

export default ButtonDropdownDemo;