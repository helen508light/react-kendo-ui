/**
 * Temp component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/10/29
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Button options={options} />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPosition: PropTypes.oneOf(['bottom', 'top', 'left', 'right', 'center']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    toggled: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    value: PropTypes.object,
    onClick: PropTypes.func
};

const defaultProps = {
    type: 'button',
    className: 'btn-default',
    toggled: false,
    value: null,
    tooltipPosition: 'bottom'
};

/** Class representing a ToggleButton. */
class ToggleButton extends Component {
    constructor(props) {
        super(props);

        // toggled 설정은 init 시에만 가능
        this.state = {
            toggled: props.toggled
        };

        // this.value = props.value;

        // Manually bind this method to the component instance...
        this.onClick = this.onClick.bind(this);
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
        this.$toggleButton = $('#' + this.id);

        // tooltip
        // if(typeof this.props.tooltip !== 'undefined') {

        //     this.tooltip = this.$toggleButton.kendoTooltip({
        //         position: this.props.tooltipPosition
        //     }).data('kendoTooltip');

        // }
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        // toggled 설정은 init 시에만 가능
        //this.setState({ toggled: nextProps.toggled });
    }

    //-----------------------------
    // events
    onClick(e) {
        
        var toggled = this.toggle(),
            value = this.getValue();
        
        if(typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e, toggled, value);
        }
    }

    //-----------------------------
    // methods
    toggle(isBool) {
        var toggled;
        if(arguments.length == 0) {
            toggled = !this.state.toggled;
        }else {
            toggled = isBool;
        }
        this.setState({ toggled: toggled });
        return toggled;
    }

    isToggled() {
        return this.state.toggled;
    }

    setValue(val) {
        this.value = val;
    }

    getValue() {
        return this.value;
    }

    /**
     * @private
     * render function
     */
    renderIcon() {
        const { iconClassName } = this.props;
        if(iconClassName) {
            return (
                <i className={classNames('fa', iconClassName)}></i>
            );
        }
    }

    render() {
        // 필수 항목
        const { children, className, tooltip, size, disabled, hidden, value } = this.props;
        
        // 다시 그릴때는 생성자가 호출이 안되므로
        this.value = value;

        var optional = {},
            sizeClassName;

        // size 처리
        if(typeof size === 'string') {
            sizeClassName = 'btn-' + size;
        }
        
        // disabled 처리
        if(disabled === true) {
            optional.disabled = true;
        }

        // hidden 처리
        if(hidden === true) {
            optional.style = { display: 'none' };
        }

        // {'\u00A0'}
        return (
            <button id={this.id} type="button" className={classNames('btn', className, { toggle: this.state.toggled }, sizeClassName)} onClick={this.onClick} 
                    title={tooltip}
                    {...optional}>
                {this.renderIcon()}
                {children}
            </button>
        );
    }
}

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;
