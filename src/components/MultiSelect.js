/**
 * MultiSelect component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/08/23
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.MultiSelect options={options} />
 *
 * Kendo MultiSelect 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

const propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    host: PropTypes.string,                 // 서버 정보(Cross Browser Access)
    url: PropTypes.string,
    method: PropTypes.string,
    data: PropTypes.object,
    items: PropTypes.array,
    selectedValues: PropTypes.array,
    placeholder: PropTypes.string,
    listField: PropTypes.string,
    dataTextField: PropTypes.string,
    dataValueField: PropTypes.string,
    multiple: PropTypes.bool,               // 다중선택을 지원하며, 닫히지 않고 여러개를 선택할 수 있다.
    headerTemplate: PropTypes.string,
    itemTemplate: PropTypes.string,
    tagTemplate: PropTypes.string,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onFiltering: PropTypes.func,
    onDataBound: PropTypes.func,
    onLoadComplete: PropTypes.func,
    minLength: PropTypes.number,            // 검색시 필요한 최소 단어 길이
    maxSelectedItems: PropTypes.number,     // 최대 선택 수
    parameterMapField: PropTypes.object,    // Paging, FilterJson
    serverFiltering: PropTypes.bool,        // 서버 Filtering(검색조건에 따른 리스트업)
    filterFields: PropTypes.array           // 필터 필드 정의(or로 다중 검색시 제공)
};

const defaultProps = {
    method: 'POST', 
    items: [], 
    listField: 'resultValue', 
    placeholder: $ps_locale.select, 
    dataTextField: 'text', 
    dataValueField: 'value', 
    multiple: false, 
    minLength: 0, 
    maxSelectedItems: null, 
    serverFiltering: false, 
    filterFields: null,
    disabled: false
};

/** Class representing a MultiSelect. */
class MultiSelect extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onFiltering = this.onFiltering.bind(this);
        this.onDataBound = this.onDataBound.bind(this);
        this.onLoadComplete = this.onLoadComplete.bind(this);
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
        this.$multiSelect = $('#'+this.id);
        this.multiSelect = this.$multiSelect.kendoMultiSelect(this.options()).data('kendoMultiSelect');

        // Events
        this.multiSelect.bind('select', this.onSelect);
        this.multiSelect.bind('deselect', this.onDeselect);
        this.multiSelect.bind('change', this.onChange);
        this.multiSelect.bind('open', this.onOpen);
        this.multiSelect.bind('close', this.onClose);
        this.multiSelect.bind('filtering', this.onFiltering);
        this.multiSelect.bind('dataBound', this.onDataBound);

         // readOnly
        if(typeof this.props.readOnly !== 'undefined') {
            this.readOnly(this.props.readOnly);
        }
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        if(typeof nextProps.selectedValues !== 'undefined') {
            this.multiSelect.value(nextProps.selectedValues);
        }

        if(typeof nextProps.disabled !== 'undefined') {
            this.enable(!nextProps.disabled);
        }

        if(typeof nextProps.readOnly !== 'undefined') {
            this.readOnly(nextProps.readOnly);
        }
    }

    /**
     * @private
     */
    options() {
        const { host, url, data, method, items, selectedValues, placeholder,
                listField, dataTextField, dataValueField,
                headerTemplate, itemTemplate, tagTemplate,
                height, disabled, multiple, minLength, maxSelectedItems,
                parameterMapField, serverFiltering, filterFields } = this.props;

        var options = {
            placeholder: placeholder,
            dataTextField: dataTextField,
            dataValueField: dataValueField,
            enable: !disabled
        };

        // dataSource
        // url
        if(typeof url !== 'undefined') {
            $.extend(options, { dataSource: {
                transport: {
                    read: {
                        url: (host && host !== null && host.length > 0) ? host + url : url,
                        type: method,
                        dataType: 'json',
                        data: data,      // search (@RequestBody GridParam gridParam 로 받는다.)
                        contentType: 'application/json; charset=utf-8'
                    }/*,
                    parameterMap: function(data, type) {
                        if(type == "read" && parameterMapField !== null){
                            // 데이터 읽어올때 필요한 데이터(ex:페이지관련)가 있으면 data를 copy한다.
                            for(let copy in parameterMapField){
                                if(typeof parameterMapField[copy] === "string" && ( copy in data )){
                                    data[parameterMapField[copy]] = data[copy];
                                }
                            }

                            if(parameterMapField.filtersToJson && data.filter && data.filter.filters){
                                // Filter Array => Json Object Copy
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
                        }
                        return JSON.stringify(data);
                    }
                    */
                },
                schema: {
                   // returned in the "listField" field of the response
                   data: function(response) {
                       var listFields = [], dataList = response;
                       if(listField && listField.length > 0 && listField != 'null') {
                           listFields = listField.split('.');
                           listFields.map(
                               (field) => {
                                   dataList = dataList[field];
                               }
                           );
                       }
                       return dataList;
                   }
                },
                serverFiltering: serverFiltering,
                requestEnd: function(e) {
                    var type = e.type,
                        response = e.response;
                    if (type === 'read' && response) {
                        this.onLoadComplete(e, response);
                    }
                }.bind(this)
            } });

        }else {
            $.extend(options, { dataSource: items });
        }

        // selectedValues
        if(typeof selectedValues !== 'undefined') {
            $.extend(options, { value: selectedValues });
        }

        // headerTemplate
        if(typeof headerTemplate !== 'undefined') {
            $.extend(options, { headerTemplate: headerTemplate });
        }

        // itemTemplate
        if(typeof itemTemplate !== 'undefined') {
            $.extend(options, { itemTemplate: itemTemplate });
        }

        // tagTemplate
        if(typeof tagTemplate !== 'undefined') {
            $.extend(options, { tagTemplate: tagTemplate });
        }

        // height
        if(typeof height !== 'undefined') {
            $.extend(options, { height: height });
        }

        // autoClose
        if(multiple) {
            $.extend(options, { autoClose: false });
        }

        // minLength
        if(minLength > 0) {
            $.extend(options, { minLength: minLength });
        }

        // maxSelectedItems
        if(maxSelectedItems !== null){
            $.extend(options, { maxSelectedItems: maxSelectedItems });
        }

        // filter
        if(filterFields !== null && Array.isArray(filterFields)) {
            $.extend(options, { filtering: function (e) {
                if (e.filter) {
                    let fields = filterFields;
                    var value = e.filter.value;

                    let newFields = [];
                    fields.map(field => {
                        newFields.push({
                            field: field,
                            operator: "contains",
                            value: value
                        });
                    });

                    var newFilter = {
                        filters: newFields,
                        logic: "or"
                    };
                    e.sender.dataSource.filter(newFilter);
                    e.preventDefault();
                }
                e.preventDefault();
            } });
        }

        return options;
    }

    //-----------------------------
    // methods
    value(v) {
        if(arguments.length == 0) {
            return this.multiSelect.value();
        }else {
            return this.multiSelect.value(v);
        }
    }

    enable(isBool) {
        if(arguments.length == 0) {
            this.multiSelect.enable();
        }else {
            this.multiSelect.enable(isBool);
        }
    }

    readOnly(isBool) {
        if(arguments.length == 0) {
            this.multiSelect.readonly();
        }else {
            this.multiSelect.readonly(isBool);
        }
    }

    //-----------------------------
    // events
    onSelect(e) {
        var dataItem = this.multiSelect.dataSource.view()[e.item.index()];

        if(typeof this.props.onSelect !== 'undefined') {
            this.props.onSelect(e, dataItem, this.value());
        }
    }

    onDeselect(e) {
        // console.log('multiselect deselect: ', e);
        if(typeof this.props.onDeselect !== 'undefined') {
            this.props.onDeselect(e, e.dataItem);
        }
    }

    onChange(e) {
        //var dataItem = this.multiSelect.dataSource.view()[e.item.index()];

        if(typeof this.props.onChange !== 'undefined') {
            this.props.onChange(e, this.value());
        }
    }

    onOpen(e) {
        if(typeof this.props.onOpen !== 'undefined') {
            this.props.onOpen(e);
        }
    }

    onClose(e) {
        if(typeof this.props.onClose !== 'undefined') {
            this.props.onClose(e);
        }
    }

    onFiltering(e) {
        if(typeof this.props.onFiltering !== 'undefined') {
            this.props.onFiltering(e);
        }
    }

    onDataBound(e) {

        if(typeof this.props.onDataBound !== 'undefined') {
            this.props.onDataBound(e);
        }
    }

    onLoadComplete(e, response) {
        if(typeof this.props.onLoadComplete !== 'undefined') {
            this.props.onLoadComplete(e, response);
        }
    }
    
    render() {
        // 필수 항목
        const { className, name, multiple } = this.props;

        return (
            <select id={this.id} name={name} multiple={multiple} className={classNames(className)}></select>
        );
    }
}

MultiSelect.propTypes = propTypes;
MultiSelect.defaultProps = defaultProps;

export default MultiSelect;