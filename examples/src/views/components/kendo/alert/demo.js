
import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class AlertDemo extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOpen(e) {

    }

    onClose(e) {

    }

    render() {

        const alert = (<Puf.Alert />);
        const alertStr = jsxToString(alert, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.Alert'
        });

        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Alert</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {alert}
                            <button className="ui button" onClick={this.onOpen}>Open</button>
                            <button className="ui button" onClick={this.onClose}>Close</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {alertStr}
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

export default AlertDemo;