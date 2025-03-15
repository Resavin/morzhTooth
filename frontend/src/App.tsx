import '@/index.css'
import { ThemeProvider } from '@/components/buttonLayout'
import Child from '@/components/button'

function App() {

  return (
    <>
      {/* <Button> Общая информация </Button> */}
      {/* <Button> Комнаты </Button> */}
      {/* <Button> Ресторан </Button> */}
      {/* <Button> Галерея </Button> */}
      {/* <Button> Контакты </Button> */}
      <ThemeProvider>
        <Child />
        <Child />
      </ThemeProvider>
    </>
  )
}

export default App
