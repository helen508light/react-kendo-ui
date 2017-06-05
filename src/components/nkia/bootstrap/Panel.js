/**
 * Panel component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Panel  />
 *
 * bootstrap component
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../../utils';

const propTypesPanelHeader = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

/** Class representing a PanelHeader. */
class PanelHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: props.width, 
            height: props.height
        };
    }
    
    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        const { width, height } = nextProps;
        this.setState({ width: width, height: height });
    }

    render() {
        // 필수 항목
        return (
            <div className="panel-heading" style={{width: this.state.width, height: this.state.height}}>
                <div className="panel-title">{this.props.children}</div>
            </div>
        );
    }
}

const propTypesPanelBody = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

/** Class representing a PanelBody. */
class PanelBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: props.width, 
            height: props.height
        };
    }
    
    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        const { width, height } = nextProps;
        this.setState({ width: width, height: height });
    }

    render() {
        // 필수 항목
        return (
            <div className="panel-body" style={{width: this.state.width, height: this.state.height}}>{this.props.children}</div>
        );
    }
}

const propTypesPanelFooter = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

/** Class representing a PanelFooter. */
class PanelFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: props.width, 
            height: props.height
        };
    }
    
    componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        const { width, height } = nextProps;
        this.setState({ width: width, height: height });
    }

    render() {
        // 필수 항목
        return (
            <div className="panel-footer" style={{width: this.state.width, height: this.state.height}}>{this.props.children}</div>
        );
    }
}

const propTypesPanel = {
    id: PropTypes.string,
    className: PropTypes.string
};

const defaultPropsPanel = {
    className: 'panel-default'
};

/** Class representing a Panel. */
class Panel extends Component {
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
        const {className} = this.props;

        return (
            <div className={classNames('panel', className)}>{this.renderChildren()}</div>
        );
    }
}

PanelHeader.propTypes = propTypesPanelHeader;
PanelBody.propTypes = propTypesPanelBody;
PanelFooter.propTypes = propTypesPanelFooter;
Panel.propTypes = propTypesPanel;
Panel.defaultProps = defaultPropsPanel;

export { Panel, PanelHeader, PanelBody, PanelFooter };