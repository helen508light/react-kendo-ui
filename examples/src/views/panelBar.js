import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class PanelBar extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        // this.onOpen = this.onOpen.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">PanelBar</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">PanelBar</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.PanelBar>
                                        <K.PanelBarPane title="Item 1" items={['Sub Item 1', 'Sub Item 2', 'Sub Item 3']} />
                                        <K.PanelBarPane id="id-123" title="Item 2">
                                            <div>
                                                <div>content1</div>
                                                <div>content2</div>
                                                <div>content3</div>
                                            </div>
                                        </K.PanelBarPane>
                                        <li>
                                            Item 3
                                            <ul>
                                                <li>Sub Item 1</li>
                                                <li>Sub Item 2</li>
                                                <li>Sub Item 3</li>
                                            </ul>
                                        </li>
                                    </K.PanelBar>
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
                                    <span className="title">PanelBar(Icon)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.PanelBar>
                                        <K.PanelBarPane title="Item 1" items={[
                                            {text: 'Sub Item 1', spriteCssClass: 'folder'},
                                            {text: 'Sub Item 2', spriteCssClass: 'report'},
                                            {text: 'Sub Item 3'} ]} />
                                        <K.PanelBarPane id="id-123" title="Item 2" items={[
                                            {text: 'Icon 1', spriteCssClass: 'folder'},
                                            {text: 'Icon 2', spriteCssClass: 'report'},
                                            {text: 'Icon 3'} ]} />
                                    </K.PanelBar>
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

export default PanelBar;