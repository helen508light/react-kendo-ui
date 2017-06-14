/**
 * Grid component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Grid options={options} />
 *
 * Kendo Grid 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';
 
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    host: PropTypes.string,             // 서버 정보(Cross Browser Access)
    url: PropTypes.string,
    method: PropTypes.string,
    dataType: PropTypes.string,
    checkboxField: PropTypes.string,
    data: PropTypes.object,
    columns: PropTypes.array,
    items: PropTypes.array,
    selectedIds: PropTypes.array,
    listField: PropTypes.string,
    totalField: PropTypes.string,
    checkField: PropTypes.string,
    onSelectRow: PropTypes.func,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    resizable: PropTypes.bool,
    filterable: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    sortable: PropTypes.bool,
    sort: PropTypes.object,             // { field: 'name', dir: 'desc' } or [{ field: 'name', dir: 'desc' }, { field: 'name', dir: 'desc' }]
    pageable: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    pageSize: PropTypes.number,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),

    /*
        Grid selectable 설정값
        "row" - the user can select a single row.
        "cell" - the user can select a single cell.
        "multiple, row" - the user can select multiple rows.
        "multiple, cell" - the user can select multiple cells.
    */
    selectMode: PropTypes.oneOf(['row','cell']), // Grid Select Row 또는 Cell 선택
    multiple: PropTypes.bool,   // 셀렉트 multiple 지원
    /*
        Grid parameterMapField 설정값
        skip: "start", - paging skip 변수 입력된 값(key)으로 복제
        take: "limit", - paging limit 변수 입력된 값(key)으로 복제
        convertSort: true, - sort parameter 복제 여부
        field:"property",  - sort field 변수 입력된 값(key)으로 복제
        dir: "direction",  - sort dir 변수 입력된 값(key)으로 복제
        filtersToJson: true,      - filter 정보를 json으로 변환해서 일반 파라미터 처럼 처리
        filterPrefix: "search_",  - filter json으로 변환시 prefix가 필요한 경우 prefix를 붙여서 반환
        filterFieldToLowerCase: true  - filter의 field를 lowerCase(소문자)로 반환
    */
    parameterMapField: PropTypes.object,  // Parameter Control 객체(데이터 복사, 필터처리, Sorting 파리미터 정의 등)
    scrollable: PropTypes.bool, // 좌우 스크롤 생성
    detailTemplate: PropTypes.string,
    // onChange: PropTypes.func,
    onDataBound: PropTypes.func,
    onDataBinding: PropTypes.func
};

const defaultProps = {
    method: 'POST', 
    dataType: 'json',
    items: [], 
    listField: 'resultValue.list', 
    totalField: 'resultValue.totalCount',
    editable: false,
    resizable: true, 
    filterable: false, 
    sortable: true, 
    pageable: true,
    pageSize: 20, 
    selectMode: null, 
    multiple: false, 
    parameterMapField: null, 
    scrollable: true
};

/** Class representing a Grid. */
class Grid extends Component {
    
    constructor(props) {
        super(props);

        this.checkedIds = {};
        this.checkedItems = {};

        // Manually bind this method to the component instance...
        this.onDataBound = this.onDataBound.bind(this);
        this.onDataBinding = this.onDataBinding.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectRow = this.onSelectRow.bind(this);
        this.onCheckboxHeader = this.onCheckboxHeader.bind(this);
        this.onCheckboxRow = this.onCheckboxRow.bind(this);
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$grid = $('#'+this.id);

        //console.log(this.options(this.props));
        this.grid = this.$grid.kendoGrid(this.options(this.props)).data('kendoGrid');

        /*
        var _this = this;
        $(window).resize(function(){
            //_this.$grid.data("kendoGrid").resize();
            _this.autoResizeGrid();
        });
        */
        // bind click event to the checkbox
        //console.log(grid);
        // Events
        this.grid.bind('change', this.onChange);
        this.grid.bind('dataBound', this.onDataBound);
        this.grid.bind('dataBinding', this.onDataBinding);

        this.grid.table.on('click', '.checkbox' , this.onCheckboxRow);         // checkbox
        this.grid.thead.on('click', '.checkbox' , this.onCheckboxHeader);      // header checkbox

    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        /* dataSource 에 관련된 값이 바뀌어야 다시 데이터 로딩하는 방식은 일단 보류
        화면에서 refresh 가 안됨
        const {url, method, data, listField} = this.props;

        var b = false;
        for(var key in data) {
            if(nextProps.data[key] != data[key]) {
                b = true;
                break;
            }
        }

        if(nextProps.url != url || b == true) {
            //console.log('setDataSource');
            var grid = $('#'+this.id).data("kendoGrid");
            grid.setDataSource(this.createDataSource(nextProps));
        }
        */
        //this.grid.setDataSource(this.createDataSource(nextProps));
        this.checkedIds = {};
        this.grid.thead.find('.checkbox').attr('checked', false);
        // setDataSource 가 일어나면 header checkbox click 이벤트 리스너가 사라져서 다시 설정
        this.grid.thead.on('click', '.checkbox' , this.onCheckboxHeader);      // header checkbox

        // selected check
        this.setSelectedIds(nextProps);
    }

