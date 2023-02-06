import "./App.css";
import { useState, useEffect } from "react";
import style from "./Style.module.css";
import { nanoid } from "nanoid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todo));
  }, [todo]);
  const deleteTodo = (id) => {
    setTodo(todo.filter((el) => el.id !== id));
  };
  const updatePosition = (data, index) => {
    let newArray = [...todo];
    newArray[index].defaultPosition = { x: data.x, y: data.y };
    setTodo(newArray);
  };

  const newItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        id: nanoid(),
        todo: inputValue,
        color: randomColor({
          luminosity: "light",
        }),
        textColor: randomColor({
          luminosity: "dark",
        }),
        defaultPosition: {
          x: 500,
          y: -400,
        },
      };

      setTodo((prevState) => [...prevState, newItem]);
      setInputValue("");
    } else {
      alert("Enter something...");
      setInputValue("");
    }
  };
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()} className={style.wrapper}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Enter something..."
        />
        <button type="submit" onClick={newItem} className={style.btnEnter}>
          Enter
        </button>
      </form>
      {todo.length > 0 &&
        todo.map((el, index) => (
          <Draggable
            onStop={(_, data) => {
              updatePosition(data, index);
            }}
            key={el.id}
            defaultPosition={el.defaultPosition}
          >
            {
              <div
                style={{ backgroundColor: el.color, color: el.textColor }}
                className={style.todoItem}
              >
                {el.todo}
                {
                  <button
                    onClick={() => deleteTodo(el.id)}
                    className={style.btnDelete}
                  >
                    &#10006;
                  </button>
                }
              </div>
            }
          </Draggable>
        ))}
    </div>
  );
}

export default App;
