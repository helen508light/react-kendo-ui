/**
 * Tab component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/08/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Tab />
 *
 * Kendo TabStrip 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Util } from '../../utils';

const propTypes = {
    id: PropTypes.string
}

const defaultProps = {
    
};

/** Class representing a Tab. */
class Tab extends Component {
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

    render() {
        // 필수 항목
        return (
            <li id={this.id}>{this.props.children}</li>
        );
    }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;