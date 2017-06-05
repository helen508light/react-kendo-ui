import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../utils';

/**
 * @typedef {Object} Slider-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string} value=0 - 필드 값 설정
 * @property {string|number} width='100%' - 컴포넌트 width 값
 * @property {boolean} disabled=false - 컴포넌트 활성 / 비활성
 * @property {number} min=0 - 설정할 수 있는 가장 작은 값
 * @property {number} max=10 - 설정할 수 있는 가장 큰 값
 * @property {string} orientation='horizontal' - 컴포넌트의 방향설정 (horizontal, vertical)
 * @property {string} dragHandleTitle='drag' - Slider의 드래그 핸들 타이틀
 * @property {boolean} showButtons=true - Slider의 증가/감소 버튼 show/hide
 * @property {number} largeStep=5 - 증가 또는 감소하는 큰 단위의 값
 * @property {number} smallStep=1 - 증가 또는 감소하는 작은 단위의 값
 * @property {string} tickPlacement='both' - Slider의 tick 마크 위치 (topLeft, bottomRight, both, none)
 *     - topLeft: tick 마크가 Slider의 orientation 이 horizontal 인 경우 top, vertical 인 경우 left 위치
 *     - bottomRight: tick 마크가 Slider의 orientation 이 horizontal 인 경우 bottom, vertical 인 경우 right 위치
 *     - both: tick 마크가 Slider의 양쪽 모두 위치
 *     - none: tick 마크가 보이지 않음
 * 
 * @property {boolean} tooltipEnabled=true - Slider의 tooltip enable(true)/disable(false)
 * @property {string} tooltipFormat='{0:#,#.##}' - Slider의 tooltip의 텍스트 포맷
 * @property {string} tooltipTemplate - Slider의 tooltip의 템플릿
 * @property {function} onChange - 컴포넌트의 값이 변경 될 때 발생되는 이벤트
 * @property {function} onSlide - 사용자가 새로운 포지션으로 드래그할 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.number,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    orientation: PropTypes.oneOf(['horizontal','vertical']).isRequired,
    dragHandleTitle: PropTypes.string,
    showButtons: PropTypes.bool,
    largeStep: PropTypes.number,
    smallStep: PropTypes.number,
    tickPlacement: PropTypes.oneOf(['topLeft','bottomRight','both','none']).isRequired,
    tooltipEnabled: PropTypes.bool,
    tooltipFormat: PropTypes.string,
    tooltipTemplate: PropTypes.string,
    onChange: PropTypes.func,
    onSlide: PropTypes.func
};

const defaultProps = {
    value: 0,
    width: '100%',
    disabled: false,
    min: 0,
    max: 10,
    orientation: 'horizontal',
    dragHandleTitle: 'drag',
    showButtons: true,
    largeStep: 5,
    smallStep: 1,
    tickPlacement: 'both',
    tooltipEnabled: true,
    tooltipFormat: '{0:#,#.##}'
};

/**
 *  
 * @example
 * <Puf.Slider value={3} />
 *
 * @desc
 *  Kendo Slider
 * ============
 *  - Slider 컴포넌트
 *  - Slider 프로퍼티 - {@link Slider-Property}
 * @extends {React.Component}
 *
*/
class Slider extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);
        
        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$slider = null;
        // 컴포넌트
        this._slider = null;

        // 이벤트 바인드
        this.onChange = this.onChange.bind(this);
        this.onSlide = this.onSlide.bind(this);
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
        // disabled
        if(typeof nextProps.disabled !== 'undefined' && nextProps.disabled !== this.props.disabled) {
            this.setEnable(!nextProps.disabled);
        }
    }

    /**
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        const { disabled } = this.props;

        this._$slider = $('#' + this._id);
        this._slider = this._$slider.kendoSlider(this._configuration()).data('kendoSlider');

        this.setEnable(!disabled);
        
        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { value, min, max, orientation, dragHandleTitle, showButtons, largeStep, smallStep, tickPlacement, tooltipEnabled, tooltipFormat, tooltipTemplate } = this.props;

        var configuration = {
            value: value,
            min: min,
            max: max,
            orientation: orientation,
            dragHandleTitle: dragHandleTitle,
            showButtons: showButtons,
            largeStep: largeStep,
            smallStep: smallStep,
            tickPlacement: tickPlacement,
            tooltip: {
                enabled: tooltipEnabled,
                format: tooltipFormat
            }
        };

        // tooltip template
        if(typeof tooltipTemplate === 'string') {
            $.extend(true, configuration, { tooltip: { template: tooltipTemplate } });
        }

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onChange, onSlide } = this.props;

        if(typeof onChange === 'function') {
            this._slider.bind('change', this.onChange);
        }

        if(typeof onSlide === 'function') {
            this._slider.bind('slide', this.onSlide);
        }
    }

    /**
     * 컴포넌트 Change Event이며 onChange props가 구현되어 있다면 전달된다.
     *      - 값이 변경되면 발생한다.
     *      - this.props.onChange(e, value) 전달
     * @param {object} e - 이벤트
     */
    onChange(e) {
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(e, e.value);
            //e.stopImmediatePropagation();
        }
    }

    /**
     * 컴포넌트 Slide Event이며 onSlide props가 구현되어 있다면 전달된다.
     *      - 드래그할 때 발생한다.
     *      - this.props.onSlide(e, value) 전달
     * @param {object} e - 이벤트
     */
    onSlide(e) {
        if(typeof this.props.onSlide === 'function') {
            this.props.onSlide(e, e.value);
            //e.stopImmediatePropagation();
        }
    }

    /**
     * 컴포넌트 값 반환
     * @return {number} - 값 반환
     */
    getValue() {
        return this._slider.value();
    }

     /**
     * 컴포넌트 값 설정
     * @param {number} value - 값 설정
     */
    setValue(value) {
        this._slider.value(value);
    }

    /**
     * 컴포넌트의 활성/비활성 여부 반환
     * @return {boolean} - 활성(true)/비활성(false) 반환
     */
    getEnable() {
        return this._slider.enable();
    }

    /**
     * 컴포넌트를 활성/비활성 해주는 기능
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._slider.enable(isBool);
    }
    
    /**
     * 컴포넌트 width 값 설정
     * @param {number|string} value - width 값 설정
     */
    setWidth(value) {
        let width = '0px';
        if(typeof value === 'number') {
            width = value + 'px';
        }else if(typeof value === 'string') {
            width = value;
        }

        this._slider.wrapper.css('width', width);
        this._slider.resize();
    }

    /**
     * 컴포넌트 Max 값 반환
     * @return {number} - Max 값 반환
     */
    getMax() {
        return this._slider.max();
    }

    /**
     * 컴포넌트 max 값 설정
     * @param {number|string} value - max 값 설정
     */
    setMax(value) {
        this._$slider.prev().find('a').attr('aria-valuemax', value);
        // this._slider.max(value);
    }

    /**
     * 컴포넌트 Min 값 반환
     * @return {number} - Min 값 반환
     */
    getMin() {
        return this._slider.min();
    }

    /**
     * 컴포넌트 min 값 설정
     * @param {number|string} value - min 값 설정
     */
    setMin(value) {
        this._$slider.prev().find('a').attr('aria-valuemin', value);
        // this._slider.min(value);
    }

    /**
     * DOM 에서 Slider 제거
     */
    destroy() {
        var wrapper = this._slider.wrapper,
            element = this._slider.element;

        this._slider.destroy();
        wrapper.before(element.show());
        wrapper.remove();

        // this._slider.destroy();
        // this._$slider.closest('.k-slider').remove();
    }

    /**
     * Slider 생성
     */
    create(_configuration) {
        var configuration = this._configuration();
        $.extend(true, configuration, _configuration);
        this._slider = this._$slider.kendoSlider(configuration).data('kendoSlider');

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    render() {
        // 필수 항목
        const { className, width } = this.props;
        const inputStyle = {
            width
        };

        return (
            <input id={this._id} className={classNames(className)} style={inputStyle} />
        );
    }
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;