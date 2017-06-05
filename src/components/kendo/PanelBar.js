/**
 * PanelBar component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/08/18
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.PanelBar options={options} />
 *
 * Kendo PanelBar 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    contentUrls: PropTypes.array
};

const defaultProps = {

};

/** Class representing a PanelBar. */
class PanelBar extends Component {
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
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$panelBar = $('#'+this.id);
        this.panelBar = this.$panelBar.kendoPanelBar(this.options()).data('kendoPanelBar');

        // Events
        this.panelBar.bind('select', this.onSelect);

        // PanelBarPane 의 props id를 설정해야 Icon 설정을 할 수 있다.
        var panelBarPanes = [];
        if($.isArray(this.props.children)) {
            panelBarPanes = this.props.children;
        }else {
            panelBarPanes = [this.props.children];
        }
        
        panelBarPanes.map((panelBarPane) => {
            
            if(typeof panelBarPane.props.id !== 'undefined') {
                let icon;
                if(panelBarPane.props.iconClassName) {
                    icon = '<i class="'+panelBarPane.props.iconClassName+'"></i>';
                }
                if(panelBarPane.props.iconUrl) {
                    icon = '<img class="k-image" alt="" src="'+panelBarPane.props.iconUrl+'">';
                }
                
                $('#' + panelBarPane.props.id + ' > span.k-link.k-header').prepend(icon);
            }
        });
    }

    /**
     * @private
     */
    options() {
        return {}
    }

    //-----------------------------
    // methods
    expand($item) {
        this.panelBar.expand($item);
    }

    //-----------------------------
    // events
    onSelect(e) {

    }
    
    render() {
        // 필수 항목
        const { className, children } = this.props;

        return (
            <ul id={this.id} className={classNames(className)}>{children}</ul>
        );
    }
}

const propTypesPanelBarPane = {
    id: PropTypes.string,
    title: PropTypes.string,
    iconUrl: PropTypes.string,
    iconClassName: PropTypes.string,
    items: PropTypes.array
};

/** Class representing a PanelBarPane. */
class PanelBarPane extends Component {
    constructor(props) {
        super(props);
    }
    
    /**
     * @private
     */
    renderPaneContent() {
        const { items, children, contentUrls } = this.props;
        var content;

        if(items) {
            var _items = items.map(function(item) {
                if(typeof item === 'object') {
                    var icon, text;
                    if(item.hasOwnProperty('spriteCssClass')) {
                        icon = <span className={classNames(item.spriteCssClass)}></span>;
                    }
                    if(item.hasOwnProperty('imageUrl')) {
                        icon = <img src={item.imageUrl} />;
                    }

                    if(item.hasOwnProperty('text')) {
                        text = item.text;
                    }

                    var data;
                    if(item.hasOwnProperty('data')) {
                        data = { data: JSON.stringify(item.data) };
                    }
                    //return (<li key={Util.uniqueID()}>{icon} {text}</li>);
                    return (<li {...data}>{icon} {text}</li>);
                    //return <PanelBarPaneItem data={data}>{icon} {text}</PanelBarPaneItem>;
                }else {
                    //return (<li key={Util.uniqueID()}>{item}</li>);
                    return (<li>{item}</li>);
                }
            });
            content = <ul>{_items}</ul>;

        }else if(children) {
            content = children;

        }else {
            // contentUrls 이라고 판단
            content = <div></div>;
        }

        return content;
    }

    render() {
        // 필수 항목
        const { id, title } = this.props;

        var _id;
        if(id) {
            _id = {id: id};
        }

        return (
            <li {..._id}>
                {title}
                {this.renderPaneContent()}
            </li>
        );
    }
}

/** Class representing a PanelBarPaneItem. */
class PanelBarPaneItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (<li {...data}>{this.props.children}</li>);
    }
}

PanelBar.propTypes = propTypes;
PanelBar.defaultProps = defaultProps;
PanelBarPane.propTypes = propTypesPanelBarPane;

export { PanelBar, PanelBarPane };