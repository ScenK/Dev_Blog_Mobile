var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var env = require('./blog/configs/development');
var webpackDevConfig = require('./webpack.dev.config');

var CHUNK_REGEX = /^([A-Za-z0-9_\-]+)\..*/;

module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        // project variables
        project: {
            build: path.join(__dirname, '/blog/public/build'),
            public: 'blog/public'
        },
        // clean build
        clean: [path.join(__dirname, '/blog/public/build/js')],

        less: {
            dev: {
                files: {
                    "./blog/public/styles/main.css": "./blog/public/styles/main.less"
                }
            },
            prod: {
                files: {
                    "./blog/public/styles/main.css": "./blog/public/styles/main.less",
                },
                options: {
                    compress: true
                }
            }
        },
        // webpack bundling
        webpack: {
            test: {
                context: path.join(__dirname, '/unitTest'),
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: {
                    test:['./index.js']
                },
                output: {
                    path: '<%= project.test %>',

                    filename: '[name].js',
                    chunkFilename: '[name].[chunkhash].js'
                },
                module: {
                    loaders: [
                        {test: /\.jsx?$/, exclude: /node_modules/, loader: require.resolve('babel-loader')},
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('development')
                        }
                    }),
                    new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
                ],

                stats: {
                    colors: true
                },

                devtool: 'source-map'
            },
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './blog/client.js',
                output: {
                    path: '<%= project.build %>/js',
                    filename: '[name].[chunkhash].min.js',
                    chunkFilename: '[name].[chunkhash].min.js'
                },
                module: {
                    loaders: [
                        {test: /\.jsx?$/, exclude: /node_modules/, loader: require.resolve('babel-loader')},
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),

                    // These are performance optimizations for your bundles
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.CommonsChunkPlugin('common.[hash].min.js', 2),

                    // This ensures requires for `react` and `react/addons` normalize to the same requirement
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons')),

                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        }
                    }),

                    // generates webpack assets config to use hashed assets in production mode
                    function webpackStatsPlugin() {
                        this.plugin('done', function (stats) {
                            var data = stats.toJson();
                            var assets = data.assetsByChunkName;
                            var output = {
                                assets: {},
                                cdnPath: this.options.output.publicPath
                            };

                            Object.keys(assets).forEach(function eachAsset(key) {
                                var value = assets[key];
                                // if `*.[chunkhash].min.js` regex matched, then use file name for key
                                var matches = key.match(CHUNK_REGEX);
                                if (matches) {
                                    key = matches[1];
                                }
                                output.assets[key] =  '/build/js/' + value;
                            });
                            fs.writeFileSync(
                                path.join(__dirname, '/blog/public/build', 'assets.json'),
                                JSON.stringify(output, null, 4)
                            );
                        });
                    }
                ],
                // removes verbosity from builds
                progress: false
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                historyApiFallback: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                port: env.hot_server_port,
                webpack: webpackDevConfig,
                publicPath: webpackDevConfig.output.publicPath,
                contentBase: 'http://' + env.hot_server_host + ':' + env.hot_server_port
            },
            start: {
                keepAlive: true
            }
        },

        watch: {
            options: {
                nospawn: true
            },

            less: {
                files: ["<%= project.public %>/styles/**/*.less"],
                tasks: ["less:dev"]
            }
        }

    });

    //development environment task
    grunt.registerTask('default', ['clean', 'less:dev', 'webpack-dev-server']);

    //production environment task
    grunt.registerTask('prod', ['clean', 'less:prod', 'webpack:prod']);

    //test task
    grunt.registerTask('test', ['clean', 'webpack:test', 'karma']);

};
