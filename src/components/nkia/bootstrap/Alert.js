/**
 * Alert component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/24
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Alert ref="alert" title="타이틀" message="메시지" onOk={this.onOk} />
 * <Pum.Alert ref="confirm" type="confirm" title="타이틀" message="메시지" onOk={this.onConfirm} onCancel={this.onCancel}/>
 *
 * bootstrap component
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,             // null/confirm (default: null)
    title: PropTypes.string,
    titleIconClassName: PropTypes.string,
    message: PropTypes.string,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    okClassName: PropTypes.string,
    cancelClassName: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const defaultProps = {
    title: 'Title', 
    okLabel: $ps_locale.confirm, 
    cancelLabel: $ps_locale.cancel
};

/** Class representing a Alert. */
class Alert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title, 
            message: props.message
        };

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;

        // Manually bind this method to the component instance...
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState({ title: nextProps.title, message: nextProps.message });
    }

    //-----------------------------
    // events
    onOk(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // okFunc
        if(typeof this.okFunc === 'function') {
            this.okFunc();
        }

        // onOk
        if(typeof this.props.onOk === 'function') {
            this.props.onOk();
        }
    }

    onCancel(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // cancelFunc
        if(typeof this.cancelFunc === 'function') {
            this.cancelFunc();
        }

        // onCancel
        if(typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
    }
    
    //-----------------------------
    // methods
    show(okFunc, cancelFunc) {
        var alert = $('#'+this.id);
        alert.modal('show');

        this.okFunc = okFunc;
        this.cancelFunc = cancelFunc;
    }

    hide() {
        var alert = $('#'+this.id);
        alert.modal('hide');
    }

    setMessage(message) {
        if(typeof message === 'string') {
            this.setState({message: message});
        }
    }
    
    render() {
        // 필수 항목
        const {className, type, okLabel, cancelLabel, okClassName, cancelClassName, titleIconClassName, width} = this.props;

        var cancelButton;
        if(type === 'confirm') {
            cancelButton = <button type="button" className={classNames('btn', 'btn-cancel', cancelClassName)} onClick={this.onCancel} data-dismiss="modal">{cancelLabel}</button>;
        }

        return (
            <div id={this.id} className={classNames('modal', 'modal-alert', className)} role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-sm" style={{width: width}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className={classNames('title-icon', titleIconClassName)} />
                            <span className="modal-title">{this.state.title}</span>
                        </div>
                        <div className="modal-body">
                            {this.state.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={classNames('btn', 'btn-ok', okClassName)} onClick={this.onOk}>{okLabel}</button>
                            {cancelButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;