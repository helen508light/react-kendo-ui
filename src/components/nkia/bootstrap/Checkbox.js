/**
 * CheckBox component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.CheckBox name="name1" value="value1" onChange={this.onChange} checked={true}> 체크박스</Pum.CheckBox>
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    direction: PropTypes.oneOf(['h','v']),
    onChange: PropTypes.func
};

const defaultProps = {
    direction: 'v'
};

/** Class representing a Checkbox. */
class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = this.__setStateObject(props);

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;

        // Manually bind this method to the component instance...
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$checkbox = $('input:checkbox[name="' + this.props.name + '"]');

        if(this.props.direction === 'h') {
            let $div = $('#'+this.id),
                $label = $div.children();
            $label.addClass('checkbox-inline');
            $div.replaceWith($label);
        }

        this.__setValue();
    }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.__setStateObject(nextProps));
    }

    componentDidUpdate(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        //console.log(prevProps);
        //console.log(prevState);
        //console.log(this.state);
        this.__setValue();
    }

    /**
     * @private
     */
    __setStateObject(props) {
        //let value = props.value;
        //if(typeof value === 'undefined') {
        //    value = null;
        //}

        let checked = props.checked;
        if(typeof checked === 'undefined') {
            checked = false;
        }

        return {
            //value: value,
            checked: checked
        };
    }

    /**
     * @private
     */
    __setValue() {
        var checked = this.state.checked;/*,
            $checkbox = $('input:checkbox[name="' + this.props.name + '"]');*/
        if(typeof this.props.value === 'undefined') {
            // true/false 설정
            this.$checkbox.val(checked);
        }else {
            if(checked === true) {
                this.$checkbox.val(this.props.value);
            }else {
                this.$checkbox.val(null);
            }
        }
    }

    //-----------------------------
    // events
    onChange(e) {
        //console.log(e);
        var checked = !this.state.checked;
        //console.log(checked);
        this.setState({checked: checked});
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(e, checked, this.$checkbox.val());
        }
    }

    render() {
        // 필수 항목
        const {className, name, children} = this.props;
        return (
            <div className="checkbox" id={this.id}>
                <label>
                    <input type="checkbox" className={className} name={name} checked={this.state.checked}
                        onChange={this.onChange} />
                    <span className="lbl">{children}</span>
                    {/*<input type="hidden" name={this.props.name} value={this.state.value}>*/}
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;