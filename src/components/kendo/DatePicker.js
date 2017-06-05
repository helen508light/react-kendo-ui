import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util, DateUtil } from '../../utils';

/**
 * @typedef {Object} DatePicker-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string} name - 필드명
 * @property {number|string} width - 컴포넌트 width 값
 * @property {string|object} value - 필드 값 설정
 *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
 *      - object: Date 객체로 설정
 * @property {string|object} minValue - 필드 최소 값 설정
 *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
 *      - object: Date 객체로 설정
 * @property {string|object} maxValue - 필드 최대 값 설정
 *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
 *      - object: Date 객체로 설정
 * @property {boolean} nowDate=true - 현재일 설정
 * @property {boolean} timePicker=false - 시간(시분) picker 표기
 * @property {string} dateFormat='yyyy-MM-dd' - 년월일에 대한 Format 설정
 * @property {string} timeFormat='HH:mm' - 시간에 대한 Format 설정
 * @property {number} minInterval=5 - 분 단위 설정
 * @property {boolean} disabled=false - 컴포넌트 활성 / 비활성
 * @property {boolean} readOnly=false - 필드 readonly 설정
 * @property {string} locale='ko_KR' - 국제화 리소스 설정
 * @property {function} onChange - change 이벤트
 * @property {function} onOpen - open 이벤트
 * @property {function} onClose - close 이벤트
 * @property {function} initCallback - 초기 렌더링 완료 후에 콜백 처리
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    minValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    maxValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    nowDate: PropTypes.bool,
    timePicker: PropTypes.bool,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    minInterval: PropTypes.number,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    locale: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    initCallback: PropTypes.func
};

const defaultProps = {
    nowDate: true,
    timePicker: false,
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm',
    readOnly: false,
    disabled: false,
    minInterval: 5,
    locale: "ko-KR"
};

/**
 *  
 * @example
 * <Puf.DatePicker name="DatePicker" />
 *
 * @desc
 *  Kendo DatePicker
 * ============
 *  - 날짜 필드
 *  - timePicker: true로 설정하면 시간 표기 및 설정 가능
 *  - DatePicker 프로퍼티 - {@link DatePicker-Property}
 * @todo Date, Time Format 설정에 대한 resouce locale 필요
 * @extends {React.Component}
 *
*/
class DatePicker extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$datePicker = null;
        // 컴포넌트
        this._datePicker = null;

        // 이벤트 바인드
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
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
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        const { timePicker, readOnly, disabled, initCallback } = this.props;

        this._$datePicker = $('#' + this._id);
        if(timePicker) {
            this._datePicker = this._$datePicker.kendoDateTimePicker(this._configuration()).data('kendoDateTimePicker');
        }else {
            this._datePicker = this._$datePicker.kendoDatePicker(this._configuration()).data('kendoDatePicker');
        }

        this.setEnable(!disabled);
        this.setReadOnly(readOnly);

        // DateRangePicker에서 사용되며, 최초 렌더링 시에 datepicker 컴포넌트에 대한 리턴
        if(typeof initCallback === 'function') {
            let component = {
                _instance: this._getInstance(),
                _datePicker: this.getComponent(),
                _$datePicker: this.getComponentDom()
            };
            initCallback(component);
        }

        // Event Bind
        this._bindEvent();
    }

    /**
     * 컴포넌트 설정
     * @private
     */
    _configuration() {
        const {value, nowDate, timePicker, dateFormat, timeFormat, timeInterval, minValue, maxValue, locale} = this.props;

        // 최초 render시에 value 값 설정
        let dateValue;
        if(value === undefined) {
            if(nowDate){
                dateValue = new Date();
            }
        }else if(typeof value === 'string' || typeof value.getMonth === 'function') {
            dateValue = value;
        }

        let configuration = {
            value: dateValue,
            format: (timePicker) ? dateFormat + ' ' + timeFormat : dateFormat,
            culture: locale
        };

        // 시분 Picker
        if(timePicker) {
            $.extend(configuration, {
                timeFormat,
                interval: timeInterval
            });
        }

        // 최소 값
        if(minValue !== undefined) {
            $.extend(configuration, {min: minValue});
        }

        // 최대 값
        if(maxValue !== undefined) {
            $.extend(configuration, {max: maxValue});
        }
        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onChange, onOpen, onClose } = this.props;

        if(typeof onChange === 'function') {
            this._datePicker.bind('change', this.onChange);
        }

        if(typeof onOpen === 'function') {
            this._datePicker.bind('open', this.onOpen);
        }

        if(typeof onClose === 'function') {
            this._datePicker.bind('close', this.onClose);
        }
    }

    /**
     * 인스턴스(객체) 반환 
     * @private
     * @return {object} DatePicker 인스턴스(객체) 반환.
     */
    _getInstance() {
        return this;
    }
  
    /**
     * 컴포넌트 Change Event이며 onChange가 props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onChange(e) {
        if(typeof this.props.onChange === 'function') {
            var date = this.getValue();
            this.props.onChange(date);
        }
    }

    /**
     * Picker Open Event이며 onOpen props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onOpen(e) {
        if(typeof this.props.onOpen === 'function') {
            this.props.onOpen(e);
        }
    }

    /**
     * Picker Close Event이며 onClose props가 구현되어 있다면 전달된다.
     * @param {object} e - 이벤트
     */
    onClose(e) {
        if(typeof this.props.onClose === 'function') {
            this.props.onClose(e);
        }
    }

    /**
     * 컴포넌트 리턴
     * @return {object} DatePicker 컴포넌트 반환.
     */
    getComponent(){
        return this._datePicker;
    }

    /**
     * 컴포넌트 Dom 리턴
     * @return {object} DatePicker Dom 반환
     */
    getComponentDom(){
        return this._$datePicker;
    }

    /**
     * 컴포넌트 열기
     */
    open() {
        this._datePicker.open();
    }

    /**
     * 컴포넌트 닫기
     */
    close() {
        this._datePicker.close();
    }

    /**
     * 컴포넌트 값 반환
     * @return {string} - 값(포멧: 'YYYY-MM-DD HH:MM') 반환
     */
    getValue() {
        const value = this._datePicker.value();
        return DateUtil.getDateToString(value);    
    }

    /**
     * 컴포넌트 값 설정
     * @param {string|object} value - 필드 값 설정
     *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
     *      - object: Date 객체로 설정
     */
    setValue(value) {
        this._datePicker.value(value);
    }

    /**
     * 컴포넌트 최소값 설정
     * @param {string|object} value - 필드 최소값 설정
     *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
     *      - object: Date 객체로 설정
     */
    setMinValue(value) {
        this._datePicker.min(value);
    }

    /**
     * 컴포넌트 최대값 설정
     * @param {string|object} value - 필드 최대값 설정
     *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
     *      - object: Date 객체로 설정
     */
    setMaxValue(value) {
        this._datePicker.max(value);
    }

    /**
     * 컴포넌트를 활성/비활성 해주는 기능
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._datePicker.enable(isBool);
    }

    /**
     * 컴포넌트를 읽기나 편집 모드로 변경해주는 기능
     * @param {boolean} isBool
     */
    setReadOnly(isBool) {
        this._datePicker.readonly(isBool);
    }
    
    /**
     * @private
     */
    render() {
        const { name, className, width } = this.props;
        const inputStyle = {
            width
        };
        return (
            <input id={this._id} name={name} className={classNames(className)} style={inputStyle} />
        );
    }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;