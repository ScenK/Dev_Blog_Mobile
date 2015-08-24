import React from 'react';
import request from 'superagent';
import _ from 'lodash';

import DefaultLayout from './layouts/default';
import DiaryList from './components/DiaryList';

var Home = React.createClass({

  getInitialState: function () {
    var data = [
      {
        category: "个人日记",
        title: "一次旅行-一次经历",
        comments: [ ],
        summary: " 一次旅行 一次经历 我们总是生活在自己的小世界里 不断不断的纠结于短暂的舍得 在美国的最后一个月里 到处在旅行 试图在行走中对这个国家更多的理解...",
        tags: [
        "个人日记",
        "旅行",
        "日记",
        "美国"
        ]
      },
      {
        category: "个人日记",
        title: "一次旅行-一次经历",
        comments: [ ],
        summary: " 一次旅行 一次经历 我们总是生活在自己的小世界里 不断不断的纠结于短暂的舍得 在美国的最后一个月里 到处在旅行 试图在行走中对这个国家更多的理解...",
        tags: [
        "个人日记",
        "旅行",
        "日记",
        "美国"
        ]
      }
    ]
    return {
      diaries: data
    }
  },

  componentDidMount: function () {
    // var url = 'http://api.tuzii.me/v1/diary/list/1';
    // var self = this;

    // request.get(url, function(err, res){
    //   if (err) throw err;
    //   console.log(res.body)
      // this.setState({
      //   diaries: data
      // })
    // });
  },

  getDefaultProps : function () {
    return {
      title: '首页 - Sea_Kudo的博客'
    }
  },

  render: function() {
    var diaries = this.state.diaries;
    var list = {};

    _.forEach(diaries, function (n, key) {
      list['post-' + key] = (
        <DiaryList/>
      );
    });

    return (
      <DefaultLayout title={this.props.title}>
        <ul id="blogList">
          {list}
        </ul>
      </DefaultLayout>
    );
  }
});

module.exports = Home;
