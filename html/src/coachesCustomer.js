let currentCoach;

function drawCoaches(coaches){
    const coachesDiv = document.getElementById('allCoaches');
    let coachDiv;
    coaches.forEach(c => {
        coachDiv = drawCoach(c);
        coachesDiv.append(coachDiv);
    });
}

function drawCoach(c){
    let coach = document.createElement('div');
    coach.setAttribute('class','coaches__item');
    coach.setAttribute('id',`${c.price}_${c.coach_id}`);

    let coach_img = document.createElement('div');
    coach_img.setAttribute('class','coach_photo');
    
    let photo = document.createElement('img');
    photo.setAttribute('src',`../img/coach/${c.name}${c.surname}.jpg`);
    photo.setAttribute('class','img100');

    coach_img.append(photo);

    let price = document.createElement('p');
    price.innerHTML = `${c.price} &#x20b4`;
    price.setAttribute('class','coach_training_price');

    coach_img.append(price);

    let coach_infoDiv = document.createElement('div');
    coach_infoDiv.setAttribute('class','coaches__item_info');

    let p = document.createElement('p');
    p.textContent = c.name+' '+c.surname;

    coach_infoDiv.append(p);

    p = document.createElement('p');
    p.textContent = 'Возраст: '+c.age;

    coach_infoDiv.append(p);

    p = document.createElement('p');
    p.textContent = 'Статус: '+c.level;

    coach_infoDiv.append(p);

    let button = document.createElement('button');
    button.textContent = 'Записаться';   
    button.setAttribute('class','button_create_membership');
    button.setAttribute('onclick',`openRecordTraining('${c.name+' '+c.surname}','${c.coach_id}')`);
    
    coach.append(coach_img);
    coach.append(coach_infoDiv);
    coach.append(button);
    return coach;
}



function initDateSelect(){
    let option;
    option = document.createElement('option');
    option.value = '-';
    option.textContent =  option.value;
    dateToFilterCoach.append(option);
    for(let i = 0 ; i < 7; i++){
        option = document.createElement('option');
        let date = new Date().addDays(i);
        option.value = date.getDate() + '.' + (date.getMonth()+1) + '.'  + date.getFullYear();
        option.textContent = option.value;
        dateToFilterCoach.append(option);
    }    
}

function initTimeSelect(day){
    if(day=='full'){
        let option;
        option = document.createElement('option');
        option.value = '-';
        option.textContent = option.value;
        timeToFilterCoach.append(option);
        for(let i = 8; i<21; i++){
            option = document.createElement('option');
            option.value = i + ':00';
            option.textContent = option.value;
            timeToFilterCoach.append(option);
        }
    }
    else{
        timeToFilterCoach.innerHTML = '';
        let date = new Date();
        let ndate = date.getDate() + '.' + (date.getMonth()+1) + '.'  + date.getFullYear();
        if(day==ndate){
            let option;
            option = document.createElement('option');
            option.value = '-';
            option.textContent = option.value;
            timeToFilterCoach.append(option);
            let startTime = Math.round(date.getHours())+2;
            for( let i = startTime; i<22 ; i++){
                option = document.createElement('option');
                option.value = i + ':00';
                option.textContent = option.value;
                timeToFilterCoach.append(option);
            }
        }
        else{
            initTimeSelect('full');
        }
    }
}

function initInput(){
    trainingPriceRange.max = Math.max.apply(Math, coaches.map(function(c) { return c.price; }));
    trainingPriceRange.min = Math.min.apply(Math, coaches.map(function(c) { return c.price; }));
    trainingPriceRange.value = trainingPriceRange.max;
    trainingPrice.textContent = trainingPriceRange.value;
    trainingPriceRange.oninput = function(){
        dateToFilterCoach.value='-';
        timeToFilterCoach.value='-';
        let customerList = document.getElementById('allCoaches').childNodes;
        customerList.forEach(c => {
            let price = c.id.split('_')[0];
            c.style.display = (price > this.value) ? 'none' : 'block';
            trainingPrice.textContent = this.value;
            return 0;
        })
    }
}

