import { test, expect } from "vitest";
import {
  fetchIdentity,
} from "../src/services/identity";

test("fetchIdentity error", async () => {
  await expect(
    fetchIdentity("kusama", "15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHdde")
  ).rejects.toThrow();
});

test("fetchIdentity success", async () => {
  await expect(
    fetchIdentity("kusama", "GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj")
  ).resolves.toEqual({
    address: "GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj",
    info: {
      display: "RTTI-5220",
      status: "VERIFIED"
    }
  });
});
