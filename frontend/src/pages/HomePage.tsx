import { useNavigate } from "react-router";
import { Button } from "@/components/button";
import { RoomList } from "@/components/roomList";
import { TextSplitter } from "@/components/textSplitter";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const exitGame = () => {
    navigate(-1); // Better than window.history.back()
  };
  return (
    <div className="h-[30rem]">
      <Button
        bgColor="bg-lime-800"
        text="Общая информация"
        leftChild={
          <TextSplitter
            className="text-white text-right"
            text="Гостиница Клык Моржа. Вторая итерация. Первая в мире. Во всём. Приходите."
          >
          </TextSplitter>
        }
        rightChild={
          <div className="size-full text-white">
            <p>
              Контактный телефон: +7911239232ы
            </p>
            <p>
              Электронная почта: morzhIKKi@gmail.com
            </p>
            <p>Адрес: Испания, г. Ламанч, ул. Победителей 32</p>
          </div>
        }
      >
      </Button>
      <Button
        bgColor="bg-sky-700"
        text="Комнаты"
        leftChild={
          <TextSplitter
            className="text-white text-right"
            text="
                        Все комнаты, представленные здесь являются лучшими в
                        своём роде.
                        По каждому возможному параметру.
                        Подходят каждому человеку, будто на заказ.
                      "
          >
          </TextSplitter>
        }
        rightChild={<RoomList />}
      >
      </Button>

      <Button
        bgColor="bg-neutral-800"
        text="Вход"
        to="/login"
      >
      </Button>
      <Button
        onClick={exitGame}
        bgColor="bg-black"
        text="Выход"
      >
      </Button>
    </div>
  );
};
