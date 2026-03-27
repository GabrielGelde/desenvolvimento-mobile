import { useState } from "react";
import Botao from "./Botao.jsx";

function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);

  function adicionar() {
    if (tarefa.trim() === "") return;

    const nova = {
      id: Date.now(),
      texto: tarefa,
      feita: false,
    };

    setLista([...lista, nova]);
    setTarefa("");
  }

  function remover(id) {
    setLista(lista.filter((item) => item.id !== id));
  }

  function marcar(id) {
    setLista(
      lista.map((item) =>
        item.id === id ? { ...item, feita: !item.feita } : item
      )
    );
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
      />

      <Botao onClick={adicionar}>Adicionar</Botao>

      <ul>
        {lista.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.feita}
              onChange={() => marcar(item.id)}
            />

            <span
              style={{
                textDecoration: item.feita ? "line-through" : "none",
                margin: "0 10px",
              }}
            >
              {item.texto}
            </span>

           <Botao onClick={() => remover(item.id)}>🗑️</Botao>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;