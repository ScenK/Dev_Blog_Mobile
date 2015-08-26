import React from 'react';

var SiteLoader = React.createClass({

  render: function () {
    return (
      <div className="siteLoader activeState">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

});

module.exports = SiteLoader;
