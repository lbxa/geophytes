import { describe, expect, it } from "vitest";

import { slug } from "./slug";

describe("slug", () => {
  it("converts to lowercase", () => {
    expect(slug("HELLO")).toBe("hello");
    expect(slug("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slug("hello world")).toBe("hello-world");
    expect(slug("hello   world")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slug("hello! world?")).toBe("hello-world");
    expect(slug("hello@#$%world")).toBe("hello-world");
  });

  it("handles numbers correctly", () => {
    expect(slug("hello 123")).toBe("hello-123");
    expect(slug("web 3.0")).toBe("web-3-0");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slug("!hello world!")).toBe("hello-world");
    expect(slug("  hello world  ")).toBe("hello-world");
  });

  it("handles complex cases", () => {
    expect(slug("My Cool Project (2024)!")).toBe("my-cool-project-2024");
    expect(slug("Web 3.0 & AI Solutions")).toBe("web-3-0-ai-solutions");
    expect(slug("$$$ Special Offer!!!")).toBe("special-offer");
  });
});
