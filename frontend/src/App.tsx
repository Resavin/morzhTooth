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
        <Child bgColor="bg-green-500" text="Общая информация">
          dfsd
        </Child>
        <Child bgColor="bg-blue-500" text="lol">
          lols
        </Child>
      </ThemeProvider>
    </>
  )
}

export default App
