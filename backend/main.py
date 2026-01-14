from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    return gastos

@app.post("/gastos")
def criar_gasto(gasto: dict):
    gastos.append(gasto)
    return gasto

@app.delete("/gastos/{gasto_id}")
def deletar_gasto(gasto_id: int):
    global gastos
    gastos = [g for g in gastos if g["id"] != gasto_id]
    return {"message": "gasto deletado com sucesso!"}