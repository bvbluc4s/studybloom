import { useState, useEffect} from "react";

function Gastos() {

    const [gastos, setGastos] = useState([]);
    const [nomeGasto, setNomeGasto] = useState("");
    const [valorGasto, setValor] = useState(0);
    const [categoria, setCategoria] = useState("Transporte");
    const [ordem, setOrdem] = useState("recente")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/gastos")
        .then(response => response.json())
        .then(data => setGastos(data));
    }, []);

    async function adicionarGasto() {
    if (nomeGasto.trim() === "") return;

    const nomeFormatado = nomeGasto.trim().charAt(0).toUpperCase() + nomeGasto.trim().slice(1)
    const novoGasto = {
        nome: nomeFormatado,
        valor: parseFloat(valorGasto),
        gastoCategoria: categoria
    };

    const response = await fetch("http://127.0.0.1:8000/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoGasto)
    });

    const gastoCriado = await response.json();

    setGastos([...gastos, gastoCriado]);
    setNomeGasto("");
    setValor("0");
    setCategoria("Transporte");
}

    async function removerGasto(id) {
    await fetch(`http://127.0.0.1:8000/gastos/${id}`, {
        method: "DELETE",
    });

    setGastos(gastos.filter(g => g.id !== id));
}

    const totalGastos = gastos.reduce((total, gasto) => {
        return total + gasto.valor;
    }, 0);

    async function limparLista() {

        if (!confirm("Tem certeza que deseja apagar a lista de gastos?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/gastos/`, {
                method: "DELETE",
            })
       if (response.ok) {
        setGastos([]);
        alert("Gastos apagado com sucesso!")
       } else {
        console.error("Erro ao limpar gastos")
       }
    } catch (error) {
        console.error("Erro de rede:", error);
    };
    }

    const gastosFiltrados = [...gastos].sort((a, b) => {
        if (ordem === "maior") {
            return b.valor - a.valor;
        } else if (ordem === "menor") {
            return a.valor - b.valor;
        }
        return 0;
    });

    return(
        <div className="page-content">
            <h1>Gastos</h1>

            <input 
                type="text"
                placeholder="Nome do Gasto"
                value={nomeGasto}
                onChange={(e) => setNomeGasto(e.target.value)}
            />

            <input 
                type="number" step="0.01" placeholder="0.00" value={valorGasto} onChange={(e) => setValor(e.target.value)}
            />

            <label>Categoria </label>
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            >
                <option value="Transporte">Transporte</option>
                <option value="Comida">Comida</option>
                <option value="Lazer">Lazer</option>
                <option value="Estudo">Estudo</option>
                <option value="Remédio">Remédio</option>
                <option value="Outros">Outros</option>

            </select>
            <button onClick={adicionarGasto}>Adicionar</button>

            <p>Filtrar por preço:</p>
            <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="recente">Mais recentes</option>
                <option value="menor">Menor valor</option>
                <option value="maior">Maior valor</option>

            </select>

            <ul>
                {gastosFiltrados.map((gasto) => (
                    <li key={gasto.id}>
                        {gasto.nome} — R${gasto.valor} — {gasto.gastoCategoria}
                        <button onClick={() => removerGasto(gasto.id)}>❌</button>

                    </li>
                ))}
            </ul>
            <p>Total em gastos: R${totalGastos.toFixed(2)}</p>
            <button onClick={() => limparLista()}>Limpar lista de gastos</button>


            
        </div>
    );
}

export default Gastos;