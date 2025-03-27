import "@/index.css";
import { ButtonLayout } from "@/components/buttonLayout";
import { Button } from "@/components/button";

function App() {
  return (
    <>
      {/* <Button> Общая информация </Button> */}
      {/* <Button> Комнаты </Button> */}
      {/* <Button> Ресторан </Button> */}
      {/* <Button> Галерея </Button> */}
      {/* <Button> Контакты </Button> */}
      <ButtonLayout>
        <div className="">
          <Button
            bgColor="bg-green-950"
            text="Общая информация"
            leftChild={
              <p className="size-fit text-white">
                Гостиница Клык Моржа. Лучшая в мире. Во всём. (И мире, и во всех
                аспектах). Placeholder аспектах). Placeholder аспектах).
                Placeholder аспектах). Placeholder аспектах). Placeholder
                аспектах). Placeholder аспектах). Placeholder аспектах).
                Placeholder аспектах). Placeholder аспектах). Placeholder
                аспектах). Placeholder аспектах). Placeholder
              </p>
            }
            rightChild={
              <div>
                <p className="size-full text-white">Приходите</p>
              </div>
            }
          >
          </Button>
          <Button
            bgColor="bg-blue-950"
            text="Комнаты"
            leftChild={
              <p className="size-fit text-white">
                Гостиница Клык Моржа. Лучшая в мире. Во всём. (И мире, и во всех
                аспектах). Placeholder аспектах). Placeholder аспектах).
                Placeholder аспектах). Placeholder аспектах). Placeholder
                аспектах). Placeholder аспектах). Placeholder аспектах).
                Placeholder аспектах). Placeholder аспектах). Placeholder
                аспектах). Placeholder аспектах). Placeholder
              </p>
            }
            rightChild={
              <div className="size-full flex flex-wrap space-x-10 space-y-10">
                <img
                  src="https://picsum.photos/200/200"
                  alt="Random Placeholder"
                />
                <img
                  src="https://picsum.photos/200/200"
                  alt="Random Placeholder"
                />
                <img
                  src="https://picsum.photos/200/200"
                  alt="Random Placeholder"
                />
              </div>
            }
          >
          </Button>
        </div>
      </ButtonLayout>
    </>
  );
}

export default App;
