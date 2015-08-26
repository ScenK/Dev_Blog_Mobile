/**
 * Created by hshen on 5/28/2015.
 */
var React = require('react');
var classSet = require('classnames');

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

module.exports = {
    propTypes: {
        activeClassName: React.PropTypes.string.isRequired,
        disabled: React.PropTypes.bool,
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        query: React.PropTypes.object,
        onClick: React.PropTypes.func
    },
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },


    getDefaultProps: function () {
        return {
            activeClassName: 'active'
        };
    },

    /**
     * Returns the value of the "href" attribute to use on the DOM element.
     */
    getHref: function () {
        return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
    },

    /**
     * Returns the value of the "class" attribute to use on the DOM element, which contains
     * the value of the activeClassName property when this <Link> is active.
     */
    getClassName: function () {
        var classNames = {};

        if (this.props.className) {
            classNames[this.props.className] = true;
        }

        if (this.context.router.isActive(this.props.to, this.props.params, this.props.query)) {
            classNames[this.props.activeClassName] = true;
        }

        return classSet(classNames);
    },

    handleRouteTo: function (event) {
        var allowTransition = true;
        var clickResult;

        if (this.props.disabled) {
            return;
        }

        if (this.props.onClick) {
            clickResult = this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (clickResult === false || event.defaultPrevented === true) {
            allowTransition = false;
        }

        event.preventDefault();

        if (allowTransition) {
            this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
        }
    }
};