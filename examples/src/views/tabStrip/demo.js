'use strict';

var React = require('react');

var TabStripDemo = React.createClass({
    onSelect: function(e) {
        console.log('tab event: ', e);
        console.log(e.item.id);
    },
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Tab</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.TabStrip onSelect={this.onSelect}>
                                <Puf.Tabs>
                                    <Puf.Tab id="tab1">Tab1</Puf.Tab>
                                    <Puf.Tab id="tab2">Tab2</Puf.Tab>
                                </Puf.Tabs>
                                <Puf.TabContent>
                                    하하
                                </Puf.TabContent>
                                <Puf.TabContent>
                                    호호
                                </Puf.TabContent>
                            </Puf.TabStrip>
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
                            <span className="title">Tab(Loading content with AJAX)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.TabStrip contentUrls={["./src/views/components/kendo/tabStrip/tabcontents/tabcontent1.html",
                                                        "./src/views/components/kendo/tabStrip/tabcontents/tabcontent2.html",
                                                        "./src/views/components/kendo/tabStrip/tabcontents/tabcontent3.html"]}>
                                <Puf.Tabs>
                                    <Puf.Tab>Tab1</Puf.Tab>
                                    <Puf.Tab>Tab2</Puf.Tab>
                                    <Puf.Tab>Tab3</Puf.Tab>
                                </Puf.Tabs>
                            </Puf.TabStrip>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip contentUrls={["./tabcontent1.html",\n'}
                                    {'                            "./tabcontent2.html"]}>'}
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

module.exports = TabStripDemo;