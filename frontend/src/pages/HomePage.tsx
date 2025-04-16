import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { RoomList } from "@/components/roomList";
import { TextSplitter } from "@/components/textSplitter";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isRoomListBlurred, setIsRoomListBlurred] = useState(false); // State to control blur
  const exitGame = () => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username"); // Clea
      window.location.reload();
    } else {
      alert("Не могу закрыть окно, откатываюсь в истории");
      navigate(-1); // Better than window.history.back()
    }
    // Redirect to a blank page and attempt to close it
    // window.open("/login");
    // window.close();
  };
  const handleMouseEnterRoomButton = () => {
    setIsRoomListBlurred(true); // Apply blur immediately on hover
    setTimeout(() => {
      setIsRoomListBlurred(false); // Remove blur after a delay (e.g., 500ms)
    }, 250); // Adjust the delay as needed (in milliseconds)
  };
  const [username, setUsername] = useState<string | null>(null); // State to store the username
  useEffect(() => {
    // Check if the user is logged in (e.g., via localStorage or global state)
    const storedUsername = localStorage.getItem("username"); // Replace with your auth logic
    if (storedUsername) {
      setUsername(storedUsername); // Update the username state
    }
  }, []);

  return (
    <div className="h-[30rem]">
      <Button
        bgColor="bg-lime-700"
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
        rightChild={
          <div
            className={`transition-all duration-300 ${
              isRoomListBlurred ? "blur-sm" : ""
            }`}
          >
            <RoomList />
          </div>
        }
        mouseAction={handleMouseEnterRoomButton} // Trigger on hover
      >
      </Button>

      <Button
        bgColor="bg-cyan-700"
        text={username ? "Список бронирований" : "Вход"}
        to={username ? "/bookings" : "/login"}
      >
      </Button>
      <Button
        onClick={exitGame}
        bgColor="bg-teal-700"
        text={username ? `Выход, ${username}` : `Выход`}
      >
      </Button>
    </div>
  );
};
