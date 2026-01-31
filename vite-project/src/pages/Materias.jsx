import { useState, useEffect } from "react";
import { useData } from './DataContext';

function Materias() {
    const { materias, setMaterias } = useData();

    const [nomeMateria, setNomeMateria] = useState("");
    const [dificuldade, setDificuldade] = useState("Baixa");
    const [classeMateria, setClasseMateria] = useState("Trabalho");
    const [dataFinal, setDataFinal] = useState("");
    const [filtroDificuldade, setFiltroDificuldade] = useState("Todas")
    const [filtroCategoria, setFiltroCategoria] = useState("Todas")


    async function adicionarMateria() {
        if (nomeMateria.trim() === "") return;

        const materiaFormatada = nomeMateria.trim().charAt(0).toUpperCase() + nomeMateria.trim().slice(1)
        const novaMateria = {
            id: Date.now(),
            nome: materiaFormatada,
            Materiadificuldade: dificuldade,
            classe: classeMateria,
            dataFinal: dataFinal
            
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

        const bateDificuldade = filtroDificuldade === "Todas" || item.Materiadificuldade === filtroDificuldade;
        const bateClasse = filtroCategoria === "Todas" || item.classe === filtroCategoria;
        return bateDificuldade && bateClasse;

    });

    const categoriasFiltradas = materias.filter(item => {
        if (filtroCategoria === "Todas") return true;
        return item.classe === filtroCategoria;
        
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

            <label>Classe</label>
            <select
                value={classeMateria}
                onChange={(e) => setClasseMateria(e.target.value)}>
                <option value="Trabalho">Trabalho</option>
                <option value="Prova">Prova</option>
            </select>

            <label>Data de Entrega</label>
            <input
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
            />


            <button onClick={adicionarMateria}>
                Adicionar
            </button>

            <p>Filtrar por dificuldade: </p>
            <select value={filtroDificuldade} onChange={(e) => setFiltroDificuldade(e.target.value)}>
                <option value="Todas">Mostrar Todas</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>

            </select>

            <p>Filtrar por categoria: </p>
            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Prova">Prova</option>
            </select>

            <ul>
                {materiasFiltradas.map((materia) => (
                    <li key={materia.id}>
                        {materia.nome} — {materia.Materiadificuldade} — {materia.classe} — {materia.dataFinal}
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