function showFreeCoaches(){
    trainingPriceRange.value = trainingPriceRange.max;
    trainingPrice.textContent = trainingPriceRange.value;
    allCoaches.childNodes.forEach(child =>{
        child.style.display = 'block';
    })
    let date = dateToFilterCoach.options[dateToFilterCoach.selectedIndex].value;
    let time = timeToFilterCoach.options[timeToFilterCoach.selectedIndex].value;
    if(time=='-' && date!='-'){
        coaches.forEach(c=>{
            let trainOfCoach = trainings.filter(t=>t.coach_id==c.coach_id);
            if(trainOfCoach.filter(t=>t.date==date).length >= 13){
                let div= document.getElementById(trainOfCoach[0].price+'_'+c.coach_id);
                div.style.display = 'none';
            }
        })
    }
    if(date!='-' && time!='-'){
        trainings.forEach(t => {        
            if(date==t.date && (time+':00')==t.time_stat){
                let div = document.getElementById(`${t.price}_${t.coach_id}`);
                div.style.display = 'none';
            }
        })
    }    
}

function reloadPageCoaches(){
    allCoaches.innerHTML = '';
    trainingPriceRange.value = trainingPriceRange.max;
    trainingPrice.textContent = trainingPriceRange.value;
    timeToFilterCoach.value = '-';
    dateToFilterCoach.value = '-';
    drawCoaches(coaches);
}

function openRecordTraining(name,id){
    coachName.textContent = 'Тренер: '+name;
    initDateSelectCoach(id);
    recordCustomerTraining.setAttribute('style','visibility:visible');
}

function initDateSelectCoach(id){
    let strDate;
    currentCoach = trainings.filter(t=>{
        return t.coach_id == id;
    })
    for(let i = 0 ; i < 7; i++){
        let date = new Date().addDays(i);
        strDate = date.getDate() + '.' + (date.getMonth()+1) + '.'  + date.getFullYear();
        let coachTrToday = currentCoach.filter(t=>{
            return t.date == strDate;
        });
        if(coachTrToday.length !== 13){
            let option = document.createElement('option');
            option.value = strDate;
            option.textContent = strDate;
            selectDateCoachTr.append(option);
        }
    }   
    let selectedDate = selectDateCoachTr.options[selectDateCoachTr.selectedIndex].value;
    initTimeSelectCoach(selectedDate);
}

function initTimeSelectCoach(day){
    selectTimeCoachTr.innerHTML = '';
    let date = new Date();
    let ndate = date.getDate() + '.' + (date.getMonth()+1) + '.'  + date.getFullYear();
    let startTime = 8;
    if(day==ndate) {startTime = Math.round(date.getHours())+2;}
    let currentCoachDate = currentCoach.filter(t=>{return t.date == day; })
    let times=[];
    currentCoachDate.forEach(t=>{ times.push(t.time_stat); })
    let option;
    for(let i = startTime; i<21; i++){
        let time;
        i<10?time='0'+i+':00:00':time=i+':00:00';
        if( !times.includes(time)) {
            option = document.createElement('option');
            option.value = i + ':00';
            option.textContent = option.value;
            selectTimeCoachTr.append(option);
        }
    }
    
    
}

function closeFormTraining(){
    recordCustomerTraining.setAttribute('style','visibility:hidden');
    selectDateCoachTr.innerHTML ='';
    selectTimeCoachTr.innerHTML = '';
}

async function makeRecordTraining(){
    let date = selectDateCoachTr.options[selectDateCoachTr.selectedIndex].value;
    let time = selectTimeCoachTr.options[selectTimeCoachTr.selectedIndex].value;
    const tr_id = new Date().getTime()+Math.round(Math.random()*10);
    let custTrByDateTime = customerTrainings.filter(t=>{
        return (t.date == date && t.time_stat == time+':00');
    })
    if(custTrByDateTime.length < 1){
        let dataToSend = {
            tr_id:tr_id,
            date: date,
            time: time,
            coach:currentCoach[0].coach_id,
            customer:customerMembership[0].customer_id
        }
    
        let response = await fetch("/addTraining", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        let result = await response.json();        
        alert(result.message);
        closeFormTraining();
        await readCoaches();
        await readCurrentCustomer();
    }
    else{
        alert("Вы уже записаны на эту дату и время на тренировку")
    }

    
}

async function init(){
    await readCoaches();
    await readCurrentCustomer();
    drawCoaches(coaches);
    initInput();
    initDateSelect();
    initTimeSelect('full');
}

init();