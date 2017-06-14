import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

/**
 * @typedef {Object} NumericTextBox-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} name - 필드명
 * @property {string} className - css class명.
 * @property {string} value=1 - 필드 값 설정
 * @property {string|number} width='100%' - 컴포넌트 width 값
 * @property {boolean} disabled=false - 컴포넌트 활성 / 비활성
 * @property {boolean} readOnly=false - 필드 readonly 설정
 * @property {string} placeholder - 필드에 값이 비어 있을 때 표기되는 text
 * @property {string} format='n0' - 입력한 숫자 형식
 *    - 숫자 형식은 kendo에서 제공하는 형식 사용
 *      http://docs.telerik.com/kendo-ui/framework/globalization/numberformatting
 * 
 * @property {number} step=1 - 증가 또는 감소하는 값
 * @property {number} min - 설정할 수 있는 가장 작은 값
 * @property {number} max - 설정할 수 있는 가장 큰 값
 * @property {number} decimals - 표현하고자 하는 소수자리
 * @property {string} downArrowText - decrease 버튼의 툴팁
 * @property {string} upArrowText - increase 버튼의 툴팁
 * @property {function} onChange - 컴포넌트의 값이 변경 될 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    decimals: PropTypes.number,
    downArrowText: PropTypes.string,
    upArrowText: PropTypes.string,
    onChange: PropTypes.func
};

const defaultProps = {
    value: 1, 
    width: '100%',
    disabled: false,
    readOnly: false,
    format: 'n0',
    step: 1,
    downArrowText: '', 
    upArrowText: ''
};

/**
 *  
 * @example
 * <Puf.NumericTextBox name="numericTextBox" />
 *
 * @desc
 *  Kendo NumericTextBox
 * ============
 *  - 숫자 입력을 위한 컴포넌트
 *  - NumericTextBox 프로퍼티 - {@link NumericTextBox-Property}
 * @extends {React.Component}
 *
*/
class NumericTextBox extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$numericTextBox = null;
        // 컴포넌트
        this._numericTextBox = null;

        // 이벤트 바인드
        this.onChange = this.onChange.bind(this);
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
        const { disabled, readOnly } = this.props;

    	this._$numericTextBox = $('#' + this._id);
        this._numericTextBox = this._$numericTextBox.kendoNumericTextBox(this._configuration()).data('kendoNumericTextBox');

        this.setEnable(!disabled);
        this.setReadOnly(readOnly);

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { value, format, step, min, max, decimals, placeholder, downArrowText, upArrowText } = this.props;

        let configuration = {
            value: value,
            format: format,
            step: step,
            downArrowText: downArrowText,
            upArrowText: upArrowText
        };

        // min
        if(typeof min !== 'undefined') {
            $.extend(configuration, { min: min });
        }

        // max
        if(typeof max !== 'undefined') {
            $.extend(configuration, { max: max });
        }

        // decimals
        if(typeof decimals !== 'undefined') {
            $.extend(configuration, { decimals: decimals });
        }

        // placeholder
        if(typeof placeholder !== 'undefined') {
            $.extend(configuration, { placeholder: placeholder });
        }

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onChange } = this.props;

        if(typeof onChange === 'function') {
            this._numericTextBox.bind('change', this.onChange);
            this._numericTextBox.bind('spin', this.onChange);
        }
    }

    /**
     * 컴포넌트 Change Event이며 onChange props가 구현되어 있다면 전달된다.
     *      - 값이 변경되면 발생한다.
     *      - this.props.onChange(e, value) 전달
     * @param {object} e - 이벤트
     */
    onChange(e) {
        if(typeof this.props.onChange !== 'undefined') {
            this.props.onChange(e, this.getValue());
        }
    }

    /**
     * 컴포넌트 값 반환
     * @return {number} - 필드 값 반환
     */
    getValue() {
        return this._numericTextBox.value();    
    }

     /**
     * 컴포넌트 값 설정
     * @param {string|number} value - 필드 값 설정
     */
    setValue(value) {
        this._numericTextBox.value(value);
    }

    /**
     * 컴포넌트의 활성/비활성 여부 반환
     * @return {boolean} - 활성(true)/비활성(false) 반환
     */
    getEnable() {
        return this._numericTextBox.enable();
    }

    /**
     * 컴포넌트를 활성/비활성 해주는 기능
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._numericTextBox.enable(isBool);
    }

    /**
     * 컴포넌트의 읽기전용 여부 반환
     * @return {boolean} - 읽기전용이면 true 아니면 false 반환
     */
    getReadOnly() {
        return this._numericTextBox.readonly();
    }

    /**
     * 컴포넌트를 읽기나 편집 모드로 변경해주는 기능
     * @param {boolean} isBool
     */
    setReadOnly(isBool) {
        this._numericTextBox.readonly(isBool);
    }
    
    /**
     * @private
     */
    render() {
        // 필수 항목
        const { name, className, width } = this.props;
        const inputStyle = {
            width
        };
        
        return (
            <input id={this._id} name={name} className={classNames(className)} style={inputStyle} />
        );
    }
}

NumericTextBox.propTypes = propTypes;
NumericTextBox.defaultProps = defaultProps;

export default NumericTextBox;