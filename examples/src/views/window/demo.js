
import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class WindowDemo extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        // this.onClick = this.onClick.bind(this);
    }

    render() {

        const window = (<Puf.Window>
                            <div>하하</div>
                        </Puf.Window>);
        const windowStr = jsxToString(window, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.Window'
        });

        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Window</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {window}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {windowStr}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

            </div>
        );
    }
}

export default WindowDemo;