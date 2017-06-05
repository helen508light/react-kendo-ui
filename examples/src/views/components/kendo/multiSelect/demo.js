'use strict';

var React = require('react');

var items = [
    { text: 'Black', value: '1' },
    { text: 'Orange', value: '2' },
    { text: 'Grey', value: '3' }
];

var MultiSelectDemo = React.createClass({
    onSelect: function(e, dataItem, selectedItems) {
        console.log('onSelect', e, dataItem, selectedItems);
    },
    onDeselect: function(e, dataItem) {
        console.log('onDeselect', e);
    },
    onChange: function(e, selectedItems) {
        console.log('onChange', e, selectedItems);
    },
    render: function() {
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
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">MultiSelect</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.MultiSelect items={items} onSelect={this.onSelect} onDeselect={this.onDeselect} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.MultiSelect items={items} />'}
                                </pre>
                            </Puf.HiddenContent>
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
                            <Puf.MultiSelect host={host} url={url} listField={listField} dataTextField={dataTextField} dataValueField={dataValueField} minLength={minLength} parameterMapField={parameterMapField}
                                serverFiltering={serverFiltering} serverPaging={serverPaging} itemTemplate={itemTemplate} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.MultiSelect host={host} url={url} listField={listField} dataTextField={dataTextField} dataValueField={dataValueField} minLength={minLength} parameterMapField={parameterMapField} serverFiltering={serverFiltering} serverPaging={serverPaging} itemTemplate={itemTemplate} />'}
                                </pre>
                            </Puf.HiddenContent>
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end url */}
                <div className="vspace-12" />

            </div>
        );
    }
});

module.exports = MultiSelectDemo;
