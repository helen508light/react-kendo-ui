import React, { Component, PropTypes } from 'react';
import Markdown from '../common/Markdown';

import Readme from '../../../README.md';

class Home extends Component {
    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Home</span>
                </div>

                <div className="page-body">
                    <Markdown source={Readme}/>
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default Home;