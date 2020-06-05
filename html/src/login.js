function openRegistration(){
    enter.setAttribute('style','visibility:hidden');
    registration.setAttribute('style','visibility:visible');
    regPassword.value ='';
    regEmail.value = '';
    regPasswordRepeat.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
    removeErrorEmail();
    removeErrorPassword();
    removeErrorPasswordRepeat();
}

function backToLogin(){
    regPassword.value ='';
    regEmail.value = '';
    regPasswordRepeat.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
    registration.setAttribute('style','visibility:hidden');
    enter.setAttribute('style','visibility:visible');
    removeErrorEmail();
    removeErrorPassword();
    removeErrorPasswordRepeat();
}

async function doRegistration(){
    let email,password;
    if(checkValidations('registration') === true){
        email = regEmail.value;
        password = regPassword.value;
        let member = customers.filter(c => {return c.email == email;})[0];
        if(member){
            if(member.password.length > 7){    ShowMessage('Вы уже зарегистрированы.');    }
            else{   ShowMessage('Подтвердите электронную почту. Введите код, отправленный на email.');   }     
        }
        else{
            ShowMessage('Для регистрации и входа в личный кабинет необходимо быть клиентом клуба. Пользоваталь с такой почтой не является клиентом клуба.');
        } 
    }          
}

function ShowMessage(text){
    registration.setAttribute('style','visibility:hidden');
    textMessageBox.textContent = text;
    switch(text[0]){
        case 'Д':
            buttonMessageBox.setAttribute('onclick','goToMemberships()') ;
            buttonMessageBox.textContent = 'Выбрать абонемент';
            const cancel  = document.createElement('button');
            cancel.setAttribute('class','systemButton');
            cancel.textContent = 'ок';
            cancel.setAttribute('onclick','CloseMessageBoxNoEmail()');
            cancel.setAttribute('id','messageRegCancel');
            message_box__buttons.insertBefore(cancel,buttonMessageBox);
            break;
        case 'В':
            buttonMessageBox.setAttribute('onclick','goToEnter()') ;
            buttonMessageBox.textContent = 'Вход';
            break;
        case 'Н':
            buttonMessageBox.setAttribute('onclick','CloseMessageBox()');
            buttonMessageBox.textContent = 'ок';
            break;
        case 'П':
            let code = Math.floor(100000 + Math.random() * 900000);
            let email = regEmail.value;
            console.log("code:", code);
            sendConfirmOfEmail(code , email);
            const divCode = document.createElement('div');
            divCode.setAttribute('id','submitPasswordCode');

            let input;
            for(let i=0; i<6 ; i++){
                input = document.createElement('input');
                input.setAttribute('class','submitPasswordCode_item');
                input.setAttribute('oninput',`goNextInput(${i})`);
                input.setAttribute('type','text');
                input.setAttribute('maxlength','1');
                input.setAttribute('id',`submitPasswordCode_item${i}`);
                divCode.append(input);
            }

            message_box.insertBefore(divCode,message_box__buttons );
            buttonMessageBox.textContent = 'Подтвердить';
            buttonMessageBox.setAttribute('onclick',`confirmEmail('${code}')`);
            break;
    }
    message_box.setAttribute('style','visibility:visible');
}

function CloseMessageBox(){
    registration.setAttribute('style','visibility:visible');
    message_box.setAttribute('style','visibility:hidden');
}

function CloseMessageBoxNoEmail(){
    CloseMessageBox();
    message_box__buttons.removeChild(messageRegCancel);
}

function goToMemberships(){
    window.location = '/prices.html';
    
}

function goToEnter(){
    message_box.setAttribute('style','visibility:hidden');   
    removeErrorEmail();
    removeErrorPassword();
    removeErrorPasswordRepeat(); 
    regPasswordRepeat.value = '';
    loginEmail.value = regEmail.value ;
    loginPassword.value = regPassword.value;
    regEmail.value = '';
    regPassword.value ='';
    registration.setAttribute('style','visibility:hidden');
    enter.setAttribute('style','visibility:visible');
    
}

async function sendConfirmOfEmail(code, email){
    let dataToSend = {
        code:code,
        email:email
    };
    const sendToServer = new SendToServer();
    await sendToServer.postRequest('/submitEmail', dataToSend, result => {
    console.log(result);  
    }); 
}

async function confirmEmail(code){
    const inputName = 'submitPasswordCode_item';
    let submitCode = '';
    let input;
    for (let i = 0; i < 6; i++){
        input = document.getElementById(inputName + i);
        submitCode += input.value;
    }
    if(submitCode === code)
    {
        let dataToSend = {
            password:regPassword.value,
            email:regEmail.value
        }
        // console.log(dataToSend);
        const sendToServer = new SendToServer();
        await sendToServer.postRequest('/regCustomer', dataToSend, result => {
            let msg = JSON.parse(result).message;
            if(msg === 'already exists'){
                alert('Вы уже зарегистрированы!');
            } 
        }); 
        submitPasswordCode.remove();
        readCustomers();
        goToEnter();
    }
    else{
        alert('Неверный код');
    }    
}

