const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    //指定的打包形式
    mode: 'development',
    entry: {
        main:  path.resolve(__dirname, '../src/main.js')
    },
   
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'

    },
    stats: { 
        children: false 
    },
    devServer: {
        hot: true,
        port: 3000,
        contentBase: './dist'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },{
                test: /\.(scss|sass)$/, // 添加sass 转换
                use: [
                    {
                        loader:'style-loader'  // css 解析到 html页面 的 style 上
                    },{
                        loader: 'css-loader',  // 解析css文件
                        options: {
                            importLoaders: 2
                        }
                    },{
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    },{
                        loader: 'postcss-loader'  //配置 postcss 实现自动添加css3前缀
                    }
                ]
            },
            //打包图片 媒体 字体等文件
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    },
                ]

            },{
                test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    },
                ]

            },{
                test: /\.(woff2|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    },
                ]

            },{
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },{
                        loader: 'thread-loader'
                    },{
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },{
                        loader: 'thread-loader'
                    },{
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              VUE_APP_BASE_URL: JSON.stringify('http://localhost:3000')
            }
          }),
    ]
}