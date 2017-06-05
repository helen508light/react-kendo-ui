'use strict';

var React = require('react');

var PanelDemo = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Panel</span>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Panel>
                                <Puf.PanelHeader>Panel Title</Puf.PanelHeader>
                                <Puf.PanelBody>Panel Body</Puf.PanelBody>
                                <Puf.PanelFooter>Panel Footer</Puf.PanelFooter>
                            </Puf.Panel>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.Panel>\n'}
                                    {'  <Puf.PanelHeader>Panel Title</Puf.PanelHeader>\n'}
                                    {'  <Puf.PanelBody>Panel Body</Puf.PanelBody>\n'}
                                    {'  <Puf.PanelFooter>Panel Footer</Puf.PanelFooter>\n'}
                                    {'</Puf.Panel>'}
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

module.exports = PanelDemo;