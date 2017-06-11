'use strict';

var React = require('react');

var PanelBarDemo = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">PanelBar</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.PanelBar>
                                <Puf.PanelBarPane title="Item 1" items={['Sub Item 1', 'Sub Item 2', 'Sub Item 3']} />
                                <Puf.PanelBarPane id="id-123" title="Item 2">
                                    <div>
                                        <div>content1</div>
                                        <div>content2</div>
                                        <div>content3</div>
                                    </div>
                                </Puf.PanelBarPane>
                                <li>
                                    Item 3
                                    <ul>
                                        <li>Sub Item 1</li>
                                        <li>Sub Item 2</li>
                                        <li>Sub Item 3</li>
                                    </ul>
                                </li>
                            </Puf.PanelBar>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip>'}
                                    {'\n'}
                                    {'\u00A0'}{'<Puf.Tabs>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}{'<Puf.Tab>Tab1</Puf.Tab>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}{'<Puf.Tab>Tab2</Puf.Tab>'}
                                    {'\n'}
                                    {'\u00A0'}{'</Puf.Tabs>'}
                                    {'\n'}
                                    {'\u00A0'}{'<Puf.TabContent>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}Content1
                                    {'\n'}
                                    {'\u00A0'}{'</Puf.TabContent>'}
                                    {'\n'}
                                    {'\u00A0'}{'<Puf.TabContent>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}Content2
                                    {'\n'}
                                    {'\u00A0'}{'</Puf.TabContent>'}
                                    {'\n'}
                                    {'</Puf.TabStrip>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">PanelBar(Icon)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.PanelBar>
                                <Puf.PanelBarPane title="Item 1" items={[
                                    {text: 'Sub Item 1', spriteCssClass: 'folder'},
                                    {text: 'Sub Item 2', spriteCssClass: 'report'},
                                    {text: 'Sub Item 3'} ]} />
                                <Puf.PanelBarPane id="id-123" title="Item 2" items={[
                                    {text: 'Icon 1', spriteCssClass: 'folder'},
                                    {text: 'Icon 2', spriteCssClass: 'report'},
                                    {text: 'Icon 3'} ]} />
                            </Puf.PanelBar>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip>'}
                                    {'\n'}
                                    {'\u00A0'}{'<Puf.Tabs>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}{'<Puf.Tab>Tab1</Puf.Tab>'}
                                    {'\n'}
                                    {'\u00A0\u00A0'}{'<Puf.Tab>Tab2</Puf.Tab>'}
                                    {'\n'}
                                    {'\u00A0'}{'</Puf.Tabs>'}
                                    {'\n'}
                                    {'</Puf.TabStrip>'}
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

module.exports = PanelBarDemo;