import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
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
    },
  },
  plugins: [
    nodePolyfills({
      include: ["node:crypto", "node:fs", "node:process", "worker_threads"],
    }),
    resolve({
      browser: true,
      dedupe: ["socket.io-client", "worker_threads"],
    }),
    replace({
      "process.env.SERVER_URL": JSON.stringify(
        process.env.SERVER_URL || "http://localhost:3000"
      ),
      preventAssignment: true,
    }),
    commonjs(),
    typescript(),
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
    "worker_threads", // Ensure worker_threads is marked as external
    "dotenv",
  ],
};
