
import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class ProgressBarDemo extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onClick = this.onClick.bind(this);
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

        const progressBar = (<Puf.ProgressBar ref={(ref) => { this.progressbar = ref; }} value={30} />);
        const progressBarStr = jsxToString(progressBar, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.ProgressBar'
        });

        return (
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {progressBarStr}
                                </pre>
                            </Puf.HiddenContent>
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.TabStrip>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end url */}
                <div className="vspace-12" />

            </div>
        );
    }
}

export default ProgressBarDemo;