module.exports = {
  webpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                symbolId: "[name]",
              },
            },
          ],
        },
      ],
    },
  },
};
