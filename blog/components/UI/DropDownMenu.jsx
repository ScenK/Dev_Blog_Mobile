import React from 'react';
import classSet from 'classnames';
import ClickAwayable from '../../mixins/ClickAwayableMixin';
import WindowListenable from '../../mixins/window-listenable';
import dom from '../../utils/dom';
import FontIcon from './FontIcon';

var DropDownMenu = React.createClass({

    mixins: [ClickAwayable,WindowListenable],

    propTypes: {
        iconText: React.PropTypes.string,
        iconClassName: React.PropTypes.string,
        className: React.PropTypes.string,
        onChange: React.PropTypes.func,
        menuItems: React.PropTypes.array,
        closeOnMenuItemClick: React.PropTypes.bool,
        position: React.PropTypes.string,
        fillHeight: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            closeOnMenuItemClick: true,
            position: 'left',
            fillHeight: false
        };
    },

    getInitialState() {
        return {
            open: false
        };
    },
    windowListeners:{
        resize: '_positionBody',
    },
    componentDidMount() {

    },
    componentDidUpdate() {
        this._positionBody();
    },
    componentClickAway() {
        this.setState({open: false});
    },

    render() {
        var containerClass = classSet({
            'drop-down-menu': true,
            'open': this.state.open
        }, this.props.className)
        var buttonClass = classSet({
            'drop-down-button': true,
            'text': this.props.iconText
        })
        return (
            <div className={containerClass}>
                <div className={buttonClass} ref="button" onClick={this.onControlClick}>
                    <FontIcon iconClassName={this.props.iconClassName}
                        ></FontIcon>
                    {this.props.iconText && (
                        <span className="drop-down-button-text">{this.props.iconText}</span>
                    )}
                </div>
                <div className='drop-down-body' ref="body">
                    {this.props.children}
                </div>
            </div>
        )
    },

    onControlClick() {
        this.setState({open: !this.state.open});
    },

    onMenuItemClick(e, key, payload) {
        if (this.props.onChange) this.props.onChange(e, key, payload);

        if (this.props.closeOnMenuItemClick) {
            this.setState({open: false});
        }
    },
    _positionBody: function () {
        var container = this.getDOMNode();
        var body = this.refs.body.getDOMNode();
        var button = this.refs.button.getDOMNode();
        var bodyWidth = body.offsetWidth;
        var buttonWidth = button.offsetWidth;
        if (this.state.open) {
            if (this.props.position == 'left') {
                var left = 0;
                var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (container.offsetLeft + bodyWidth > clientWidth) {
                    left = -(bodyWidth - buttonWidth + 2);
                }
                body.style.left = left + "px";
            } else if (this.props.position == 'right') {
                body.style.right = "0px";
            }
            if (this.props.fillHeight) {
                var offset=dom.offset(container);
                var height = 0;
                var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                height = clientHeight - offset.top;
                body.style.height = height + "px";
            }else{
                body.style.height ="initial";
            }
        }else{
            body.style.height = "0px";
        }
    }
});

module.exports = DropDownMenu;
