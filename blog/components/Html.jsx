var React = require('react');
var { provideContext, connectToStores } =require('fluxible/addons');
var Html = React.createClass({

    render: function () {
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{this.props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,300italic,400italic' rel='stylesheet' type='text/css'/>
                <link href="/styles/main.css" rel="stylesheet" type="text/css"/>
                <script dangerouslySetInnerHTML={{__html: this.props.tracking}}></script>
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
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
    var title = stores.PageMetaDataStore.getCurrentMetadata().title || 'Texas Assessment Data Portal';
    return {
        title: title
    };
});

// and wrap that with context
Html = provideContext(Html);

module.exports = Html;
