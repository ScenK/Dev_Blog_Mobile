var React = require('react');
var { provideContext, connectToStores } =require('fluxible/addons');
var Html = React.createClass({

  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <link href="/styles/main.css" rel="stylesheet" type="text/css" />

          <script dangerouslySetInnerHTML={{__html: this.props.tracking}}></script>
        </head>
        <body>

          <section id="wrapper" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>

          <script dangerouslySetInnerHTML={{__html: this.props.exposed}}></script>
          <script src={this.props.assets.common}></script>
          <script src={this.props.assets.main}></script>
        </body>
      </html>
      );
  }
})

// connect to stores
Html = connectToStores(Html, ['PageMetaDataStore'], function (stores, props) {
  var title = stores.PageMetaDataStore.getCurrentMetadata().title || 'Sea_Kudo的博客';
  return {
    title: title
  };
});

// and wrap that with context
Html = provideContext(Html);

module.exports = Html;
