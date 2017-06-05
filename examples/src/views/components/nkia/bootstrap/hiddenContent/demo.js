'use strict';

var React = require('react');

var HiddenContentDemo = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Hidden Content(내용 접기/펼치기)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent id="hiddenContent/anchor" expandLabel="펼치기" collapseLabel="접기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down"
                                            isBottom={true}>
                                <div>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                    내용<br/>
                                </div>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'// js\n' +
                                    '안형로'}
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

module.exports = HiddenContentDemo;