    /**
     * @private
     */
    options(props) {
        const { url, items, editable, resizable, filterable, sortable, pageable, height, checkboxField, selectMode, multiple, scrollable, detailTemplate } = props;

        var dataSource;
        if(url && url.length > 0) {
            dataSource = this.createDataSource(props);
        }else {
            dataSource = items;
        }

        var columns = props.columns;
        if(typeof checkboxField !== 'undefined') {
            var b = true;
            for(var i in columns) {
                if(checkboxField == columns[i].field) {
                    b = false;
                    break;
                }
            }
            if(b === true) {
                columns.unshift(this.getCheckboxColumn(checkboxField));
            }
        }

        var filter;
        if(typeof filterable === 'boolean' && filterable === true) {
            filter = {
                extra: false,
                operators: {
                    string: {
                        contains: 'contains'
                    },
                    number: {
                        eq: 'eq'/*,
                        neq: "Diverso da",
                        gte: "Maggiore o uguale a",
                        gt: "Maggiore di",
                        lte: "Minore o uguale a",
                        lt: "Minore di"*/
                    },
                    date: {
                        eq: 'eq'/*,
                        neq: "Diverso da",
                        gte: "Successiva o uguale al",
                        gt: "Successiva al",
                        lte: "Precedente o uguale al",
                        lt: "Precedente al"*/
                    },
                    enums: {
                        contains: 'contains'
                    }
                },
                ui: function(element) {
                    var $parent = element.parent();
                    while($parent.children().length > 1)
                        $($parent.children()[0]).remove();

                    $parent.prepend('<input type="text" data-bind="value:filters[0].value" class="k-textbox">');
                    $parent.find('button:submit.k-button.k-primary').html($ps_locale.grid.filter);
                    $parent.find('button:reset.k-button').html($ps_locale.grid.reset);
                }
            };
        }else {
            filter = filterable;
        }

        var _pageable;
        if(typeof pageable === 'boolean' && pageable === true) {
            _pageable = {
                buttonCount: 5,
                pageSizes: [10, 20, 30, 50, 100],
                messages: {
                    display: $ps_locale.grid.recordtext,//'{0}-{1}/{2}',
                    empty: '',
                    //of: '/{0}',
                    itemsPerPage: $ps_locale.grid.rowsPerPage
                }
            };
        }else {
            _pageable = pageable;
        }

        var options = {
            dataSource: dataSource,
            columns: columns,
            noRecords: {
                template: $ps_locale.grid.emptyrecords
            },
            height: height,
            //dataBound: this.onDataBound,
            editable: editable,
            resizable: resizable,
            filterable: filter,
            sortable: sortable,
            scrollable: scrollable,
            pageable: _pageable,
            selectable: (multiple) ? "multiple ," + selectMode : selectMode
        };

        if(typeof height === 'number' || typeof height === 'string') {
            $.extend(options, { height: height });
        }

        // detailTemplate
        if(typeof detailTemplate === 'string') {
            $.extend(options, { detailTemplate: detailTemplate });
        }

        return options;
    }

