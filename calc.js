let num1=null;
let num2=null;
let operation="";
let decpressed=false;
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
    switch(operation){
        case "+":
        break;
        case "-":
        break;
        case "*":
        break;
        case "/":
        break;
        default:
        break;
    }
}

display=document.querySelector(".display");
leftbuttons=document.querySelector(".buttonsleft");
rightbuttons=document.querySelector(".buttonsright")

function assignButtonFunc (button) {
    button.addEventListener('click', function (){
        pressed=getParseable(button.textContent);
        if (isNaN(pressed)){
            switch (pressed){
                case ".":
                    decpressed=true;
                    console.log("decpressed "+decpressed);
                    break;
                default:
                    console.log(pressed);
                    break;
            }
        }
        else{
            if (decpressed){
                display.textContent+=pressed;
            }
            else{
                if (display.textContent === "0."){
                    display.textContent=pressed+".";
                }
                else{
                    text=display.textContent;
                    len=text.length
                    display.textContent=text.slice(0, len-1)+pressed+".";
                }
            }
        }
    });
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
*/