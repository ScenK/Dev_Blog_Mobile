import _ from 'lodash';
import React from 'react';

var CheckboxList = React.createClass({

    propTypes: {
        displayName: React.PropTypes.string,
        checkItems: React.PropTypes.array,
        defaultValue: React.PropTypes.array,
        single: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        allowEmpty: React.PropTypes.bool
    },
    getDefaultProps(){
        return {
            allowEmpty: true
        }
    },
    getInitialState(){
        var state = this.getDefaultState(this.props);
        return state;
    },
    getDefaultState(props){
        return {
            displayName: props.displayName,
            checkItems: props.checkItems,
            single: props.single,
            allowEmpty: props.allowEmpty,
            value: null
        }
    },

    componentDidMount: function () {
        this.initDefaltValues();
    },

    componentWillReceiveProps: function (newProps) {
        this.setState(this.getDefaultState(newProps), this.initDefaltValues)
    },

    getValue: function () {
        return this.state.value;
    },

    initDefaltValues: function () {
        var defaltValues = [];
        _.each(this.state.checkItems, function (item) {
            if (item.checked) {
                defaltValues.push(item.value);
            }
        });
        if (defaltValues.length > 0) {
            this.setState({
                value: defaltValues.join(',')
            });
        }
    },

    onChange(selectItem){
        var self = this;
        var checkItems = _.cloneDeep(this.state.checkItems);
        _.each(checkItems, function (item) {
            if (item.value == selectItem.value) {
                item.checked = !item.checked;
            } else {
                if (self.state.single) {
                    item.checked = false;
                }
            }
        })
        var values = [];
        _.each(checkItems, function (item) {
            if (item.checked) {
                values.push(item.value);
            }
        });
        if (values.length > 0 || this.state.allowEmpty) {
            this.setState({
                value: values.join(','),
                checkItems: checkItems
            }, function () {
                if (this.props.onChange) {
                    this.props.onChange();
                }
            });
        }
    },

    getCheckboxItem(item, index){
        var id = this.state.displayName + '_' + item.value;
        var inputType = this.state.single ? "radio" : "checkbox";
        return (
            <div className="checkbox-list-item" key={index}>
                <input id={id} onChange={this.onChange.bind(null,item)} name={this.state.displayName} type={inputType}
                       checked={item.checked}
                       value={item.value}/>
                <label htmlFor={id}>{item.text}</label>
            </div>
        );
    },

    render(){
        return (
            <div className="checkbox-list">
                <label className='checkbox-list-title'>{this.state.displayName}:</label>
                {this.state.checkItems.map(this.getCheckboxItem)}
            </div>)
    }

});

export default CheckboxList;