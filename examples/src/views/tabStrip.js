import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class TabStrip extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onSelect(e) {
        console.log('tab event: ', e);
        console.log(e.item.id);
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Tabs</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Tab</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.TabStrip onSelect={this.onSelect}>
                                        <K.Tabs>
                                            <K.Tab id="tab1">Tab1</K.Tab>
                                            <K.Tab id="tab2">Tab2</K.Tab>
                                        </K.Tabs>
                                        <K.TabContent>
                                            하하
                                        </K.TabContent>
                                        <K.TabContent>
                                            호호
                                        </K.TabContent>
                                    </K.TabStrip>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TabStrip>'}
                                        {'\n'}
                                        {'\u00A0'}{'<K.Tabs>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}{'<K.Tab>Tab1</K.Tab>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}{'<K.Tab>Tab2</K.Tab>'}
                                        {'\n'}
                                        {'\u00A0'}{'</K.Tabs>'}
                                        {'\n'}
                                        {'\u00A0'}{'<K.TabContent>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}Content1
                                        {'\n'}
                                        {'\u00A0'}{'</K.TabContent>'}
                                        {'\n'}
                                        {'\u00A0'}{'<K.TabContent>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}Content2
                                        {'\n'}
                                        {'\u00A0'}{'</K.TabContent>'}
                                        {'\n'}
                                        {'</K.TabStrip>'}
                                    </pre>
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
                                    <K.TabStrip contentUrls={["./src/views/tabcontents/tabcontent1.html",
                                                                "./src/views/tabcontents/tabcontent2.html",
                                                                "./src/views/tabcontents/tabcontent3.html"]}>
                                        <K.Tabs>
                                            <K.Tab>Tab1</K.Tab>
                                            <K.Tab>Tab2</K.Tab>
                                            <K.Tab>Tab3</K.Tab>
                                        </K.Tabs>
                                    </K.TabStrip>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TabStrip contentUrls={["./tabcontent1.html",\n'}
                                        {'                            "./tabcontent2.html"]}>'}
                                        {'\n'}
                                        {'\u00A0'}{'<K.Tabs>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}{'<K.Tab>Tab1</K.Tab>'}
                                        {'\n'}
                                        {'\u00A0\u00A0'}{'<K.Tab>Tab2</K.Tab>'}
                                        {'\n'}
                                        {'\u00A0'}{'</K.Tabs>'}
                                        {'\n'}
                                        {'</K.TabStrip>'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />

                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default TabStrip;