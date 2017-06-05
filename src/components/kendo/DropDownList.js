import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../utils';

/**
 * @typedef {Object} DropDownList-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} name - 필드명
 * @property {string} value - 필드 값 설정
 * @property {string|number} width='100%' - 컴포넌트 width 값
 * @property {boolean} readOnly=false - 필드 readonly 설정
 * @property {boolean} disabled=false - 컴포넌트 활성 / 비활성
 * @property {string} className - css class명.
 * @property {string} url - 서버와 통신하는 URL
 * @property {string} method='POST' - 서버 요청시 사용되는 http method.
 * @property {object} params - 서버로 보내는 파라미터 정보
 * @property {object} responseKey - 서버 응답에 대한 데이터 추출 키
 *    - 서버 응답 결과에 대해 List 데이터를 추출하는 키입니다.
 *      ```
 *      responseKey: {
 *          list: 'response.list',
 *      }
 *      ```
 * @property {array} items=[] - 데이터 셋, 서버와의 통신이 아닌 직접 데이터를 생성
 * @property {string} textField='text' - data에서 text로 표시되는 field
 * @property {string} valueField='value' - data에서 value로 표시는 field
 * @property {number} initIndex=0 - 초기 DropDownList 선택되는 Index 설정
 * @property {string} template - 화면에 표시되는 템플릿(HTML태그)
 * @property {string} headerTemplate - dropdownlist 헤더의 템플릿
 * @property {string} valueTemplate - dropdownlist 값의 템플릿
 * @property {string} filter='startswith' - 필터 scope 정의
 * @property {boolean} serverFiltering=false - 서버 Filtering 적용 여부
 * @property {function} onSelect - 컴포넌트 Item을 선택할 때 발생되는 이벤트
 * @property {function} onChange - 컴포넌트의 값이 변경 될 때 발생되는 이벤트
 * @property {function} onClose - 컴포넌트의 상태가 open 될 때 발생되는 이벤트
 * @property {function} onOpen - 컴포넌트의 상태가 close 될 때 발생되는 이벤트
 * @property {function} onFiltering - filtering 이벤트
 * @property {function} onDataBound - data bound 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    url: PropTypes.string,
    method: PropTypes.string,
    params: PropTypes.object,
    responseKey: PropTypes.object,
    items: PropTypes.array,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    initIndex: PropTypes.number,
    template: PropTypes.string,
    headerTemplate: PropTypes.string,
    valueTemplate: PropTypes.string,
    filter: PropTypes.string,
    serverFiltering: PropTypes.bool, 
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onFiltering: PropTypes.func,
    onDataBound: PropTypes.func,
    onLoadComplete: PropTypes.func
};

const defaultProps = {
    width: '100%', 
    readOnly: false,
    disabled: false,
    method: 'POST', 
    responseKey: {
        list: null
    },
    items: [], 
    textField: 'text', 
    valueField: 'value', 
    initIndex: 0, 
    serverFiltering: false
};

/**
 *  
 * @example
 * <Puf.DropDownList name="DropDownList" />
 *
 * @desc
 *  Kendo DropDownList
 * ============
 *  - DropDownList(셀렉트) 필드
 *  - DropDownList 프로퍼티 - {@link DropDownList-Property}
 * @extends {React.Component}
 *
*/
class DropDownList extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$dropDownList = null;
        // 컴포넌트
        this._dropDownList = null;
        // 이전에 선택된 Item
        this._prevSelectedItem = null;

        // 이벤트 바인드
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onFiltering = this.onFiltering.bind(this);
        this.onDataBound = this.onDataBound.bind(this);
        this.onLoadComplete = this.onLoadComplete.bind(this);
    }

    /**
     * 최초 렌더링이 일어난 다음(한번 호출)
     * @private
     */
    componentDidMount() {
        // 컴포넌트 생성
        this._createComponent();      
    }

    /**
     * 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
     * @private
     */
    componentWillReceiveProps(nextProps) {
        if(typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
            this.setValue(nextProps.value);
        }

        // disabled
        if(typeof nextProps.disabled !== 'undefined' && nextProps.disabled !== this.props.disabled) {
            this.setEnable(!nextProps.disabled);
        }

        // readOnly
        if(typeof nextProps.readOnly !== 'undefined' && nextProps.readOnly !== this.props.readOnly) {
            this.setReadOnly(nextProps.readOnly);
        }
    }
    
    /**
     * 컴포넌트 제약 조건
     * @private
     */
    static get _CONST() {
        return {
            _DATA_TYPE: 'json',
            _CONTENT_TYPE: 'application/json; charset=utf-8'
        }
    }

    /**
     * 컴포넌트 생성
     * @private
     */
    _createComponent(){
        const { readOnly } = this.props;

    	this._$dropDownList = $('#'+this._id);
        this._dropdownlist = this._$dropDownList.kendoDropDownList(this._configuration()).data('kendoDropDownList');

        // prevSelectedItem 설정(ajax 요청시 처리는 onLoadComplete)
        // init 시 dataItem 값을 읽어오는지 확인필요
        this._prevSelectedItem = this._dropdownlist.dataItem();
        
        this.setReadOnly(readOnly);

        // Event Bind
        this._bindEvent();
    }
    
    /**
     * 컴포넌트 설정
     * @private
     */
    _configuration() {
        const { initIndex, value, textField, valueField, headerTemplate, valueTemplate, template, disabled, filter } = this.props;
        const dataSource = this._dataSource();

        let configuration = {
            dataSource,
            index: initIndex,
            dataTextField: textField,
            dataValueField: valueField,
            enable: !disabled
        };

        // value
        if(value !== undefined) {
            $.extend(configuration, { value });
        }

        // headerTemplate
        if(headerTemplate !== undefined) {
            $.extend(configuration, { headerTemplate });
        }

        // valueTemplate
        if(valueTemplate !== undefined) {
            $.extend(configuration, { valueTemplate });
        }

        // template
        if(template !== undefined) {
            $.extend(configuration, { template });
        }

        // filter
        if(filter !== undefined) {
            $.extend(configuration, { filter });
        }

        return configuration;
    }

    /**
     * DataSource 생성
     * @private
     */
    _dataSource() {
        const { url, method, items, params, responseKey, serverFiltering } = this.props;

        let dataSource;
        if(url) {
            dataSource = new kendo.data.DataSource({
                serverFiltering,
                transport: {
                    read: {
                        url: url,
                        type: method,
                        data: params,      
                        dataType: DropDownList._CONST._DATA_TYPE,
                        contentType: DropDownList._CONST._CONTENT_TYPE
                    },
                    parameterMap: function(data, type) {
                        return JSON.stringify(data);
                    }
                },
                schema: {
                    data: function(response) {
                        if(responseKey && responseKey.list) {
                            response = KendoUtil.setResponseKey(response, responseKey.list);
                        }
                        return response;
                    }
                },
                requestEnd: function(e) {
                    const type = e.type;
                    const response = e.response;
                    if (type === 'read' && response) {
                        this.onLoadComplete(e, response);
                    }
                }.bind(this),
            });
        }else {
            dataSource = items;
        }
        return dataSource;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onSelect, onChange, onOpen, onClose, onFiltering, onDataBound } = this.props;

        if(typeof onSelect === 'function') {
            this._dropdownlist.bind('select', this.onSelect);
        }

        if(typeof onChange === 'function') {
            this._dropdownlist.bind('change', this.onChange);
        }

        if(typeof onOpen === 'function') {
            this._dropdownlist.bind('open', this.onOpen);
        }

        if(typeof onClose === 'function') {
            this._dropdownlist.bind('close', this.onClose);
        }

        if(typeof onFiltering === 'function') {
            this._dropdownlist.bind('filtering', this.onFiltering);
        }

        if(typeof onDataBound === 'function') {
            this._dropdownlist.bind('dataBound', this.onDataBound);
        }
    }

    /**
     * 컴포넌트 Select Event이며 onSelect props가 구현되어 있다면 전달된다.
     *      - 목록에서 Item을 선택하면 발생되며, 이후에 선택이 완료되면 onChange 이벤트로 전달된다.
     *      - this.props.onSelect(e, selectedItem, this._prevSelectedItem) 전달
     * @param {object} e - 이벤트
     */
    onSelect(e) {
    	if(typeof this.props.onSelect === 'function') {
            const selectedItem = this._dropdownlist.dataItem(e.item);
            this.props.onSelect(e, selectedItem, this._prevSelectedItem);
        }
    }

    /**
     * 컴포넌트 Change Event이며 onChange props가 구현되어 있다면 전달된다.
     *      - 목록에서 Item을 선택이 완료되면 발생한다.
     *      - this.props.onChange(e, selectedItem, this._prevSelectedItem) 전달
     * @param {object} e - 이벤트
     */
    onChange(e) {
        const selectedItem = this._dropdownlist.dataItem(e.sender.selectedIndex);
    	if(typeof this.props.onChange === 'function') {
            this.props.onChange(e, selectedItem, this._prevSelectedItem);
        }
        // 이전 선택 Item으로 설정
        this._prevSelectedItem = selectedItem;
    }

    /**
     * DropDownList Open Event이며 onOpen props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onOpen(e) {
    	if(typeof this.props.onOpen === 'function') {
            this.props.onOpen(e);
        }
    }

    /**
     * DropDownList Close Event이며 onClose props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onClose(e) {
    	if(typeof this.props.onClose === 'function') {
            this.props.onClose(e);
        }
    }
    
    /**
     * DropDownList Filtering Event이며 onFiltering props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onFiltering(e) {
        if(typeof this.props.onFiltering !== 'undefined') {
            this.props.onFiltering(e);
        }
    }
    
    /**
     * DropDownList DataBound Event이며 onDataBound props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onDataBound(e) {
    	if(typeof this.props.onDataBound === 'function') {
            this.props.onDataBound(e);
        }
    }

    /**
     * 서버의 Response가 끝나면 발생되는 이벤트이며 onLoadComplete props가 구현되어 있다면 전달된다.
     *      - this.props.onLoadComplete(e, response) 전달
     * @param {object} e - 이벤트
     * @param {object} response - 서버 response
     */
    onLoadComplete(e, response) {
        this._prevSelectedItem = response[this.props.selectedIndex];
        if(typeof this.props.onLoadComplete !== 'undefined') {
            this.props.onLoadComplete(e, response);
        }
    }

    /**
     * 컴포넌트 리턴
     * @return {object} DropDownList 컴포넌트 반환.
     */
    getComponent() {
        return this._dropdownlist;
    }

    /**
     * 컴포넌트 Dom 리턴
     * @return {object} DropDownList Dom 반환
     */
    getComponentDom() {
        return this._$dropdownlist;
    }

    /**
     * 컴포넌트 열기
     */
    open() {
        this._dropdownlist.open();
    }

    /**
     * 컴포넌트 닫기
     */
    close() {
        this._dropdownlist.close();
    }

    /**
     * Index값에 의해 목록에서 선택해주는 기능
     * @param {number} index 선택될 인덱스 값
     */
    setSelectedByIndex(index) {
        this._dropdownlist.select(index);
    }

    /**
     * 컴포넌트 값 반환
     * @return {string} - 필드 값 반환
     */
    getValue() {
        return this._dropdownlist.value();    
    }

     /**
     * 컴포넌트 값 설정
     * @param {string|object} value - 필드 값 설정
     */
    setValue(value) {
        this._dropdownlist.value(value);
    }

    /**
     * 컴포넌트를 활성/비활성 해주는 기능
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._dropdownlist.enable(isBool);
    }

    /**
     * 컴포넌트를 읽기나 편집 모드로 변경해주는 기능
     * @param {boolean} isBool
     */
    setReadOnly(isBool) {
        this._dropdownlist.readonly(isBool);
    }

    /**
     * DropDownList 목록 설정
     * @param {array} items 데이터셋
     */
    setItems(items) {
        this._dropdownlist.dataSource.data(items);
    }

    /**
     * DropDownList 목록 가져오기
     * @return {array} DropDownList 목록 반환
     */
    getItems() {
        return this._dropdownlist.dataSource.data();
    }

    /**
     * @private
     */
    render() {
        const {className, name, width} = this.props;
        const inputStyle = {
            width
        };
        return (
        	<input id={this._id} name={name} className={classNames(className)} style={inputStyle} />
        );
    }
}

DropDownList.propTypes = propTypes;
DropDownList.defaultProps = defaultProps;

export default DropDownList;