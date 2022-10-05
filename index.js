
const btn = document.querySelector('.input-btn');

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const school = document.getElementById('school');
    const mail = document.getElementById('mail');
    const regExName = /^(([a-zA-Z\s-]{3,25}))$/;
    const regExLastName = /^(([a-zA-Z\s-]{3,25}))$/;
    const regExSchool = /^(([a-zA-Z\s-]{5,25}))$/;
    const regExMail = /^(([a-zA-Z0-9._-]+@[a-z0-9.]+[.][a-z]{2,6}))$/;
    const regExNameVerify = name.value.match(regExName)
    const regExLastNameVerify = lastname.value.match(regExLastName)
    const regExSchoolVerify = school.value.match(regExSchool)
    const regExMailVerify = mail.value.match(regExMail)

    if(!regExNameVerify || !regExLastNameVerify || !regExSchoolVerify || !regExMailVerify){
        e.preventDefault();
    }else{
        window.sessionStorage.setItem("name", name.value);
        window.sessionStorage.setItem("lastName", lastname.value);
        window.sessionStorage.setItem("school", school.value)
        window.sessionStorage.setItem("mail", mail.value)

        const getName = window.sessionStorage.getItem("name");
        const getLastName = window.sessionStorage.getItem("lastName");
        const getSchool = window.sessionStorage.getItem("school");
        const getMail = window.sessionStorage.getItem("mail");

        document.querySelector('.container-name').innerHTML = "Nom : " + getName;
        document.querySelector('.container-lastName').innerHTML = "Prénom : " + getLastName;
        document.querySelector('.container-school').innerHTML = "Établissement : " + getSchool;
        document.querySelector('.container-mail').innerHTML = "E-mail : " + getMail;
        const container = document.querySelector('.container-form');
        container.style.visibility='hidden';
        container.style.zIndex='-100';
        container.style.opacity='0';

        const page = document.querySelector("body");
        page.style.overflowY = "auto"
        page.style.overflow = "visible"
    }
})

fetch("./quiz.json")
.then((response) => response.json())
.then((jsondata) => {
    jsondata.QCM.forEach(element => {
        createElement(document.querySelector(".qcm"), element)
    })
})
.catch(error => console.log(error));

let number = 100;
let numberTwo = 1000;

