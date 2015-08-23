import React from 'react';
import DefaultLayout from './layouts/default';
import DiaryList from './components/DiaryList';

var Home = React.createClass({

  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <DiaryList/>
      </DefaultLayout>
    );
  }
});

module.exports = Home;
