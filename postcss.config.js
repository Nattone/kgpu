module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          reduceIdents: false,
          discardUnused: { fontFace: false },
          discardComments: { removeAll: true },
        },
      ],
    }),
  ],
};