function createElement(container, element) {

    const newContainer = document.createElement("div");
    newContainer.setAttribute('class', 'group-question')
    const questionNumber = document.createElement("h3");
    const question = document.createElement("h4");
    switch(element.role){
        case "input":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName
            
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            
            if(element.smallInput != undefined){
                const newDiv = document.createElement("div");
                newDiv.setAttribute('class', 'small-input_gestion')
                element.smallInput.forEach(single => {
                    const input = document.createElement("input");
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'small-input')
                    newDiv.appendChild(input);
                });
                newContainer.appendChild(newDiv)
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            if(element.bigInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'big-input')
                input.addEventListener('keypress', (e) => {
                    console.log(e)
                    console.log(input.value.length)
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }

                })
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "uniqueChoice":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName
            
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);

            const newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'choice_gestion')
            
            
            element.choice.forEach(single => {
                number = number + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox');
                input.addEventListener("change", checkbox)
                input.setAttribute('id', `${number}`);
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                element.choice.length <= 3 ? newDiv.style.width = "fit-content" : null;
                element.choice.length <= 3 ? containerChoice.style.marginRight = "15px" : null;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                newDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(newDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "multipleChoice":
            question.innerHTML = element.QuestionName;
            questionNumber.innerHTML = element.QuestionNumber + " {#Multiple}";               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const reNewDiv = document.createElement("div");
            reNewDiv.setAttribute('class', 'choice_gestion')
            element.choice.forEach(single => {
                numberTwo = numberTwo + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox');
                input.setAttribute('id', `${numberTwo}`);
                input.addEventListener("change", checkbox)
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                reNewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(reNewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "orderChoice":
            question.innerHTML = element.QuestionName
            questionNumber.innerHTML = element.QuestionNumber;               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const rerenewDiv = document.createElement("div");
            rerenewDiv.setAttribute('class', 'choice_gestion')
            element.choiceOrder.forEach(single => {
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice');
                input.setAttribute('type', 'number');
                input.setAttribute('class', 'case-number');
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                rerenewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(rerenewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
    }
}
function checkbox(e){
    switch(e.target.id){
        case "101":
            if (document.getElementById("101").checked == true){
                document.getElementById("102").checked = false
            }
            break;
        case "102":
            if (document.getElementById("102").checked == true){
                document.getElementById("101").checked = false
            }
            break;
        case "103":
            if (document.getElementById("103").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("105").checked = false
                document.getElementById("106").checked = false
            }
            break;
        case "104":
            if (document.getElementById("104").checked == true){
                document.getElementById("103").checked = false
                document.getElementById("105").checked = false
                document.getElementById("106").checked = false
            }
            break;
        case "105":
            if (document.getElementById("105").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("103").checked = false
                document.getElementById("106").checked = false
            }
            break;
        case "106":
            if (document.getElementById("106").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("105").checked = false
                document.getElementById("103").checked = false
            }
        break;
        case "107":
            if (document.getElementById("107").checked == true){
                document.getElementById("108").checked = false
            }
        break;
        case "108":
            if (document.getElementById("108").checked == true){
                document.getElementById("107").checked = false
            }
        break;
        case "109":
            if (document.getElementById("109").checked == true){
                document.getElementById("110").checked = false
                document.getElementById("111").checked = false
                document.getElementById("112").checked = false
            }
        break;
        case "110":
            if (document.getElementById("110").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("111").checked = false
                document.getElementById("112").checked = false
            }
        break;
        case "111":
            if (document.getElementById("111").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("110").checked = false
                document.getElementById("112").checked = false
            }
        break;
        case "112":
            if (document.getElementById("112").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("110").checked = false
                document.getElementById("111").checked = false
            }
        break;
        case "113":
            if (document.getElementById("113").checked == true){
                document.getElementById("114").checked = false
            }
        break;
        case "114":
            if (document.getElementById("114").checked == true){
                document.getElementById("113").checked = false
            }
        break;
        case "115":
            if (document.getElementById("115").checked == true){
                document.getElementById("116").checked = false
                document.getElementById("117").checked = false
            }
        break;
        case "116":
            if (document.getElementById("116").checked == true){
                document.getElementById("115").checked = false
                document.getElementById("117").checked = false
            }
        break;
        case "117":
            if (document.getElementById("117").checked == true){
                document.getElementById("115").checked = false
                document.getElementById("116").checked = false
            }
        break;
        case "118":
            if (document.getElementById("118").checked == true){
                document.getElementById("119").checked = false
                document.getElementById("120").checked = false
            }
        break;
        case "119":
            if (document.getElementById("119").checked == true){
                document.getElementById("118").checked = false
                document.getElementById("120").checked = false
            }
        break;
        case "120":
            if (document.getElementById("120").checked == true){
                document.getElementById("118").checked = false
                document.getElementById("119").checked = false
            }
        break;
        case "121":
            if (document.getElementById("121").checked == true){
                document.getElementById("122").checked = false
            }
        break;
        case "122":
            if (document.getElementById("122").checked == true){
                document.getElementById("121").checked = false
            }
        break;
        case "123":
            if (document.getElementById("123").checked == true){
                document.getElementById("124").checked = false
            }
        break;
        case "124":
            if (document.getElementById("124").checked == true){
                document.getElementById("123").checked = false
            }
        break;
        case "125":
            if (document.getElementById("125").checked == true){
                document.getElementById("126").checked = false
            }
        break;
        case "126":
            if (document.getElementById("126").checked == true){
                document.getElementById("125").checked = false
            }
        break;
        case "127":
            if (document.getElementById("127").checked == true){
                document.getElementById("128").checked = false
                document.getElementById("129").checked = false
            }
        break;
        case "128":
            if (document.getElementById("128").checked == true){
                document.getElementById("127").checked = false
                document.getElementById("129").checked = false
            }
        break;
        case "129":
            if (document.getElementById("129").checked == true){
                document.getElementById("128").checked = false
                document.getElementById("127").checked = false
            }
        break;
        case "130":
            if (document.getElementById("130").checked == true){
                document.getElementById("132").checked = false
                document.getElementById("132").checked = false
            }
        break;
        case "131":
            if (document.getElementById("131").checked == true){
                document.getElementById("132").checked = false
                document.getElementById("130").checked = false
            }
        break;
        case "132":
            if (document.getElementById("132").checked == true){
                document.getElementById("131").checked = false
                document.getElementById("130").checked = false
            }
        break;
        case "133":
            if (document.getElementById("133").checked == true){
                document.getElementById("134").checked = false
            }
        break;
        case "134":
            if (document.getElementById("134").checked == true){
                document.getElementById("133").checked = false
            }
        break;
        case "135":
            if (document.getElementById("135").checked == true){
                document.getElementById("136").checked = false
            }
        break;
        case "136":
            if (document.getElementById("136").checked == true){
                document.getElementById("135").checked = false
            }
        break;
        case "137":
            if (document.getElementById("137").checked == true){
                document.getElementById("138").checked = false
            }
        break;
        case "138":
            if (document.getElementById("138").checked == true){
                document.getElementById("137").checked = false
            }
        break;
        case "139":
            if (document.getElementById("139").checked == true){
                document.getElementById("140").checked = false
            }
        break;
        case "140":
            if (document.getElementById("140").checked == true){
                document.getElementById("139").checked = false
            }
        break;
        case "141":
            if (document.getElementById("141").checked == true){
                document.getElementById("142").checked = false
                document.getElementById("143").checked = false
            }
        break;
        case "142":
            if (document.getElementById("142").checked == true){
                document.getElementById("141").checked = false
                document.getElementById("143").checked = false
            }
        break;
        case "143":
            if (document.getElementById("143").checked == true){
                document.getElementById("142").checked = false
                document.getElementById("141").checked = false
            }
        break;
        case "144":
            if (document.getElementById("144").checked == true){
                document.getElementById("145").checked = false
                document.getElementById("146").checked = false
            }
        break;
        case "145":
            if (document.getElementById("145").checked == true){
                document.getElementById("144").checked = false
                document.getElementById("146").checked = false
            }
        break;
        case "146":
            if (document.getElementById("146").checked == true){
                document.getElementById("145").checked = false
                document.getElementById("144").checked = false
            }
        break;
        case "147":
            if (document.getElementById("147").checked == true){
                document.getElementById("148").checked = false
            }
        break;
        case "148":
            if (document.getElementById("148").checked == true){
                document.getElementById("147").checked = false
            }
        break;
        case "149":
            if (document.getElementById("149").checked == true){
                document.getElementById("150").checked = false
                document.getElementById("151").checked = false
                document.getElementById("152").checked = false
            }
        break;
        case "150":
            if (document.getElementById("150").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("151").checked = false
                document.getElementById("152").checked = false
            }
        break;
        case "151":
            if (document.getElementById("151").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("150").checked = false
                document.getElementById("152").checked = false
            }
        break;
        case "152":
            if (document.getElementById("152").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("151").checked = false
                document.getElementById("150").checked = false
            }
        break;
        case "153":
            if (document.getElementById("153").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("155").checked = false
                document.getElementById("156").checked = false
            }
        break;
        case "154":
            if (document.getElementById("154").checked == true){
                document.getElementById("153").checked = false
                document.getElementById("155").checked = false
                document.getElementById("156").checked = false
            }
        break;
        case "155":
            if (document.getElementById("155").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("153").checked = false
                document.getElementById("156").checked = false
            }
        break;
        case "156":
            if (document.getElementById("156").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("155").checked = false
                document.getElementById("153").checked = false
            }
        break;
        case "157":
            if (document.getElementById("157").checked == true){
                document.getElementById("158").checked = false
                document.getElementById("159").checked = false
            }
        break;
        case "158":
            if (document.getElementById("158").checked == true){
                document.getElementById("157").checked = false
                document.getElementById("159").checked = false
            }
        break;
        case "159":
            if (document.getElementById("159").checked == true){
                document.getElementById("158").checked = false
                document.getElementById("157").checked = false
            }
        break;
        case "160":
            if (document.getElementById("160").checked == true){
                document.getElementById("161").checked = false
            }
        break;
        case "161":
            if (document.getElementById("161").checked == true){
                document.getElementById("160").checked = false
            }
        break;
        case "162":
            if (document.getElementById("162").checked == true){
                document.getElementById("163").checked = false
            }
        break;
        case "163":
            if (document.getElementById("163").checked == true){
                document.getElementById("162").checked = false
            }
        break;
        case "164":
            if (document.getElementById("164").checked == true){
                document.getElementById("165").checked = false
            }
        break;
        case "165":
            if (document.getElementById("165").checked == true){
                document.getElementById("164").checked = false
            }
        break;
        case "166":
            if (document.getElementById("166").checked == true){
                document.getElementById("167").checked = false
            }
        break;
        case "167":
            if (document.getElementById("167").checked == true){
                document.getElementById("166").checked = false
            }
        break;
        case "168":
            if (document.getElementById("168").checked == true){
                document.getElementById("169").checked = false
            }
        break;
        case "169":
            if (document.getElementById("169").checked == true){
                document.getElementById("168").checked = false
            }
        break;
        case "170":
            if (document.getElementById("170").checked == true){
                document.getElementById("171").checked = false
                document.getElementById("172").checked = false
            }
        break;
        case "171":
            if (document.getElementById("171").checked == true){
                document.getElementById("170").checked = false
                document.getElementById("172").checked = false
            }
        break;
        case "172":
            if (document.getElementById("172").checked == true){
                document.getElementById("171").checked = false
                document.getElementById("170").checked = false
            }
        break;
        case "173":
            if (document.getElementById("173").checked == true){
                document.getElementById("174").checked = false
            }
        break;
        case "174":
            if (document.getElementById("174").checked == true){
                document.getElementById("173").checked = false
            }
        break;
        case "175":
            if (document.getElementById("175").checked == true){
                document.getElementById("176").checked = false
            }
        break;
        case "176":
            if (document.getElementById("176").checked == true){
                document.getElementById("175").checked = false
            }
        break;
        case "177":
            if (document.getElementById("177").checked == true){
                document.getElementById("178").checked = false
            }
        break;
        case "178":
            if (document.getElementById("178").checked == true){
                document.getElementById("177").checked = false
            }
        break;
        case "179":
            if (document.getElementById("179").checked == true){
                document.getElementById("180").checked = false
            }
        break;
        case "180":
            if (document.getElementById("180").checked == true){
                document.getElementById("179").checked = false
            }
        break;
        case "181":
            if (document.getElementById("181").checked == true){
                document.getElementById("182").checked = false
            }
        break;
        case "182":
            if (document.getElementById("182").checked == true){
                document.getElementById("181").checked = false
            }
        break;
        case "183":
            if (document.getElementById("183").checked == true){
                document.getElementById("184").checked = false
            }
        break;
        case "184":
            if (document.getElementById("184").checked == true){
                document.getElementById("183").checked = false
            }
        break;
    }
}

function generer(){
    const getName = window.sessionStorage.getItem("name");
    const getLastName = window.sessionStorage.getItem("lastName")
    const container = document.querySelector('body')
    const element = document.getElementById('print');
    container.style.minWidth = "1300px"
    element.style.minWidth = "800px"
    html2canvas(document.getElementById("print")).then(canvas => {
        const a = document.createElement('a');
        let link = canvas.toDataURL();
        a.href = link
        a.download = `${getName+'_'+getLastName+'_qcm.png'}`
        setTimeout(() => {
            a.click()
        }, 1000);
    })
}