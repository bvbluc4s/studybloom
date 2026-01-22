import { useData } from './DataContext'

function Dashboard() {

    const {gastos, materias} = useData();
    const topGastos = [...gastos]
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

    const topMaterias = [...materias]

    const totalGastos = gastos.reduce((total, gasto) => {
        return total + gasto.valor;
    }, 0);
    
    return (
        <div className="page-content">
            <h1>Dashboard Overview!</h1>

            <h2>Top {topGastos.length} gastos ({topGastos.length}/5): </h2>
            {topGastos.map(g => (
                <li key={g.id}>
                    {g.nome} - R${g.valor.toFixed(2)} - {g.gastoCategoria}
                    
                </li>
            ))}
            Total em gastos esse mês: R${totalGastos.toFixed(2)}

        </div>
    );
}

export default Dashboard;
