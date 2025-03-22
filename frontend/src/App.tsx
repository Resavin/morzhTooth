import "@/index.css";
import { ThemeProvider } from "@/components/buttonLayout";
import Child from "@/components/button";

function App() {
  return (
    <>
      {/* <Button> Общая информация </Button> */}
      {/* <Button> Комнаты </Button> */}
      {/* <Button> Ресторан </Button> */}
      {/* <Button> Галерея </Button> */}
      {/* <Button> Контакты </Button> */}
      <ThemeProvider>
        <div className="">
          <Child bgColor="bg-green-950" text="Общая информация" leftChild={

            <p className="text-white">
              Гостиница Клык Моржа. Лучшая в мире. Во всём. (И мире, и во всех
              аспектах).
            </p>
          }
            rightChild={

              <p className="text-white">Приходите</p>
            }>
          </Child>
          <Child bgColor="bg-blue-950" text="Общая информация" leftChild={

            <p className="text-white">
              Гостиница Клык Моржа. Лучшая в мире. Во всём. (И мире, и во всех
              аспектах).
            </p>
          }
            rightChild={

              <p className="text-white">Приходите</p>
            }>
          </Child>
          {/*   lols */}
          {/* </Child> */}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
