import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dotenv from "dotenv";
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
    commonjs(),
    typescript(),
    dev &&
      serve({
        open: true,
        contentBase: ["dist", "."], // or ['public', '.'] if using a public folder
        host: "localhost",
        port: 10001,
      }),
    dev && livereload("dist"),
  ],
  external: [
    "tslib",
    "node:crypto",
    "node:fs",
    "node:process",
    "dotenv",
    // "socket.io-client",
  ],
};
