import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class Notification extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onShow(e) {
        this.noti.show('message', 'info');
    }

    onHide(e) {
        this.noti.hide();
    }

    render() {
        const notification = (<K.Notification ref={(ref) => { this.noti = ref; }} 
                                                autoHideAfter={0} 
                                                button={true} />);
        const notificationStr = jsxToString(notification, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.Notification'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Notification</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Notification</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button onClick={this.onShow}>Show Notification</button>
                                    <button onClick={this.onHide}>Hide Notification</button>
                                    {notification}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {notificationStr}
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

export default Notification;