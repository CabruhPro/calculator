let num1=null;
let num2=null;
let operation=null;
let computed=false;
let decpressed=false;
let negative=false;
let error=false;
let mrcpressed=false;
let memory=0;

leftbuttons=document.querySelector(".buttonsleft");
rightbuttons=document.querySelector(".buttonsright");
negsign=document.querySelector("#neg");
errsign=document.querySelector("#err");
memsign=document.querySelector("#mem");
output=document.querySelector(".output");

leftbuttons.childNodes.forEach(button => assignButtonFunc(button));
rightbuttons.childNodes.forEach(button => assignButtonFunc(button));

function formatOutput () {
    format=output.textContent;
    if (format < 0){
        format=format.slice(1);
        negative=true;
    }
    if (format.length > 13){
        format=format.slice(0,13);
    }
    if (!format.includes(".")){
        if(format.length===13){
            format=format.slice(0,12);
        }
        format+=".";
    }
    setNegative();
    output.textContent=format;
}

function setNegative () {
    negsign.style.color=
    negative?"rgb(62, 80, 27)":"rgb(80, 172, 73)";
}

function errorCheck (result) {
    if(result > 999999999999 || result < -999999999999
        || !isFinite(result)){
        error=true;
    }
}

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
    output.textContent=result;
    formatOutput();
    num1=result;
    num2=null;
    errorCheck(result);
}

function numberInput(){
    text=output.textContent;
    if (computed){
        negative=false;
        setNegative();
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

function assignButtonFunc (button) {
    button.addEventListener('click', function (event){
        pressed=button.textContent;
        if(pressed === "ON/C"){
            num1=null;
            num2=null;
            operator=null;
            decpressed=false;
            output.textContent="0.";
            negative=false;
            error=false;
            errsign.style.color="rgb(80, 172, 73)";
            setNegative();
        }
        else if (!(isNaN(pressed) || error)){
            numberInput();
        }
        else if (!error) {
            switch (pressed){
                case ".":
                    decpressed=true;
                    break;
                case "+/-":
                    negative=!negative;
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
                        computed=true;
                        decpressed=false;
                    }
                    num1=Number((negative?"-":"+")+output.textContent);
                    operation=pressed;
                    negative=false;
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
                case "%":
                    if (operation===null){
                        num1=Number((negative?"-":"+")+
                        output.textContent)*0.01;
                        output.textContent=num1;
                        errorCheck(num1);
                        formatOutput();
                    }
                    else{
                        switch(operation){
                            case "+":
                            case "-":
                                output.textContent=
                                Number((negative?"-":"+")+
                                output.textContent)*0.01*num1;
                                formatOutput();
                                break;
                            default:
                                output.textContent=
                                Number((negative?"-":"+")+
                                output.textContent)*0.01;
                                formatOutput();
                                break;
                        }
                        operate();
                    }
                    computed=true;
                    decpressed=false;
                    operation=null;
                    break;
                case "√":
                    num1=Number((negative?"-":"+")+output.textContent)**0.5;
                    output.textContent=num1;
                    errorCheck(num1);
                    formatOutput();
                    break;
                case "MRC":
                    if (mrcpressed) {
                        memory=0;
                        mrcpressed=false;
                    }
                    else {
                        if (memory!==0){
                            output.textContent=memory;
                            formatOutput();
                            computed=true;
                            decpressed=false;
                        }
                    }
                    break;
                case "M-":
                    errbackup=memory;
                    memory-=Number((negative?"-":"+")+output.textContent);
                    errorCheck(memory);
                    memory=error?errbackup:memory;
                    computed=true;
                    decpressed=false;
                    break;
                case "M+":
                    errbackup=memory;
                    memory+=Number((negative?"-":"+")+output.textContent);
                    errorCheck(memory);
                    memory=error?errbackup:memory;
                    computed=true;
                    decpressed=false;
                    break;
                }
            }
        if (error){
            errsign.style.color="rgb(62, 80, 27)";
            output.textContent="";
            negative=false;
            setNegative();
        }
        mrcpressed=pressed==="MRC"&&memory!==0;
        memsign.style.color=memory===0?"rgb(80, 172, 73)":"rgb(62, 80, 27)";
        event.preventDefault();
    });
}
