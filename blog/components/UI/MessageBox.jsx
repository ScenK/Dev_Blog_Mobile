var React = require('react');
var classSet = require('classnames');
var Overlay = require('./Overlay');
var MessageBox = React.createClass({
    propTypes: {
        status: React.PropTypes.string,
        message: React.PropTypes.string,
        close: React.PropTypes.bool,
        showImmediately: React.PropTypes.bool
    },
    getDefaultProps(){
        return {
            showImmediately: false,
            close: true
        }
    },
    getInitialState() {
        return {
            show: this.props.showImmediately || false
        };
    },
    componentWillReceiveProps(newprops){
        this.setState({
            show: newprops.showImmediately
        })
    },
    getClassName: function () {
        return {
            container: classSet({
                'messagebox': true,
                'messagebox-show': this.state.show
            }, this.props.status),
            status: classSet({
                'messagebox-status': true
            }, this.props.status),

            close: classSet({
                'messagebox-close': true,
                'messagebox-close-show': this.props.close
            }),

        }
    },
    onClose: function () {
        this.setState({
            show: false
        }, function () {
            if (this.props.onClose) {
                this.props.onClose();
            }
        });
    },
    render(){
        var className = this.getClassName();
        return (
            <div className={className.container}>
                <div className='messagebox-body'>
                    <table className="messagebox-table">
                        <tbody>
                        <tr>
                            <td>
                                <div className={className.status}></div>
                            </td>
                            <td>
                                <div className="messagebox-info">{this.props.message}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={className.close} onClick={this.onClose}></div>
                </div>
                <Overlay show={this.state.show}/>
            </div>

        )
    }
})

module.exports = MessageBox;