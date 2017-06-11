import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class Alert extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onOpen(e) {

    }

    onClose(e) {

    }

    render() {

        const alert = (<K.Alert />);
        const alertStr = jsxToString(alert, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.Alert'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Alert</span>
                </div>

                <div className="page-body">
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
                                    <pre className="prettyprint linenums">
                                        {alertStr}
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

export default Alert;