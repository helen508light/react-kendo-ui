'use strict';

var React = require('react');

var PsIconFont = React.createClass({
    render: function() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1>{{pageTitle}}</h1>
                </div>

                <div className="page-body">
                    PS ������ ��Ʈ
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
});

module.exports = PsIconFont;