    /**
     * @private
     */
    createDataSource(props) {
        const {host, url, method, dataType, data, listField, totalField, sort, pageable, pageSize, parameterMapField} = props;

        // pageSize
        var _pageSize = 0, _pageable = false;
        if(pageable) {
            _pageSize = pageSize;
            _pageable = true;
        }

        // http://itq.nl/kendo-ui-grid-with-server-paging-filtering-and-sorting-with-mvc3/
        // https://blog.longle.net/2012/04/13/teleriks-html5-kendo-ui-grid-with-server-side-paging-sorting-filtering-with-mvc3-ef4-dynamic-linq/
        var dataSource = new kendo.data.DataSource({
            transport: {
                /*
                read: function(options) {
                    $.ajax({
                        type: method,
                        url: url,
                        //contentType: "application/json; charset=utf-8", 이것 설정하면 data 전송 안됨
                        dataType: 'json',
                        data: data,//JSON.stringify({key: "value"}),
                        success: function(data) {
                            //console.log(data);

                            var arr = [], gridList = data;
                            if(listField && listField.length > 0 && listField != 'null') {
                                arr = listField.split('.');
                            }
                            for(var i in arr) {
                                //console.log(arr[i]);
                                gridList = gridList[arr[i]];
                            }
                            options.success(gridList);
                            //options.success(data.resultValue.list);
                        }
                    });
                }
                */
                read: {
                    url: (host && host !== null && host.length > 0) ? host + url : url,
                    type: method,
                    dataType: dataType,
                    data: data,      // search (@RequestBody GridParam gridParam 로 받는다.)
                    contentType: 'application/json; charset=utf-8'
                },
                parameterMap: function(data, type) {
                    if(type == "read" && parameterMapField !== null){
                    	// 데이터 읽어올때 필요한 데이터(ex:페이지관련)가 있으면 data를 copy한다.
                        for(let copy in parameterMapField){
                            if(typeof parameterMapField[copy] === "string" && ( copy in data )){
                                data[parameterMapField[copy]] = data[copy];
                            }
                        }
                        // Filter Array => Json Object Copy
                        if(parameterMapField.filtersToJson && data.filter && data.filter.filters){
                            let filters = data.filter.filters;
                            filters.map((filter) => {
                                let field = (parameterMapField.filterPrefix) ? parameterMapField.filterPrefix + filter.field : filter.field;
                                if(parameterMapField.filterFieldToLowerCase){
                                    data[field.toLowerCase()] = filter.value;
                                }else{
                                    data[field] = filter.value;
                                }
                            });
                        }
                        // Sort Array => Field, Dir Convert
                        if(parameterMapField.convertSort && data.sort){
                            data.sort.map((sortData) =>{
                                if("field" in parameterMapField){
                                    sortData[parameterMapField.field] = sortData.field;
                                }
                                if("dir" in parameterMapField){
                                    sortData[parameterMapField.dir] = sortData.dir;
                                }
                            });
                        }
                    }

                    //console.log(data);
                    // paging 처리시 서버로 보내지는 그리드 관련 데이터 {take: 20, skip: 0, page: 1, pageSize: 20}
                    // no paging 처리시에는 {} 을 서버로 보낸다.
                    // @RequestBody GridParam gridParam 로 받는다.
                    return JSON.stringify(data);
                }
            },
            schema: {
                // returned in the "listField" field of the response
                data: function(response) {
                    //console.log(response);
                    var arr = [], gridList = response;

                    if(listField && listField.length > 0 && listField != 'null') {
                        arr = listField.split('.');
                    }
                    for(var i in arr) {
                        //console.log(arr[i]);
                        if(!gridList) {
                            gridList = [];
                            break;
                        }
                        gridList = gridList[arr[i]];
                    }
                    return gridList;
                },
                // returned in the "totalField" field of the response
                total: function(response) {
                    //console.log(response);
                    var arr = [], total = response;
                    if(totalField && totalField.length > 0 && totalField != 'null') {
                        arr = totalField.split('.');
                    }
                    for(var i in arr) {
                        //console.log(arr[i]);
                        if(!total) {
                            total = 0;
                            break;
                        }
                        total = total[arr[i]];
                    }
                    return total;
                }
            },
            pageSize: _pageSize,
            serverPaging: _pageable,
            serverFiltering: _pageable,
            serverSorting: _pageable,
            sort: sort
        });

        return dataSource;
    }

