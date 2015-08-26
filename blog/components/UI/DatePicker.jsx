import React from 'react';
import classSet from 'classnames';
import dateTime from '../../utils/datetime'


var DatePicker = React.createClass({

    propTypes: {
        datetype: React.PropTypes.array,
        maxage: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            datetype: ['month', 'day', 'year'],
            maxage: 100
        }
    },

    getInitialState() {
        return {
            month: this.props.month,
            year: this.props.year,
            day: this.props.day
        }
    },

    getClassName() {
        return classSet({
            'datepicker': true,
        })
    },

    render() {
        var className = this.getClassName();
        return (
            <div className={className}>
                {this.renderSelect()}
            </div>
        );
    },

    renderSelect() {
        var selectors = this.props.datetype.map((type, index)=> {
            return this['render' + type]();
        })
        return selectors;
    },

    getValue(){
        if (isNaN(this.state.year) || isNaN(this.state.month) || isNaN(this.state.day)) {
            return "";
        } else {
            var date = new Date(this.state.year, this.state.month, this.state.day);
            return dateTime.format(date);
        }
    },

    onMonthChange(e){
        var month = e.target.value;
        this.setState({
            month: month
        })
    },
    onDayChange(e){
        var day = e.target.value;
        this.setState({
            day: day
        })
    },
    onYearChange(e){
        var year = e.target.value;
        this.setState({
            year: year
        })
    },
    rendermonth(){
        var options = [];
        options.push(<option key='placeholder'>Month</option>)
        for (var i = 0; i < 12; i++) {
            if (this.state.month && (this.state.month == i)) {
                options.push(<option key={i} value={i}>{dateTime.getShortMonth(i)}</option>);
            } else {
                options.push(<option key={i} value={i}>{dateTime.getFullMonth(i)}</option>);
            }
        }
        return <select key='month' className="form-fields-input" ref="month" value={this.state.month}
                       onChange={this.onMonthChange}>
            {options}
        </select>
    },
    renderday(){
        var options = [];
        options.push(<option key='placeholder'>Day</option>)
        for (var i = 0; i < 31; i++) {
            options.push(<option key={i} value={i+1}>{i + 1}</option>);
        }
        return <select key='day' className="form-fields-input" ref="day" value={this.state.day}
                       onChange={this.onDayChange}>
            {options}
        </select>
    },
    renderyear(){
        var maxYear = new Date().getFullYear();
        var options = [];
        options.push(<option key='placeholder'>Year</option>)
        for (var i = 0; i < this.props.maxage; i++) {
            options.push(<option key={i} value={maxYear-i}>{maxYear - i}</option>);
        }
        return <select key='year' className="form-fields-input" ref="years" value={this.state.year}
                       onChange={this.onYearChange}>
            {options}
        </select>
    },

});

module.exports = DatePicker;
