import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

/**
 * @typedef {Object} ProgressBar-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string} type='value' - ProgressBar 표시할 타입 지정 (value, percent, chunk)
 * @property {number} value=0 - 값 설정
 * @property {number|boolean|object} animation={duration:600} - 애니메이션 설정
 * @property {boolean} disabled=false - 컴포넌트 활성 / 비활성
 * @property {number} min=0 - 설정할 수 있는 가장 작은 값
 * @property {number} max=100 - 설정할 수 있는 가장 큰 값
 * @property {string} orientation='horizontal' - 컴포넌트의 방향설정 (horizontal, vertical)
 * @property {function} onChange - 컴포넌트의 값이 변경 될 때 발생되는 이벤트
 * @property {function} onComplete - 컴포넌트의 값이 maximum 값에 도달될 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['value', 'percent', 'chunk']),
    value: PropTypes.number,
    animation: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object
    ]),
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    onChange: PropTypes.func,
    onComplete: PropTypes.func
};

const defaultProps = {
    type: 'value', 
    value: 0, 
    animation: { duration: 600 }, 
    disabled: false,
    min: 0,
    max: 100,
    orientation: 'horizontal'
};

/**
 *  
 * @example
 * <Puf.ProgressBar value={80} />
 *
 * @desc
 *  Kendo ProgressBar
 * ============
 *  - 진행 상태를 표시하기 위한 컴포넌트
 *  - ProgressBar 프로퍼티 - {@link ProgressBar-Property}
 * @extends {React.Component}
 *
*/
class ProgressBar extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$progressBar = null;
        // 컴포넌트
        this._progressBar = null;

        // 이벤트 바인드
        this.onChange = this.onChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
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
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        this._$progressBar = $('#' + this._id);
        this._progressBar = this._$progressBar.kendoProgressBar(this._configuration()).data('kendoProgressBar');

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { type, value, animation, disabled, min, max, orientation } = this.props;

        // animation
        var _animation;
        if(typeof animation === 'number') {
            _animation = { duration: animation };
        }else if(animation === true) {
            _animation = { duration: 600 };
        }else {
            _animation = animation;
        }

        var configuration = {
            type: type,
            value: value,
            animation: _animation,
            enable: !disabled,
            min: min,
            max: max,
            orientation: orientation
        };

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onChange, onComplete } = this.props;

        if(typeof onChange === 'function') {
            this._progressBar.bind('change', this.onChange);
        }

        if(typeof onComplete === 'function') {
            this._progressBar.bind('complete', this.onComplete);
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
            this.props.onChange(e, e.value);
        }
    }

    /**
     * 컴포넌트 Complete Event이며 onComplete props가 구현되어 있다면 전달된다.
     *      - 값이 변경되면 발생한다.
     *      - this.props.onComplete(e, value) 전달
     * @param {object} e - 이벤트
     */
    onComplete(e) {
        if(typeof this.props.onComplete !== 'undefined') {
            this.props.onComplete(e, e.value);
        }
    }
    
    /**
     * 컴포넌트 값 반환
     * @return {number} - 값 반환
     */
    getValue() {
        return this._progressBar.value();
    }

     /**
     * 컴포넌트 값 설정
     * @param {number} value - 값 설정
     */
    setValue(value) {
        this._progressBar.value(value);
    }

    /**
     * 컴포넌트의 활성/비활성 여부 반환
     * @return {boolean} - 활성(true)/비활성(false) 반환
     */
    getEnable() {
        return this._progressBar.enable();
    }

    /**
     * 컴포넌트를 활성/비활성 해주는 기능
     * @param {boolean} isBool
     */
    setEnable(isBool) {
        this._progressBar.enable(isBool);
    }

    /**
     * @private
     */
    render() {
        // 필수 항목
        const { className } = this.props;

        return (
            <div id={this._id} className={classNames(className)}></div>
        );
    }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;