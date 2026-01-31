import { useData } from './DataContext'
import Humor from './Humor';

function Dashboard() {

    const {gastos, materias} = useData();

    const topGastos = [...gastos]
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);


    const apenasDeveres = [...materias]
    .filter(d => d.classe === "Trabalho")
    .sort((a, b) => new Date(a.dataFinal) - new Date(b.dataFinal))

    const apenasProvas = [...materias]
    .filter(m => m.classe === "Prova")
    .sort((a, b) => new Date(a.dataFinal) - new Date(b.dataFinal));

    const totalGastos = gastos.reduce((total, gasto) => {
        return total + gasto.valor;
    }, 0);
    
    return (
        <div className="page-content">

            <Humor />


            <h2>{topGastos.length} Maiores gastos do mês ({topGastos.length}/5): </h2>
            {topGastos.map(g => (
                <li key={g.id}>
                    {g.nome} - R${g.valor.toFixed(2)} - {g.gastoCategoria}
                    
                </li>
            ))}
            Total em gastos neste mês: <strong>R${totalGastos.toFixed(2)}</strong>

            <h2> Provas pendentes: {apenasProvas.length}</h2>
            {apenasProvas.map(m => (
                <li key={m.id}>
                    {m.nome} - {m.dataFinal} - Dificuldade: {m.Materiadificuldade}
                </li>
            ))}

            <h2> Deveres pendentes: {apenasDeveres.length}</h2>
            {apenasDeveres.map(d => (
                <li key={d.id}>
                    {d.nome} - {d.dataFinal}
                </li>
            ))}

        </div>
    );
}

export default Dashboard;
