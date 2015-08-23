import React from 'react';
import DefaultLayout from './layouts/default'

var Home = React.createClass({

  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
});

module.exports = Home;
