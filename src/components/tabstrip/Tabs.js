/**
 * Tabs component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/08/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Tabs />
 *
 * Kendo TabStrip 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component } from 'react';

/** Class representing a Tabs. */
class Tabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 필수 항목
        return (
            <ul>{this.props.children}</ul>
        );
    }
}

export default Tabs;