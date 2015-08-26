
var React = require('react');
var classSet = require('classnames');

var FontIcon = React.createClass({

    getClassName: function () {
        return classSet({
            'font-icon': true,
        },this.props.iconClassName)
    },

    render: function () {
        var className = this.getClassName();
        return (
            <span
                {...this.props}
                className={className}
                >
                {this.props.children}
            </span>
        );
    }
});

module.exports = FontIcon;
