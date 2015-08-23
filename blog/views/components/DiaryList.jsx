import React from 'react';

var DiaryList = React.createClass({

  getInitialState: function() {
    return {
      title: '',
      author: '',
      public_time: '',
      summary: ''
    };
  },

  getDefaultProps : function () {
    return {
      title : 'Hello World',
      author: 'tuzii',
      public_time: '12 12 12',
      summary: 'asdasdasdasdasd'
    };
  },

  handleClick: function() {
    console.log(2)
  },

  componentWillMount: function () {
    console.log(1)
  },

  render: function () {
    return (
      <li>
        <a ref="getDetail" onClick={this.handleClick}>
          <p className="listMeta">
            <span className="listMetaDate"><span className="webFont">P</span>{this.props.title}</span>
            <span className="listMetaAuthor">{this.props.author}</span>
          </p>
          <h2>
            {this.props.title} <span className="webFont">I</span>
          </h2>
          <p>
            {this.props.summary}
          </p>
        </a>
      </li>
    );
  }

});

module.exports = DiaryList;
