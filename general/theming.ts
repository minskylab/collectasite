import { createTheming } from "@callstack/react-theme-provider";
import themes from "./themes";

const { ThemeProvider, useTheme } = createTheming(themes.light);

export { ThemeProvider, useTheme };
