/**
 * ButtonDropdown component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/10/07
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.ButtonDropdown options={options} />
 *
 * Bootstrap 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    dropdownTemplate: PropTypes.string,
    split: PropTypes.bool
};

const defaultProps = {
    className: 'btn btn-default', 
    label: 'button', 
    split: false
};

/** Class representing a ButtonDropdown. */
class ButtonDropdown extends Component {
    constructor(props) {
        super(props);

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    /**
     * @private
     */
    renderChildren() {
        const { children } = this.props;
        // children 이 존재 하지 않는다면 데이터를 받아서 li 생성하는 것 만들어줌
        // li 태그안의 content는 template 형태로 받아서 처리 (default template은 a tag)
        // 각 아이템 클릭시 이벤트 처리도 해야 함
        return children;
    }
	
    render() {
        // 필수 항목
        const { className, label, split } = this.props;

        var btn, splitBtn;
        if(split === true) {
            btn = (
                <button type="button" className={classNames(className)}>{label}</button>
            );
            splitBtn = (
                <button type="button" className={classNames(className, 'dropdown-toggle')} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
            );
        }else {
            btn = (
                <button type="button" className={classNames(className, 'dropdown-toggle')} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {label} <span className="caret"></span>
                </button>
            );
        }

        return (
            <div id={this.id} className="btn-group">
                {btn}
                {splitBtn}
                <ul className="dropdown-menu">
                    {this.renderChildren()}
                </ul>
            </div>
        );
    }
}

ButtonDropdown.propTypes = propTypes;
ButtonDropdown.defaultProps = defaultProps;

export default ButtonDropdown;