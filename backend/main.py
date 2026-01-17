from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# GASTOS BANCO DE DADOS
conn = sqlite3.connect("gastos.db", check_same_thread=False)
cursor = conn.cursor()

# MATERIAS BANCO DE DADOS

conn2 = sqlite3.connect("materias.db", check_same_thread=False)
cursor2 = conn2.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    gastoCategoria TEXT NOT NULL
)
""")

cursor2.execute("""
CREATE TABLE IF NOT EXISTS materias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                Materiadificuldade TEXT NOT NULL
                 )
                """)

conn.commit()
conn2.commit()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

materias = []
gastos = []

#MATERIAS


@app.get("/materias")
def listar_materias():
    cursor2.execute("SELECT id, nome, Materiadificuldade FROM materias")
    rows = cursor2.fetchall()

    return [
        {
            "id": row[0],
            "nome": row[1],
            "Materiadificuldade": row[2],

        }
        for row in rows
    ]

@app.post("/materias")
def criar_materia(materia: dict):
    cursor2.execute(
        "INSERT INTO materias (nome, Materiadificuldade) VALUES (?, ?)",
        (materia["nome"], materia["Materiadificuldade"])
    )
    conn2.commit()

    return {
        "id": cursor2.lastrowid,
        "nome": materia["nome"],
        "Materiadificuldade": materia["Materiadificuldade"]
    }

@app.delete("/materias/{materia_id}")
def deletar_materia(materia_id: int):
    cursor2.execute("DELETE FROM materias WHERE id = ?", (materia_id,))
    conn2.commit()
    return {"message": "matéria deletada com sucesso!"}

@app.delete("/materias")
def deletar_materias():
    try:
        cursor2.execute("DELETE FROM materias")
        conn2.commit()
        return {"message": "Todas as matérias foram deletadas"}
    except Exception as e:
        print(f"Erro: {e}")
        return {"error": "Falha ao deletar matérias"}, 500


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


@app.delete("/gastos")
def deletar_gastos():
    try:
        cursor.execute("DELETE  FROM gastos")
        conn.commit()
        return {"message": "Todos os gastos foram deletados"}
    except Exception as e:
        print(f"Erro {e}")
        return {"error": "Falha ao deletar gastos"}, 500