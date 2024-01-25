let num1=null;
let num2=null;
let operation='+';
let computed=false;
let decpressed=false;
let negative=false;
let error=false;
let memory=0;
let oncpressed=false;
let mrcpressed=false;
let oprpressed=false;
let equalspressed=false;

leftbuttons=document.querySelector(".buttonsleft");
rightbuttons=document.querySelector(".buttonsright");
negsign=document.querySelector("#neg");
errsign=document.querySelector("#err");
memsign=document.querySelector("#mem");
output=document.querySelector(".output");

leftbuttons.childNodes.forEach(button => assignButtonFunc(button));
rightbuttons.childNodes.forEach(button => assignButtonFunc(button));

function formatOutput () {
    format=Number(output.textContent).toFixed(11);
    negative=format<0;
    format=negative?format.slice(1):format;
    while(format.charAt(format.length-1)==="0"){
        format=format.slice(0,format.length-1);
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
    || (result < 0.00000000001 && result > 0)
    || (result > -0.00000000001 && result < 0)
    || !isFinite(result)){
        error=true;
    }
}

function resetComputed() {
    if (computed){
        negative=false;
        setNegative();
        text="0.";
        decpressed=false;
        computed=false;
    }
}

function clear(){
    num1=null;
    num2=null;
    operation='+';
    computed=false;
    decpressed=false;
    negative=false;
    error=false;
    oncpressed=false;
    mrcpressed=false;
    oprpressed=false;
    equalspressed=false;
    output.textContent="0.";
    errsign.style.color="rgb(80, 172, 73)";
    setNegative();
    oncpressed=false;
}

function operate(){
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
    num1=result;
    formatOutput();
    errorCheck(result);
}

function numberInput(){
    text=output.textContent;
    if (computed){
        negative=false;
        setNegative();
        text="0.";
        decpressed=false;
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
            if(oncpressed || error){
                clear();
            }
            else{
                oncpressed=true;
                output.textContent="0."
                negative=false;
                setNegative();
            }
        }
        else if (!(isNaN(pressed) || error)){
            oncpressed=false;
            numberInput();
        }
        else if (!error) {
            oncpressed=false;
            switch (pressed){
                case ".":
                    if (computed){
                        negative=false;
                        setNegative();
                        output.textContent="0.";
                        computed=false;
                    }
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
                    equalspressed=false;
                    if(oprpressed){
                        num2=Number((negative?"-":"+")+output.textContent);
                        operate();
                    }
                    else{
                        num1=Number((negative?"-":"+")+output.textContent);
                    }
                    operation=pressed;
                    computed=true;
                    oprpressed=true;
                    break;
                case "=":
                    oprpressed=false;
                    if(!equalspressed){
                        num2=Number((negative?"-":"+")+output.textContent);
                    }
                    else{
                        num1=Number((negative?"-":"+")+output.textContent);
                    }
                    if (num1!==null){
                        operate();
                        errorCheck(num1);
                    }
                    computed=true;
                    equalspressed=true;
                    break;
                case "%":
                    if (num1===null){
                        percent=Number((negative?"-":"+")+
                        output.textContent)*0.01;
                    }
                    else{
                        percent=Number((negative?"-":"+")+
                        output.textContent)*0.01*num1;
                    }
                    output.textContent=percent;
                    errorCheck(percent);
                    formatOutput();
                    computed=true;
                    break;
                case "√":
                    sqrt=
                    Number((negative?"-":"+")+output.textContent)**0.5;
                    output.textContent=sqrt;
                    errorCheck(sqrt);
                    formatOutput();
                    computed=true;
                    break;
                case "MRC":
                    if (memory===0){
                        clear();
                    }
                    if (mrcpressed) {
                        memory=0;
                        mrcpressed=false;
                    }
                    else {
                        if (memory!==0){
                            output.textContent=memory;
                            formatOutput();
                            computed=true;
                        }
                    }
                    break;
                case "M-":
                    errbackup=memory;
                    memory-=Number((negative?"-":"+")+output.textContent);
                    errorCheck(memory);
                    memory=error?errbackup:memory;
                    computed=true;
                    break;
                case "M+":
                    errbackup=memory;
                    memory+=Number((negative?"-":"+")+output.textContent);
                    errorCheck(memory);
                    memory=error?errbackup:memory;
                    computed=true;
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
