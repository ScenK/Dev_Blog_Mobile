import React from 'react';

var Header = React.createClass({

  render: function () {
    return (
      <header id="header" className="activeState">
        <a id="topBarIconMenu"></a>
        <h1 id="textLogo"> Sea_Kudo的博客 </h1>
      </header>
    );
  }

});

module.exports = Header;
