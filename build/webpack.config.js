const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //指定的打包形式
    mode: 'development',
    entry: {
        //配置文件的入口  babel-polyfill 对一些不支持新语法的客户端提供新语法的实现
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'

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
                        loader: 'css-loader'  // 解析css文件
                    },{
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    },{
                        loader: 'postcss-loader'  //配置 postcss 实现自动添加css3前缀
                    }
                ]
            }
        ]
    },
    plugins: {
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    }
}