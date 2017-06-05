'use strict';

var React = require('react');
var jsxToString = require('jsx-to-string'); 

var DropDownListDemo = React.createClass({
    onSelect: function(e, selectedItem, prevSelectedItem) {
        alert('onSelect');
    },

    onChange: function(e, selectedItem, prevSelectedItem) {
        alert('onChange');
    },

    render: function() {
        const items = [
            { text: 'Black', value: '1' },
            { text: 'Orange', value: '2' },
            { text: 'Grey', value: '3' }
        ];

        const codeJsx = (<Puf.DropDownList items={items} width={100} />);
        const codeStr = jsxToString(codeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.DropDownList'
        });

        const eventCodeJsx = (<Puf.DropDownList items={items} width={100} onSelect={this.onSelect} onChange={this.onChange} />);
        const eventCodeStr = jsxToString(eventCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.DropDownList'
        });

        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">DropDownList</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {codeJsx}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {codeStr}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">DropDownList 이벤트 체크</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {eventCodeJsx}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {eventCodeStr}
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

module.exports = DropDownListDemo;