import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util, DateUtil } from '../utils';

/**
 * @typedef {Object} DateRangePicker-Property
 * @property {string} id - 생성될 객체의 ID
 * @property {string} className - css class명
 * @property {string} startName='startDate' - 시작일 필드명
 * @property {string} endName='endDate' - 종료일 필드명
 * @property {string|object} startDate - 시작일 설정
 *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
 *      - object: Date 객체로 설정
 * @property {string|object} endDate - 종료일 설정
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
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    startName: PropTypes.string,
    endName: PropTypes.string,
    startDate: PropTypes.oneOfType([
        PropTypes.string,               
        PropTypes.object                
    ]),
    endDate: PropTypes.oneOfType([
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
    onChange: PropTypes.func
};

const defaultProps = {
    startName: 'startDate', 
    endName: 'endDate',
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
 * <Puf.DateRangePicker name="DateRangePicker" />
 *
 * @desc
 *  Kendo DateRangePicker
 * ============
 *  - From-To날짜 필드
 *  - DatePicker 컴포넌트 기반으로 생성
 *  - timePicker: true로 설정하면 시간 표기 및 설정 가능
 *  - DateRangePicker 프로퍼티 - {@link DateRangePicker-Property}
 * @extends {React.Component}
 *
*/
class DateRangePicker extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 시작일 컴포넌트 인스턴스
        this._startPicker = null;
        // 종료일 컴포넌트 인스턴스
        this._endPicker = null;

        this._onStartInit = this._onStartInit.bind(this);
        this._onEndInit = this._onEndInit.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
    }

    /**
     * 최초 렌더링이 일어난 다음(한번 호출)
     * DatePicker 기반으로 컴포넌트가 구성된다.
     * @private
     */
    componentDidMount() {
        this._startPicker.setMaxValue(this._endPicker.getValue());
        this._endPicker.setMinValue(this._startPicker.getValue());
    }

    /**
     * 시작일 컴포넌트 인스턴스
     * @private
     */
    _onStartInit(component) {
        this._startPicker = component._instance;
    }

    /**
     * 종료일 컴포넌트 인스턴스
     * @private
     */
    _onEndInit(component) {
        this._endPicker = component._instance;
    }

    /**
     * 시작일 값 변경 이벤트
     * onChange props가 구현되어 있다면 시작일, 종료일 값이 전달된다.
     * @param {string|object} date - data value
     */
    onStartChange(date) {
        this._endPicker.setMinValue(date);
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(this.getStartDate(), this.getEndDate());
        }
    }

    /**
     * 종료일 값 변경 이벤트
     * onChange props가 구현되어 있다면 시작일, 종료일 값이 전달된다.
     * @param {string|object} date - data value
     */
    onEndChange(date) {
        this._startPicker.setMaxValue(date);
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(this.getStartDate(), this.getEndDate());
        }
    }

    /**
     * 시작일 날짜 반환
     * @param {boolean} isDate - 리턴에 대한 타입 정의
     * @return {object|string} data value 값
     *      - true: date 객체
     *      - false: date string ex) YYYY-MM-DD HH:mm:ss
     */
    getStartDate(isDate = false) {
        const date = this._startPicker.getValue();
        if(isDate) {
            return date;
        }else {
            return DateUtil.getDateToString(date);
        }
        
    }

     /**
     * 종료일 날짜 반환
     * @param {boolean} isDate - 리턴에 대한 타입 정의
     * @return {object|string} data value 값
     *      - true: date 객체
     *      - false: date string ex) YYYY-MM-DD HH:mm:ss
     */
    getEndDate(isDate = false) {
        const date = this._endPicker.getValue();
        if(isDate) {
            return date;
        }else {
            return DateUtil.getDateToString(date);
        }
    }

    /**
     * 시작일 날짜 설정
     * 날짜가 설정되면 onStartChange Event를 호출한다.
     * @param {object|string} date value 값
     *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
     *      - object: Date 객체로 설정
     */
    setStartDate(date) {
        if(typeof date === 'string' || typeof date.getMonth === 'function') {
            this._startPicker.setValue(date);
            this.onStartChange(date);
        }
    }

    /**
     * 종료일 날짜 설정
     * 날짜가 설정되면 onEndChange Event를 호출한다.
     * @param {object|string} date value 값
     *      - string: YYYY-MM-DD HH:mm:ss으로 포멧 설정
     *      - object: Date 객체로 설정
     */
    setEndDate(date) {
        if(typeof date === 'string' || typeof date.getMonth === 'function') {
            this._endPicker.setValue(date);
            this.onEndChange(date);
        }
    }

    /**
     * 시작일/종료일 컴포넌트를 활성 또는 비활성 설정
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._startPicker.setEnable(isBool);
        this._endPicker.setEnable(isBool);
    }

    /**
     * 시작일/종료일 컴포넌트를 읽기나 편집 모드로 변경
     * @param {boolean} isBool
     */
    setReadOnly(isBool) {
        this._startPicker.setReadOnly(isBool);
        this._endPicker.setReadOnly(isBool);
    }

    /**
     * @private
     */
    render() {
        const { className, startName, endName, timePicker, startDate, endDate, disabled, readOnly } = this.props;

        return (
            <div className="datepicker-group">
                <K.DatePicker className={className} name={startName} value={startDate} initCallback={this._onStartInit} onChange={this.onStartChange}
                                timePicker={timePicker} disabled={disabled} readOnly={readOnly} />{'\u00A0'}
                <K.DatePicker className={className} name={endName} value={endDate} initCallback={this._onEndInit} onChange={this.onEndChange}
                                timePicker={timePicker} disabled={disabled} readOnly={readOnly} />
            </div>
        );
    }
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

export default DateRangePicker;