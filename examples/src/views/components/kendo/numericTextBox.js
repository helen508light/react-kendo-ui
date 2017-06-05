'use strict';

var React = require('react');

var NumericTextBoxDemo = require('./numericTextBox/demo');

var NumericTextBox = React.createClass({
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">NumericTextBox</span>
                </div>

                <div className="page-body">
                    <Puf.TabStrip>
                        <Puf.Tabs>
                            <Puf.Tab>DEMO</Puf.Tab>
                            <Puf.Tab>API</Puf.Tab>
                        </Puf.Tabs>
                        <Puf.TabContent>
                            <NumericTextBoxDemo />
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
});

module.exports = NumericTextBox;