import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [materias, setMaterias] = useState([]);
    const [gastos, setGastos] = useState([]);


useEffect(() => {
    fetch("http://127.0.0.1:8000/materias")
    .then(response => response.json())
    .then(setMaterias);

    fetch("http://127.0.0.1:8000/gastos")
    .then(response => response.json())
    .then(setGastos);
}, []);

    return (
        <DataContext.Provider value={{gastos, setGastos, materias, setMaterias}}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext)
};


