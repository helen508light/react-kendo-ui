'use strict';

var React = require('react');
var jsxToString = require('jsx-to-string');

var NotificationDemo = React.createClass({
    onShow: function(e) {
        this.noti.show('message', 'info');
    },
    onHide: function(e) {
        this.noti.hide();
    },
    render: function() {

        const notification = (<Puf.Notification ref={(ref) => { this.noti = ref; }} 
                                                autoHideAfter={0} 
                                                button={true} />);
        const notificationStr = jsxToString(notification, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.Notification'
        });

        return (
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {notificationStr}
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

module.exports = NotificationDemo;