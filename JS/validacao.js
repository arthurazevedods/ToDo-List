function sePreenchido(form){
    inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
                alert("Please fill all required fields");
                return false;
            }
        }
    }
}

function hasInfo(div_info){
    console.log(div_info);
    const desc = div_info.parentElement.parentElement.querySelector('.descricao');
    if(desc.innerHTML.length == 0){
        console.log('zero');
        return false;
    }
    else{
        return true;
    }
    
}



