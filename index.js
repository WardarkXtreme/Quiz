
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
    }
})


fetch("./quiz.json")
.then((response) => response.json())
.then((jsondata) => {
    console.log(jsondata.QCM)
    jsondata.QCM.forEach(element => {
        createElement(document.querySelector(".qcm"), element)
    })
})
.catch(error => console.log(error));


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
                const input = document.createElement("input");
                input.setAttribute('type', 'text')
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            if(element.bigInput != undefined){    
                const input = document.createElement("input");
                input.setAttribute('type', 'text')
                input.setAttribute('class', 'big-input')
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
            
            let number = 100;
            element.choice.forEach(single => {
                number = number + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('className', 'container-choice');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox');
                input.setAttribute('id', `${number}`);
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                newDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(newDiv)
            if(element.middleInput != undefined){    
                const input = document.createElement("input");
                input.setAttribute('type', 'text')
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
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('className', 'container-choice');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox');
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                reNewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(reNewDiv)
            if(element.middleInput != undefined){    
                const input = document.createElement("input");
                input.setAttribute('type', 'text')
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
                newContainer.appendChild(containerChoice)
            });
            if(element.middleInput != undefined){    
                const input = document.createElement("input");
                input.setAttribute('type', 'text')
                input.setAttribute('class', 'middle-input')
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
    }
}

function generer(){
    const getName = window.sessionStorage.getItem("name");
    const getLastName = window.sessionStorage.getItem("lastName")
    const element = document.getElementById('print');
    element.style.width = "1200px";
    const opt = {
        margin:       0,
        filename:     `${getName+'_'+getLastName+'_qcm.pdf'}`,
        image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
        scale: 2,           
        windowWidth: 1024   
    },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
       
    };

    html2pdf().set(opt).from(element).save();

}