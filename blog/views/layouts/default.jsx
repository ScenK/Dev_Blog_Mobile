import React from 'react';

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <link href="/styles/main.css" rel="stylesheet" type="text/css"/>
        </head>
        <body>
          <section id="wrapper">
            <section id="contentWrapper">

              <header id="header">
                <a id="topBarIconMenu"></a>
                <h1 id="textLogo">{this.props.title}</h1>
              </header>

              <div className="siteLoader">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <section id="content">

                {this.props.children}

                <div className="greyBg cutOffStripesContainer hover">
                  <div className="cutOffStripeTop"></div>
                  <div className="webFont"><div id="loading_more">V</div></div>
                  <div className="cutOffStripeBottom"></div>
                </div>
              </section>
            </section>
          </section>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
