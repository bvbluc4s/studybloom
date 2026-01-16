import { useState, useEffect} from "react";

function Gastos() {

    const [gastos, setGastos] = useState([]);
    const [nomeGasto, setNomeGasto] = useState("");
    const [valorGasto, setValor] = useState(0);
    const [categoria, setCategoria] = useState("transporte");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/gastos")
        .then(response => response.json())
        .then(data => setGastos(data));
    }, []);

    async function adicionarGasto() {
        if (nomeGasto.trim() === "") return;

        const novoGasto = {
            id: Date.now(),
            nome: nomeGasto,
            valor: parseFloat(valorGasto),
            gastoCategoria: categoria
        };

        await fetch("http://127.0.0.1:8000/gastos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoGasto)
        })

        setGastos([...gastos, novoGasto]);
        setNomeGasto("");
        setValor("");
        setCategoria("transporte");
    };
    async function removerGasto(id) {
        setGastos(gastos.filter(g => g.id !== id));

        await fetch(`http://127.0.0.1:8000/gastos/${id}`, {
            method: "DELETE",
        });
    }

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

            <label>Categoria</label>
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            >
                <option value="Transporte">Transporte</option>
                <option value="Comida">Comida</option>
                <option value="Lazer">Lazer</option>
                <option value="Estudo">Estudo</option>
                <option value="Outros">Outros</option>

            </select>
            <button onClick={adicionarGasto}>Adicionar</button>

            <ul>
                {gastos.map((gasto) => (
                    <li key={gasto.id}>
                        {gasto.nome} — R${gasto.valor} — {gasto.gastoCategoria}
                        <button onClick={() => removerGasto(gasto.id)}>❌</button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Gastos