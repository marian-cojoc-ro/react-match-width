import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'lib/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        'react',
        ['es2015', { modules: false }]
      ],
      plugins: ['external-helpers']
    }),
    commonjs(),
  ],
};