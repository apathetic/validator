import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/validator.js',
  moduleName: 'Validator',
  plugins: [
    buble()
  ],

  targets: [
    { dest: 'dist/validator.cjs.js', format: 'cjs' },
    { dest: 'dist/validator.es6.js', format: 'es' },
    { dest: 'dist/validator.browser.js', format: 'iife' }
  ]
};
