'use strict';

import React, { Component, PropTypes } from 'react';
//import Puf from '../../react-puf';

import Menu from './mainView/Menu';
import Header from './mainView/Header';

class App extends Component {
    constructor(props) {
        super(props);

        // this.onChangeSkin = this.onChangeSkin.bind(this);
    }

    // onChangeSkin(e, item, prevItem) {
    //     // console.log(e, item, prevItem);
    //     $('link[href="../build/styles/skins/'+ prevItem.value +'"]').remove();
    //     $('<link/>', {
    //         rel: 'stylesheet',
    //         type: 'text/css',
    //         href: '../build/styles/skins/' + item.value
    //     }).appendTo('head');
    // }

    render() {
        return (
			<div className="wrapper">
				<div className="header">
                    <Header />
				</div>

				<div className="main">
					<div className="left-frame">
                        <Menu />
					</div>

                    {/*<K.MainFrameSplitter />*/}

					<div className="center-frame">
                        <div className="path-breadcrumb"></div>
                        <div className="center-frame-content">
                            {this.props.children}
                        </div>
					</div>
                    
				</div>

			</div>
        )
    }
}

export default App;
