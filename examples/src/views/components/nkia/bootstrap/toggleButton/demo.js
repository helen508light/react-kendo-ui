'use strict';

var React = require('react');

var ToggleButtonDemo = React.createClass({
    onClick: function(e, toggled, value) {
        console.log(e);
    },
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">ToggleButton</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.ToggleButton onClick={this.onClick}>Toggle 버튼</Puf.ToggleButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'<Puf.ToggleButton onClick={this.onClick}>Toggle 버튼</Puf.ToggleButton>'}
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

module.exports = ToggleButtonDemo;