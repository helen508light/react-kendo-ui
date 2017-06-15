import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';
import * as K from '../../../src';

class NumericTextBox extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onChange(e, value) {
        console.log(e, value);
    }

    render() {
        const numericTextBox = (<K.NumericTextBox id="numericId" 
                                                    name="numeric" 
                                                    className="numeric-class"
                                                    value={1}
                                                    width={100}
                                                    disabled={false}
                                                    readOnly={false}
                                                    placeholder=""
                                                    format="n0"
                                                    step={1}
                                                    min={-100}
                                                    max={100}
                                                    decimals={null}
                                                    downArrowText=""
                                                    upArrowText=""
                                                    onChange={this.onChange} />);
        const numericTextBoxStr = jsxToString(numericTextBox, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.NumericTextBox'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">NumericTextBox</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">NumericTextBox</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {numericTextBox}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {numericTextBoxStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />
                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default NumericTextBox;