'use strict';

var React = require('react');
var jsxToString = require('jsx-to-string');

var NumericTextBoxDemo = React.createClass({
    onChange: function(e, value) {
        console.log(e, value);
    },
    render: function() {

        const numericTextBox = (<Puf.NumericTextBox id="numericId" 
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
            displayName: 'Puf.NumericTextBox'
        });

        return (
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {numericTextBoxStr}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />
            </div>
        );
    }
});

module.exports = NumericTextBoxDemo;