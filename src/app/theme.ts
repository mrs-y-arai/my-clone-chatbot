"use client";

import { generateColors } from "@mantine/colors-generator";
import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "green",
  colors: {
    background: generateColors("#ffffff"),
    foreground: generateColors("#171717"),
    green: generateColors("#86efac"),
    border: generateColors("#e5e7eb"),
    success: generateColors("#22c55e"),
    warning: generateColors("#f59e0b"),
    error: generateColors("#ef4444"),
    info: generateColors("#3b82f6"),
  },
  defaultRadius: "md",
  headings: {
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: rem(32),
        lineHeight: rem(40),
      },
      h2: {
        fontSize: rem(24),
        lineHeight: rem(32),
      },
    },
  },
  components: {
    LoadingOverlay: {
      styles: {
        zIndex: 1000,
      },
      defaultProps: {
        overlayOpacity: 0.75,
        radius: "md",
        blur: 2,
      },
    },
  },
});
