const rules = require('./webpack.rules');

module.exports = {
  module: {
    rules,
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
};
