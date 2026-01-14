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
    return {"message": "deletado com sucesso!"}