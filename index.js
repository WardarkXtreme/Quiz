const btn = document.querySelector('.input-btn');
const verifySave = window.localStorage.getItem('save')

document.getElementById('name').addEventListener('input', (e) => {
    const name = document.getElementById('name');
    const regExName = /^(([a-zA-Z\s-]{3,25}))$/;
    const infoName = document.querySelector('.info-form_name')
    const regExNameVerify = name.value.match(regExName)
    if(!regExNameVerify){
        infoName.innerHTML = "Caractères non autorisés"
        infoName.style.color = 'red'
    }
    if(e.target.value.length <=2){
        infoName.innerHTML = `${e.target.value.length}/3 caractères minimum`
        infoName.style.color = 'red'
    }
    if(e.target.value.length >=25){
        infoName.innerHTML = `${e.target.value.length}/25 caractères maximum`
        infoName.style.color = 'red'
    }
    if(regExNameVerify){
        infoName.innerHTML = ""
    }
    console.log(e.target.value)
})
document.getElementById('lastname').addEventListener('input', (e) => {
    const lastname = document.getElementById('lastname');
    const regExLastName = /^(([a-zA-Z\s-]{3,25}))$/;
    const regExLastNameVerify = lastname.value.match(regExLastName)
    const infoLastName = document.querySelector('.info-form_lastname')
    
    if(!regExLastNameVerify){
        infoLastName.innerHTML = "Caractères non autorisés"
        infoLastName.style.color = 'red'
    }
    if(e.target.value.length <=2){
        infoLastName.innerHTML = `${e.target.value.length}/3 caractères minimum`
        infoLastName.style.color = 'red'
    }
    if(e.target.value.length >=25){
        infoLastName.innerHTML = `${e.target.value.length}/25 caractères maximum`
        infoLastName.style.color = 'red'
    }
    if(regExLastNameVerify){
        infoLastName.innerHTML = ""
    }
    console.log(e.target.value)
})
document.getElementById('school').addEventListener('input', (e) => {
    const school = document.getElementById('school');
    const regExSchool = /^(([a-zA-Z\s-]{5,25}))$/;
    const regExSchoolVerify = school.value.match(regExSchool)
    const infoSchool = document.querySelector('.info-form_school')
    
    if(!regExSchoolVerify){
        infoSchool.innerHTML = "Caractères non autorisés"
        infoSchool.style.color = 'red'
    }
    if(e.target.value.length <=5){
        infoSchool.innerHTML = `${e.target.value.length}/5 caractères minimum`
        infoSchool.style.color = 'red'
    }
    if(e.target.value.length >=25){
        infoSchool.innerHTML = `${e.target.value.length}/25 caractères maximum`
        infoSchool.style.color = 'red'
    }
    if(regExSchoolVerify){
        infoSchool.innerHTML = ""
    }
    console.log(e.target.value)
})
document.getElementById('mail').addEventListener('input', (e) => {
    const mail = document.getElementById('mail');
    const regExMail = /^(([a-zA-Z0-9._-]+@[a-z0-9.]+[.][a-z]{2,6}))$/;
    const regExMailVerify = mail.value.match(regExMail)
    const infoMail = document.querySelector('.info-form_mail')
    if(!regExMailVerify){
        infoMail.innerHTML = "email non valide, caractéres spéciaux autorisées:{-_@.}"
        infoMail.style.color = 'red'
    }
    if(regExMailVerify){
        infoMail.innerHTML = ""
    }
    console.log(e.target.value)
})
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
        window.localStorage.setItem("name", name.value);
        window.localStorage.setItem("lastName", lastname.value);
        window.localStorage.setItem("school", school.value)
        window.localStorage.setItem("mail", mail.value)

        const getName = window.localStorage.getItem("name");
        const getLastName = window.localStorage.getItem("lastName");
        const getSchool = window.localStorage.getItem("school");
        const getMail = window.localStorage.getItem("mail");

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

        file.QCM[60].name = getName
        file.QCM[60].lastName = getLastName
        file.QCM[60].school = getSchool
        file.QCM[60].mail = getMail
    }
})
let file;
fetch("./quiz.json")
.then((response) => response.json())
.then((jsondata) => {
    if(verifySave === null) {
        file = jsondata
        jsondata.QCM.forEach(element => {
            createElement(document.querySelector(".qcm"), element)
        })
    }else{
        const saveParse = JSON.parse(verifySave);
        file = saveParse;
        saveParse.QCM.forEach(element => {
            createElement(document.querySelector(".qcm"), element)
        })
    }
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
                    single.input.length > 3 ? input.value = single.input : input.value = "";
                    input.addEventListener('change', ()=>{
                        for(let i = 0; i<document.querySelectorAll('.small-input').length; i++){                            
                            file.QCM[0].smallInput[i].input = document.querySelectorAll('.small-input')[i].value
                        }
                    })
                    newDiv.appendChild(input);
                });
                newContainer.appendChild(newDiv)
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.addEventListener('change', ()=>{               
                    const middlein = document.querySelectorAll('.middle-input')
                    file.QCM[9].middleInput[0].input = middlein[1].value 
                })
                input.addEventListener('keypress', (e) => {
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
            if(element.bigInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'big-input')
                element.bigInput[0].input.length > 4 ? input.value = element.bigInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
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
                input.addEventListener('change', ()=>{
                    const bigin = document.querySelectorAll('.big-input')
                    file.QCM[1].bigInput[0].input = bigin[0].value
                    file.QCM[30].bigInput[0].input = bigin[1].value
                    file.QCM[31].bigInput[0].input = bigin[2].value
                    file.QCM[41].bigInput[0].input = bigin[3].value
                    file.QCM[42].bigInput[0].input = bigin[4].value
                    file.QCM[44].bigInput[0].input = bigin[5].value
                    file.QCM[45].bigInput[0].input = bigin[6].value
                    file.QCM[47].bigInput[0].input = bigin[7].value
                    file.QCM[55].bigInput[0].input = bigin[8].value
                    file.QCM[59].bigInput[0].input = bigin[9].value
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
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
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
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.addEventListener('change', ()=>{               
                    const middlein = document.querySelectorAll('.middle-input')
                    file.QCM[7].middleInput[0].input = middlein[0].value 
                    file.QCM[10].middleInput[0].input = middlein[2].value 
                    file.QCM[14].middleInput[0].input = middlein[3].value 
                    file.QCM[15].middleInput[0].input = middlein[4].value 
                    file.QCM[36].middleInput[0].input = middlein[5].value 
                    file.QCM[37].middleInput[0].input = middlein[6].value 
                })
                input.addEventListener('keypress', (e) => {
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
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
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
                element.middleInput[0].input.length > 3 ? input.value = element.middleInput[0].input : input.value = "";
                input.addEventListener('keypress', (e) => {
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
                single.value > 0 ? input.value = single.value : input.placeholder = single.value;
                input.addEventListener('change', ()=>{               
                    const orderin = document.querySelectorAll('.case-number')
                    file.QCM[8].choiceOrder[0].value = orderin[0].value
                    file.QCM[8].choiceOrder[1].value = orderin[1].value
                    file.QCM[8].choiceOrder[2].value = orderin[2].value
                    file.QCM[8].choiceOrder[3].value = orderin[3].value
                    file.QCM[8].choiceOrder[4].value = orderin[4].value
                    file.QCM[8].choiceOrder[5].value = orderin[5].value
                    file.QCM[40].choiceOrder[0].value = orderin[6].value
                    file.QCM[40].choiceOrder[1].value = orderin[7].value
                    file.QCM[40].choiceOrder[2].value = orderin[8].value
                    file.QCM[40].choiceOrder[3].value = orderin[9].value
                    file.QCM[48].choiceOrder[0].value = orderin[10].value
                    file.QCM[48].choiceOrder[1].value = orderin[11].value
                    file.QCM[48].choiceOrder[2].value = orderin[12].value
                    file.QCM[48].choiceOrder[3].value = orderin[13].value
                    file.QCM[48].choiceOrder[4].value = orderin[14].value
                    file.QCM[48].choiceOrder[5].value = orderin[15].value
                    file.QCM[49].choiceOrder[0].value = orderin[16].value
                    file.QCM[49].choiceOrder[1].value = orderin[17].value
                    file.QCM[49].choiceOrder[2].value = orderin[18].value
                    file.QCM[49].choiceOrder[3].value = orderin[19].value
                    file.QCM[49].choiceOrder[4].value = orderin[20].value
                })
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
                
                input.addEventListener('change', ()=>{               
                    const middlein = document.querySelectorAll('.middle-input')
                    file.QCM[49].middleInput[0] = middlein[7].value
                })
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
                file.QCM[2].choice[0].checked = document.getElementById("101").checked
                file.QCM[2].choice[1].checked = document.getElementById("102").checked
            }
            break;
        case "102":
            if (document.getElementById("102").checked == true){
                document.getElementById("101").checked = false
                file.QCM[2].choice[0].checked = document.getElementById("101").checked
                file.QCM[2].choice[1].checked = document.getElementById("102").checked
            }
            break;
        case "103":
            if (document.getElementById("103").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("105").checked = false
                document.getElementById("106").checked = false
                file.QCM[3].choice[0].checked = document.getElementById("103").checked
                file.QCM[3].choice[1].checked = document.getElementById("104").checked
                file.QCM[3].choice[2].checked = document.getElementById("105").checked
                file.QCM[3].choice[3].checked = document.getElementById("106").checked
            }
            break;
        case "104":
            if (document.getElementById("104").checked == true){
                document.getElementById("103").checked = false
                document.getElementById("105").checked = false
                document.getElementById("106").checked = false
                file.QCM[3].choice[0].checked = document.getElementById("103").checked
                file.QCM[3].choice[1].checked = document.getElementById("104").checked
                file.QCM[3].choice[2].checked = document.getElementById("105").checked
                file.QCM[3].choice[3].checked = document.getElementById("106").checked
            }
            break;
        case "105":
            if (document.getElementById("105").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("103").checked = false
                document.getElementById("106").checked = false
                file.QCM[3].choice[0].checked = document.getElementById("103").checked
                file.QCM[3].choice[1].checked = document.getElementById("104").checked
                file.QCM[3].choice[2].checked = document.getElementById("105").checked
                file.QCM[3].choice[3].checked = document.getElementById("106").checked
            }
            break;
        case "106":
            if (document.getElementById("106").checked == true){
                document.getElementById("104").checked = false
                document.getElementById("105").checked = false
                document.getElementById("103").checked = false
                file.QCM[3].choice[0].checked = document.getElementById("103").checked
                file.QCM[3].choice[1].checked = document.getElementById("104").checked
                file.QCM[3].choice[2].checked = document.getElementById("105").checked
                file.QCM[3].choice[3].checked = document.getElementById("106").checked
            }
        break;
        case "107":
            if (document.getElementById("107").checked == true){
                document.getElementById("108").checked = false
                file.QCM[4].choice[0].checked = document.getElementById("107").checked
                file.QCM[4].choice[1].checked = document.getElementById("108").checked
            }
        break;
        case "108":
            if (document.getElementById("108").checked == true){
                document.getElementById("107").checked = false
                file.QCM[4].choice[0].checked = document.getElementById("107").checked
                file.QCM[4].choice[1].checked = document.getElementById("108").checked
            }
        break;
        case "109":
            if (document.getElementById("109").checked == true){
                document.getElementById("110").checked = false
                document.getElementById("111").checked = false
                document.getElementById("112").checked = false
                file.QCM[5].choice[0].checked = document.getElementById("109").checked
                file.QCM[5].choice[1].checked = document.getElementById("110").checked
                file.QCM[5].choice[2].checked = document.getElementById("111").checked
                file.QCM[5].choice[3].checked = document.getElementById("112").checked
            }
        break;
        case "110":
            if (document.getElementById("110").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("111").checked = false
                document.getElementById("112").checked = false
                file.QCM[5].choice[0].checked = document.getElementById("109").checked
                file.QCM[5].choice[1].checked = document.getElementById("110").checked
                file.QCM[5].choice[2].checked = document.getElementById("111").checked
                file.QCM[5].choice[3].checked = document.getElementById("112").checked
            }
        break;
        case "111":
            if (document.getElementById("111").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("110").checked = false
                document.getElementById("112").checked = false
                file.QCM[5].choice[0].checked = document.getElementById("109").checked
                file.QCM[5].choice[1].checked = document.getElementById("110").checked
                file.QCM[5].choice[2].checked = document.getElementById("111").checked
                file.QCM[5].choice[3].checked = document.getElementById("112").checked
            }
        break;
        case "112":
            if (document.getElementById("112").checked == true){
                document.getElementById("109").checked = false
                document.getElementById("110").checked = false
                document.getElementById("111").checked = false
                file.QCM[5].choice[0].checked = document.getElementById("109").checked
                file.QCM[5].choice[1].checked = document.getElementById("110").checked
                file.QCM[5].choice[2].checked = document.getElementById("111").checked
                file.QCM[5].choice[3].checked = document.getElementById("112").checked
            }
        break;
        case "113":
            if (document.getElementById("113").checked == true){
                document.getElementById("114").checked = false
                file.QCM[7].choice[0].checked = document.getElementById("113").checked
                file.QCM[7].choice[1].checked = document.getElementById("114").checked
            }
        break;
        case "114":
            if (document.getElementById("114").checked == true){
                document.getElementById("113").checked = false
                file.QCM[7].choice[0].checked = document.getElementById("113").checked
                file.QCM[7].choice[1].checked = document.getElementById("114").checked
            }
        break;
        case "115":
            if (document.getElementById("115").checked == true){
                document.getElementById("116").checked = false
                document.getElementById("117").checked = false
                file.QCM[10].choice[0].checked = document.getElementById("115").checked
                file.QCM[10].choice[1].checked = document.getElementById("116").checked
                file.QCM[10].choice[2].checked = document.getElementById("117").checked
            }
        break;
        case "116":
            if (document.getElementById("116").checked == true){
                document.getElementById("115").checked = false
                document.getElementById("117").checked = false
                file.QCM[10].choice[0].checked = document.getElementById("115").checked
                file.QCM[10].choice[1].checked = document.getElementById("116").checked
                file.QCM[10].choice[2].checked = document.getElementById("117").checked
            }
        break;
        case "117":
            if (document.getElementById("117").checked == true){
                document.getElementById("115").checked = false
                document.getElementById("116").checked = false
                file.QCM[10].choice[0].checked = document.getElementById("115").checked
                file.QCM[10].choice[1].checked = document.getElementById("116").checked
                file.QCM[10].choice[2].checked = document.getElementById("117").checked
            }
        break;
        case "118":
            if (document.getElementById("118").checked == true){
                document.getElementById("119").checked = false
                document.getElementById("120").checked = false
                file.QCM[11].choice[0].checked = document.getElementById("118").checked
                file.QCM[11].choice[1].checked = document.getElementById("119").checked
                file.QCM[11].choice[2].checked = document.getElementById("120").checked
            }
        break;
        case "119":
            if (document.getElementById("119").checked == true){
                document.getElementById("118").checked = false
                document.getElementById("120").checked = false
                file.QCM[11].choice[0].checked = document.getElementById("118").checked
                file.QCM[11].choice[1].checked = document.getElementById("119").checked
                file.QCM[11].choice[2].checked = document.getElementById("120").checked
            }
        break;
        case "120":
            if (document.getElementById("120").checked == true){
                document.getElementById("118").checked = false
                document.getElementById("119").checked = false
                file.QCM[11].choice[0].checked = document.getElementById("118").checked
                file.QCM[11].choice[1].checked = document.getElementById("119").checked
                file.QCM[11].choice[2].checked = document.getElementById("120").checked
            }
        break;
        case "121":
            if (document.getElementById("121").checked == true){
                document.getElementById("122").checked = false
                file.QCM[12].choice[0].checked = document.getElementById("121").checked
                file.QCM[12].choice[1].checked = document.getElementById("122").checked
            }
        break;
        case "122":
            if (document.getElementById("122").checked == true){
                document.getElementById("121").checked = false
                file.QCM[12].choice[0].checked = document.getElementById("121").checked
                file.QCM[12].choice[1].checked = document.getElementById("122").checked
            }
        break;
        case "123":
            if (document.getElementById("123").checked == true){
                document.getElementById("124").checked = false
                file.QCM[14].choice[0].checked = document.getElementById("123").checked
                file.QCM[14].choice[1].checked = document.getElementById("124").checked
            }
        break;
        case "124":
            if (document.getElementById("124").checked == true){
                document.getElementById("123").checked = false
                file.QCM[14].choice[0].checked = document.getElementById("123").checked
                file.QCM[14].choice[1].checked = document.getElementById("124").checked
            }
        break;
        case "125":
            if (document.getElementById("125").checked == true){
                document.getElementById("126").checked = false
                file.QCM[15].choice[0].checked = document.getElementById("125").checked
                file.QCM[15].choice[1].checked = document.getElementById("126").checked
            }
        break;
        case "126":
            if (document.getElementById("126").checked == true){
                document.getElementById("125").checked = false
                file.QCM[15].choice[0].checked = document.getElementById("125").checked
                file.QCM[15].choice[1].checked = document.getElementById("126").checked
            }
        break;
        case "127":
            if (document.getElementById("127").checked == true){
                document.getElementById("128").checked = false
                document.getElementById("129").checked = false
                file.QCM[16].choice[0].checked = document.getElementById("127").checked
                file.QCM[16].choice[1].checked = document.getElementById("128").checked
                file.QCM[16].choice[2].checked = document.getElementById("129").checked
            }
        break;
        case "128":
            if (document.getElementById("128").checked == true){
                document.getElementById("127").checked = false
                document.getElementById("129").checked = false
                file.QCM[16].choice[0].checked = document.getElementById("127").checked
                file.QCM[16].choice[1].checked = document.getElementById("128").checked
                file.QCM[16].choice[2].checked = document.getElementById("129").checked
            }
        break;
        case "129":
            if (document.getElementById("129").checked == true){
                document.getElementById("128").checked = false
                document.getElementById("127").checked = false
                file.QCM[16].choice[0].checked = document.getElementById("127").checked
                file.QCM[16].choice[1].checked = document.getElementById("128").checked
                file.QCM[16].choice[2].checked = document.getElementById("129").checked
            }
        break;
        case "130":
            if (document.getElementById("130").checked == true){
                document.getElementById("132").checked = false
                document.getElementById("131").checked = false
                file.QCM[17].choice[0].checked = document.getElementById("130").checked
                file.QCM[17].choice[1].checked = document.getElementById("131").checked
                file.QCM[17].choice[2].checked = document.getElementById("132").checked
            }
        break;
        case "131":
            if (document.getElementById("131").checked == true){
                document.getElementById("132").checked = false
                document.getElementById("130").checked = false
                file.QCM[17].choice[0].checked = document.getElementById("130").checked
                file.QCM[17].choice[1].checked = document.getElementById("131").checked
                file.QCM[17].choice[2].checked = document.getElementById("132").checked
            }
        break;
        case "132":
            if (document.getElementById("132").checked == true){
                document.getElementById("131").checked = false
                document.getElementById("130").checked = false
                file.QCM[17].choice[0].checked = document.getElementById("130").checked
                file.QCM[17].choice[1].checked = document.getElementById("131").checked
                file.QCM[17].choice[2].checked = document.getElementById("132").checked
            }
        break;
        case "133":
            if (document.getElementById("133").checked == true){
                document.getElementById("134").checked = false
                file.QCM[20].choice[0].checked = document.getElementById("133").checked
                file.QCM[20].choice[1].checked = document.getElementById("134").checked
            }
        break;
        case "134":
            if (document.getElementById("134").checked == true){
                document.getElementById("133").checked = false
                file.QCM[20].choice[0].checked = document.getElementById("133").checked
                file.QCM[20].choice[1].checked = document.getElementById("134").checked
            }
        break;
        case "135":
            if (document.getElementById("135").checked == true){
                document.getElementById("136").checked = false
                file.QCM[21].choice[0].checked = document.getElementById("135").checked
                file.QCM[21].choice[1].checked = document.getElementById("136").checked
            }
        break;
        case "136":
            if (document.getElementById("136").checked == true){
                document.getElementById("135").checked = false
                file.QCM[21].choice[0].checked = document.getElementById("135").checked
                file.QCM[21].choice[1].checked = document.getElementById("136").checked
            }
        break;
        case "137":
            if (document.getElementById("137").checked == true){
                document.getElementById("138").checked = false
                file.QCM[22].choice[0].checked = document.getElementById("137").checked
                file.QCM[22].choice[1].checked = document.getElementById("138").checked
            }
        break;
        case "138":
            if (document.getElementById("138").checked == true){
                document.getElementById("137").checked = false
                file.QCM[22].choice[0].checked = document.getElementById("137").checked
                file.QCM[22].choice[1].checked = document.getElementById("138").checked
            }
        break;
        case "139":
            if (document.getElementById("139").checked == true){
                document.getElementById("140").checked = false
                file.QCM[24].choice[0].checked = document.getElementById("139").checked
                file.QCM[24].choice[1].checked = document.getElementById("140").checked
            }
        break;
        case "140":
            if (document.getElementById("140").checked == true){
                document.getElementById("139").checked = false
                file.QCM[24].choice[0].checked = document.getElementById("139").checked
                file.QCM[24].choice[1].checked = document.getElementById("140").checked
            }
        break;
        case "141":
            if (document.getElementById("141").checked == true){
                document.getElementById("142").checked = false
                document.getElementById("143").checked = false
                file.QCM[25].choice[0].checked = document.getElementById("141").checked
                file.QCM[25].choice[1].checked = document.getElementById("142").checked
                file.QCM[25].choice[2].checked = document.getElementById("143").checked
            }
        break;
        case "142":
            if (document.getElementById("142").checked == true){
                document.getElementById("141").checked = false
                document.getElementById("143").checked = false
                file.QCM[25].choice[0].checked = document.getElementById("141").checked
                file.QCM[25].choice[1].checked = document.getElementById("142").checked
                file.QCM[25].choice[2].checked = document.getElementById("143").checked
            }
        break;
        case "143":
            if (document.getElementById("143").checked == true){
                document.getElementById("142").checked = false
                document.getElementById("141").checked = false
                file.QCM[25].choice[0].checked = document.getElementById("141").checked
                file.QCM[25].choice[1].checked = document.getElementById("142").checked
                file.QCM[25].choice[2].checked = document.getElementById("143").checked
            }
        break;
        case "144":
            if (document.getElementById("144").checked == true){
                document.getElementById("145").checked = false
                document.getElementById("146").checked = false
                file.QCM[26].choice[0].checked = document.getElementById("144").checked
                file.QCM[26].choice[1].checked = document.getElementById("145").checked
                file.QCM[26].choice[2].checked = document.getElementById("146").checked
            }
        break;
        case "145":
            if (document.getElementById("145").checked == true){
                document.getElementById("144").checked = false
                document.getElementById("146").checked = false
                file.QCM[26].choice[0].checked = document.getElementById("144").checked
                file.QCM[26].choice[1].checked = document.getElementById("145").checked
                file.QCM[26].choice[2].checked = document.getElementById("146").checked
            }
        break;
        case "146":
            if (document.getElementById("146").checked == true){
                document.getElementById("145").checked = false
                document.getElementById("144").checked = false
                file.QCM[26].choice[0].checked = document.getElementById("144").checked
                file.QCM[26].choice[1].checked = document.getElementById("145").checked
                file.QCM[26].choice[2].checked = document.getElementById("146").checked
            }
        break;
        case "147":
            if (document.getElementById("147").checked == true){
                document.getElementById("148").checked = false
                file.QCM[27].choice[0].checked = document.getElementById("147").checked
                file.QCM[27].choice[1].checked = document.getElementById("148").checked
            }
        break;
        case "148":
            if (document.getElementById("148").checked == true){
                document.getElementById("147").checked = false
                file.QCM[27].choice[0].checked = document.getElementById("147").checked
                file.QCM[27].choice[1].checked = document.getElementById("148").checked
            }
        break;
        case "149":
            if (document.getElementById("149").checked == true){
                document.getElementById("150").checked = false
                document.getElementById("151").checked = false
                document.getElementById("152").checked = false
                file.QCM[29].choice[0].checked = document.getElementById("149").checked
                file.QCM[29].choice[1].checked = document.getElementById("150").checked
                file.QCM[29].choice[2].checked = document.getElementById("151").checked
                file.QCM[29].choice[3].checked = document.getElementById("152").checked
            }
        break;
        case "150":
            if (document.getElementById("150").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("151").checked = false
                document.getElementById("152").checked = false
                file.QCM[29].choice[0].checked = document.getElementById("149").checked
                file.QCM[29].choice[1].checked = document.getElementById("150").checked
                file.QCM[29].choice[2].checked = document.getElementById("151").checked
                file.QCM[29].choice[3].checked = document.getElementById("152").checked
            }
        break;
        case "151":
            if (document.getElementById("151").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("150").checked = false
                document.getElementById("152").checked = false
                file.QCM[29].choice[0].checked = document.getElementById("149").checked
                file.QCM[29].choice[1].checked = document.getElementById("150").checked
                file.QCM[29].choice[2].checked = document.getElementById("151").checked
                file.QCM[29].choice[3].checked = document.getElementById("152").checked
            }
        break;
        case "152":
            if (document.getElementById("152").checked == true){
                document.getElementById("149").checked = false
                document.getElementById("151").checked = false
                document.getElementById("150").checked = false
                file.QCM[29].choice[0].checked = document.getElementById("149").checked
                file.QCM[29].choice[1].checked = document.getElementById("150").checked
                file.QCM[29].choice[2].checked = document.getElementById("151").checked
                file.QCM[29].choice[3].checked = document.getElementById("152").checked
            }
        break;
        case "153":
            if (document.getElementById("153").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("155").checked = false
                document.getElementById("156").checked = false
                file.QCM[32].choice[0].checked = document.getElementById("153").checked
                file.QCM[32].choice[1].checked = document.getElementById("154").checked
                file.QCM[32].choice[2].checked = document.getElementById("155").checked
                file.QCM[32].choice[3].checked = document.getElementById("156").checked
            }
        break;
        case "154":
            if (document.getElementById("154").checked == true){
                document.getElementById("153").checked = false
                document.getElementById("155").checked = false
                document.getElementById("156").checked = false
                file.QCM[32].choice[0].checked = document.getElementById("153").checked
                file.QCM[32].choice[1].checked = document.getElementById("154").checked
                file.QCM[32].choice[2].checked = document.getElementById("155").checked
                file.QCM[32].choice[3].checked = document.getElementById("156").checked
            }
        break;
        case "155":
            if (document.getElementById("155").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("153").checked = false
                document.getElementById("156").checked = false
                file.QCM[32].choice[0].checked = document.getElementById("153").checked
                file.QCM[32].choice[1].checked = document.getElementById("154").checked
                file.QCM[32].choice[2].checked = document.getElementById("155").checked
                file.QCM[32].choice[3].checked = document.getElementById("156").checked
            }
        break;
        case "156":
            if (document.getElementById("156").checked == true){
                document.getElementById("154").checked = false
                document.getElementById("155").checked = false
                document.getElementById("153").checked = false
                file.QCM[32].choice[0].checked = document.getElementById("153").checked
                file.QCM[32].choice[1].checked = document.getElementById("154").checked
                file.QCM[32].choice[2].checked = document.getElementById("155").checked
                file.QCM[32].choice[3].checked = document.getElementById("156").checked
            }
        break;
        case "157":
            if (document.getElementById("157").checked == true){
                document.getElementById("158").checked = false
                document.getElementById("159").checked = false
                file.QCM[34].choice[0].checked = document.getElementById("157").checked
                file.QCM[34].choice[1].checked = document.getElementById("158").checked
                file.QCM[34].choice[2].checked = document.getElementById("159").checked
            }
        break;
        case "158":
            if (document.getElementById("158").checked == true){
                document.getElementById("157").checked = false
                document.getElementById("159").checked = false
                file.QCM[34].choice[0].checked = document.getElementById("157").checked
                file.QCM[34].choice[1].checked = document.getElementById("158").checked
                file.QCM[34].choice[2].checked = document.getElementById("159").checked
            }
        break;
        case "159":
            if (document.getElementById("159").checked == true){
                document.getElementById("158").checked = false
                document.getElementById("157").checked = false
                file.QCM[34].choice[0].checked = document.getElementById("157").checked
                file.QCM[34].choice[1].checked = document.getElementById("158").checked
                file.QCM[34].choice[2].checked = document.getElementById("159").checked
            }
        break;
        case "160":
            if (document.getElementById("160").checked == true){
                document.getElementById("161").checked = false
                file.QCM[35].choice[0].checked = document.getElementById("160").checked
                file.QCM[35].choice[1].checked = document.getElementById("161").checked
            }
        break;
        case "161":
            if (document.getElementById("161").checked == true){
                document.getElementById("160").checked = false
                file.QCM[35].choice[0].checked = document.getElementById("160").checked
                file.QCM[35].choice[1].checked = document.getElementById("161").checked
            }
        break;
        case "162":
            if (document.getElementById("162").checked == true){
                document.getElementById("163").checked = false
                file.QCM[36].choice[0].checked = document.getElementById("162").checked
                file.QCM[36].choice[1].checked = document.getElementById("163").checked
            }
        break;
        case "163":
            if (document.getElementById("163").checked == true){
                document.getElementById("162").checked = false
                file.QCM[36].choice[0].checked = document.getElementById("162").checked
                file.QCM[36].choice[1].checked = document.getElementById("163").checked
            }
        break;
        case "164":
            if (document.getElementById("164").checked == true){
                document.getElementById("165").checked = false
                file.QCM[37].choice[0].checked = document.getElementById("164").checked
                file.QCM[37].choice[1].checked = document.getElementById("165").checked
            }
        break;
        case "165":
            if (document.getElementById("165").checked == true){
                document.getElementById("164").checked = false
                file.QCM[37].choice[0].checked = document.getElementById("164").checked
                file.QCM[37].choice[1].checked = document.getElementById("165").checked
            }
        break;
        case "166":
            if (document.getElementById("166").checked == true){
                document.getElementById("167").checked = false
                file.QCM[38].choice[0].checked = document.getElementById("166").checked
                file.QCM[38].choice[1].checked = document.getElementById("167").checked
            }
        break;
        case "167":
            if (document.getElementById("167").checked == true){
                document.getElementById("166").checked = false
                file.QCM[38].choice[0].checked = document.getElementById("166").checked
                file.QCM[38].choice[1].checked = document.getElementById("167").checked
            }
        break;
        case "168":
            if (document.getElementById("168").checked == true){
                document.getElementById("169").checked = false
                file.QCM[39].choice[0].checked = document.getElementById("168").checked
                file.QCM[39].choice[1].checked = document.getElementById("169").checked
            }
        break;
        case "169":
            if (document.getElementById("169").checked == true){
                document.getElementById("168").checked = false
                file.QCM[39].choice[0].checked = document.getElementById("168").checked
                file.QCM[39].choice[1].checked = document.getElementById("169").checked
            }
        break;
        case "170":
            if (document.getElementById("170").checked == true){
                document.getElementById("171").checked = false
                document.getElementById("172").checked = false
                file.QCM[43].choice[0].checked = document.getElementById("170").checked
                file.QCM[43].choice[1].checked = document.getElementById("171").checked
                file.QCM[43].choice[2].checked = document.getElementById("172").checked
            }
        break;
        case "171":
            if (document.getElementById("171").checked == true){
                document.getElementById("170").checked = false
                document.getElementById("172").checked = false
                file.QCM[43].choice[0].checked = document.getElementById("170").checked
                file.QCM[43].choice[1].checked = document.getElementById("171").checked
                file.QCM[43].choice[2].checked = document.getElementById("172").checked
            }
        break;
        case "172":
            if (document.getElementById("172").checked == true){
                document.getElementById("171").checked = false
                document.getElementById("170").checked = false
                file.QCM[43].choice[0].checked = document.getElementById("170").checked
                file.QCM[43].choice[1].checked = document.getElementById("171").checked
                file.QCM[43].choice[2].checked = document.getElementById("172").checked
            }
        break;
        case "173":
            if (document.getElementById("173").checked == true){
                document.getElementById("174").checked = false
                file.QCM[46].choice[0].checked = document.getElementById("173").checked
                file.QCM[46].choice[1].checked = document.getElementById("174").checked
            }
        break;
        case "174":
            if (document.getElementById("174").checked == true){
                document.getElementById("173").checked = false
                file.QCM[46].choice[0].checked = document.getElementById("173").checked
                file.QCM[46].choice[1].checked = document.getElementById("174").checked
            }
        break;
        case "175":
            if (document.getElementById("175").checked == true){
                document.getElementById("176").checked = false
                file.QCM[53].choice[0].checked = document.getElementById("175").checked
                file.QCM[53].choice[1].checked = document.getElementById("176").checked
            }
        break;
        case "176":
            if (document.getElementById("176").checked == true){
                document.getElementById("175").checked = false
                file.QCM[53].choice[0].checked = document.getElementById("175").checked
                file.QCM[53].choice[1].checked = document.getElementById("176").checked
            }
        break;
        case "177":
            if (document.getElementById("177").checked == true){
                document.getElementById("178").checked = false
                file.QCM[54].choice[0].checked = document.getElementById("177").checked
                file.QCM[54].choice[1].checked = document.getElementById("178").checked
            }
        break;
        case "178":
            if (document.getElementById("178").checked == true){
                document.getElementById("177").checked = false
                file.QCM[54].choice[0].checked = document.getElementById("177").checked
                file.QCM[54].choice[1].checked = document.getElementById("178").checked
            }
        break;
        case "179":
            if (document.getElementById("179").checked == true){
                document.getElementById("180").checked = false
                file.QCM[56].choice[0].checked = document.getElementById("179").checked
                file.QCM[56].choice[1].checked = document.getElementById("180").checked
            }
        break;
        case "180":
            if (document.getElementById("180").checked == true){
                document.getElementById("179").checked = false
                file.QCM[56].choice[0].checked = document.getElementById("179").checked
                file.QCM[56].choice[1].checked = document.getElementById("180").checked
            }
        break;
        case "181":
            if (document.getElementById("181").checked == true){
                document.getElementById("182").checked = false
                file.QCM[57].choice[0].checked = document.getElementById("181").checked
                file.QCM[57].choice[1].checked = document.getElementById("182").checked
            }
        break;
        case "182":
            if (document.getElementById("182").checked == true){
                document.getElementById("181").checked = false
                file.QCM[57].choice[0].checked = document.getElementById("181").checked
                file.QCM[57].choice[1].checked = document.getElementById("182").checked
            }
        break;
        case "183":
            if (document.getElementById("183").checked == true){
                document.getElementById("184").checked = false
                file.QCM[58].choice[0].checked = document.getElementById("181").checked
                file.QCM[58].choice[1].checked = document.getElementById("182").checked
            }
        break;
        case "184":
            if (document.getElementById("184").checked == true){
                document.getElementById("183").checked = false
                file.QCM[58].choice[0].checked = document.getElementById("181").checked
                file.QCM[58].choice[1].checked = document.getElementById("182").checked
            }
        break;
        case "1001":
        case "1002":
        case "1003":
            file.QCM[6].choice[0].checked = document.getElementById("1001").checked
            file.QCM[6].choice[1].checked = document.getElementById("1002").checked
            file.QCM[6].choice[2].checked = document.getElementById("1003").checked
        break;
        case "1004":
        case "1005":
        case "1006":
        case "1007":
        case "1008":
            file.QCM[13].choice[0].checked = document.getElementById("1004").checked
            file.QCM[13].choice[1].checked = document.getElementById("1005").checked
            file.QCM[13].choice[2].checked = document.getElementById("1006").checked
            file.QCM[13].choice[3].checked = document.getElementById("1007").checked
            file.QCM[13].choice[4].checked = document.getElementById("1008").checked
        break;
        case "1009":
        case "1010":
        case "1011":
        case "1012":
            file.QCM[18].choice[0].checked = document.getElementById("1009").checked
            file.QCM[18].choice[1].checked = document.getElementById("1010").checked
            file.QCM[18].choice[2].checked = document.getElementById("1011").checked
            file.QCM[18].choice[3].checked = document.getElementById("1012").checked
        break;
        case "1013":
        case "1014":
        case "1015":
            file.QCM[19].choice[0].checked = document.getElementById("1013").checked
            file.QCM[19].choice[1].checked = document.getElementById("1014").checked
            file.QCM[19].choice[2].checked = document.getElementById("1015").checked
        break;
        case "1016":
        case "1017":
            file.QCM[23].choice[0].checked = document.getElementById("1016").checked
            file.QCM[23].choice[1].checked = document.getElementById("1017").checked
        break;
        case "1018":
        case "1019":
        case "1020":
        case "1021":
            file.QCM[28].choice[0].checked = document.getElementById("1018").checked
            file.QCM[28].choice[1].checked = document.getElementById("1019").checked
            file.QCM[28].choice[2].checked = document.getElementById("1020").checked
            file.QCM[28].choice[3].checked = document.getElementById("1021").checked
        break;
        case "1022":
        case "1023":
        case "1024":
            file.QCM[33].choice[0].checked = document.getElementById("1022").checked
            file.QCM[33].choice[1].checked = document.getElementById("1023").checked
            file.QCM[33].choice[2].checked = document.getElementById("1024").checked
        break;
        case "1025":
        case "1026":
        case "1027":
        case "1028":
        case "1029":
            file.QCM[50].choice[0].checked = document.getElementById("1025").checked
            file.QCM[50].choice[1].checked = document.getElementById("1026").checked
            file.QCM[50].choice[2].checked = document.getElementById("1027").checked
            file.QCM[50].choice[3].checked = document.getElementById("1028").checked
            file.QCM[50].choice[4].checked = document.getElementById("1029").checked
        break;
        case "1030":
        case "1031":
        case "1032":
        case "1033":
        case "1034":
            file.QCM[51].choice[0].checked = document.getElementById("1030").checked
            file.QCM[51].choice[1].checked = document.getElementById("1031").checked
            file.QCM[51].choice[2].checked = document.getElementById("1032").checked
            file.QCM[51].choice[3].checked = document.getElementById("1033").checked
            file.QCM[51].choice[4].checked = document.getElementById("1034").checked
        break;
        case "1035":
        case "1036":
        case "1037":
        case "1038":
        case "1039":
            file.QCM[52].choice[0].checked = document.getElementById("1035").checked
            file.QCM[52].choice[1].checked = document.getElementById("1036").checked
            file.QCM[52].choice[2].checked = document.getElementById("1037").checked
            file.QCM[52].choice[3].checked = document.getElementById("1038").checked
            file.QCM[52].choice[4].checked = document.getElementById("1039").checked
        break;
    }
}
function generer(){
    const urlFile = window.URL.createObjectURL(new Blob([JSON.stringify(file)], {type: "application/json"}))
    const getName = window.localStorage.getItem("name");
    const getLastName = window.localStorage.getItem("lastName")
    const a = document.createElement('a')
    a.href= (urlFile)
    a.download = `${getName+'_'+getLastName+'_qcm.json'}`
    a.click()
}
function addMenu(){
    const container = document.body;
    let menuBool = false
    const createDivMenu = document.createElement('div')
    createDivMenu.setAttribute('class', 'menu')
    const createIco = document.createElement('i')
    createIco.setAttribute('class', 'fa-solid fa-bars')
    const createBtnSave = document.createElement('button')
    createBtnSave.setAttribute('class', 'btn')
    createBtnSave.innerHTML = 'Sauvegarder ma progression'
    const createBtnDownload = document.createElement('button')
    createBtnDownload.setAttribute('class', 'btn')
    createBtnDownload.innerHTML = 'Télécharger pour la correction'
    createIco.addEventListener('click', () => {
        menuBool = !menuBool
        if (menuBool === false){
            createIco.className = 'fa-solid fa-bars'
            createDivMenu.classList.add('menuclose')
            createDivMenu.classList.remove('menuopen')
        }else{
            createIco.className = 'fa-solid fa-xmark'
            createDivMenu.classList.add('menuopen')
            createDivMenu.classList.remove('menuclose')
        }
    })
    createBtnSave.addEventListener('click', () => {
        window.localStorage.setItem("save", JSON.stringify(file));
        setTimeout(() => {
            alert("Votre travail à été enregistré..."+"\n"+"Vous pouvez quitter et revenir plus tard !");
        }, 1000);
    })
    createBtnDownload.addEventListener('click', () => {
        generer()
        setTimeout(() => {
            window.localStorage.clear();
        }, 1500);
    })
    createDivMenu.appendChild(createIco)
    createDivMenu.appendChild(createBtnSave)
    createDivMenu.appendChild(createBtnDownload)
    container.appendChild(createDivMenu)
}
addMenu();