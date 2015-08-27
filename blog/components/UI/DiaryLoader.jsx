import React from 'react';

var DiaryLoader = React.createClass({

  render: function () {
    return (
      <div className="greyBg cutOffStripesContainer hover">
        <div className="cutOffStripeTop"></div>
        <div className="webFont">
          <div id="loading_more">V</div>
        </div>
        <div className="cutOffStripeBottom"></div>
      </div>
    );
  }

});

module.exports = DiaryLoader;
