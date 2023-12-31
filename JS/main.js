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
    sePreenchido(form);
    
    const tarefa = evento.target.elements["tarefa"];
    const descricao = evento.target.elements["descricao"];

    /*Criação de um objeto */
    const tarefaAtual = {
        "tarefa": tarefa.value,
        "descricao": descricao.value,
        "estado": "to-do",
    }
    
    criaTarefa(tarefaAtual);

    tarefas.push(tarefaAtual);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    /*esvaziar os inputs*/
    tarefa.value = "";
    descricao.value = "";
})

/*Função para criar uma nova tarefa */
/*A tarefa vai ter o nome, descrição e um botão */
function criaTarefa(item){
    
    const novaTarefa = document.createElement('div');
    novaTarefa.classList.add("item");
    
    
    const divItem = document.createElement('div');
    divItem.classList.add('container-tarefa');
    const elmTarefa = document.createElement('span'); //cria um elemento
    elmTarefa.classList.add('tarefa');
    elmTarefa.innerHTML = item.tarefa;

    const container_Desc = document.createElement('div');
    container_Desc.classList.add('container_desc');
    container_Desc.classList.add('hidden');
    const elmDescricao = document.createElement('span');
    elmDescricao.classList.add('descricao');
    //elmDescricao.classList.add('hidden');
    elmDescricao.innerHTML = item.descricao;

    divItem.append(elmTarefa);
    //divItem.append(elmDescricao);

    createCheckButton(novaTarefa,item);
    novaTarefa.append(divItem);
    
    /*DIV-BTNS */
    const div_btns = document.createElement('div_btns');
    div_btns.classList.add('div_btns');
    createInfoButton(div_btns);
    createDeleteButton(div_btns);
    novaTarefa.append(div_btns);
    
    container_Desc.append(elmDescricao);
    novaTarefa.append(container_Desc);

    estadoDosEstilos(novaTarefa,item);
    lista.append(novaTarefa);
    

}

function estadoDosEstilos(div,item){
    task = div.querySelector('.tarefa');
        if(item.estado === 'done'){
        div.classList.add("item-done");
        task.classList.add("line-through");
    }else{
        div.classList.add("item-to-do");
    }
}


/*Apagar toda a lista */
apagar_tudo.addEventListener("click", function(ev){
    ev.preventDefault;
    lista.innerHTML = "";
    localStorage.clear();
})

function createCheckButton(context,item) {
    var btn_check = document.createElement('div');
    var btn = document.createElement("i");
    
    btn_check.classList.add('btn-check');
    
    btn.classList.add('fa-solid');
    btn.classList.add('fa-check');
    if(item.estado === 'to-do'){
        console.log();
        btn.style.visibility = 'hidden';
    }
    
    btn_check.addEventListener('click',function(){
        div_item = btn_check.parentElement;
        const elm = btn_check.nextSibling;
        var task = elm.querySelector('span');
        if (item.estado === 'done'){
            
            div_item.classList.toggle('item-done');
            div_item.classList.toggle('item-to-do');
            
            
            task.classList.toggle('line-through');

            btn.style.visibility = 'hidden';
            toDoneOrToDo(item);

            
        }else{
            div_item.classList.toggle('item-done');
            div_item.classList.toggle('item-to-do');

            task.classList.toggle('line-through');
            //task.style.textDecoration = 'line-through var(--color2)';
                        
            btn.style.visibility = 'visible';
            btn.style.color = '#FDB235';
            toDoneOrToDo(item);

        
        }
            
        
    })
    btn_check.append(btn)
    context.appendChild(btn_check);
}

function toDoneOrToDo(item){
    for (let i=0; i<tarefas.length;i++){
        if(tarefas[i] === item){
            if(item.estado === 'to-do'){
                item.estado = 'done'
                tarefas[i].estado = 'done';
                localStorage.setItem('tarefas',JSON.stringify(tarefas));
            }
            else{
                item.estado = 'to-do';
                tarefas[i].estado = 'to-do';
                localStorage.setItem('tarefas',JSON.stringify(tarefas));
            }
        }
    }
    
}


function createInfoButton(context){
    var div_info = document.createElement('div');
    var btn_info = document.createElement('i');

    div_info.classList.add('div_info');
    btn_info.classList.add('fa-solid');
    btn_info.classList.add('fa-info');
    

    div_info.append(btn_info);

    div_info.addEventListener('click',function(){
        if (hasInfo(div_info)){
            var prev = div_info.parentElement.parentElement;
            prev = prev.querySelector('.container_desc');
            prev.classList.toggle('hidden'); //adiciona a classe se não existir e, caso contrário, remove
    
        }else{
            console.log('hasnt info');
        }

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
            removeItem(tarefas, del_task.querySelector('.container-tarefa'));
            del_task.parentElement.removeChild(del_task); //Retorna a div .item e apaga o elemento filho que é del_task
        }, tempo);
        
        
    })

    context.appendChild(div_trash)
}

function removeItem(tasks, value) {
    const del_tarefa = value.querySelector('.tarefa').innerHTML;

    
    tarefas.forEach((item,index)=>{
        if(item.tarefa === del_tarefa){
            tarefas.splice(index,1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    })
}

