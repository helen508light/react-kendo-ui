import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

/**
 * @typedef {Object} Window-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string} title='Title' - 컴포넌트 타이틀바의 타이틀
 * @property {string} titleIconClassName='window-title-icon' - 컴포넌트 타이틀바의 타이틀 아이콘
 * @property {string[]} actions=['Minimize','Maximize','Close'] - 컴포넌트 타이틀바에 위치하는 버튼들
 *     - Minimize: 최소화 버튼
 *     - Maximize: 최대화 버튼
 *     - Close: 닫기 버튼
 *     - Refresh: 새로고침 버튼
 * 
 * @property {string|number} width='50%' - 컴포넌트 width 값
 * @property {string|number} height='50%' - 컴포넌트 height 값
 * @property {number} minWidth=150 - 컴포넌트 minWidth 값
 * @property {number} minHeight=100 - 컴포넌트 minHeight 값
 * @property {boolean} visible=true - 컴포넌트 show(true)/hide(false)
 * @property {boolean} modal=false - 컴포넌트 modal 여부
 * @property {boolean} resizable=true - 컴포넌트 resize 가능 여부
 * @property {function} onOpen - 컴포넌트가 open 될 때 발생되는 이벤트
 * @property {function} onClose - 컴포넌트가 close 될 때 발생되는 이벤트
 * @property {function} onResize - 컴포넌트가 resize 될 때 발생되는 이벤트
 * @property {function} onDragStart - 컴포넌트가 dragstart 될 때 발생되는 이벤트
 * @property {function} onDragEnd - 컴포넌트가 dragend 될 때 발생되는 이벤트
 * @property {function} onRefresh - 컴포넌트가 refresh 될 때 발생되는 이벤트
 * @property {function} onActivate - 컴포넌트의 opening animation이 완료될 때 발생되는 이벤트
 * @property {function} onDeactivate - 컴포넌트의 closing animation이 완료될 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    titleIconClassName: PropTypes.string,
    actions: PropTypes.array,       // ['Pin', 'Refresh', 'Minimize', 'Maximize', 'Close']
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    visible: PropTypes.bool,
    modal: PropTypes.bool,
    resizable: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onResize: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onRefresh: PropTypes.func,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func
};

const defaultProps = {
    title: 'Title',
    titleIconClassName: 'window-title-icon',
    actions: ['Minimize', 'Maximize', 'Close'], // Pin
    width: '50%',
    height: '50%',
    minWidth: 150, 
    minHeight: 100,
    visible: true,
    modal: false, 
    resizable: true
};

/**
 *  
 * @example
 * <Puf.Window width={500} height="50%" />
 *
 * @desc
 *  Kendo Window
 * ============
 *  - Window 컴포넌트
 *  - Window 프로퍼티 - {@link Window-Property}
 * @extends {React.Component}
 *
*/
class Window extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$window = null;
        // 컴포넌트
        this._window = null;

        // 이벤트 바인드
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onActivate = this.onActivate.bind(this);
        this.onDeactivate = this.onDeactivate.bind(this);
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
        if(typeof nextProps.titleIconClassName !== 'undefined' && nextProps.titleIconClassName !== this.props.titleIconClassName) {
            this.setTitleIcon(nextProps.titleIconClassName);
        }
    }

    /**
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        this._$window = $('#' + this._id);
        this._window = this._$window.kendoWindow(this._configuration()).data('kendoWindow');

        const { className, titleIconClassName } = this.props;
        // render의 div는 k-window-content 에 해당되는 dom이다.
        // 부모인 k-window 에 addClass 해준다.
        if(typeof className !== 'undefined') {
            this._$window.parent().addClass(className);
        }

        // title icon
        // this._window.wrapper.find('.k-window-title').prepend('<span class=' + titleIconClassName + '></span>');
        $('<span></span>').insertBefore(this._window.wrapper.find('.k-window-title')).addClass(titleIconClassName);

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { title, actions, width, height, minWidth, minHeight, visible, modal, resizable } = this.props;

        var configuration = {
            title: title,
            actions: actions,
            width: width,
            height: height,
            minWidth: minWidth,
            minHeight: minHeight,
            visible: visible,
            modal: modal,
            resizable: resizable
        };

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onOpen, onClose, onResize, onDragStart, onDragEnd, onRefresh, onActivate, onDeactivate } = this.props;

        if(typeof onOpen === 'function') {
            this._window.bind('open', this.onOpen);
        }

        if(typeof onClose === 'function') {
            this._window.bind('close', this.onClose);
        }

        if(typeof onResize === 'function') {
            this._window.bind('resize', this.onResize);
        }

        if(typeof onDragStart === 'function') {
            this._window.bind('dragstart', this.onDragStart);
        }

        if(typeof onDragEnd === 'function') {
            this._window.bind('dragend', this.onDragEnd);
        }
        
        if(typeof onRefresh === 'function') {
            this._window.bind('refresh', this.onRefresh);
        }

        if(typeof onActivate === 'function') {
            this._window.bind('activate', this.onActivate);
        }
        
        if(typeof onDeactivate === 'function') {
            this._window.bind('deactivate', this.onDeactivate);
        }
        
    }

    /**
     * 컴포넌트 Open Event이며 onOpen props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 open 될 때 발생한다.
     *      - this.props.onOpen(e) 전달
     * @param {object} e - 이벤트
     */
    onOpen(e) {
        if(typeof this.props.onOpen !== 'undefined') {
            this.props.onOpen(e);
        }
    }

    /**
     * 컴포넌트 Close Event이며 onClose props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 close 될 때 발생한다.
     *      - this.props.onClose(e) 전달
     * @param {object} e - 이벤트
     */
    onClose(e) {
        if(typeof this.props.onClose !== 'undefined') {
            this.props.onClose(e);
        }
    }

    /**
     * 컴포넌트 Resize Event이며 onResize props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 resize 될 때 발생한다.
     *      - this.props.onResize(e) 전달
     * @param {object} e - 이벤트
     */
    onResize(e) {
        if(typeof this.props.onResize !== 'undefined') {
            this.props.onResize(e);
        }
    }

    /**
     * 컴포넌트 Dragstart Event이며 onDragStart props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 dragstart 될 때 발생한다.
     *      - this.props.onDragStart(e) 전달
     * @param {object} e - 이벤트
     */
    onDragStart(e) {

        if(typeof this.props.onDragStart !== 'undefined') {
            this.props.onDragStart(e);
        }
    }

    /**
     * 컴포넌트 Dragend Event이며 onDragEnd props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 dragend 될 때 발생한다.
     *      - this.props.onDragEnd(e) 전달
     * @param {object} e - 이벤트
     */
    onDragEnd(e) {
        if(typeof this.props.onDragEnd !== 'undefined') {
            this.props.onDragEnd(e);
        }
    }

    /**
     * 컴포넌트 Refresh Event이며 onRefresh props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 refresh 될 때 발생한다.
     *      - this.props.onRefresh(e) 전달
     * @param {object} e - 이벤트
     */
    onRefresh(e) {
        if(typeof this.props.onRefresh !== 'undefined') {
            this.props.onRefresh(e);
        }
    }

    /**
     * 컴포넌트 Activate Event이며 onActivate props가 구현되어 있다면 전달된다.
     *      - 컴포넌트의 opening animation이 완료될 때 발생한다.
     *      - this.props.onActivate(e) 전달
     * @param {object} e - 이벤트
     */
    onActivate(e) {
        if(typeof this.props.onActivate !== 'undefined') {
            this.props.onActivate(e);
        }
    }

    /**
     * 컴포넌트 Deactivate Event이며 onDeactivate props가 구현되어 있다면 전달된다.
     *      - 컴포넌트의 closing animation이 완료될 때 발생한다.
     *      - this.props.onDeactivate(e) 전달
     * @param {object} e - 이벤트
     */
    onDeactivate(e) {
        if(typeof this.props.onDeactivate !== 'undefined') {
            this.props.onDeactivate(e);
        }
    }

    /**
     * 컴포넌트 open
     * @return {Puf.Window} - Puf.Window 반환
     */
    open() {
        this._window.open();
        return this;
    }

    /**
     * 컴포넌트 close
     * @return {Puf.Window} - Puf.Window 반환
     */
    close() {
        this._window.close();
        return this;
    }

    /**
     * 컴포넌트를 center 로 open한다.
     * @return {Puf.Window} - Puf.Window 반환
     */
    center() {
        this._window.center();
        return this;
    }

    /**
     * 컴포넌트를 x, y 로 위치시킨다.
     * @return {Puf.Window} - Puf.Window 반환
     */
    setPosition(x, y) {
        this._$window.offset({ left: x, top: y });
        return this;
    }

    /**
     * 컴포넌트 타이틀 반환
     * @return {string} - 타이틀 값 반환
     */
    getTitle() {
        return this._window.title();
    }

     /**
     * 컴포넌트 타이틀 설정
     * @param {string} value - 타이틀 값 설정
     */
    setTitle(value) {
        this._window.title(value);
    }

    /**
     * 컴포넌트 타이틀 아이콘 설정
     * @param {string} value - 타이틀 아이콘 설정
     */
    setTitleIcon(value) {
        if(typeof value === 'string') {
            this._window.wrapper.find('.k-window-title').prev().attr('class', value);
        }
    }

    /**
     * @private
     */
    render() {
        // 필수 항목
        const { className, children } = this.props;

        return (
            <div id={this._id}>{children}</div>
        );
    }
}

Window.propTypes = propTypes;
Window.defaultProps = defaultProps;

export default Window;