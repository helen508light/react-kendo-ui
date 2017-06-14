import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class ProgressBar extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onClick() {
        var value = this.progressbar.getValue();
        if(value === 30) {
            value = 80;
        }else {
            value = 30;
        }
        this.progressbar.setValue(value);
    }

    render() {
        const progressBar = (<K.ProgressBar ref={(ref) => { this.progressbar = ref; }} value={30} />);
        const progressBarStr = jsxToString(progressBar, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.ProgressBar'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">ProgressBar</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">ProgressBar</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {progressBar}
                                    {'\u00A0'}
                                    <button onClick={this.onClick}>change</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {progressBarStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />

                        <div className="row">{/* start url */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">ProgressBar(chunk)</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {/*'// html\n'*/}
                                        {'<K.TabStrip>'}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end url */}
                        <div className="vspace-12" />

                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default ProgressBar;