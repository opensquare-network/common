import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src"],
  format: ["cjs", "esm"],
  treeshake: true,
  legacyOutput: true,
  dts: true,
});
