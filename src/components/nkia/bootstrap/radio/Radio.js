/**
 * Radio component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Radio options="{options}" />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    selectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    direction: PropTypes.oneOf(['h','v']),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ])
};

/** Class representing a Radio. */
class Radio extends Component {
    constructor(props) {
        super(props);
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
        if(this.props.direction === 'h') {
            let $div = $('#'+this.id),
                $label = $div.children();
            $label.addClass('radio-inline');
            $div.replaceWith($label);
        }
    }

    render() {
        // 필수 항목
        const {className, name, selectedValue, onChange, value, children} = this.props;
        const optional = {};
        if(selectedValue !== undefined) {
            optional.checked = (this.props.value === selectedValue);
        }
        /*
        if(typeof onChange === 'function') {
            optional.onChange = onChange.bind(null, this.props.value);
        }
        */
        optional.onChange = onChange.bind(null, this.props.value);

        return (
            <div className="radio" id={this.id}>
                <label>
                    <input type="radio" className={className} name={name} value={value}
                        {...optional} />
                    <span className="lbl">{children}</span>
                </label>
            </div>
        );
    }
}

Radio.propTypes = propTypes;
// Radio.defaultProps = defaultProps;

export default Radio;