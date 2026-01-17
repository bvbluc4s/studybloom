from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

conn = sqlite3.connect("gastos.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    gastoCategoria TEXT NOT NULL
)
""")
conn.commit()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

materias = []
gastos = []

@app.get("/materias")
def listar_materias():
    return materias

@app.post("/materias")
def criar_materia(materia: dict):
    materias.append(materia)
    return materia

@app.delete("/materias/{materia_id}")
def deletar_materia(materia_id: int):
    global materias
    materias = [m for m in materias if m["id"] != materia_id]
    return {"message": "matéria deletada com sucesso!"}


# GASTOS

@app.get("/gastos")
def listar_gastos():
    cursor.execute("SELECT id, nome, valor, gastoCategoria FROM gastos")
    rows = cursor.fetchall()

    return [
        {
            "id": row[0],
            "nome": row[1],
            "valor": row[2],
            "gastoCategoria": row[3],
        }
        for row in rows
    ]

@app.post("/gastos")
def criar_gasto(gasto: dict):
    cursor.execute(
        "INSERT INTO gastos (nome, valor, gastoCategoria) VALUES (?, ?, ?)",
        (gasto["nome"], gasto["valor"], gasto["gastoCategoria"])
    )
    conn.commit()

    return {
        "id": cursor.lastrowid,
        "nome": gasto["nome"],
        "valor": gasto["valor"],
        "gastoCategoria": gasto["gastoCategoria"],
    }

@app.delete("/gastos/{gasto_id}")
def deletar_gasto(gasto_id: int):
    cursor.execute("DELETE FROM gastos WHERE id = ?", (gasto_id,))
    conn.commit()
    return {"message": "gasto deletado com sucesso!"}