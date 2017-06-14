/**
 * TreeView component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/15
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.TreeView options={options} />
 *
 * Kendo TreeView 라이브러리에 종속적이다.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.object,
    host: PropTypes.string,
    url: PropTypes.string,
    method: PropTypes.string,
    items: PropTypes.array,
    data: PropTypes.object,
    onDemand: PropTypes.bool,
    dataTextField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    hasChildrenField: PropTypes.string,
    childrenField: PropTypes.string,
    checkboxes: PropTypes.bool,
    dragAndDrop: PropTypes.bool,
    template: PropTypes.string,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onDblclick: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    onLoadComplete: PropTypes.func
};

const defaultProps = {
    onDemand: false, 
    method: 'POST', 
    items: [],
    dataTextField: 'text', 
    hasChildrenField: 'hasChildren', 
    childrenField: 'items', 
    dragAndDrop: false
};

/** Class representing a TreeView. */
class TreeView extends Component {
    // static displayName = 'TreeView';

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
        this.onCheck = this.onCheck.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.onExpand = this.onExpand.bind(this);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onNavigate = this.onNavigate.bind(this);

        this.onClick = this.onClick.bind(this);
        this.onDblclick = this.onDblclick.bind(this);

        this.onLoadComplete = this.onLoadComplete.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$treeView = $('#'+this.id);
        this.treeView = this.$treeView.kendoTreeView(this.options()).data('kendoTreeView');

        // Events
        this.treeView.bind('select', this.onSelect);
        this.treeView.bind('check', this.onCheck);
        this.treeView.bind('change', this.onChange);
        this.treeView.bind('collapse', this.onCollapse);
        this.treeView.bind('expand', this.onExpand);

        /* drag & drop events */
        this.treeView.bind('dragstart', this.onDragStart);
        this.treeView.bind('drag', this.onDrag);
        this.treeView.bind('drop', this.onDrop);
        this.treeView.bind('dragend', this.onDragEnd);
        this.treeView.bind('navigate', this.onNavigate);

