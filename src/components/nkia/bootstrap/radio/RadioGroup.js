/**
 * RadioGroup component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.RadioGroup options="{options}" />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    selectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    direction: PropTypes.oneOf(['h','v']),
    onChange: PropTypes.func
};

const defaultProps = {
    direction: 'v'
};

/** Class representing a RadioGroup. */
class RadioGroup extends Component {
    constructor(props) {
        super(props);

        this.state = this.setStateObject(props);

        // Manually bind this method to the component instance...
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //console.log('componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    }

    //-----------------------------
    // events
    onChange(value, event) {
        this.setState({selectedValue: value});
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    }

    /**
     * @private
     */
    setStateObject(props) {
        let selectedValue = props.selectedValue;
        if(typeof selectedValue === 'undefined') {
            selectedValue = null;
        }

        return {
            selectedValue: selectedValue
        };
    }
    
    /**
     * @private
     * render function
     */
    renderChildren() {
        const { className, name, direction, children } = this.props,
            selectedValue = this.state.selectedValue,
            onChange = this.onChange;

        return React.Children.map(children, (radio) => {
            if(radio === null) {
                return null;
            }
            
            let _className = '',      
                props = {};
            if(radio.props.type === 'RadioDivider') {

                if(typeof radio.props.className !== 'undefined') {
                    _className = radio.props.className;
                }

                props = {
                    className: _className
                }
            }else {
                
                if(typeof radio.props.className !== 'undefined') {
                    _className = className + ' ' + radio.props.className;
                }else {
                    _className = className;
                }

                props = {
                    className: _className,
                    name,
                    selectedValue,
                    direction,
                    onChange
                }
            }
            
            return React.cloneElement(radio, props);
        });
    }

    render() {
        // 필수 항목
        const { className } = this.props;

        return (
            <div className={classNames('radio-group', className)}>
                {this.renderChildren()}
            </div>
        );
    }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;