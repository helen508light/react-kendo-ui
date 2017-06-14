import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

/**
 * @typedef {Object} Alert-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} className - css class명.
 * @property {string} title - 컴포넌트 타이틀
 * @property {string} okLabel - 컴포넌트 OK버튼 Label
 * @property {string|number} width - 컴포넌트 width 값
 * @property {string|number} height - 컴포넌트 height 값
 * @property {function} onOpen - 컴포넌트가 open될 때 발생되는 이벤트
 * @property {function} onClose - 컴포넌트가 close될 때 발생되는 이벤트
 */
const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    okLabel: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

const defaultProps = {
    title: 'Title',
    okLabel: $ps_locale.confirm,
    width: 300,
    height: 200
};

/**
 *  
 * @example
 * <Puf.Alert name="numericTextBox" />
 *
 * @desc
 *  Customize Kendo Dialog
 * ============
 *  - Alert 컴포넌트
 *  - Alert 프로퍼티 - {@link Alert-Property}
 * @extends {React.Component}
 *
*/
class Alert extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$alert = null;
        // 컴포넌트
        this._alert = null;

        // 이벤트 바인드
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
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
    	this._$alert = $('#' + this._id);
        this._alert = this._$alert.kendoDialog(this._configuration()).data('kendoDialog');

        // Event Bind
        this._bindEvent();
    }

    /**
     * @private
     */
    _configuration() {
        const { title, okLabel, width, height } = this.props;

        let configuration = {
            title: title,
            width: width,
            height: height,
            closable: false,
            modal: true,
            actions: [{
                text: okLabel,
                action: function(e) {
                    console.log(e.sender); // a reference to the dialog widget object
                    alert('OK action was clicked');

                    // false를 리턴하면 dialog가 닫히지 않는다.
                    return true;
                },
            }]
        };

        return configuration;
    }

    /**
     * Event Bind
     * @private
     */
    _bindEvent() {
        const { onOpen, onClose } = this.props;

        if(typeof onOpen === 'function') {
            this._alert.bind('open', this.onOpen);
        }

        if(typeof onClose === 'function') {
            this._alert.bind('close', this.onClose);
        }
    }

    /**
     * 컴포넌트 Open Event이며 onOpen props가 구현되어 있다면 전달된다.
     *      - 컴포넌트가 open 되면 발생한다.
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
     *      - 컴포넌트가 close 되면 발생한다.
     *      - this.props.onClose(e) 전달
     * @param {object} e - 이벤트
     */
    onClose(e) {
        if(typeof this.props.onClose !== 'undefined') {
            this.props.onClose(e);
        }
    }

    /**
     * 컴포넌트 open
     * @return {Puf.Alert} - Puf.Alert 반환
     */
    open() {
        this._alert.open();
        return this;
    }

    /**
     * 컴포넌트 close
     * @return {Puf.Alert} - Puf.Alert 반환
     */
    close() {
        this._alert.close();
        return this;
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

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;