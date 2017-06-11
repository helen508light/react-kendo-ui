'use strict';

var React = require('react');

var Validation = React.createClass({
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();

        $("#validationForm").kendoValidator({
            rules: {
                custom: function(input) {
                    if (input.is('[name=username]')) {
                        return input.val() === 'Tom';
                    }
                    return true;
                },
                dataMessage: function(input) {
                    if (input.is('[name=dataMsg]')) {
                        return input.val() === 'data';
                    }
                    return true;
                }
            },
            messages: {
                custom: 'Tom 을 입력하세요',
                required: '필수항목 입니다.',
                email: 'Email 형식으로 입력하세요',
                dataMessage: function(input) {
                    return getMessage(input);
                }
            }
        });

        function getMessage(input) {
            return input.data("message");
        }
    },
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Validation</span>
                </div>

                <div className="page-body">
                    <div className="row">{/* start default */}
                        <div className="row">
                            <div className="col-md-12">
                                <span className="component-title">validation 체크</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form id="validationForm" className="form-horizontal" action="demo_form.do" method="get">
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">User Name</label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" name="username" placeholder="input user name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">Email</label>
                                        <div className="col-md-10">
                                            <input type="email" className="form-control" name="email1" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">Password</label>
                                        <div className="col-md-10">
                                            <input type="password" className="form-control" name="pwd" placeholder="Password" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-2 control-label">data message</label>
                                        <div className="col-md-10">
                                            <input type="text" name="dataMsg" data-message="data-message 속성의 메시지" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-offset-2 col-md-10">
                                            <button type="submit" className="btn btn-default">submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                    <Puf.TabStrip>
                                        <Puf.Tabs>
                                            <Puf.Tab>JSX 코드</Puf.Tab>
                                        </Puf.Tabs>
                                        <Puf.TabContent>
                                            <pre className="prettyprint linenums">
                                                {'// js\n' +
                                                '안형로'}
                                            </pre>
                                        </Puf.TabContent>
                                    </Puf.TabStrip>
                                </Puf.HiddenContent>
                            </div>
                        </div>
                    </div>{/* end default */}
                    <div className="vspace-12" />
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = Validation;