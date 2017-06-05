'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a ButtonDemo. */
class ButtonDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onClick = this.onClick.bind(this);       
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //this.refs.Btn.enable(false);
    }

    onClick() {
        console.log('Button onClick');
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Button</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Button ref="Btn" onClick={this.onClick} tooltip="버튼버튼버튼툴팁<br>버튼버튼버튼툴팁">버튼</Puf.Button>
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

ButtonDemo.propTypes = propTypes;
ButtonDemo.defaultProps = defaultProps;

export default ButtonDemo;