    /**
     * @private
     */
    setSelectedIds(props) {
        const {checkField, selectedIds} = props;

        var _selectedIds;
        if(typeof selectedIds !== 'undefined' && selectedIds !== null) {
            _selectedIds = selectedIds;
        }else {
            _selectedIds = this.selectedIds;
        }
        
        if(typeof _selectedIds === 'undefined' || _selectedIds === null) return;

        var rows = this.grid.table.find('tr').find('td:first input').closest('tr'),
            _this = this;

        rows.each(function(index, row) {
            var $checkbox = $(row).find('input:checkbox.checkbox'),
                dataItem = _this.grid.dataItem(row),
                checked = false;

            for(var i=0; i<_selectedIds.length; i++) {

                if(checkField !== null && typeof checkField !== 'undefined') {
                    if(dataItem[checkField] == _selectedIds[i]) {
                        checked = true;
                        break;
                    }

                }else {
                    if($checkbox.val() == _selectedIds[i]) {
                        checked = true;
                        break;
                    }
                }
            }

            $checkbox.attr('checked', checked);
            _this.selectCheckbox($checkbox, checked, $(row));
        });

    }

    /**
     * @private
     */
    selectCheckbox($checkbox, checked, $row) {

        var dataItem = this.grid.dataItem($row);

        if(this.props.checkField !== null && typeof this.props.checkField !== 'undefined') {
            this.checkedIds[dataItem[this.props.checkField]] = checked;
            this.checkedItems[dataItem[this.props.checkField]] = dataItem;
        }else {
            this.checkedIds[$checkbox.val()] = checked;
            this.checkedItems[$checkbox.val()] = dataItem;
        }

        if(checked) {
            //-select the row
            $row.addClass("k-state-selected");
        }else {
            //-remove selection
            $row.removeClass("k-state-selected");
        }
    }

    /**
     * @private
     */
    getCheckboxColumn(checkboxField) {
        return {
            field: checkboxField,
            headerTemplate: '<input type="checkbox" class="checkbox" />',
            //headerTemplate: '<div class="checkbox"><label><input type="checkbox" /></label></div>',
            //headerAttributes: {
            //    'class': 'table-header-cell',
            //    style: 'text-align: center'
            //},
            template: '<input type="checkbox" class="checkbox" value="#=' + checkboxField + '#" />',
            attributes: {
                align: 'center'
            },
            width: 40,
            sortable: false,
            filterable: false,
            resizable: false
        };
    }

    //-----------------------------
    // methods
    /**
     * Refresh
     * @param {boolean} [server=true] - server refresh or not.
     */
    refresh(server = true) {
        //this.grid.refresh();
        this.checkedIds = {};
        // this.checkedItems = {};
        this.selectedIds = [];

        if(server === true) {
            this.grid.setDataSource(this.createDataSource(this.props));

            // header checkbox
            this.grid.thead.find('.checkbox').attr('checked', false);
            // setDataSource 가 일어나면 header checkbox click 이벤트 리스너가 사라져서 다시 설정
            this.grid.thead.on('click', '.checkbox' , this.onCheckboxHeader);
            
        }else {
            this.grid.refresh();
        }

    }

    /**
     * Get dataSource.
     * @return {kendo.data.DataSource} Grid data source.
     */
    getDataSource() {
        return this.grid.dataSource;
    }

    /**
     * The jQuery object which represents the grid content element, which holds the scrollable content. Available only in a grid with locked columns.
     * @return {jQuery} Grid content.
     */
    getContent() {
        return this.grid.content;
    }

    /**
     * Get selected ids.
     * @return {Array} Grid selected ids.
     */
    getSelectedIds() {
        return this.selectedIds;
    }

    /**
     * Get selected items.
     * @return {Array} Grid selected items.
     */
    getSelectedItems() {
        return this.selectedItems;
    }

    /**
     * Get or Set Grid Content Height
     * @param {(string|number)} height - Grid Content Height
     * @return {number} Grid Content Height
     */
    contentHeight(height) {
        if(arguments.length == 0) {
            return this.$grid.find('.k-grid-content').height();
        }else {
            return this.$grid.find('.k-grid-content').height(height);
        }

    }

    /**
     * Get or Set Grid Header Height
     * @param {(string|number)} height - Grid Header Height
     * @return {number} Grid Header Height
     */
    headerHeight(height) {
        if(arguments.length == 0) {
            return this.$grid.find('.k-grid-header').height();
        }else {
            return this.$grid.find('.k-grid-header').height(height);
        }

    }

    /**
     * Returns the data item to which the specified table row is bound. The data item is a Kendo UI Model instance.
     * @param {(String|Element|jQuery)} row - A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.
     * @return {kendo.data.ObservableObject} the data item to which the specified table row is bound. More information about the ObservableObject type...
     */
    dataItem(row) {
        return this.grid.dataItem(row);
    }

