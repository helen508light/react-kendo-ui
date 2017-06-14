import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

var columns = [
    {
        field:"id",
        filterable: false
    }, {
        field: "invdate",
        title: "Order Date",
        format: "{0:MM/dd/yyyy}"
    }, {
        field: "name",
        title: "Name"
    }, {
        field: "note",
        title: "Note",
        editor: categoryDropDownEditor
    }, {
        field: "amount",
        title: "Amount"
    }, {
        field: "tax",
        title: "Tax",
        template: "<strong>#: tax # </strong><span>33</span>"
    }, {
        field: "total",
        title: "Total"
    }, {
        command: [{
            name: "details",
            click: function(e) {
                // prevent page scroll position change
                e.preventDefault();
                // e.target is the DOM element representing the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
                console.log("Details for: " + data.name);
            }
      }]
    }


];

function categoryDropDownEditor(container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource:  [
                { text: 'Black', value: '1' },
                { text: 'Orange', value: '2' },
                { text: 'Grey', value: '3' }
            ]
        });
}

class Grid extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.refresh = this.refresh.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    onChange(dataSet) {
      //$("#console").text("Selected Row : " + row);
      //$('#console').append("Selected Row : " + JSON.stringify(row) + "</br>").show();
      console.info(dataSet);
      $('#console').append("Selected Data : " + JSON.stringify(dataSet.data) + "</br>").show();
      //kendoConsole.log("Selected Row : " + row);
      //kendoConsole.log("Selected Row Data : " + data);
    }

    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Grid</span>
                </div>
                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Grid(Non Paging)</span>
                                    <span><button onClick={this.refresh}>refresh</button></span>
                                </div>
                                {/*
                                <div className="col-md-11">
                                    <span className="component-class">className="panel"</span>
                                </div>
                                */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.Grid ref="grid" url="/examples/data/kendo/grid_page.json" method="GET" height="250"
                                            listField="resultValue.list" totalField="resultValue.totalCount"
                                            columns={columns} pageable={false} filterable={true} sort={{ field: 'name', dir: 'desc' }} editable={true} />
                                </div>
                            </div>
                            {/* 소스 보기 */}
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"\n'}
                                        {'          listField="resultValue.list" totalField="resultValue.totalCount"\n'}
                                        {'          columns={columns} pageable={false} filterable={true} />'}
                                    </pre>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Grid(Paging, Selected Single-Row)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"
                                            listField="resultValue.list" totalField="resultValue.totalCount"
                                            columns={columns} pageable={true} filterable={false} selectMode="row" onChange={this.onChange} />
                                </div>
                            </div>
                            {/* 소스 보기 */}
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"\n'}
                                        {'          listField="resultValue.list" totalField="resultValue.totalCount"\n'}
                                        {'          columns={columns} pageable={true} filterable={false} selectMode="row" onChange={this.onChange} />'}
                                    </pre>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Grid(Selected Multiple-Row)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"
                                            listField="resultValue.list" totalField="resultValue.totalCount"
                                            columns={columns} pageable={true} filterable={false} selectMode="row" multiple={true} onChange={this.onChange} />
                                </div>
                            </div>
                            {/* 소스 보기 */}
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"\n'}
                                        {'          listField="resultValue.list" totalField="resultValue.totalCount"\n'}
                                        {'          columns={columns} pageable={true} filterable={false} selectMode="row" multiple={true} onChange={this.onChange} />'}
                                    </pre>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Grid(Selected Cell)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <K.Grid url="/examples/data/kendo/grid_page.json" method="GET" height="250"
                                            listField="resultValue.list" totalField="resultValue.totalCount"
                                            columns={columns} pageable={true} filterable={false} selectMode="cell" onChange={this.onChange} />
                                </div>
                            </div>
                            {/* 이벤트 보기 */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="console"></div>
                                </div>
                            </div>
                            {/* 소스 보기 */}
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        // Non Paging
                                        {'\n'}
                                        {'<K.Grid url="./data/grid.json" method="GET" pageable=\{false\} />'}
                                        {'\n'}{'\n'}
                                        // Paging
                                        {'\n'}
                                        {'<K.Grid url="./data/grid.json" method="GET" pageable=\{true\} />'}
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

export default Grid;