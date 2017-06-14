import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

/**
 * @typedef {Object} Notification-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string|number} width - 컴포넌트 width 값
 * @property {string|number} height - 컴포넌트 height 값
 * @property {string|element|jQuery} appendTo - 컴포넌트가 append 되는 element
 * @property {object} position - 컴포넌트의 position 정보(appendTo 설정시 적용안됨)
 *    - 사용예)
 *      ```
 *      position: {
 *          pinned: true,
 *          top: null,
 *          left: null,
 *          bottom: 20,
 *          right: 20
 *      }
 *      ```
 * @property {number} autoHideAfter=5000 - 컴포넌트가 자동으로 사라지는 시간(milliseconds)
 * @property {boolean} button=false - 컴포넌트의 hide button 표시 여부
 * @property {function} onShow - 컴포넌트가 보여질 때 발생되는 이벤트
 * @property {function} onHide - 컴포넌트가 사라질 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    appendTo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    position: PropTypes.object,
    autoHideAfter: PropTypes.number,
    button: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
};

const defaultProps = {
    position: {
        pinned: true,
        top: null,
        left: null,
        bottom: 20,
        right: 20
    },
    autoHideAfter: 5000,
    button: false
};

/**
 *  
 * @example
 * <Puf.Notification className="class-name" autoHideAfter={0} button={false} />
 *
 * @desc
 *  Kendo Notification
 * ============
 *  - 사용자의 액션 또는 시스템의 상태나 처리결과 등을 표시하기 위한 컴포넌트
 *  - Notification 프로퍼티 - {@link Notification-Property}
 * @extends {React.Component}
 *
*/
class Notification extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$notification = null;
        // 컴포넌트
        this._notification = null;

        // 이벤트 바인드
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
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
        this._$notification = $('#' + this._id);
        this._notification = this._$notification.kendoNotification(this._configuration()).data('kendoNotification');

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { position, autoHideAfter, button } = this.props;

        let configuration = {
            position: position,
            autoHideAfter: autoHideAfter,
            button: button
        };

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onShow, onHide } = this.props;

        if(typeof onShow === 'function') {
            this._notification.bind('show', this.onShow);
        }

        if(typeof onHide === 'function') {
            this._notification.bind('hide', this.onHide);
        }
    }

    /**
     * 컴포넌트 Show Event이며 onShow props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 show 되면 발생한다.
     *      - this.props.onShow(e, element) 전달
     *        element는 jQuery object 임
     * @param {object} e - 이벤트
     */
    onShow(e) {
        var element = e.element;

        if(typeof this.props.onShow !== 'undefined') {
            this.props.onShow(e, element);
        }
    }

    /**
     * 컴포넌트 Hide Event이며 onHide props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 hide 되면 발생한다.
     *      - this.props.onHide(e, element) 전달
     *        element는 jQuery object 임
     * @param {object} e - 이벤트
     */
    onHide(e) {
        var element = e.element;

        if(typeof this.props.onHide !== 'undefined') {
            this.props.onHide(e, element);
        }
    }

    /**
     * 컴포넌트를 display 한다.
     * @param {object|string|function} data required - 컴포넌트에 표시되는 내용
     * @param {string} type - Built-in 또는 Custom 타입
     *     - Built-in 타입: info, success, warning, error
     */
    show(data, type) {
        this._notification.show(data, type);
    }
    
    /**
     * 컴포넌트를 hide 한다.
     */
    hide() {
        this._notification.hide();
    }

    /**
     * @private
     */
    render() {
        // 필수 항목
        const { className } = this.props;

        return (
            <span id={this._id} className={classNames(className)}></span>
        );
    }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;