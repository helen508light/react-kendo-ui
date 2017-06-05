'use strict';

var React = require('react');

var PanelDemo = require('./panel/demo');

var Panel = React.createClass({
    onInit: function() {
        console.log('Panel onInit');
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Panel</span>
                </div>

                <div className="page-body">
                    <Puf.TabStrip>
                        <Puf.Tabs>
                            <Puf.Tab>DEMO</Puf.Tab>
                            <Puf.Tab>API</Puf.Tab>
                        </Puf.Tabs>
                        <Puf.TabContent>
                            <PanelDemo />
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

module.exports = Panel;