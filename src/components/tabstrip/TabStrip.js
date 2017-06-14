/**
 * TabStrip component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/08/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.TabStrip className={className} selectedIndex={0} onSelect={func} />
 *
 * Kendo TabStrip 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../utils';

const propTypes = {
    className: PropTypes.string,
    selectedIndex: PropTypes.number,
    contentUrls: PropTypes.array,
    animation: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    tabPosition: PropTypes.oneOf(['left','right','bottom']),
    onSelect: PropTypes.func,
    onActivate: PropTypes.func,
    onShow: PropTypes.func,
    onContentLoad: PropTypes.func,
    onError: PropTypes.func
};

const defaultProps = {
    selectedIndex: 0, 
    animation: false
};

/** Class representing a TabStrip. */
class TabStrip extends Component {
    constructor(props) {
        super(props);

        // Operations usually carried out in componentWillMount go here
        let id = props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;

        // Manually bind this method to the component instance...
        this.onSelect = this.onSelect.bind(this);
        this.onActivate = this.onActivate.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onContentLoad = this.onContentLoad.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$tabstrip = $('#'+this.id);
        this.tabstrip = this.$tabstrip.kendoTabStrip(this.options()).data('kendoTabStrip');

        // Events
        this.tabstrip.bind('select', this.onSelect);
        this.tabstrip.bind('activate', this.onActivate);
        this.tabstrip.bind('show', this.onShow);
        this.tabstrip.bind('contentLoad', this.onContentLoad);
        this.tabstrip.bind('error', this.onError);

        this.select(this.props.selectedIndex);
    }

    /**
     * @private
     */
    options() {
        const {animation, contentUrls, tabPosition} = this.props;

        // animation (false|object) true는 유효하지 않음
        var _animation;
        if(typeof animation === 'boolean' && animation === true) {
            _animation = {
                open: {
                    effects: 'fadeIn'
                }
            }
        }else {
            _animation = animation;
        }

        var options = {
            animation: _animation
        };

        // tabPosition
        if(tabPosition) {
            $.extend(options, {tabPosition: tabPosition});
        }

        // contentUrls
        if(contentUrls) {
            $.extend(options, {contentUrls: contentUrls});
        }

        return options;
    }

    //-----------------------------
    // methods
    select(index) {
        this.tabstrip.select(index);
    }

    //-----------------------------
    // events
    onSelect(e) {
        //console.log('onSelect');
        //console.log(e);
        if(typeof this.props.onSelect === 'function') {
            this.props.onSelect(e); // e.item, index 알아내서 넘기자
        }
    }

    onActivate(e) {
        //console.log('onActivate');
        //console.log(e);
        if(typeof this.props.onActivate === 'function') {
            this.props.onActivate(e);
        }
    }

    onShow(e) {
        //console.log('onShow');
        //console.log(e);
        if(typeof this.props.onShow === 'function') {
            this.props.onShow(e);
        }
    }

    onContentLoad(e) {
        //console.log('onContentLoad');
        //console.log(e);
        if(typeof this.props.onContentLoad === 'function') {
            this.props.onContentLoad(e);
        }
    }

    onError(e) {
        //console.log('onError');
        //console.log(e);
        if(typeof this.props.onError === 'function') {
            this.props.onError(e);
        }
    }
    
    /**
     * @private
     * render function
     */
    renderChildren() {
        var children = this.props.children,
            count = 0;

        return React.Children.map(children, (child) => {
            if(child === null) {
                return null;
            }
            var result;

            // Tabs
            if(count++ === 0) {
                result = React.cloneElement(child, {
                    children: React.Children.map(child.props.children, (tab) => {
                        if(tab === null) {
                            return null;
                        }

                        return React.cloneElement(tab);
                    })
                });

            }else {
                // TabContent
                result = React.cloneElement(child);
            }
            return result;
        });
    }

    render() {
        // 필수 항목
        return (
            <div id={this.id} className={this.props.className}>
                {this.renderChildren()}
            </div>
        );
    }
}

TabStrip.propTypes = propTypes;
TabStrip.defaultProps = defaultProps;

export default TabStrip;