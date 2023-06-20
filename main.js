const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const apagar_tudo = document.getElementById("apagar_tudo")

tarefas.forEach((elemento) => {
    criaTarefa(elemento)
});

form.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const tarefa = evento.target.elements["tarefa"]
    const descricao = evento.target.elements["descricao"]
    /*Criação de um objeto */
    const tarefaAtual = {
        "tarefa": tarefa.value,
        "descricao": descricao.value
    }

    
    criaTarefa(tarefaAtual)

    tarefas.push(tarefaAtual)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    /*Funções para esvaziar os inputs depois de Adicionar Elementos*/
    tarefa.value = ""
    descricao.value = ""

})

apagar_tudo.addEventListener("click", function(ev){
    ev.preventDefault
    lista.innerHTML = ""
    localStorage.clear()
})

function criaTarefa(item){
    
    const novaTarefa = document.createElement('li')
    novaTarefa.classList.add("item")
    

    const nomeTarefa = document.createElement('strong') //cria um elemento
    nomeTarefa.innerHTML = item.tarefa  

    novaTarefa.append(nomeTarefa)
    novaTarefa.innerHTML += item.descricao 
    createButton(novaTarefa)

    lista.append(novaTarefa)
}

function createButton(context) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Terminou";
    //button.onclick = função;
    context.appendChild(button);
}
