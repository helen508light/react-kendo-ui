/**
 * Fieldset component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Fieldset />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    legend: PropTypes.string,
    expand: PropTypes.bool,
    collapsible: PropTypes.bool,
    onToggle: PropTypes.func,
    onInit: PropTypes.func
};

const defaultProps = {
    legend: 'Title', 
    collapsible: true, 
    expand: true
};

/** Class representing a Fieldset. */
class Fieldset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expand: props.expand
        };

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;

        // Manually bind this method to the component instance...
        this.onToggle = this.onToggle.bind(this);
    }

    // componentDidMount() {
    //     // 최초 렌더링이 일어난 다음(한번 호출)
    //     if(typeof this.props.onInit === 'function') {
    //         var data = {};
    //         data.expand = this.state.expand;
    //         this.props.onInit(data);
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.toggle(nextProps);
    }

    /**
     * @private
     */
    toggle(props) {
        if(this.props.collapsible === true) {
            if(typeof props.expand !== 'undefined') {
                this.setState({ expand: props.expand });
            }else {
                this.setState({ expand: true });
            }
        }
    }

    //-----------------------------
    // events
    onToggle(event) {
        var expand = !this.state.expand;
        this.toggle({ expand: expand });

        if(typeof this.props.onToggle === 'function') {
            this.props.onToggle(expand);
        }
    }
	
    render() {
        // 필수 항목
        const {className, legend, collapsible} = this.props;

        var display, collapsed = false;
        if(this.state.expand === true) {
            display = 'block';
        }else {
            display = 'none';
            if(collapsible === true) {
                collapsed = true;
            }
        }

        return (
            <fieldset className={classNames('fieldset', className, {collapsible: collapsible, collapsed: collapsed})}>
                <legend onClick={this.onToggle} name={this.id}> {legend}</legend>
                <div style={{display: display}}>
                    <div id={this.id} >{this.props.children}</div>
                </div>
            </fieldset>

        );
    }
}

Fieldset.propTypes = propTypes;
Fieldset.defaultProps = defaultProps;

export default Fieldset;