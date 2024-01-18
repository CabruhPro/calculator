let num1=null;
let num2=null;
let operation=null;
let computed=false;
let decpressed=false;
let negative=false;

let operations=["+", "*", "-", "/", "√", "%"];
let specialKeys=["+/-", "MRC", "M-", "M+", "ON/C"];
// √ = ** 0.5?
// % = / 100?

function operate(){
    num2=Number((negative?"-":"+")+output.textContent);
    negative=false;
    switch(operation){
        case "+":
            result=num1+num2;
            break;
        case "-":
            result=num1-num2;
            break;
        case "×":
            result=num1*num2;
            break;
        case "÷":
            result=num1/num2;
            break;
    }
    console.log("operation: "+ num1+" "+operation+" "+num2);
    console.log("result: " + result);
    output.textContent=result;
    formatOutput();
    num1=result;
    num2=null;
}

function formatOutput () {
    format=output.textContent;
    if (!format.includes(".")){
        format+=".";
    }
    if (format < 0){
        format=format.slice(1);
        negative=true;
    }
    setNegative();
    output.textContent=format;
}

function setNegative () {
    negsign.style.color=
    negative?"rgb(62, 80, 27)":"rgb(80, 172, 73)";
}

output=document.querySelector(".output");
negsign=document.querySelector("#neg");
leftbuttons=document.querySelector(".buttonsleft");
rightbuttons=document.querySelector(".buttonsright")

function assignButtonFunc (button) {
    button.addEventListener('click', function (){
        pressed=button.textContent;
        if (isNaN(pressed)){
            switch (pressed){
                case ".":
                    decpressed=true;
                    break;
                case "ON/C":
                    num1=null;
                    num2=null;
                    operator=null;
                    decpressed=false;
                    output.textContent="0.";
                    negative=false;
                    setNegative();
                    break;
                case "+/-":
                    negative=!negative;
                    console.log("negative: "+negative);
                    setNegative();
                    break;
                case "+":
                case "×":
                case "-":
                case "÷":
                    if(!computed){
                        if (num1!==null){
                            operate();
                        }
                        else {
                            num1=Number((negative?"-":"+")+output.textContent);
                            negative=false;
                        }
                        num1=Number((negative?"-":"+")+output.textContent);
                        computed=true;
                        decpressed=false;
                    }
                    else{
                        num1=Number(output.textContent);
                    }
                    operation=pressed;
                    break;
                case "=":
                    if (num1!==null){
                        operate();
                    }
                    num1=null;
                    operation=null;
                    computed=true;
                    decpressed=false;
                    break;
                default:
                    console.log(pressed+' not implemented');
                    //computed=true;
                    //decpressed=false;
                    break;
            }
        }
        else{
            numberInput();
        }
    });
}

function numberInput(){
    text=output.textContent;
    if (computed){
        text="0.";
        computed=false;
    }
    if(text.length < 13){
        if (decpressed){
            text+=pressed;
        }
        else{
            if (text === "0."){
                text=pressed+".";
            }
            else{
                len=text.length
                text=text.slice(0, len-1)+pressed+".";
            }
        }
        output.textContent=text;
    }
}

leftbuttons.childNodes.forEach(button => assignButtonFunc(button));
rightbuttons.childNodes.forEach(button => assignButtonFunc(button));