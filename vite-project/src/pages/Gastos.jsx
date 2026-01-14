import { useState, useEffect} from "react";

function Gastos() {

    const [gastos, setGastos] = useState([]);
    const [nomeGasto, setNomeGasto] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/gastos")
        .then(response => response.json())
        .then(data => setGastos(data));
    }, []);

    async function adicionarGasto() {
        if (nomeGasto.trim === "") return;

        const novoGasto = {
            id: Date.now(),
            nome: nomeGasto
        };

        await fetch("http://127.0.0.1:8000/gastos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoGasto)
        })

        setGastos([...gastos, novoGasto]);
        setNomeGasto("");
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

            <button onClick={adicionarGasto}>Adicionar</button>

            <ul>
                {gastos.map((gasto) => (
                    <li key={gasto.id}>
                        {gasto.nome}
                        <button onClick={() => removerGasto(gasto.id)}>❌</button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Gastos