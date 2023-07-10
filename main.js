const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const apagar_tudo = document.getElementById("apagar_tudo")

tarefas.forEach((elemento) => {
    criaTarefa(elemento)
});
/*Formulário*/
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
/*Apagar toda a lista */
apagar_tudo.addEventListener("click", function(ev){
    ev.preventDefault
    lista.innerHTML = ""
    localStorage.clear()
})

/*Função para criar uma nova tarefa */
/*A tarefa vai ter o nome, descrição e um botão */
function criaTarefa(item){
    
    const novaTarefa = document.createElement('li')
    novaTarefa.classList.add("item")
    
    
    const liItem = document.createElement('li')
    const liTarefa = document.createElement('span') //cria um elemento
    liTarefa.innerHTML = item.tarefa  

    const liDescricao = document.createElement('span') 
    liDescricao.classList.add('descricao')
    liDescricao.innerHTML = item.descricao

    liItem.append(liTarefa)
    liItem.append(liDescricao)

    createButton(novaTarefa)
    novaTarefa.append(liItem)
    
    

    lista.append(novaTarefa)
}


function createButton(context) {
    var btn = document.createElement("input");
    btn.value = " ";
    btn.type = "button";
    btn.classList.add('btn-check')
    btn.addEventListener('click',function(){
        console.log(btn.parentNode.querySelectorAll('li'))
        var task = btn.parentNode.querySelector('li')
        var desc = btn.parentNode.querySelector('span')
        if (task.style.textDecoration === "line-through"){
            task.style.textDecoration = "none";
            desc.style.textDecoration = "none";
            btn.style.backgroundColor = 'white'
        }else{
            task.style.textDecoration = "line-through";
            desc.style.textDecoration = "line-through";
            btn.style.backgroundColor = 'green'
        }
        
    })
    context.appendChild(btn);
}


