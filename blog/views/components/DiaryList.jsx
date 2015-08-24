import React from 'react';

var DiaryList = React.createClass({

  render: function () {
    return (
      <li>
        <a ref="getDetail">
          <p className="listMeta">
            <span className="listMetaDate"><span className="webFont">P</span>111</span>
            <span className="listMetaAuthor">111</span>
          </p>
          <h2>
            111 <span className="webFont">I</span>
          </h2>
          <p>
            111
          </p>
        </a>
      </li>
    );
  }

});

module.exports = DiaryList;
