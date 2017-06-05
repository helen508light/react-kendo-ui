/**
 * Splitter component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.Splitter />
 *
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util } from '../../utils';

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['h', 'v']).isRequired,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
    //leftPane: PropTypes.string,
    //rightPane: PropTypes.string,
    minLeft: PropTypes.number.isRequired,
    minRight: PropTypes.number.isRequired,
    maxLeft: PropTypes.number.isRequired,
    maxRight: PropTypes.number.isRequired,
    resizable: PropTypes.bool,
    hidden: PropTypes.bool,
    onResize: PropTypes.func
};

const defaultProps = {
    type: 'h',
    position: 'left',
    minLeft: 50,
    minRight: 50,
    maxLeft: 500,
    maxRight: 500,
    resizable: true
};

/** Class representing a MainFrameSplitter. */
class MainFrameSplitter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expand: true
        };

        this.splitterActiveFlag = false;
        this.splitterObj = false;

        // Manually bind this method to the component instance...
        this.onResize = this.onResize.bind(this);

        this.splitterMouseUp = this.splitterMouseUp.bind(this);
        this.splitterMouseDown = this.splitterMouseDown.bind(this);
        this.splitterMouseMove = this.splitterMouseMove.bind(this);
        this.expandCollapse = this.expandCollapse.bind(this);
        this.resizeSplitterPos = this.resizeSplitterPos.bind(this);
    }

    componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.$splitter = $('#'+this.id);

        if(this.props.resizable === false) {
            this.$splitter.css('cursor', 'default');
        }

        if(typeof this.props.hidden === 'boolean') {
            this.visible(!this.props.hidden);
        }

        // Events
        this.$splitter.on('resize', this.onResize);

        var _this = this;
        $(window).on('resize', function(e) {
            // splitter에서 발생시키는 resize 이벤트와 구별
            if(e.target === this) {
                //_this.resizeSplitterPos();
                // splitterOpen/splitterClose 함수 실행과 시간차를 두어야 적용됨
                setTimeout(_this.resizeSplitterPos, 1);
            }
        });
    }

    //-----------------------------
    // events
    onResize(e) {
        if(this.props.onResize) {
            this.props.onResize(e);
        }
    }

    //-----------------------------
    // methods
    open() {
        this.splitterOpen();
    }

    close() {
        const { type, position } = this.props;

        this.splitterClose();
        if(type === 'h') {

            if(position === 'left') {
                this.$splitter.next().offset({ left: 0 });
            }else if(position === 'right') {
                this.$splitter.prev().css('right', 0);
            }
        }
    }

    visible(isBool) {
        if(isBool === false) {
            this.$splitter.css('display', 'none');
        }else {
            this.$splitter.css('display', '');
        }
    }

    //-----------------------------
    // private
    // splitterActiveFlag: false,
    // splitterObj: false,
    splitterMouseDown(e) {
        if (!this.splitterActiveFlag && this.state.expand === true && this.props.resizable === true) {
            // document.getElementById(this.id)
            if (this.$splitter[0].setCapture) {
                this.$splitter[0].setCapture();
            }else {
                document.addEventListener('mouseup', this.splitterMouseUp, true);
                document.addEventListener('mousemove', this.splitterMouseMove, true);
                e.preventDefault();
            }
            this.splitterActiveFlag = true;
            this.splitterObj = this.$splitter[0];

            //leftsidebarCollapseWidth = $('.leftsidebar-collapse').outerWidth(true);
            this.splitterWidth = this.$splitter.outerWidth(true);

            /*splitterParentObj = b.parentElement;
             console.log(splitterObj.offsetLeft);
             console.log(splitterObj.parentElement.offsetLeft);*/
        }
    }

    splitterMouseUp(e) {
        if (this.splitterActiveFlag) {
    //        var a = document.getElementById("toc");
    //        var c = document.getElementById("content");
    //        changeQSearchboxWidth();
    //        a.style.width = (splitterObj.offsetLeft - 20) + "px";
    //        c.style.left = (splitterObj.offsetLeft + 10) + "px";

            const { type, position } = this.props;

            if(type === 'h') {
                if(position === 'left') {
                    this.$splitter.prev().outerWidth(this.splitterObj.offsetLeft);
                    this.$splitter.next().offset({ left: (this.splitterObj.offsetLeft + this.splitterWidth) });
                }else if(position === 'right') {
                    this.hRightSplitterOffsetRight = this.$splitter.parent().outerWidth(true) - this.splitterObj.offsetLeft;
                    this.$splitter.prev().css('right', this.hRightSplitterOffsetRight);
                    this.$splitter.next().outerWidth(this.hRightSplitterOffsetRight - this.splitterWidth);

                    //this.$splitter.prev().offset({ right: this.splitterObj.offsetRight });
                    //this.$splitter.next().outerWidth(this.splitterObj.offsetRight - this.splitterWidth);
                }

            }

            if(this.splitterObj.releaseCapture) {
                this.splitterObj.releaseCapture();
            }else {
                document.removeEventListener('mouseup', this.splitterMouseUp, true);
                document.removeEventListener('mousemove', this.splitterMouseMove, true);
                e.preventDefault();
            }
            this.splitterActiveFlag = false;
            this.saveSplitterPos();
            //this.onResize();
            this.$splitter.trigger('resize');
        }
    }

    splitterMouseMove(e) {
        const { type, position, minLeft, minRight, maxLeft, maxRight } = this.props;

        if (this.splitterActiveFlag) {
            if(type === 'h') {
                if(position === 'left') {
                    if (e.clientX >= minLeft && e.clientX <= maxLeft) {
                        this.splitterObj.style.left = e.clientX + 'px';
                        if(!this.splitterObj.releaseCapture) {
                            e.preventDefault();
                        }
                    }
                }else if(position === 'right') {
                    if (e.clientX <= document.documentElement.clientWidth - minRight && e.clientX >= document.documentElement.clientWidth - maxRight) {
                        this.splitterObj.style.left = e.clientX + 'px';
                        if(!this.splitterObj.releaseCapture) {
                            e.preventDefault();
                        }
                    }
                }
            }
            /*
            if (e.clientX >= this.props.minLeft && e.clientX <= document.documentElement.clientWidth - this.props.minRight) {
                this.splitterObj.style.left = e.clientX + 'px';
                if(!this.splitterObj.releaseCapture) {
                    e.preventDefault();
                }
            }
            */
        }
    }

    splitterOpen() {
        const { type, position } = this.props;

        if(type === 'h') {
            if(position === 'left') {
                this.$splitter.prev().offset({ left: 0 });
                this.$splitter.offset({ left: this.leftFrameWidth });
                this.$splitter.next().offset({ left: (this.leftFrameWidth + this.splitterWidth) });
            }else if(position === 'right') {
                this.$splitter.prev().css('right', (this.rightFrameWidth + this.splitterWidth));
                this.$splitter.offset({ left: (this.$splitter.parent().outerWidth(true) - this.rightFrameWidth - this.splitterWidth) });
                this.$splitter.next().outerWidth(this.rightFrameWidth);
            }
        }

        this.$splitter.css('cursor', 'e-resize');

        /*
         this.$splitter.prev().on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            this.$splitter.css('display', 'block');
        });
        */
        this.setState({expand: true});
        this.$splitter.trigger('resize');
    }

    splitterClose() {
        const { type, position } = this.props;

        if(type === 'h') {
            this.splitterWidth = this.$splitter.outerWidth(true);

            if(position === 'left') {
                this.leftFrameWidth = this.$splitter.prev().outerWidth(true);

                this.$splitter.prev().offset({ left: (this.leftFrameWidth * -1) });
                this.$splitter.offset({ left: 0 });
                this.$splitter.next().offset({ left: this.splitterWidth });
            }else if(position === 'right') {
                this.rightFrameWidth = this.$splitter.next().outerWidth(true);

                this.$splitter.prev().css('right', this.splitterWidth);
                this.$splitter.offset({ left: (this.$splitter.parent().outerWidth(true) - this.splitterWidth) });
                this.$splitter.next().outerWidth(0);
            }
        }

        this.$splitter.css('cursor', 'default');
        //this.$splitter.prev().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        this.setState({ expand: false });
        this.$splitter.trigger('resize');
    }

    expandCollapse(e) {

        if(this.state.expand === true) {
            this.splitterClose();
        }else {
            this.splitterOpen();
        }
    }

    saveSplitterPos() {
        const { type, position } = this.props;
        var a = this.$splitter[0];//document.getElementById(this.id);
        if(a) {
            if(type === 'h') {
                if(position === 'left') {
                    Util.setCookie('hsplitterLeftPosition', a.offsetLeft, 365);
                }else if(position === 'right') {
                    Util.setCookie('hsplitterRightPosition', this.hRightSplitterOffsetRight, 365);
                }
            }
        }
    }

    resizeSplitterPos() {
        const { type, position } = this.props;
        if(type === 'h') {
            if(position === 'right') {
                var rightFrameWidth = 0;
                if(this.state.expand === true) {
                    rightFrameWidth = this.$splitter.next().outerWidth(true);
                }
                this.$splitter.offset({ left: (this.$splitter.parent().outerWidth(true) - rightFrameWidth - this.splitterWidth) });
            }
        }
    }

    render() {
        // 필수 항목
        const { className, type, position, resizable } = this.props;

        var h = true;
        if(type !== 'h') {
            h = false;
        }

        var l = true;
        if(position !== 'left') {
            l = false;
        }

        var display = 'block';
        if(!this.state.expand || !resizable) {
            display = 'none';
        }

        return (
            <div id={this.id} className={classNames({'mainframe-splitter': true, 'h-splitter': h, 'v-splitter': !h, 'left-splitter': l, 'right-splitter': !l}, className)}
                onMouseDown={this.splitterMouseDown} onMouseUp={this.splitterMouseUp} onMouseMove={this.splitterMouseMove}>
                <div className={classNames({'splitter-collapse': this.state.expand, 'splitter-expand': !this.state.expand})} onClick={this.expandCollapse}></div>
                <div className="splitter-resize-handle" style={{display: display}}></div>
            </div>
        );
    }
}

MainFrameSplitter.propTypes = propTypes;
MainFrameSplitter.defaultProps = defaultProps;

export default MainFrameSplitter;
