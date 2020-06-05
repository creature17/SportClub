let currentTrainingId=0;

function setActiveLink(id){
    customerPage__info.innerHTML = '';
    document.querySelectorAll('*').forEach(x=>{
        if(x.classList.contains('whiteBackground')){
            x.removeAttribute('style');
        }
    })

    let doc = document.getElementById(id);
    doc.setAttribute('style', 'border-top-left-radius: 20px;    background-color: #fff;    border-top-right-radius: 20px;');
    doc.setAttribute('class','whiteBackground');
}

function drawCustomerMembership(){
    const pageDiv = document.getElementById('customerPage__info');
    let div = document.createElement('div');
    div.setAttribute('id','current_membership');
    pageDiv.append(div);
    drawMembershipPicture(customerMembership[0]);
    div = document.createElement('div');
    div.setAttribute('id','membership_details');
    pageDiv.append(div);
    drawMembershipDetails(customerMembership[0]);

}

function drawMembershipDetails(m){
    const bigDiv = document.getElementById('membership_details');  
    if(m.status == 'active'){
        let date = m.startdate.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let start = new Date(date);
        let line = document.createElement('div');
        line.setAttribute('class','mship_details_info');

        let p = document.createElement('p');
        p.textContent = 'Начало абонемента:';
        p.setAttribute('class','black_text');
        line.append(p);

        p = document.createElement('p');
        p.textContent = m.startdate;
        p.setAttribute('class','black_text');
        line.append(p);

        bigDiv.append(line);

        line = document.createElement('div');
        line.setAttribute('class','mship_details_info');

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = 'До окончания:';
        line.append(p);

        p = document.createElement('p');
        
        let now = new Date();
        let countDays = now.getTime() - start.getTime();
        countDays =30*m.duration - Math.trunc(countDays/(1000*3600*24)); 
        p.setAttribute('class','black_text');
        p.textContent = countDays + ' дней';
        line.append(p)

        bigDiv.append(line);

        line = document.createElement('div');
        line.setAttribute('class','mship_details_info');

        p = document.createElement('p');
        p.textContent = 'Дата окончания:';
        p.setAttribute('class','black_text');
        line.append(p);

        p = document.createElement('p');
        let endDate = start.addDays(30*m.duration);
        let day = endDate.getDate()<10? '0'+endDate.getDate():endDate.getDate();
        let month = endDate.getMonth()<9? '0'+endDate.getMonth() + 1:endDate.getMonth()+1;
        endDate = day + '.' + month + '.'  + endDate.getFullYear();
        p.textContent = endDate;
        p.setAttribute('class','black_text');
        line.append(p);

        bigDiv.append(line);
    }
    if(m.status =='waiting'){
        let line = document.createElement('div');
        line.setAttribute('class','mship_details_info');

        let p = document.createElement('p');
        p.textContent = 'Начало абонемента:';
        p.setAttribute('class','black_text');
        line.append(p);

        p = document.createElement('p');
        p.textContent = 'не активирован';
        p.setAttribute('class','black_text');
        line.append(p);

        bigDiv.append(line);

        line = document.createElement('div');
        line.setAttribute('class','mship_details_info');

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = 'До окончания:';
        line.append(p);

        p = document.createElement('p');
        
        p.setAttribute('class','black_text');
        p.textContent = 30*m.duration + ' дней';
        line.append(p)

        bigDiv.append(line);       

        line = document.createElement('div');
        line.setAttribute('class','mship_details_info');
         
        p = document.createElement('p');
        p.textContent = 'Для активации необходимо оплатить и забрать абонемент в клубе';
        p.setAttribute('class','black_text no_margin');
        p.setAttribute('style','width: 424px;background-color: #feb6b6; border: 1px solid red;');

        line.append(p);

        bigDiv.append(line);
    }
    if(m.status == 'finished'){
        line = document.createElement('div');
        line.setAttribute('class','mship_details_info');
         
        p = document.createElement('p');
        p.textContent = 'Истек срок действия Вашего абонемента. Вы можете продлить абонемент или приобрести новый.';
        p.setAttribute('class','black_text no_margin');
        p.setAttribute('style','width: 424px;background-color: #feb6b6; border: 1px solid red;');

        line.append(p);

        bigDiv.append(line);

        let btn = document.createElement('button');
        btn.textContent = 'Продлить';
        btn.setAttribute('class','button_create_membership');
        btn.setAttribute('onclick',`window.location = './pricesCustomer.html'`);
        bigDiv.append(btn);

        // btn = document.createElement('button');
        // btn.textContent = 'Выбрать другой';
        // btn.setAttribute('class','button_create_membership');
        // bigDiv.append(btn);
    }
}

function drawMembershipPicture(m){
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
}

