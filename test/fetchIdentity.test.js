import { test, expect } from "vitest";
import { createFetchIdentity } from "../src/services/identity";

const fetchIdentity = createFetchIdentity();

test("fetchIdentity error", async () => {
  await expect(
    fetchIdentity("kusama", "15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHdde"),
  ).rejects.toThrow();
});

test("fetchIdentity success", async () => {
  // Will fetch from https://id.statescan.io by default when env configuration does not exist
  await expect(
    fetchIdentity("kusama", "GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj"),
  ).resolves.toEqual({
    address: "GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj",
    info: {
      display: "RTTI-5220",
      status: "VERIFIED",
    },
  });
});
