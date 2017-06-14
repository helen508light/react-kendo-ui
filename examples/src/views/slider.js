import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class Slider extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        // this.onOpen = this.onOpen.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    render() {
        const slider = (<K.Slider value={3} />);
        const sliderStr = jsxToString(slider, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.Slider'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">Slider</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">Slider</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {slider}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {sliderStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />
                    </div>
                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default Slider;