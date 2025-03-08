import { Button } from "@/components/ui/button"
import {ThemeProvider} from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ModeToggle/>
      <Button>Click me</Button>
    </ThemeProvider>
  )
}

export default App
