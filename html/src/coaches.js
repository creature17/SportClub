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
    // coach_img.setAttribute('style',`background-image:url('../img/coach/${c.name}${c.surname}.jpg')`);
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
    p.setAttribute('style','color:#19b197')
    p.textContent = c.level;

    coach_infoDiv.append(p);

    // let button = document.createElement('button');
    // button.textContent = 'Записаться';   
    // button.setAttribute('class','button_create_membership');
    
    coach.append(coach_img);
    coach.append(coach_infoDiv);
    // coach.append(button);
    return coach;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
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
        option.value = date.getDate() + '-' + (date.getMonth()+1) + '-'  + date.getFullYear();
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
        let ndate = date.getDate() + '-' + (date.getMonth()+1) + '-'  + date.getFullYear();
        if(day==ndate){
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
    let date = dateToFilterCoach.options[dateToFilterCoach.selectedIndex].value;
    let time = timeToFilterCoach.options[timeToFilterCoach.selectedIndex].value;
    trainings.forEach(t => {
        if(date=='-' && (time+':00')==t.time_stat){
            let div = document.getElementById(`${t.price}_${t.coach_id}`);
            div.style.display = 'none';
        }
        if(time=='-' && date==t.date){
            let div = document.getElementById(`${t.price}_${t.coach_id}`);
            div.style.display = 'none';
        }
        if(date==t.date && (time+':00')==t.time_stat){
            let div = document.getElementById(`${t.price}_${t.coach_id}`);
            div.style.display = 'none';
        }
    })
}

function reloadPageCoaches(){
    allCoaches.innerHTML = '';
    trainingPriceRange.value = trainingPriceRange.max;
    trainingPrice.textContent = trainingPriceRange.value;
    timeToFilterCoach.value = '-';
    dateToFilterCoach.value = '-';
    drawCoaches(coaches);
}

async function init(){
    await readCoaches();
    drawCoaches(coaches);
    initInput();
    initDateSelect();
    initTimeSelect('full');
}

init();