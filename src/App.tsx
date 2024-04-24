import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid'; // Importa uuid
import { FaTrash } from 'react-icons/fa';

interface Item {
 id: string;
 text: string;
}

const ITEMS: Item[] = [
 {
    id: uuidv4(), //uuidv4() para generar un ID único
    text: "Peliculas",
 },
 {
    id: uuidv4(), 
    text: "Libros",
 },
];

function App() {
 const [items, setItems] = useState(ITEMS);
 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: uuidv4(), 
      text: input.value,
    };
    setItems((prevItems) => {
      return [...prevItems, newItem]; 
    });
    input.value = "";
 };

 return (
    <>
      <main>
        <aside>
          <h2>Agregar elementos a una lista</h2>
          <form onSubmit={handleSubmit}> 
            <label>
              Elemento a ingresar a la lista:
              <input name="item" required type="text" placeholder="elementos" />
            </label>
            <button type="submit">Agregar</button> 
          </form>
        </aside>
        <section>
          <h3>lista de elementos</h3>
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id}>
                 {item.text}
                 <FaTrash className="trash"
                    onClick={() => {
                      setItems((prevItems) => {
                        return prevItems.filter(currentItem => currentItem.id !== item.id);
                      });
                    }}
                 />
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
 );
}

export default App;

