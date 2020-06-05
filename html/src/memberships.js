let memDuration = [];
let currentMemberships = [];

function drawMembership(m)
{
    const currentMembership = document.getElementById('current_membership'); 

    const membershipsItemTitle = document.createElement('div');
    membershipsItemTitle.setAttribute('class', 'memberships__item_title  memberships__item_background');
    membershipsItemTitle.setAttribute('style',`background-image: url(../../img/photos/${m.name}.jpg)`)

    const div = document.createElement('div');

    let h2 = document.createElement('h2');
    h2.setAttribute('class', 'no_margin-bottom');
    h2.textContent = m.name;

    div.append(h2);

    const h3 = document.createElement('h3');
    h3.textContent = m.timein;

    div.append(h3);

    membershipsItemTitle.append(div);

    h2 = document.createElement('h2');
    h2.setAttribute('class', 'membership_price');
    h2.innerHTML = `${m.price} &#x20b4<br><p class="membership_duration">${m.duration} мес.</p>`;

    membershipsItemTitle.append(h2);
    
    currentMembership.append(membershipsItemTitle);

    const membershipItemInfo = document.createElement('div');
    membershipItemInfo.setAttribute('class', 'membership__item_info');

    const { gym, pool, spa, group_training } = m;

    const fieldNames = ['Зал', 'Бассеин', 'Спа', 'Фитнесс'];

    const array = new Array(gym, pool, spa, group_training);

    let p, img, span;

    for (let i = 0; i < array.length; i++) {
        p = document.createElement('p');

        img = document.createElement('img');
        img.setAttribute('src', `../img/icons/${array[i] ? 'da' : 'net'}.png`);
        img.setAttribute('class', 'img_yes_no');

        p.append(img);

        span = document.createElement('span');
        span.textContent = fieldNames[i];

        p.append(span);

        membershipItemInfo.append(p);
    }
         
    currentMembership.append(membershipItemInfo);

    const buttonSendMember = document.getElementById("membershipForm__buttonSend");
    buttonSendMember.setAttribute('onclick',`sendMembership(${m.mship_id})`);
}

async function drawMemberships(){
    try{
        const divMemberships = document.getElementById("membershipContainer")
        memTypes.push({name:'-'});
        
        
        memberships.forEach(m => { 
            memDuration.push(m.duration);            

            const membershipItem = document.createElement('div');
            membershipItem.setAttribute('class', 'memberships__item');
            membershipItem.setAttribute('id',`${m.price}_${m.name}_${m.timein}_${m.duration}`);

            const membershipsItemTitle = document.createElement('div');
            membershipsItemTitle.setAttribute('class', 'memberships__item_title  memberships__item_background');
            
            membershipsItemTitle.setAttribute('style',`background-image: url(../../img/photos/${m.name}.jpg)`)
            

            const div = document.createElement('div');

            let h2 = document.createElement('h2');
            h2.setAttribute('class', 'no_margin-bottom');
            h2.textContent = m.name;

            div.append(h2);

            const h3 = document.createElement('h3');
            h3.textContent = m.timein;

            div.append(h3);

            membershipsItemTitle.append(div);

            h2 = document.createElement('h2');
            h2.setAttribute('class', 'membership_price');
            h2.innerHTML = `${m.price} &#x20b4<br><p class="membership_duration">${m.duration} мес.</p>`;

            membershipsItemTitle.append(h2);
            
            membershipItem.append(membershipsItemTitle);

            const membershipItemInfo = document.createElement('div');
            membershipItemInfo.setAttribute('class', 'membership__item_info');

            const { gym, pool, spa, group_training } = m;

            const fieldNames = ['Зал', 'Бассеин', 'Спа', 'Фитнесс'];

            const array = new Array(gym, pool, spa, group_training);

            let p, img, span;

            for (let i = 0; i < array.length; i++) {
                p = document.createElement('p');

                img = document.createElement('img');
                img.setAttribute('src', `../img/icons/${array[i] ? 'da' : 'net'}.png`);
                img.setAttribute('class', 'img_yes_no');

                p.append(img);

                span = document.createElement('span');
                span.textContent = fieldNames[i];

                p.append(span);

                membershipItemInfo.append(p);
            }

            membershipItem.append(membershipItemInfo);

            const button = document.createElement('button');
            button.setAttribute('id',m.mship_id);
            button.setAttribute('class','button_create_membership');
            button.setAttribute('onclick',`openFormMembership(${m.mship_id})`);
            button.textContent = 'Оформить';

            membershipItem.append(button);

            divMemberships.append(membershipItem);
            currentMemberships.push(membershipItem);
        })
    }
    catch(e){
       
    }
}

function GetMaxPriceMembership(){
    let maxPrice = Math.max.apply(Math, memberships.map(function(m) { return m.price; }));
    return maxPrice;        
}