function drawCustomerTrainings(){
    const info = document.getElementById('customerPage__info');

    let all = document.createElement('div');
    all.setAttribute('class','customerTrainingsBlock')

    info.append(all);

    let line = document.createElement('div');
    line.setAttribute('class','trainingLine_header');

    let p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = "Дата";

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = "Время";

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:30%');
    p.textContent = "Тренер";

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.innerHTML = "Стоимость";

    line.append(p);

    let btn = document.createElement('p');
    btn.setAttribute('style','width:15%');
    line.append(btn);

    let divTrainings= document.createElement('div');
    divTrainings.setAttribute('id','customerTrainings');

    all.append(line);
    all.append(divTrainings); 

    let historyTrainings = customerTrainings.filter(t =>{
        let date = t.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let date_time = new Date(date+' '+t.time_stat);
        return  date_time < new Date();
    })

    historyTrainings.sort((a,b) =>{
        let date = a.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let t1 = new Date(date + " " + a.time_stat);
        date = b.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let t2 = new Date(date + " " + b.time_stat);
        return t2-t1;
    })

    let newTrainings =  customerTrainings.filter(t =>{
        let date = t.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let date_time = new Date(date+' '+t.time_stat);
        return  date_time >= new Date();
    })

    newTrainings.sort((a,b) =>{
        let date = a.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let t1 = new Date(date + " " + a.time_stat);
        date = b.date.split('.');
        date = date[1]+'.'+date[0]+'.'+date[2];
        let t2 = new Date(date + " " + b.time_stat);
        return t1-t2;
    })

    newTrainings.forEach(t=>{
        drawNewTraining(t);
    })

    historyTrainings.forEach(t =>{
        drawLastTraining(t);
    })   

}

function drawNewTraining(t){
    let date = t.date.split('.');
    date = date[1]+'.'+date[0]+'.'+date[2]+' '+t.time_stat;
    let start = new Date(date);

    const bigDiv = document.getElementById('customerTrainings');
    let line = document.createElement('div');
    line.setAttribute('class','trainingLine');
    line.setAttribute('id',`${'line'+t.training_id}`)

    let p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = t.date;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = t.time_stat;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:30%');
    p.textContent = t.name+' '+t.surname;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.innerHTML = `${t.price} &#x20b4`;

    line.append(p);

    let beforeTraining = (start.getTime() - new Date().getTime())/(3600*1000);

    if( beforeTraining <3 ){
        let btn = document.createElement('p');
        btn.setAttribute('style','width:15%;padding:0');
        btn.textContent = '';
        line.append(btn);
    }
    else{
        let btn = document.createElement('button');
        btn.setAttribute('style','width:15%');
        btn.setAttribute('class','cancelTraining');
        btn.textContent = 'Отменить';
        btn.setAttribute('onclick',`cancelTraining('${t.training_id}')`)
        line.append(btn);
    }    

    bigDiv.append(line);
}

async function cancelTraining(id){
    let conf = confirm('Вы уверренны, что хотите отменить тренировку?');
    if(conf){
        let dataToSend = { id }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/removeTraining', dataToSend, result => {
        });  
        await readCurrentCustomer();
        setActiveLink('customerTrainingsInfo');
        drawCustomerTrainings();
    }
}

function drawLastTraining(t){
    const bigDiv = document.getElementById('customerTrainings');
    let line = document.createElement('div');
    line.setAttribute('class','trainingLine');
    line.setAttribute('style','background-color:#30b15847;position:relative')
    line.setAttribute('id',`${'line'+t.training_id}`)

    let p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = t.date;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.textContent = t.time_stat;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:30%');
    p.textContent = t.name+' '+t.surname;

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('style','color:black; width:10%');
    p.innerHTML = `${t.price} &#x20b4`;

    line.append(p);

    if(t.mark){
        p = document.createElement('p');
        p.setAttribute('style','color:black; width:15%; padding:0;text-align:center;');
        p.textContent = t.mark;

        line.append(p);
    }
    else{
        let btn = document.createElement('button');
        btn.setAttribute('style','width:15%');
        btn.setAttribute('class','markTraining');
        btn.textContent = 'Оценить';
        btn.setAttribute('onclick',`showInput('${t.training_id}')`);
        line.append(btn);

        let input = document.createElement('input');
        input.setAttribute('type','number')
        input.setAttribute('max','5');
        input.setAttribute('min','1');
        input.setAttribute('onkeypress',`if(event.keyCode!=13) {return false;} else{ confirmMark('${t.training_id}')}`);
        input.setAttribute('onblur',`closeInputMark('${t.training_id}')`)
        input.setAttribute('class','inputMark');
        input.setAttribute('id',`${t.training_id}`);

        line.append(input);
    }

    bigDiv.append(line);
}

function closeInputMark(id){
    let elem = document.getElementById(id);
    elem.setAttribute('style','display:none');
    elem.value = '';
}

