    let btn = document.getElementsByClassName('login-btn')[0];
    let nameInput = document.getElementsByClassName('username')[0]
    let passwordInput = document.getElementsByClassName('password')[0]

    btn.onclick = function (){
    if (nameInput.value && passwordInput.value){
    
        $.ajax({
                type:'post',
                url:'http://localhost:3000/login',
                data:{
                    name:nameInput.value,
                    password:passwordInput.value
                },
                success:(result)=>{
                    console.log(result)
                },
                error:()=>{

                }
            })    
    }
}
let input1 = document.getElementsByClassName('input1')[0];
let input2 = document.getElementsByClassName('input2')[0];
// console.log(input1)
init();

// let input = $.cookie('input')? JSON.parse($.cookie('input')):'';

input1.onblur = function(){
// $.cookie('input1',input1.value)
    let data;
    if($.cookie('input')){
        data = JSON.parse($.cookie('input'));
    }else{
        data = {}
    }
    data.input1 = input1.value;
    $.cookie('input',JSON.stringify(data));
    
}

input2.onblur = function(){

    let data;
    if($.cookie('input')){
        data = JSON.parse($.cookie('input'));
    }else{
        data = {}
    }

    data.input2 = input2.value;
    $.cookie('input',JSON.stringify(data));
    

}

function init(){
    if($.cookie('input')){
        let data = JSON.parse($.cookie('input'));

        input1.value = data.input1 || '';
        input2.value = data.input2 || '';
    }

}


