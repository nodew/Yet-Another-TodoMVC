module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  {
    test: /\.css$/,
    exclude: /(node_modules|.webpack)/,
    use: ['style-loader', 'css-loader'],
  }
];