function confirmMark(id){
    let elem = document.getElementById(id);
    let mark = elem.value;
    closeInputMark(id);
    let lineid = 'line'+id;
    let line = document.getElementById(lineid);
    line.removeChild(line.lastChild);
    line.removeChild(line.lastChild);
    let p = document.createElement('p');
    p.setAttribute('style','color:black; width:15%; padding:0;text-align:center;');
    p.textContent = mark;
    line.append(p);
    let dataToSend = {
        mark,
        id
    }
    const sendToServer = new SendToServer();
    sendToServer.postRequest('/addTrainingMark', dataToSend, result => {
    });  
}

function showInput(id){
    currentTrainingId = id;
    mark.setAttribute('style','visibility:visible');
    // let elem = document.getElementById(id);
    // elem.setAttribute('style','display:block');
    // elem.focus()
}

function setMark(mark){
    let lineid = 'line'+currentTrainingId;
    let line = document.getElementById(lineid);
    line.removeChild(line.lastChild);
    line.removeChild(line.lastChild);
    let p = document.createElement('p');
    p.setAttribute('style','color:black; width:15%; padding:0;text-align:center;');
    p.textContent = mark;
    line.append(p);
    let dataToSend = {
        mark,
        id:currentTrainingId
    }
    const sendToServer = new SendToServer();
    sendToServer.postRequest('/addTrainingMark', dataToSend, result => {
    });  
    closeMark();
}

function drawSettings(){
    let settings = document.createElement('div');
    settings.setAttribute('style','display:flex;justify-content:space-around;width:80%');

    let block = document.createElement('div');
    block.setAttribute('style','display:flex;flex-direction:column;height: 300px;justify-content: space-between;margin-top: 30px');

    let p = document.createElement('p');
    p.setAttribute('style','color:black;background-color:#fff1a0;width:100%;text-align:center;padding:10px 0;');
    p.textContent = 'Изменение email';
    block.append(p);

    let label = document.createElement('label');
    label.textContent = 'Старый email';
    block.append(label);

    let input = document.createElement('input');
    input.setAttribute('type','email');
    input.setAttribute('id','oldEmail');
    block.append(input);

    label = document.createElement('label');
    label.textContent = 'Новый email';
    block.append(label);

    input = document.createElement('input');
    input.setAttribute('type','email');
    input.setAttribute('id','newEmail');
    block.append(input);

    let btn = document.createElement('button');
    btn.textContent = 'Изменить';
    btn.setAttribute('onclick','resetEmail()')
    block.append(btn);

    settings.append(block);

    block = document.createElement('div');
    block.setAttribute('style','display:flex;flex-direction:column;height: 300px;justify-content: space-between;margin-top: 30px');

    p = document.createElement('p');
    p.setAttribute('style','color:black;background-color:#fff1a0;width:100%;text-align:center;padding:10px 0;');
    p.textContent = 'Изменение пароля';
    block.append(p);

    label = document.createElement('label');
    label.textContent = 'Старый пароль';
    block.append(label);

    input = document.createElement('input');
    input.setAttribute('type','password');
    input.setAttribute('id','oldPassword');
    block.append(input);

    label = document.createElement('label');
    label.textContent = 'Новый пароль';
    block.append(label);

    input = document.createElement('input');
    input.setAttribute('type','password');
    input.setAttribute('id','newPassword');
    block.append(input);

    btn = document.createElement('button');
    btn.textContent = 'Изменить';
    btn.setAttribute('onclick','resetPassword()')
    block.append(btn);

    settings.append(block);

    customerPage__info.append(settings);
}

function resetEmail(){
    if(oldEmail.value == customerMembership[0].email && newEmail.value.endsWith('@gmail.com')){
        let dataToSend = {
            id: customerMembership[0].customer_id,
            email: newEmail.value
        }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/changeCustomerEmail', dataToSend, result => {
        });
        alert('email обновлен')
        customerMembership[0].email = newEmail.value;
        localStorage.setItem('customerEmail',newEmail.value);
        oldEmail.value ='';
        newEmail.value = '';
        newPassword.value = '';
        oldPassword.value ='';
    }
    else{
        alert('Неверные данные!')
    }
}

function resetPassword(){
    if(oldPassword.value == customerMembership[0].password && newPassword.value.length > 7){
        let dataToSend = {
            id: customerMembership[0].customer_id,
            password: newPassword.value
        }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/changeCustomerPassword', dataToSend, result => {
        });
        alert('Пароль обновлен')
        customerMembership[0].password = newPassword.value;
        oldEmail.value ='';
        newEmail.value = '';
        newPassword.value = '';
        oldPassword.value ='';
    }
    else{
        alert('Неверные данные!')
    }
}

function closeMark(){
    let mark = document.getElementById('mark');
    mark.setAttribute('style','visibility:hidden');
    mark = mark.getElementsByTagName('input');
    Array.from(mark).forEach(m => m.checked = false);
}

async function init(){
    await readCustomers();
    await readCurrentCustomer();  
    drawCustomerMembership();
    customerMembershipInfo.setAttribute('style', 'background-color: #fff');    
    customerMembershipInfo.setAttribute('class','whiteBackground');
}

init();