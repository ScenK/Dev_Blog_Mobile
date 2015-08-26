import React from 'react';

var SideBar = React.createClass({

  render: function () {
    return (
      <aside id="sidebar">
        <ul id="listMenu">
          <li className="title">Main menu</li>
          <li><a>Blog</a></li>
          <li><a>Gallery<span className="counter">17</span></a></li>
          <li className="title">ARCHIVES</li>
          <li><a>Objective-c<span className="counter">1</span></a></li>
          <li><a>学习资料<span className="counter">2</span></a></li>
          <li><a>Tornado<span className="counter">6</span></a></li>
        </ul>
      </aside>
    );
  }

});

module.exports = SideBar;
