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
    
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add("item");
    
    
    const liItem = document.createElement('li');
    const liTarefa = document.createElement('span'); //cria um elemento
    liTarefa.classList.add('tarefa');
    liTarefa.innerHTML = item.tarefa;

    const liDescricao = document.createElement('span');
    liDescricao.classList.add('descricao');
    liDescricao.classList.add('hidden');
    liDescricao.innerHTML = item.descricao;

    liItem.append(liTarefa);
    liItem.append(liDescricao);

    createCheckButton(novaTarefa);
    novaTarefa.append(liItem);
    
    createInfoButton(novaTarefa)
    createDeleteButton(novaTarefa);
    
    

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
        //console.log(btn_check.nextSibling);
        const elm = btn_check.nextSibling;
        //console.log(elm.querySelector('span'));
        var task = elm.querySelector('span');
        //console.log(elm.querySelector('.descricao'));
        var desc = elm.querySelector('.descricao');
        if (task.style.textDecoration === "line-through"){
            task.style.textDecoration = "none";
            desc.style.textDecoration = "none";
            btn.style.visibility = 'hidden';
            //btn_check.style.boxShadow = '0px 0.2rem #FDB235'
        }else{
            task.style.textDecoration = "line-through";
            desc.style.textDecoration = "line-through";
            //btn_check.style.backgroundColor = 'green';
            btn.style.visibility = 'visible';
            btn.style.color = '#FDB235';
            //btn_check.style.boxShadow = '1px 0.1rem #FDB235'
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
        console.log(btn_info);
        var prev = div_info.previousSibling;
        console.log(prev.querySelector('.descricao'));
        prev = prev.querySelector('.descricao');
        prev.classList.toggle('hidden');//adiciona a classe se não existir e, caso contrário, remove
        
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
        var tempo = 500;
        var del_task = div_trash.parentNode;
        del_task.style.transition = 'opacity 500ms ease';
        setTimeout(function(){
            removeItem(tarefas, del_task.querySelector('li'));
            del_task.parentNode.removeChild(del_task);
        }, 500);
        
        
    })

    context.appendChild(div_trash)
}
/*erroo */
function removeItem(tasks, value) {
    
    
    const tarefa = value.querySelector('.tarefa').innerHTML;
    const descricao = value.querySelector('.descricao').innerHTML;
    console.log(tarefa);
    console.log(descricao);

    const tarefaPLixo = {
        "tarefa": tarefa,
        "descricao": descricao
    }
    console.log('tarefaPLixo: '+tarefaPLixo);
    console.log('tarefas: '+tarefas);
    var tar_json = JSON.stringify(tarefaPLixo);
    console.log('tar_json: '+tar_json);
    tarefas.forEach((item,index)=>{
        if(item.tarefa === tarefaPLixo.tarefa){
            console.log('item:'+item.tarefa+'\nE o index é:'+index);
            tarefas.splice(index,1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    })
}