    /**
     * Appends a data item to the data source.
     * @param {(object|kendo.data.Model)} dataItem - the data item to which the specified table row is bound. The data item is a Kendo UI Model instance.
     * @return {kendo.data.Model} the data item which is inserted.
     */
    addItem(dataItem) {
        return this.grid.dataSource.add(dataItem);
    }

    /**
     * Removes the specified data item from the data source.
     * @param {(object|kendo.data.Model)} dataItem - the data item to which the specified table row is bound. The data item is a Kendo UI Model instance.
     */
    removeItem(dataItem) {
        this.grid.dataSource.remove(dataItem);

        if(typeof this.props.checkField === 'undefined' || !this.props.checkField) return;
        this.checkedIds[dataItem[this.props.checkField]] = false;

        if(typeof this.selectedIds === 'undefined' || !this.selectedIds) return;
        for(var i=0; i<this.selectedIds.length; i++) {
            if(this.selectedIds[i] === dataItem[this.props.checkField]) {
                this.selectedIds.splice(i, 1);
                this.selectedItems.splice(i, 1);
                return;
            }
        }

    }

    /**
     * Set the data items of the grid's data source.
     * @param {(Array|kendo.data.ObservableArray)} items - the data items of the grid's data source.
     * @return {kendo.data.ObservableArray} the data items of the grid's data source.
     */
    setItems(items) {
        // return this.grid.dataSource.data(items);
        var dataSource = new kendo.data.DataSource({
            data: items
        });
        this.grid.setDataSource(dataSource);
    }

    /**
     * Get the data items of the grid's data source.
     * @return {kendo.data.ObservableArray} the data items of the grid's data source.
     */
    getItems() {
        return this.grid.dataSource.data();
    }

    /**
     * draggable
     */
    draggable() {
        this.grid.content.kendoDraggable({
            filter: 'tr',
            hint: function(element) {
                return element.clone();
            },
        });
    }

    /**
     * drop target
     * @param {(kendo.ui.Widget|function)} widget - Widget or function
     */
    dropTarget(widget) {
        var _this = this, dropFunc;

        // e.draggable/e.dropTarget (jQuery)/e.target Element
        //_dropFunc(e);

        if(typeof widget === 'function') {
            dropFunc = widget;
        }else {
            dropFunc = function(e) {
                var dataItem = widget.dataItem(e.draggable.currentTarget);//dragDataSource.getByUid(e.draggable.currentTarget.data('uid'));
                if(typeof widget.remove === 'function') {
                    widget.remove(e.draggable.currentTarget);
                }
                _this.grid.dataSource.add(dataItem);

                //e.draggable.destroy();
                //e.draggable.element.css('opacity', 0.3);
            }
        }

        this.grid.content.kendoDropTarget({
            dragenter: function(e) {
                e.draggable.hint.css('opacity', 0.7);           //modify the draggable hint
                e.dropTarget.addClass('droptarget-active');     //modify dropTarget element
            },
            dragleave: function(e) {
                e.draggable.hint.css('opacity', 1);             //modify the draggable hint
                e.dropTarget.removeClass('droptarget-active');  //modify dropTarget element

            },
            drop: dropFunc
        });
    }

    /**
     * drag sortable
     */
    dragSortable() {
        this.grid.content.css('cursor', 'move');

        var _this = this;
        this.grid.table.kendoSortable({
            filter: '>tbody >tr',
            cursor: 'move',
            hint: function(element) { //customize the hint
                //var table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
                //    hint;
                //
                //table.append(element.clone()); //append the dragged element
                //table.css('opacity', 0.7);
                //
                //return table; //return the hint element

                var table = _this.grid.table.clone(), // Clone Grid's table
                    wrapperWidth = _this.grid.wrapper.width(), //get Grid's width
                    wrapper = $('<div class="k-grid k-widget"></div>').width(wrapperWidth),
                    hint;

                table.find('thead').remove();                       // Remove Grid's header from the hint
                table.find('tbody').empty();                        // Remove the existing rows from the hint
                table.wrap(wrapper);                                // Wrap the table
                table.append(element.clone().removeAttr('uid'));    // Append the dragged element

                hint = table.parent();                              // Get the wrapper

                return hint;                                        // Return the hint element
            },
            placeholder: function(element) {
                return element.clone().addClass('k-sortable-placeholder');
            },
            container: '#'+this.id+' tbody',
            change: function(e) {
                var oldIndex = e.oldIndex,
                    newIndex = e.newIndex,
                    data = _this.grid.dataSource.data(),
                    dataItem = _this.grid.dataSource.getByUid(e.item.data('uid'));

                _this.grid.dataSource.remove(dataItem);
                _this.grid.dataSource.insert(newIndex, dataItem);
            }
        });
    }

