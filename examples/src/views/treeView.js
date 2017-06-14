import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class TreeView extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onSelectNode = this.onSelectNode.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onSelectNode(event, item) {
        //console.log('TreeMenu: onSelectNode');
        console.log(item);
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">TreeView</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">TreeView</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.TreeView url="./data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TreeView url="./data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} />'}
                                    </pre>
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
                                    <K.TreeView url="./data/kendo/tree_childrenField.json" method="GET" childrenField="nodes" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TreeView url="./data/kendo/tree_childrenField.json" method="GET" childrenField="nodes" />'}
                                    </pre>
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
                                    <K.TreeView url="./data/kendo/tree_onDemand.json" method="GET" onSelect={this.onSelectNode} onDemand={true} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TreeView url="./data/kendo/tree.json" method="GET" onSelect={this.onSelectNode} onDemand={true} />'}
                                    </pre>
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
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TreeView>'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end url */}
                        <div className="vspace-12" />

                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default TreeView;