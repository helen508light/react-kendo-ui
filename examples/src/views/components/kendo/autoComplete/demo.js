'use strict';

var React = require('react');
var jsxToString = require('jsx-to-string'); 

var AutoCompleteDemo = React.createClass({
    render: function() {
        // Data 조회 URL
        let url = 'http://192.168.233.22:9082/itg/base/searchCodeDataList.do';
        let params = {
            code_grp_id: "REQ_TYPE"
        };

        // AutoComplete 영역 template
        let template = '<span class="order-id">#= CODE_ID #</span> #= CODE_TEXT #';

        // dataTextField input box에 보여지는 Field 컬럼.
        let textField = "CODE_TEXT";

        // Data List Parser.
        let responseKey = {
            list: "gridVO.rows"
        };

        const codeJsx = (<Puf.AutoComplete params={params} template={template} url={url} responseKey={responseKey} textField={textField} />);
        const codeStr = jsxToString(codeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.AutoComplete'
        });

        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">AutoComplete</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            {codeJsx}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {codeStr}
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

module.exports = AutoCompleteDemo;
