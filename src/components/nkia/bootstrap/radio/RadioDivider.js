/**
 * RadioDivider component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2017/01/05
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.RadioDivider className="radio-divider" />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

// 타입체크 하는지 확인 필요
const propTypes = {
    className: PropTypes.string
};

const defaultProps = {
    type: 'RadioDivider'
};

/** Class representing a RadioDivider. */
const RadioDivider = ({ className }) => (
    <div className={classNames('radio-divider', className)}>
    </div>
);

RadioDivider.propTypes = propTypes;
RadioDivider.defaultProps = defaultProps;

export default RadioDivider;