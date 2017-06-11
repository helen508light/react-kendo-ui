import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class AutoComplete extends Component {
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

        const codeJsx = (<K.AutoComplete params={params} template={template} url={url} responseKey={responseKey} textField={textField} />);
        const codeStr = jsxToString(codeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.AutoComplete'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">AutoComplete</span>
                </div>

                <div className="page-body">
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
                                    <pre className="prettyprint linenums">
                                        {codeStr}
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

export default AutoComplete;