function GetMinPriceMembership(){
    let minPrice = Math.min.apply(Math, memberships.map(function(m) { return m.price; }));
    return minPrice;
}

function openFormMembership(id){
    const currentMembership = document.getElementById("allFormMembership");
    
    const membership= memberships.find(m => m.mship_id == id);
    drawMembership(membership);

    currentMembership.setAttribute('style','visibility: visible');
}

function closeFormMembership()
{
    const currentMembership = document.getElementById("allFormMembership");
    document.getElementById("current_membership").firstChild.remove();
    document.getElementById("current_membership").lastChild.remove();
    currentMembership.setAttribute('style','visibility: hidden');
    
}

async function sendMembership(id)
{
    if(checkMembershipForm()){
        const customer_id = new Date().getTime()+Math.round(Math.random()*10);

        const newMembershipData = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthday: document.getElementById('birthday').value,
            mship_id: id,
            customer_id: customer_id
        }
    
        let messageToAddMembership;
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/addMembership', newMembershipData, result => {
            messageToAddMembership = JSON.parse(result).message;    
            drawMessageForNewMembership(messageToAddMembership);  
        });    
    }    
}

function checkMembershipForm(){
    let form = membership_form.querySelectorAll('input');
    form.forEach(i =>{
        if(i.value.length==0 && !i.classList.contains('invalid')){
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

function drawMessageForNewMembership(message){
    const currentMembership = document.getElementById("allFormMembership");
    currentMembership.setAttribute('style','visibility: hidden');

    const div = document.getElementById('messageForAddMembership');
    const text = document.getElementById('messageForAddMembership_text');
    const div_btn=document.getElementById('messageForAddMembership_buttons');
    if(message === 'ok'){       
        text.textContent = 'Заказ оформлен! Оплатить и получить абонемент можно в нашем клубе. Для входа в личный кабинет необходимо зарегистрироваться)';

        const buttonCancel = document.createElement('button');
        buttonCancel.setAttribute('onclick',`closeMessageAddmembership('ok')`);
        buttonCancel.setAttribute('class','systemButton');
        buttonCancel.textContent = 'позже';
        div_btn.append(buttonCancel);

        const buttonRegister = document.createElement('button');
        buttonRegister.setAttribute('onclick','goToRegistration()');
        buttonRegister.setAttribute('class','goToRegistration');
        buttonRegister.textContent ='регистрация';
        div_btn.append(buttonRegister);
    }
    else{
        let button = document.createElement('button');
        button.setAttribute('onclick',`closeMessageAddmembership('error')`);
        button.setAttribute('class','systemButton');
        button.textContent = 'ок';
        div_btn.append(button);
        console.log(message);
        if(message ==='email')
        {
            text.textContent = 'Пользователь с таким email уже существует';
        }
        else if(message == 'no places'){
                text.textContent = 'К сожалению в клубе нет свободных мест';
            }
            else{
                text.textContent = 'Пользователь с таким номером телефона уже существует';
            }           
    }
    div.setAttribute('style','visibility:visible');

}

function closeMessageAddmembership(message){
    const div = document.getElementById('messageForAddMembership');
    const btns = document.getElementById('messageForAddMembership_buttons');
    btns.innerHTML = '';
    const text = document.getElementById('messageForAddMembership_text');
    text.textContent = '';    
    div.setAttribute('style','visibility:hidden');

    if(message==='ok'){
        closeFormMembership();
        document.getElementById('name').value='';
        surname.value = '';
        email.value = '';
        phone.value = '';
        birthday.value = '';
    }
    else{
        const currentMembership = document.getElementById("allFormMembership");
        currentMembership.setAttribute('style','visibility: visible');
    }
}



function initPriceInput(){
    filterMembershipsById.max = GetMaxPriceMembership();
    filterMembershipsById.min = GetMinPriceMembership();
    filterMembershipsById.value = GetMaxPriceMembership();
    document.getElementById('label_filterMembershipsById').textContent = GetMaxPriceMembership();
    filterMembershipsById.oninput = function() {
        let opt  = Array.from(membershipFilterDuration.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        opt  = Array.from(membershipFilterTime.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        opt  = Array.from(membershipFilterType.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        let div_memberships = document.getElementById('membershipContainer').children;
        for (let i = 0; i < div_memberships.length; i++) {
            let price = div_memberships[i].id;
            price = price.split('_')[0];
            div_memberships[i].style.display = (price > this.value) ? 'none' : 'block';
            document.getElementById('label_filterMembershipsById').textContent = this.value;
        }
    }; 
    

}

function initMemTimeSelect(){
    let opt;
    accessTime.push({unnest:'-'})
    for(let i = 0; i < accessTime.length; i++){        
        opt = document.createElement('option');
        if(accessTime[i].unnest ==='-'){
            opt.selected = 'selected';
        }
        opt.value = accessTime[i].unnest;
        opt.textContent = accessTime[i].unnest;
        membershipFilterTime.options.add(opt);
    }
    membershipFilterTime.onchange = function() {
        let opt  = Array.from(membershipFilterDuration.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        opt  = Array.from(membershipFilterType.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        filterMembershipsById.value = GetMaxPriceMembership();
        document.getElementById('label_filterMembershipsById').textContent = GetMaxPriceMembership();
        let div_memberships = document.getElementById('membershipContainer').children;
        for (let i = 0; i < div_memberships.length; i++) {
            let type = div_memberships[i].id;
            type = type.split('_')[2];           
            if(this.value !== '-'){
                div_memberships[i].style.display = (type !== this.value) ? 'none' : 'block';
            }
            else{
                div_memberships[i].style.display = 'block';
            }
        }
    }; 
    
}

function initMemTypeSelect(){
    let opt;
    for(let i = 0; i < memTypes.length; i++){   
        opt = document.createElement('option');  
        opt.value = memTypes[i].name;
        opt.textContent = memTypes[i].name;
        if(memTypes[i].name ==='-'){
            opt.selected = 'selected';
        }                   
        membershipFilterType.options.add(opt);
    }
    membershipFilterType.onchange = function() {
        let opt  = Array.from(membershipFilterDuration.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        opt  = Array.from(membershipFilterTime.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        filterMembershipsById.value = GetMaxPriceMembership();
        document.getElementById('label_filterMembershipsById').textContent = GetMaxPriceMembership();
        let div_memberships = document.getElementById('membershipContainer').children;
        for (let i = 0; i < div_memberships.length; i++) {
            let type = div_memberships[i].id;
            type = type.split('_')[1];           
            if(this.value !== '-'){
                div_memberships[i].style.display = (type !== this.value) ? 'none' : 'block';
            }
            else{
                div_memberships[i].style.display = 'block';
            }
        }
    }; 
}

function initMemDurationInput(){
    membershipFilterDuration.max = Math.max.apply(Math, memberships.map(function(m) { return m.duretion; }));
    membershipFilterDuration.min = Math.min.apply(Math, memberships.map(function(m) { return m.duration; }));
    let uniqDuration = [...new Set(memDuration)];
    uniqDuration.push('-');
    let opt;
    uniqDuration.forEach( d => {
        opt = document.createElement('option');
        if(d ==='-'){
            opt.selected = 'selected';
        }
        opt.value = d;
        opt.textContent = d;
        membershipFilterDuration.options.add(opt);
    })
    membershipFilterDuration.onchange = function() {
        let opt  = Array.from(membershipFilterType.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        opt  = Array.from(membershipFilterTime.options).filter(o => {return o.textContent === '-'})[0];
        opt.selected = 'selected';
        filterMembershipsById.value = GetMaxPriceMembership();
        document.getElementById('label_filterMembershipsById').textContent = GetMaxPriceMembership();
        let div_memberships = document.getElementById('membershipContainer').children;
        for (let i = 0; i < div_memberships.length; i++) {
            let type = div_memberships[i].id;
            type = type.split('_')[3];           
            if(this.value !== '-'){
                div_memberships[i].style.display = (type !== this.value) ? 'none' : 'block';
            }
            else{
                div_memberships[i].style.display = 'block';
            }
        }
        // currentMemberships = currentMemberships.filter(c => {return c.style.display == 'block'});
    }; 
}

async function reloadPageMemberships(){
    document.getElementById("membershipContainer").innerHTML = '';
    await readAllMemberships();
    drawMemberships();
    initPriceInput();
    membershipFilterTime.innerHTML = '';
    initMemTimeSelect();
    membershipFilterType.innerHTML = '';
    initMemTypeSelect();
    membershipFilterDuration.innerHTML = '';
    initMemDurationInput();
    
}

function checkPriceEmail(){
    if(!email.value.endsWith('@gmail.com') && !email.classList.contains('invalid')){
        email.classList.add('invalid');
        wrongPriceEmail.textContent = 'введите почту gmail'
    }
}

function removeInvalidEmail(){
    if(email.classList.contains('invalid')){
        email.classList.remove('invalid');
        wrongPriceEmail.textContent = '';
    }
}

function checkPhone(){
    let reg = /^\d+$/;
    if(phone.value.length != 10 || !reg.test(phone.value)){
        if(!phone.classList.contains('invalid')){
            phone.classList.add('invalid')
            wrongPhone.textContent = '0999999999';
        }
    }
}

function removeInvalidPhone(){
    if(phone.classList.contains('invalid')){
        phone.classList.remove('invalid');
        wrongPhone.textContent = '';
    }
}

function goToRegistration(){
    let email = document.getElementById('email');
    localStorage.setItem('fromMemberships',email.value);
    window.location = './login.html';
}

async function init(){
    await readAllMemberships();
    drawMemberships();
    initPriceInput();
    initMemTimeSelect();
    initMemTypeSelect();
    initMemDurationInput();
}

init();