'use strict';

var React = require('react');

var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
    displayName: 'TreeMenu',
    onSelectNode: function(event, item) {
        //console.log('TreeMenu: onSelectNode');
        //console.log(item);
        if(item.hasOwnProperty('path')) {
            //console.log(item.path);
            //browserHistory.push(item.path);
            hashHistory.push(item.path);
        }else if(item.hasOwnProperty('link')) {
            //location.href = item.url;
            // kendo treeview 에서 노드 item에 url 이 있을 경우 자체적으로 location.href 를 실행함
            window.open(item.link, '_blank');
        }
        //event.stopPropagation();
        //event.stopImmediatePropagation();
    },
    componentDidMount: function() {
        /*
        $.ajax({
            url: './data/main-menu.json',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('./data/main-menu.json', status, err.toString());
            }.bind(this)
        });
        */
    },
    render: function() {
        // 필수 항목
        return (
            <Puf.TreeView url="./data/main-menu.json" method="GET" onSelect={this.onSelectNode} />
        );
    }
});