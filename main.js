const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

form.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const tarefa = evento.target.elements["tarefa"]
    const descricao = evento.target.elements["descricao"]

    const tarefaAtual = {
        "tarefa": tarefa.value,
        "descricao": descricao.value 
    }

    console.log(tarefaAtual)



})