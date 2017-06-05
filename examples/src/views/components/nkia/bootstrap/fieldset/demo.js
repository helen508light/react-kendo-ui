'use strict';

var React = require('react');

var FieldsetDemo = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Fieldset</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Fieldset legend="검색" collapsible={false} onToggle={this.onToggle}>
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
                                </div>
                            </Puf.Fieldset>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.Fieldset legend="검색" collapsible={false} onToggle={this.onToggle}>\n'}
                                    {'  content\n'}
                                    {'</Puf.Fieldset>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start panel style */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Fieldset</span>
                            <span className="component-class"> className="panel"</span>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-12">
                        <Puf.Fieldset className="panel" legend="검색" collapsible={true} onToggle={this.onToggle}>
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
                            </div>
                        </Puf.Fieldset>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                        expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                            <pre className="prettyprint linenums">
                                {/*'// html\n'*/}
                                {'<Puf.Fieldset className="panel" legend="검색" collapsible={true} onToggle={this.onToggle}>\n'}
                                {'  content\n'}
                                {'</Puf.Fieldset>'}
                            </pre>
                        </Puf.HiddenContent>
                    </div>
                </div>
                </div>{/* end panel style */}
                <div className="vspace-12" />
            </div>
        );
    }
});

module.exports = FieldsetDemo;