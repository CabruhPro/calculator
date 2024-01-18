let num1=null;
let num2=null;
let operation=null;
let computed=false;
let decpressed=false;
let negative=false;
let altkeymap={
    "×" : "*",
    "÷" : "/"
}
let operations=["+", "*", "-", "/", "√", "%"];
let specialKeys=["+/-", "MRC", "M-", "M+", "ON/C"];
// √ = ** 0.5?
// % = / 100?

function getParseable(button){
    if (button in altkeymap){
        return altkeymap[button];
    }
    return button;
}

function operate(){
    num2=Number(output.textContent);
    switch(operation){
        case "+":
            result=num1+num2;
            break;
        case "-":
            result=num1-num2;
            break;
        case "*":
            result=num1*num2;
            break;
        case "/":
            result=num1/num2;
            break;
    }
    console.log("operation: "+ num1+" "+operation+" "+num2);
    console.log("result: " + result);
    output.textContent=result;
    num1=result;
    num2=null;
}

output=document.querySelector(".output");
negsign=document.querySelector("#neg");
leftbuttons=document.querySelector(".buttonsleft");
rightbuttons=document.querySelector(".buttonsright")

function assignButtonFunc (button) {
    button.addEventListener('click', function (){
        pressed=getParseable(button.textContent);
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
                    output.textContent="0."
                    break;
                case "+/-":
                    negative=!negative;
                    negsign.style.color=
                    negative?"rgb(62, 80, 27)":"rgb(80, 172, 73)";
                case "+":
                case "*":
                case "-":
                case "/":
                    if(!computed){
                        if (num1!==null){
                            operate();
                        }
                        else {
                            num1=Number(output.textContent);
                        }
                        num1=Number(output.textContent);
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


/*
    Do not parse anything until a number is inputted first
    Once a number is inputted, there are multiple options:
    1) Type in another number -> keep expanding current
    2) Type in an operation -> store number and store oper
    3) Type in a decimal -> decimal will begin shifting
    4) Type in equals -> same number

    if a number is computed
    do not perform an operation until
    the next input is a number
    otherwise keep changing operations
    */