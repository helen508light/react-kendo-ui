/**
 * Modal component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Modal ref="modal" width="700px">
 *   <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
 *   <Puf.ModalBody>Modal Body</Puf.ModalBody>
 *   <Puf.ModalFooter>Modal Footer</Puf.ModalFooter>
 * </Puf.Modal>
 *
 * bootstrap component
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypesModalHeader = {
    className: PropTypes.string
};

/** Class representing a ModalHeader. */
class ModalHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        // 필수 항목
        return (
            <div className={classNames('modal-header', this.props.className)}>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                <span className="modal-title">{this.props.children}</span>
            </div>
        );
    }
}

const propTypesModalBody = {
    className: PropTypes.string
};

/** Class representing a ModalBody. */
class ModalBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 필수 항목
        return (
            <div className={classNames('modal-body', this.props.className)}>{this.props.children}</div>
        );
    }
}

const propTypesModalFooter = {
    className: PropTypes.string
};

/** Class representing a ModalFooter. */
class ModalFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 필수 항목
        return (
            <div className={classNames('modal-footer', this.props.className)}>{this.props.children}</div>
        );
    }
}

const propTypesModal = {
    id: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    backdrop: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
};

const defaultPropsModal = {
    backdrop: false
};

/** Class representing a Modal. */
class Modal extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$modal = $('#'+this.id);
        if(this.props.backdrop === false) {
            this.$modal.attr('data-backdrop', 'static');
            this.$modal.attr('data-keyboard', false);
        }

        // Events
        this.$modal.on('shown.bs.modal', this.onShow);
        this.$modal.on('hidden.bs.modal', this.onHide);
    }

    //-----------------------------
    // events
    onShow(event) {
        if(typeof this.props.onShow === 'function') {
            this.props.onShow(event);
            //event.stopImmediatePropagation();
        }
    }

    onHide(event) {
        if(typeof this.props.onHide === 'function') {
            this.props.onHide(event);
            //event.stopImmediatePropagation();
        }
    }
    
    //-----------------------------
    // methods
    show() {
        this.$modal.modal('show');
        /*
        if(this.props.backdrop === true) {
            alert.modal('show');
        }else {
            alert.modal({
                backdrop: 'static',
                keyboard: false
            });
        }
        */
    }

    hide() {
        this.$modal.modal('hide');
    }

    /**
     * @private
     * render function
     */
    renderChildren() {
        var children = this.props.children;

        return React.Children.map(children, (child) => {
            if(child === null) {
                return null;
            }

            return React.cloneElement(child, {});
        });
    }

    render() {
        // 필수 항목
        const { className, width } = this.props;

        return (
            <div id={this.id} className={classNames('modal', 'fade', className)} role="dialog" aria-labelledby="" aria-hidden="true">
                <div className="modal-dialog" style={{width: width}}>
                    <div className="modal-content">
                        {this.renderChildren()}
                    </div>
                </div>
            </div>
        );
    }
}


ModalHeader.propTypes = propTypesModalHeader;
ModalBody.propTypes = propTypesModalBody;
ModalFooter.propTypes = propTypesModalFooter;
Modal.propTypes = propTypesModal;
Modal.defaultProps = defaultPropsModal;

export { Modal, ModalHeader, ModalBody, ModalFooter };