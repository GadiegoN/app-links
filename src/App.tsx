import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routes";
import { ThemeProvider } from "./components/theme-provider";
import { ColorProvider } from "./context/color-context";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ColorProvider>
        <RouterProvider router={router} />
      </ColorProvider>
    </ThemeProvider>
  )
}
