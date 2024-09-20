import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import typescript from "@rollup/plugin-typescript";
import dotenv from 'dotenv';
import livereload from "rollup-plugin-livereload";
import nodePolyfills from "rollup-plugin-polyfill-node";
import serve from "rollup-plugin-serve";

dotenv.config();
const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "app",
    sourcemap: true,
    globals: {
      "node:crypto": "crypto",
      // "socket.io-client": "socket_ioClient",
    },
  },
  plugins: [
    nodePolyfills(/* options */),
    resolve({
      browser: true,
      dedupe: ["socket.io-client"],
    }),
    replace({
      'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL || 'http://localhost:3000'),
      preventAssignment: true,
    }),
    commonjs(),
    typescript(),
    dev &&
      serve({
        open: true,
        contentBase: ["dist", "."], // or ['public', '.'] if using a public folder
        host: "0.0.0.0",
        port: 10001,
      }),
    dev && livereload("dist"),
  ],
  external: [
    "tslib",
    "node:crypto",
    "node:fs",
    "node:process",
    "dotenv"
    // "socket.io-client",
  ],
};
