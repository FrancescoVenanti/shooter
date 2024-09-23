import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import dotenv from "dotenv";
import livereload from "rollup-plugin-livereload";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import nodePolyfills from "rollup-plugin-polyfill-node";
import serve from "rollup-plugin-serve";
import webWorkerLoader from "rollup-plugin-web-worker-loader";


dotenv.config();
const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
    name: "app",
    sourcemap: true,
    globals: {
    },
  },
  plugins: [
    webWorkerLoader(),
    nodePolyfills(),
    resolve({
      browser: true,
      dedupe: ["socket.io-client"],
    }),
    replace({
      "process.env.SERVER_URL": JSON.stringify(
        process.env.SERVER_URL || "http://localhost:3000"
      ),
      preventAssignment: true,
    }),
    commonjs(),
    typescript(),
    builtins(),
    globals(),
    dev &&
      serve({
        open: true,
        contentBase: ["dist", "."],
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
    // "node:worker_threads", // Ensure worker_threads is marked as external
    "dotenv",
  ],
};
