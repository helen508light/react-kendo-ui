import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';

class DropDownList extends Component {
    constructor(props) {
        super(props);

        // 이벤트 바인드
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    onSelect(e, selectedItem, prevSelectedItem) {
        alert('onSelect');
    }

    onChange(e, selectedItem, prevSelectedItem) {
        alert('onChange');
    }

    render() {
        const items = [
            { text: 'Black', value: '1' },
            { text: 'Orange', value: '2' },
            { text: 'Grey', value: '3' }
        ];

        const codeJsx = (<K.DropDownList items={items} width={100} />);
        const codeStr = jsxToString(codeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.DropDownList'
        });

        const eventCodeJsx = (<K.DropDownList items={items} width={100} onSelect={this.onSelect} onChange={this.onChange} />);
        const eventCodeStr = jsxToString(eventCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.DropDownList'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">DropDownList</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">DropDownList</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {codeJsx}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {codeStr}
                                    </pre>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">DropDownList 이벤트 체크</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {eventCodeJsx}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {eventCodeStr}
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

export default DropDownList;