    //-----------------------------
    // events
    /**
     * Fired when the widget is bound to data from its data source.
     * @param {Event} e - event, event data e.sender kendo.ui.Grid
     * @param {kendo.data.ObservableArray} data - the data items of the data source.
     */
    onDataBound(e) {
        //console.log('dataBound', e);

        // selected check
        this.setSelectedIds(this.props);

        if(typeof this.props.onDataBound === 'function') {
            var data = this.grid.dataSource.data();//e.sender.dataSource.data();
            this.props.onDataBound(e, data);
            //event.stopImmediatePropagation();
        }
    }

    /**
     * Fired before the widget binds to its data source.
     * @param {Event} e - event, event data e.sender kendo.ui.Grid
     * @param {kendo.data.ObservableArray} data - the data items of the data source.
     */
    onDataBinding(e) {
        //console.log('onDataBinding', e);
        if(typeof this.props.onDataBinding === 'function') {
            var data = this.grid.dataSource.data();//e.sender.dataSource.data();
            this.props.onDataBinding(e, data);
            //event.stopImmediatePropagation();
        }
    }

    // kendo api는 있는데 실제 해보면 안됨
    //sort: function(field, dir) {
    //    var options = this.grid.options(),
    //        dataSource = options.dataSource;
    //    console.log(dataSource);
    //
    //    dataSource.sort({ field: field, dir: dir }); // dir: asc/desc
    //},
    /*
    * Grid Change Event(Select Event), dataSet으로 정의하여 받는다.
    * rowIndex
    * cellIndex
    * data
    * rows
    */
    onChange() {
        let grid = this.grid;
        if(typeof this.props.onChange === 'function') {
            //var data = event.node;
            let dataSet = {};
            if(this.props.selectMode === "cell"){
                let row = $(grid.select()).closest("tr");
                let cell = grid.select();
                let cellText = $(cell).text();
                dataSet.rowIndex = $("tr", grid.tbody).index(row);
                dataSet.cellIndex = grid.cellIndex(cell);
                dataSet.data = $(cell).text();
            }else{
                let rows = grid.select();

                if(rows.length > 1){
                    let rowsData = [];
                    rows.each(function () {
                        rowsData.push(grid.dataItem($(this)));
                    });
                    dataSet.rows = rows;
                    dataSet.data = rowsData;
                }else{
                    dataSet.rows = rows;
                    dataSet.data = grid.dataItem(rows);
                }
            }
            this.props.onChange(dataSet);
        }
    }

    onSelectRow(event) {

        var ids = [], items = [];
        for(var key in this.checkedIds) {
            if(this.checkedIds[key]) {
                ids.push(key);
                items.push(this.checkedItems[key]);
            }
        }

        this.selectedIds = ids;
        this.selectedItems = items;

        if(typeof this.props.onSelectRow === 'function') {
            this.props.onSelectRow(event, ids, items);
        }
    }

    /**
     * @private
     */
    onCheckboxHeader(event) {
        var checked = $(event.target).is(':checked');

        var rows = this.grid.table.find("tr").find("td:first input").closest("tr"),
            _this = this;

        rows.each(function(index, row) {
            var $checkbox = $(row).find('input:checkbox.checkbox');
            $checkbox.attr('checked', checked);

            _this.selectCheckbox($checkbox, checked, $(row));
        });

        this.onSelectRow(event);
    }

    /**
     * @private
     */
    onCheckboxRow(event) {
        var checked = event.target.checked,
            $row = $(event.target).closest('tr');

        this.selectCheckbox($(event.target), checked, $row);
        this.onSelectRow(event);
    }
    
    //onDataBound: function(arg) {
    //    // selected check
    //    this.setSelectedIds(this.props);
    //},
    
    render() {
        // 필수 항목
        const {className} = this.props;

        return (
            <div id={this.id} className={classNames(className)}></div>
        );
    }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;