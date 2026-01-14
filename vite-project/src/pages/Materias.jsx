import { useState, useEffect } from "react";

function Materias() {
    const [materias, setMaterias] = useState([]);
    const [nomeMateria, setNomeMateria] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/materias")
        .then(response => response.json())
        .then(data => setMaterias(data));
    }, []);

    async function adicionarMateria() {
        if (nomeMateria.trim() === "") return;

        const novaMateria = {
            id: Date.now(),
            nome: nomeMateria
            
        };

        await fetch("http://127.0.0.1:8000/materias", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(novaMateria)
        })

        setMaterias([...materias, novaMateria]);
        setNomeMateria("");
    }

    async function removerMateria(id) {
        setMaterias(materias.filter(mat => mat.id !== id));

        await fetch(`http://127.0.0.1:8000/materias/${id}`, {
            method: "DELETE",
        });
    }

    return (
        <div>
            <h1>Matérias</h1>

            <input 
                type="text"
                placeholder="Nome da Matéria"
                value={nomeMateria}
                onChange={(e) => setNomeMateria(e.target.value)}
            />

            <div>
                <input 
                    type="radio"
                    id="apple"
                    name="fruit"
                    value="apple"


                />
            </div>

            <button onClick={adicionarMateria}>
                Adicionar
            </button>

            <ul>
                {materias.map((materia) => (
                    <li key={materia.id}>
                        {materia.nome}
                        <button onClick={() => removerMateria(materia.id)}>
                            ❌
                        </button>
                        
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Materias;