'use strict';

var React = require('react');

var ModalDemo = React.createClass({
    onShow: function(event) {
        console.log('onShow');
        console.log(event);
    },
    onHide: function(event) {
        console.log('onHide');
        console.log(event);
    },
    onShowModal: function(event) {
        //console.log(event);
        //var alert1 = new Puf.Alert({title: 'aa'});
        //console.log(alert1);
        this.refs['modal'].show();
        console.log('modal');
    },
    onShowModalWidth: function(event) {
        this.refs['modal_width'].show();
    },
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Modal</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.onShowModal}>
                                Modal
                            </button>
                            <Puf.Modal ref="modal">
                                <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
                                <Puf.ModalBody>Modal Body</Puf.ModalBody>
                                <Puf.ModalFooter>Modal Footer</Puf.ModalFooter>
                            </Puf.Modal>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" onClick={this.onShowModalWidth}>
                                Modal(width: 700px)
                            </button>
                            <Puf.Modal ref="modal_width" width="700px">
                                <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
                                <Puf.ModalBody>Modal Body</Puf.ModalBody>
                                <Puf.ModalFooter>Modal Footer</Puf.ModalFooter>
                            </Puf.Modal>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#target_modal">
                                Modal(data-target))
                            </button>
                            <Puf.Modal id="target_modal">
                                <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
                                <Puf.ModalBody>Modal Body</Puf.ModalBody>
                                <Puf.ModalFooter>Modal Footer</Puf.ModalFooter>
                            </Puf.Modal>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'// js\n' +
                                    '안형로'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start backdrop */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Modal - backdrop / listener</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modal_backdrop">
                                Modal(backdrop)
                            </button>
                            <Puf.Modal id="modal_backdrop" backdrop={true}>
                                <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
                                <Puf.ModalBody>Modal Body</Puf.ModalBody>
                                <Puf.ModalFooter>Modal Footer</Puf.ModalFooter>
                            </Puf.Modal>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modal_listener">
                            Modal(listener)
                            </button>
                            <Puf.Modal id="modal_listener" onShow={this.onShow} onHide={this.onHide}>
                                <Puf.ModalHeader>Modal Title</Puf.ModalHeader>
                                <Puf.ModalBody>Modal Body</Puf.ModalBody>
                            </Puf.Modal>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'// js\n' +
                                        '안형로'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end backdrop */}
                <div className="vspace-12" />

            </div>
        );
    }
});

module.exports = ModalDemo;