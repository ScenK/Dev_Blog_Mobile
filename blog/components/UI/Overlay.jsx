var React = require('react');
var classSet = require('classnames');
var Overlay = React.createClass({

    propTypes: {
        show: React.PropTypes.bool,
    },

    getClassName: function () {
        return classSet({
            'overlay': true,
            'overlay-show': this.props.show
        })
    },

    render() {
        var className = this.getClassName();
        return (
            <div
                {...this.props}
                className={className}
                >
            </div>
        );
    }
});

module.exports = Overlay;
