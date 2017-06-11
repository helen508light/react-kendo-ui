'use strict';

var React = require('react');

var TreeViewDemo = React.createClass({
    onSelectNode: function(event, item) {
        //console.log('TreeMenu: onSelectNode');
        console.log(item);
    },
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">TreeView</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.TreeView url="/demo/data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TreeView url="/demo/data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} />'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start url */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">TreeView(childrenField)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.TreeView url="/demo/data/kendo/tree_childrenField.json" method="GET" childrenField="nodes" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TreeView url="/demo/data/kendo/tree_childrenField.json" method="GET" childrenField="nodes" />'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end url */}
                <div className="vspace-12" />

                <div className="row">{/* start onDemand */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">TreeView(onDemand)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.TreeView url="/demo/data/kendo/tree_onDemand.json" method="GET" onSelect={this.onSelectNode} onDemand={true} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TreeView url="/demo/data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} onDemand={true} />'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end onDemand */}
                <div className="vspace-12" />

                <div className="row">{/* start url */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">TreeView(checkbox)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end url */}
                <div className="vspace-12" />

            </div>
        );
    }
});

module.exports = TreeViewDemo;