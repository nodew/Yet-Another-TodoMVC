const rules = require('./webpack.rules');
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, '../src/app/index.ts'),
  module: {
    rules,
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
};
