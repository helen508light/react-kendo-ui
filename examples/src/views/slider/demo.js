
import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class SliderDemo extends Component {
    render() {

        const slider = (<Puf.Slider value={3} />);
        const sliderStr = jsxToString(slider, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.Slider'
        });

        return (
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {sliderStr}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />
            </div>
        );
    }
}

export default SliderDemo;