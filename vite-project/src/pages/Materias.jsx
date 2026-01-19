import { useState, useEffect } from "react";

function Materias() {
    const [materias, setMaterias] = useState([]);
    const [nomeMateria, setNomeMateria] = useState("");
    const [dificuldade, setDificuldade] = useState("Baixa");
    const [filtro, setFiltro] = useState("Todas")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/materias")
        .then(response => response.json())
        .then(data => setMaterias(data));
    }, []);

    async function adicionarMateria() {
        if (nomeMateria.trim() === "") return;

        const materiaFormatada = nomeMateria.trim().charAt(0).toUpperCase() + nomeMateria.trim().slice(1)
        const novaMateria = {
            id: Date.now(),
            nome: materiaFormatada,
            Materiadificuldade: dificuldade
            
        };

        await fetch("http://127.0.0.1:8000/materias", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(novaMateria)
        })

        setMaterias([...materias, novaMateria]);
        setNomeMateria("");
        setDificuldade("Baixa");
    }

    async function removerMateria(id) {
        setMaterias(materias.filter(mat => mat.id !== id));

        await fetch(`http://127.0.0.1:8000/materias/${id}`, {
            method: "DELETE",
        });
    }

    async function limparLista() {
        if (!confirm("Tem certeza que deseja limpar a lista de matérias?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/materias`, {
                method: "DELETE",
            })
        if (response.ok) {
            setMaterias([]);
            alert("Matérias apagadas com sucesso!")
        } else {
            console.error("Erro ao limpar matérias")
        }} catch (error) {
            console.error("Erro de rede", error)
        };

    }

    const materiasFiltradas = materias.filter(item => {
        if (filtro === "Todas") return true;
        return item.Materiadificuldade === filtro;
    })

    return (

        
        <div>
            <h1>Matérias</h1>

            <input 
                type="text"
                placeholder="Nome da Matéria"
                value={nomeMateria}
                onChange={(e) => setNomeMateria(e.target.value)}
            />

            <label>Dificuldade</label>
            <select 
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
            </select>

            <button onClick={adicionarMateria}>
                Adicionar
            </button>

            <p>Filtrar por dificuldade: </p>
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value="Todas">Mostrar Todas</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>

            </select>

            <ul>
                {materiasFiltradas.map((materia) => (
                    <li key={materia.id}>
                        {materia.nome} — {materia.Materiadificuldade}
                        <button onClick={() => removerMateria(materia.id)}>
                            ❌
                        </button>
                        
                    </li>
                ))}
            </ul>

            <button onClick={() => limparLista()}>Limpar lista de matérias</button>

        </div>
    );

}
    

export default Materias;