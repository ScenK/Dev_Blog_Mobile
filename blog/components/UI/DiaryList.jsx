import React from 'react';

var DiaryList = React.createClass({

  render: function () {
    return (
      <ul id="blogList">
        <li>
          <a>
            <p className="listMeta">
              <span className="listMetaDate"><span className="webFont">P</span> May 26 2015</span>
              <span className="listMetaAuthor">tuzii</span>
            </p>

            <h2>伤不起的node和新的网站 <span className="webFont">I</span></h2>
            <p>
              因为现在这个网站太过私人 记录了不少个人的日记 作为一个简历档写在名片上和招聘履历上来说略尴尬

              所以我又给自己挖了个坑 并且已经跳了一半了...
            </p>
          </a>
        </li>
        <li>
          <a>
            <p className="listMeta">
              <span className="listMetaDate"><span className="webFont">P</span> May 26 2015</span>
              <span className="listMetaAuthor">tuzii</span>
            </p>

            <h2>伤不起的node和新的网站 <span className="webFont">I</span></h2>
            <p>
              因为现在这个网站太过私人 记录了不少个人的日记 作为一个简历档写在名片上和招聘履历上来说略尴尬

              所以我又给自己挖了个坑 并且已经跳了一半了...
            </p>
          </a>
        </li>
      </ul>
    );
  }

});

module.exports = DiaryList;