        //this.$treeView.find('.k-in').on('click', this.onClick);       // click이 select 보다 먼저 발생
        this.$treeView.on('click', '.k-in', this.onClick);              // click이 select 보다 나중에 발생
        this.$treeView.find('.k-in').on('dblclick', this.onDblclick);

    }

    //-----------------------------
    // private
    /**
     * @private
     */
    options() {
        const { host, url, method, data, items, onDemand, dataTextField, hasChildrenField, childrenField, checkboxes, dragAndDrop, template } = this.props;

        var options = {
            checkboxes: checkboxes,         // true or false
            dataTextField: dataTextField,
            loadOnDemand: onDemand,
            dragAndDrop: dragAndDrop        // true or false
        };

        //JSON.parse(JSON.stringify(data.treeVO).split('"children":').join('"items":')).items

        var model;
        // dataSource
        // url
        if(typeof url !== 'undefined' && childrenField != "children") {
            if(onDemand === true) {
                model = {
                    id: 'id',
                    hasChildren: hasChildrenField,
                    children: childrenField
                };
            }else {
                model = {
                    children: childrenField
                };
            }
            
            $.extend(options, { dataSource: new kendo.data.HierarchicalDataSource({
                transport: {
                    read: {
                        url: (host && host !== null && host.length > 0) ? host + url : url,
                        type: method,
                        dataType: 'json',
                        data: data,
                        contentType: 'application/json; charset=utf-8'
                    },
                    parameterMap: function(data, type) {
                        // console.log(data, type);
                        return JSON.stringify(data);
                    }
                },
                schema: {
                    model: model
                },
                requestEnd: function(e) {
                    var type = e.type,
                        response = e.response;
                    if (type === 'read' && response) {
                        this.onLoadComplete(e, response);
                    }
                }.bind(this)
            }) });

        }else if(typeof url !== 'undefined' && childrenField == 'children') {
            if(onDemand === true) {
                model = {
                    hasChildren: hasChildrenField,
                    children: 'items'
                };
            }else {
                model = {
                    children: 'items'
                };
            }

            $.extend(options, { dataSource: new kendo.data.HierarchicalDataSource({
                transport: {
                    read: {
                        url: (host && host !== null && host.length > 0) ? host + url : url,
                        type: method,
                        dataType: 'json',
                        data: data,
                        contentType: 'application/json; charset=utf-8'
                    },
                    parameterMap: function(data, type) {
                        return JSON.stringify(data);
                    }
                },
                schema: {
                    model: model,
                    data: function(response) {
                        response.treeVO = JSON.parse(JSON.stringify(response.treeVO).split('"children":').join('"items":')).items;
                        return response.treeVO;
                    }
                },
                requestEnd: function(e) {
                    var type = e.type,
                        response = e.response;
                    if (type === 'read' && response) {
                        this.onLoadComplete(e, response);
                    }
                }.bind(this)
            }) });

        }else {
            $.extend(options, { dataSource: new kendo.data.HierarchicalDataSource({
                data: items,
                schema: {
                    model: {
                        children: childrenField
                    }
                }
            }) });
        }

        // template
        if(typeof template !== 'undefined') {
            $.extend(options, { template: template });
        }

        return options;
    }

    //-----------------------------
    // methods
    /**
     * Returns the data item to which the specified node is bound.
     * @param {(jQuery|Element|String)} node - A string, DOM element or jQuery object which represents the node. A string is treated as a jQuery selector.
     * @return  {kendo.data.Node} The model of the item that was passed as a parameter.
     */
    dataItem(node) {
        return this.treeView.dataItem(node);
    }

    parent(node) {
        return this.treeView.parent(node);
    }

    select(node) {
        if(arguments.length === 0) {
            return this.treeView.select();
        }else {
            return this.treeView.select(node);
        }
    }

    append(nodeData, parentNode, success) {
        return this.treeView.append(nodeData, parentNode, success);
    }

    remove(node) {
        this.treeView.remove(node);
    }

    expand(node) {
        this.treeView.expand(node);
    }

    expandAll() {
        this.treeView.expand('.k-item');
    }

    collapse(node) {
        this.treeView.collapse(node);
    }

    collapseAll() {
        this.treeView.collapse('.k-item');
    }

    enable(node) {
        this.treeView.enable(node);
    }

    disable(node) {
        this.treeView.enable(node, false);
    }

    enableAll() {
        this.treeView.enable('.k-item');
    }

    disableAll() {
        this.treeView.enable('.k-item', false);
    }

    filter(value) {
        if(value !== "") {
            this.treeView.dataSource.filter({
                field: this.props.dataTextField,
                operator: 'contains',
                value: value
            });
        }else {
            this.treeView.dataSource.filter({});
        }
    }

    sort(dir) {
        // dir은 'asc' or 'desc'
        this.treeView.dataSource.sort({
            field: this.props.dataTextField,
            dir: dir
        });
    }

	findByText(text) {
		return this.treeView.findByText(text);
	}

    /**
     * Get dataSource.
     * @return {kendo.data.DataSource} TreeView data source.
     */
    getDataSource() {
        return this.treeView.dataSource;
    }

    /**
     * draggable
     */
    draggable() {
        this.$treeView.kendoDraggable({
            hint: function(element) {
                return element.clone();
            },
        });
    }

    //-----------------------------
    // events
    onSelect(event) {
        // 같은 노드를 select 할 경우 이벤트 발생하도록 하기 위해
        // click 이벤트시 k-state-selected 제거하고
        // select 이벤트시 추가한다.
        //console.log('treeview select');


        //$(event.node).find('span.k-in').addClass('k-state-selected');
        var node, selectedItem;

        if(typeof event.node === 'undefined') {
            //console.log('dispatch click');
            node = event;
            //$(node).find('span.k-in').addClass('k-state-selected');
            $(node).children(':first').find('span.k-in').addClass('k-state-selected');
            this.onSelectCall = false;
        }else {
            //console.log('click');
            node = event.node;
            this.onSelectCall = true;
        }
        selectedItem = this.treeView.dataItem(node);
        //var selectedItem = this.treeView.dataItem(event.node);
        //console.log(selectedItem);

        if(typeof this.props.onSelect === 'function') {
            this.props.onSelect(event, selectedItem);

            //event.stopImmediatePropagation();
        }
    }

    onCheck(event) {
        //console.log("Checkbox changed: ");
        //console.log(event.node);
    }

    onChange(event) {
        //console.log("Selection changed");
        //console.log(event);

        if(typeof this.props.onChange === 'function') {
            //var data = event.node;
            this.props.onChange(event);
            //event.stopImmediatePropagation();
        }
    }

    onCollapse(e) {
        //console.log("Collapsing ");
        //console.log(event.node);
        var selectedItem = this.treeView.dataItem(e.node);
        //console.log(selectedItem);
        if(typeof this.props.onCollapse === 'function') {
            this.props.onCollapse(e, selectedItem);

            //e.stopImmediatePropagation();
        }
    }

    onExpand(e) {
        //console.log("Expanding ");
        //console.log(event.node);
        // e.preventDefault();
        const { url, method, data, onDemand, hasChildrenField, childrenField } = this.props;

        var node = e.node,
            selectedItem = this.treeView.dataItem(node),
            hasChildren = selectedItem[hasChildrenField],
            appended = selectedItem['appended'];
        
        if(onDemand === true && 
            ( (hasChildren === true || hasChildren === 'true') && !appended )) {
            console.log('onDemand');
            $.ajax({
                type: method,
                url: url,
                dataType: 'json',
                data: JSON.stringify(selectedItem),
                contentType: 'application/json; charset=utf-8',
                success: function(data) {
                    // console.log(data);
                    this.treeView.append(data, $(node));
                    selectedItem['appended'] = true;
                }.bind(this)
            });
        }

        if(typeof this.props.onExpand === 'function') {
            this.props.onExpand(e, selectedItem);

            //e.stopImmediatePropagation();
        }
    }

    onDragStart(e) {
        //console.log("Started dragging ");
        //console.log(event.sourceNode);
        var selectedItem = this.treeView.dataItem(e.sourceNode);
        if(typeof this.props.onDragStart === 'function') {
            var item = selectedItem;
            this.props.onDragStart(e, item);

            //e.stopImmediatePropagation();
        }
    }

    onDrag(e) {
        //console.log("Dragging ");
        //console.log(event.sourceNode);
        var selectedItem = this.treeView.dataItem(e.sourceNode),
            parentNode, parentItem;

        // treeview outside 로 drag하면 className of null 에러 처리
        // treeview 안에서 drag 할때만 부모 찾는다.
        if(this.$treeView.find(e.dropTarget).length > 0) {
            parentNode = this.treeView.parent(e.dropTarget);
            parentItem = this.treeView.dataItem(parentNode);
        }

        //console.log(parentItem);
        if(typeof this.props.onDrag === 'function') {
            this.props.onDrag(e, selectedItem, parentItem);

            //e.stopImmediatePropagation();
        }
    }

    onDrop(e) {
        //console.log('TreeView Dropped');
        //console.log(e.valid);
        //console.log(e.sourceNode);
        //console.log(e.destinationNode);
        var selectedItem = this.treeView.dataItem(e.sourceNode),
            parentNode, parentItem;

        // treeview outside 로 drag하면 e.destinationNode 값이 undefined가 된다.
        if(typeof e.destinationNode !== 'undefined') {
            parentNode = this.treeView.parent(e.destinationNode);
            parentItem = this.treeView.dataItem(parentNode);
        }

        //console.log(parentItem);
        if(typeof this.props.onDrop === 'function') {
            this.props.onDrop(e, selectedItem, parentItem);

            //e.stopImmediatePropagation();
        }
    }

    onDragEnd(e) {
        console.log('TreeView Finished dragging');
        //console.log(event.sourceNode);
        var selectedItem = this.treeView.dataItem(e.sourceNode),
            parentNode = this.treeView.parent(e.destinationNode),
            parentItem = this.treeView.dataItem(parentNode);

        if(typeof this.props.onDragEnd === 'function') {
            this.props.onDragEnd(e, selectedItem, parentItem);

            //event.stopImmediatePropagation();
        }
    }

    onNavigate(e) {
        //console.log("Navigate ");
        //console.log(event.node);
    }

    onDataBound(e) {
        console.log('onDataBound');
    }

    onClick(e) {
        /*
        var node = $(event.target).closest(".k-item"),
            selectedItem = this.treeView.dataItem(node);
        console.log('treeview click');
        //console.log(selectedItem);
        if(typeof this.props.onClick === 'function') {
            this.props.onClick(event, selectedItem);

            //event.stopImmediatePropagation();
        }
        */
        // 같은 노드를 select 할 경우 이벤트 발생하도록 하기 위해
        // click 이벤트시 k-state-selected 제거하고
        // select 이벤트시 추가한다.
        //console.log($(event.target).hasClass('k-state-selected'));
        //console.log('treeview onclick');
        if(this.onSelectCall === false) {
            var node = $(e.target).closest(".k-item");
            $(e.target).removeClass('k-state-selected');
            this.treeView.trigger('select', node);
        }
        this.onSelectCall = false;
    }

    onDblclick(event) {
        var node = $(event.target).closest(".k-item"),
            selectedItem = this.treeView.dataItem(node);
        //console.log('onDblclick');
        //console.log(selectedItem);

        if(typeof this.props.onDblclick === 'function') {
            this.props.onDblclick(event, selectedItem);

            //event.stopImmediatePropagation();
        }
    }

    onLoadComplete(e, response) {
        if(typeof this.props.onLoadComplete !== 'undefined') {
            this.props.onLoadComplete(e, response);
        }
    }

    render() {
        // 필수 항목
        const {className} = this.props;

        return (
            <div id={this.id} className={classNames(className)}></div>
        );
    }
}

TreeView.propTypes = propTypes;
TreeView.defaultProps = defaultProps;

export default TreeView;