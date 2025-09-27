import { useState } from "react";
import "./Agenda.css";

function App() {
  const [contatos, setContatos] = useState([
    { id: 1, nome: "Carlos Eduardo", telefone: "71983739967" },
    { id: 2, nome: "Ivete", telefone: "71983739967" },
    { id: 3, nome: "Carlos", telefone: "71983739967" },
    { id: 4, nome: "Pipoca", telefone: "71983739967" },
    { id: 5, nome: "Miúda", telefone: "71983739967" },
  ]);

  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Adicionar contato
  const adicionarContato = () => {
    if (novoNome.trim() === "" || novoTelefone.trim() === "") return;

    const novoContato = {
      id: contatos.length + 1,
      nome: novoNome,
      telefone: novoTelefone,
    };

    setContatos([...contatos, novoContato]);
    setNovoNome("");
    setNovoTelefone("");
  };

  // Remover contato
  const removerContato = (id) => {
    setContatos(contatos.filter((c) => c.id !== id));
  };

  // Salvar edição
  const salvarEdicao = (id) => {
    setContatos(
      contatos.map((c) =>
        c.id === id ? { ...c, nome: novoNome, telefone: novoTelefone } : c
      )
    );
    setEditandoId(null);
    setNovoNome("");
    setNovoTelefone("");
  };

  return (
    <div className="agenda-container">
      <h1>Minha Agenda</h1>

      <div className="formulario">
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={novoTelefone}
          onChange={(e) => setNovoTelefone(e.target.value)}
          placeholder="Telefone"
        />
        <button onClick={adicionarContato}>Adicionar</button>
      </div>

      <div className="cards-container">
        {contatos.map((c) => (
          <div key={c.id} className="contato-card">
            {editandoId === c.id ? (
              <>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Novo nome"
                />
                <input
                  type="text"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  placeholder="Novo telefone"
                />
                <button className="salvar" onClick={() => salvarEdicao(c.id)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <div className="contato-info">
                  <h3>{c.nome}</h3>
                  <p>{c.telefone}</p>
                </div>
                <div className="botoes-card">
                  <button className="editar" onClick={() => setEditandoId(c.id)}>
                    Editar
                  </button>
                  <button className="remover" onClick={() => removerContato(c.id)}>
                    Remover
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
