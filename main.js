const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const apagar_tudo = document.getElementById("apagar_tudo");

tarefas.forEach((elemento) => {
    criaTarefa(elemento);
});

/*Formulário*/
form.addEventListener("submit", (evento) =>{
    evento.preventDefault();
    const tarefa = evento.target.elements["tarefa"];
    const descricao = evento.target.elements["descricao"];
    /*Criação de um objeto */
    const tarefaAtual = {
        "tarefa": tarefa.value,
        "descricao": descricao.value
    }

    
    criaTarefa(tarefaAtual);

    tarefas.push(tarefaAtual);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    /*Funções para esvaziar os inputs depois de Adicionar Elementos*/
    tarefa.value = "";
    descricao.value = "";

})
/*Apagar toda a lista */
apagar_tudo.addEventListener("click", function(ev){
    ev.preventDefault;
    lista.innerHTML = "";
    localStorage.clear();
})

/*Função para criar uma nova tarefa */
/*A tarefa vai ter o nome, descrição e um botão */
function criaTarefa(item){
    
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add("item");
    
    
    const divItem = document.createElement('div');
    const divTarefa = document.createElement('span'); //cria um elemento
    divTarefa.classList.add('tarefa');
    divTarefa.innerHTML = item.tarefa;

    const container_Desc = document.createElement('div');
    container_Desc.classList.add('container_desc');
    container_Desc.classList.add('hidden');
    const divDescricao = document.createElement('span');
    divDescricao.classList.add('descricao');
    //divDescricao.classList.add('hidden');
    divDescricao.innerHTML = item.descricao;

    divItem.append(divTarefa);
    //divItem.append(divDescricao);

    createCheckButton(novaTarefa);
    novaTarefa.append(divItem);
    
    /*DIV-BTNS */
    const div_btns = document.createElement('div_btns');
    div_btns.classList.add('div_btns');
    createInfoButton(div_btns);
    createDeleteButton(div_btns);
    novaTarefa.append(div_btns);
    
    container_Desc.append(divDescricao);
    novaTarefa.append(container_Desc);

    lista.append(novaTarefa);
}


function createCheckButton(context) {
    var btn_check = document.createElement('div');
    var btn = document.createElement("i");
    
    
    btn_check.classList.add('btn-check');
    btn.classList.add('fa-solid');
    btn.classList.add('fa-check');
    btn.style.visibility = 'hidden';
    btn_check.addEventListener('click',function(){
        console.log(btn)
        
        const elm = btn_check.nextSibling;
        
        var task = elm.querySelector('span');
        
        var desc = elm.querySelector('.descricao');
        if (task.style.textDecoration === "line-through"){
            task.style.textDecoration = "none";
            desc.style.textDecoration = "none";
            btn.style.visibility = 'hidden';
            
        }else{
            task.style.textDecoration = "line-through";
            desc.style.textDecoration = "line-through";
            
            btn.style.visibility = 'visible';
            btn.style.color = '#FDB235';
            
        }
        
    })
    btn_check.append(btn)
    context.appendChild(btn_check);
}

function createInfoButton(context){
    var div_info = document.createElement('div');
    var btn_info = document.createElement('i');

    div_info.classList.add('div_info');
    btn_info.classList.add('fa-solid');
    btn_info.classList.add('fa-info');

    div_info.append(btn_info);

    div_info.addEventListener('click',function(){
        var prev = div_info.parentElement.parentElement;
        console.log(div_info.parentElement.parentElement);
        console.log(prev.querySelector('.container_desc'));
        prev = prev.querySelector('.container_desc');
        prev.classList.toggle('hidden'); //adiciona a classe se não existir e, caso contrário, remove
    })
    
    context.appendChild(div_info);
}

function createDeleteButton(context){
    var div_trash = document.createElement('div');
    var btn_trash = document.createElement('i');

    div_trash.classList.add('div_trash');
    btn_trash.classList.add('fa-solid');
    btn_trash.classList.add('fa-trash');


    div_trash.append(btn_trash);

    div_trash.addEventListener('click',function(){
        var tempo = 400;
        var del_task = div_trash.parentElement.parentElement;
        del_task.style.transition = `opacity ${tempo}ms ease`;

        setTimeout(function(){
            removeItem(tarefas, del_task.querySelector('li'));
            del_task.parentElement.removeChild(del_task); //Retorna a div .item e apaga o elemento filho que é del_task
        }, tempo);
        
        
    })

    context.appendChild(div_trash)
}
/*erroo */
function removeItem(tasks, value) {
    const del_tarefa = value.querySelector('.tarefa').innerHTML;

    console.log('tarefas: '+tarefas);
    
    tarefas.forEach((item,index)=>{
        if(item.tarefa === del_tarefa){
            console.log('item:'+item.tarefa+'\nE o index é:'+index);
            tarefas.splice(index,1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    })
}