function goNextInput(i){
    i++;
    document.getElementById('submitPasswordCode_item'+i).focus();
}

function validateEmail(id){
    let inputEmail = document.getElementById(id);
    if(inputEmail.value.length != ''){
        if(!inputEmail.value.endsWith('@gmail.com')){
            inputEmail.classList.add('invalid');
            if(id === 'loginEmail'){ wrongLoginEmail.textContent = ' введите почту gmail '; }
            else{ wrongRegEmail.textContent = ' введите почту gmail '; }
        }
    }   
}

function removeErrorEmail(){
    if(loginEmail.classList.contains('invalid')){
        loginEmail.classList.remove('invalid');
        wrongLoginEmail.textContent = '';
    }
    if(regEmail.classList.contains('invalid')){
        regEmail.classList.remove('invalid');
        wrongRegEmail.textContent = '';
    }
}

function validatePassword(id){
    let inputPassword = document.getElementById(id);
    
    if(inputPassword.value.length < 8 & inputPassword.value.length != ''){
        inputPassword.classList.add('invalid');
        
        if(id === 'loginPassword'){
            wrongLoginPassword.textContent = ' Введите 8 или более символов ';
        }
        else{
            wrongRegPassword.textContent = ' Введите 8 или более символов ';
        }
    }
}

function removeErrorPassword(){
    if(loginPassword.classList.contains('invalid')){
        loginPassword.classList.remove('invalid');
        wrongLoginPassword.textContent = '';
    }
    if(regPassword.classList.contains('invalid')){
        regPassword.classList.remove('invalid');
        wrongRegPassword.textContent = '';
    }
}

function validatePasswordRepeat(){
    let repeatPassword = document.getElementById('regPasswordRepeat');

    if(regPassword.value !== repeatPassword.value & repeatPassword.value.length != ''){
        repeatPassword.classList.add('invalid');
        wrongRegPasswordRepeat.textContent = ' Пароли не совпадают ';
    }
}

function removeErrorPasswordRepeat(){
    let repeatPassword = document.getElementById('regPasswordRepeat');
    if(repeatPassword.classList.contains('invalid')){
        repeatPassword.classList.remove('invalid');
        wrongRegPasswordRepeat.textContent = '';
    }
}

function checkValidations(id){
    let inputs, member;
    if(id === 'registration'){
        inputs = [
            regPassword, 
            regEmail,
            regPasswordRepeat
        ];
    }
    else{
        member = customers.filter(c => {return c.email == loginEmail.value;})[0];
        if(member){
            if(member.password.length > 7){
                if(member.password !== loginPassword.value){
                    if(!(loginEmail.classList.contains('invalid')) & !(loginPassword.classList.contains('invalid'))){
                        loginPassword.classList.add('invalid');
                        wrongLoginPassword.textContent = 'Неверный пароль';               
                    }
                } 
            }  
            else{
                if(!(loginEmail.classList.contains('invalid')) & !(loginPassword.classList.contains('invalid'))){
                    loginEmail.classList.add('invalid');
                    wrongLoginEmail.textContent = 'Для входа необходимо зарегистрироваться';               
                }
            }         
        }
        else{
            if(!(loginEmail.classList.contains('invalid')) & !(loginPassword.classList.contains('invalid'))){
                loginEmail.classList.add('invalid');
                wrongLoginEmail.textContent = 'Для входа необходимо зарегистрироваться';               
            }
        }
        
        inputs = [
            loginEmail,
            loginPassword
        ];
        
    }    
    inputs.forEach(i => {
        if(i.value === ''){
            i.classList.add('invalid');
        }
    })
    let all = document.querySelectorAll('*');
    let counter = 0;
    all = all.forEach(a =>{
        if(a.classList.contains('invalid')){
            counter++;
        }
    })
    if(counter !== 0){
        return false;
    }
    return true;
}

function enterCustomer(){
    let email = loginEmail.value;
    if(email == 'admin@gmail.com'){
        window.location = '/admin.html';
    }
    else{
        if(checkValidations('login') === true){
        
            localStorage.setItem('customerEmail', email);
            window.location = '/pageCustomer.html';  
             
        } 
    }
            
}

function init(){
    const email = localStorage.getItem('fromMemberships');
    localStorage.removeItem('fromMemberships');
    console.log(email);
    if(email){
        openRegistration();
        regEmail.value = email;
    }
}
init();
readCustomers();