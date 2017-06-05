'use strict';

var React = require('react');

var FineUploaderDemo = require('./fineUploader/demo');

var fineUploder = React.createClass({
    render: function() {


        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">FineUploder</span>
                </div>

                <div className="page-body">
                    <Puf.TabStrip>
                        <Puf.Tabs>
                            <Puf.Tab>DEMO</Puf.Tab>
                            <Puf.Tab>API</Puf.Tab>
                        </Puf.Tabs>
                        <Puf.TabContent>
                            <FineUploaderDemo />
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

module.exports = fineUploder;
