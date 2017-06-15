import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';
import * as K from '../../../src';

var items = [
    { text: 'Black', value: '1' },
    { text: 'Orange', value: '2' },
    { text: 'Grey', value: '3' }
];

class MultiSelect extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onSelect(e, dataItem, selectedItems) {
        console.log('onSelect', e, dataItem, selectedItems);
    }

    onDeselect(e, dataItem) {
        console.log('onDeselect', e);
    }

    onChange(e, selectedItems) {
        console.log('onChange', e, selectedItems);
    }

    render() {
        let host = "http://192.168.233.22:9082";
        let url = '/itg/system/user/searchUserList.do';
        // Data List Parser.
        let listField = "gridVO.rows";

        let dataTextField = "USER_NM";
        let dataValueField = "USER_ID";

        let minLength = 2;

        let serverFiltering = true;

        let serverPaging= true;

        let parameterMapField = {skip: "start", take: "limit", filterPrefix: "search_", filtersToJson: true, filterFieldToLowerCase: true};

        let itemTemplate = '<span class="order-id">#= USER_ID # -</span> #= USER_NM #';

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">MultiSelect</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">MultiSelect</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.MultiSelect items={items} onSelect={this.onSelect} onDeselect={this.onDeselect} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.MultiSelect items={items} />'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />

                        <div className="row">{/* start url */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">MultiSelect(url), 2자 이상 검색어를 입력하세요(ex:test)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.MultiSelect host={host} url={url} listField={listField} dataTextField={dataTextField} dataValueField={dataValueField} minLength={minLength} parameterMapField={parameterMapField}
                                        serverFiltering={serverFiltering} serverPaging={serverPaging} itemTemplate={itemTemplate} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.MultiSelect host={host} url={url} listField={listField} dataTextField={dataTextField} dataValueField={dataValueField} minLength={minLength} parameterMapField={parameterMapField} serverFiltering={serverFiltering} serverPaging={serverPaging} itemTemplate={itemTemplate} />'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end url */}
                        <div className="vspace-12" />

                        <div className="row">{/* start url */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">MultiSelect(template)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.MultiSelect>'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end url */}
                        <div className="vspace-12" />

                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default MultiSelect;