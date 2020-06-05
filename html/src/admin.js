let ratingCoaches = [] ;
let schedule;

function activeLink(id){
    let link = document.getElementById(id);
    adminMenu.querySelectorAll('*').forEach(a => {
        a.removeAttribute('style');
    });
    link.setAttribute('style','background-color:#73a9ce');

}

function drawMshipTable(memberships,text,type){    

    let content = document.createElement('div');
    content.setAttribute('class','admin__info_content')    

    line = document.createElement('div');
    line.textContent = text;
    line.setAttribute('style','padding:10px 0;')

    let add = document.createElement('button')
    add.setAttribute('class','addNewMship');
    add.setAttribute('onclick',`openFormForNewMship('${type}')`);
    add.textContent = '+';

    line.append(add);

    content.append(line);

    line = document.createElement('div');
    line.setAttribute('class','admin__info_content_header');

    let p = document.createElement('p');
    p.setAttribute('onclick',`sortByName('${type}')`);
    p.textContent = "Абонемент";

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('onclick',`sortByDuration('${type}')`);
    p.textContent = "Срок действия";

    line.append(p);

    p = document.createElement('p');
    p.setAttribute('onclick',`sortByPrice('${type}')`);
    p.innerHTML = "Стоимость";

    line.append(p);

    content.append(line);

    adminMemberships.append(content);    
    
    memberships.forEach(m =>{
        line = document.createElement('div');
        line.setAttribute('class','admin__info_line')

        p = document.createElement('p');
        p.setAttribute('style','font-size:16px;margin:5px 0;');
        p.textContent = m.name;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('style','font-size:16px;margin:5px 0;')
        p.textContent = m.duration + ' месяцев';
        line.append(p);

        p = document.createElement('p');
        p.innerHTML = `${m.price} &#x20b4`;
        p.setAttribute('style','font-size:16px;margin:5px 0;')
        p.setAttribute('onmouseover',`makeButtonPriceVisible(${m.mship_id})`);
        line.append(p);

        p = document.createElement('button');
        p.setAttribute('class','admin__mship_change_price');
        p.setAttribute('id',m.mship_id);
        p.setAttribute('style','font-size:16px')
        p.setAttribute('onmouseout',`makeButtonPriceHidden(${m.mship_id})`);
        p.setAttribute('onclick',`openInputForNewPrice(${'input'+m.mship_id})`);
        p.textContent = 'Изменить';


        line.append(p);

        p = document.createElement('input');
        p.setAttribute('id',`${'input'+m.mship_id}`);
        p.setAttribute('class','inputForNEwPrice');
        p.setAttribute('pattern','[0-9]');
        p.setAttribute('onblur',`closeInputForNewPrice(${'input'+m.mship_id})`);
        p.setAttribute('onkeypress',`this.value=this.value.replace(/[^0-9]/,''); afterKeyPress(event, ${'input'+m.mship_id})`);
        p.setAttribute('maxlength','5')
        line.append(p);

        content.append(line);
    })
    return content;
}

function sortByName(type){

    if(type == '7:00-14:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.name.localeCompare(b.name));
        console.log(mem);
        let table = drawMshipTable(mem, "Утренние абонементы","7:00-14:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.firstChild);
        lineForTables.insertBefore(table,lineForTables.firstChild);
    }
    if(type == '7:00-23:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.name.localeCompare(b.name));
        console.log(mem);
        let table = drawMshipTable(mem, "Абонементы на полный день","7:00-23:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.lastChild);
        lineForTables.append(table);
    }
}

function sortByDuration(type){

    if(type == '7:00-14:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.duration - b.duration);
        console.log(mem);
        let table = drawMshipTable(mem, "Утренние абонементы","7:00-14:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.firstChild);
        lineForTables.insertBefore(table,lineForTables.firstChild);
    }
    if(type == '7:00-23:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.duration - b.duration);
        console.log(mem);
        let table = drawMshipTable(mem, "Абонементы на полный день","7:00-23:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.lastChild);
        lineForTables.append(table);
    }
}

function sortByPrice(type){

    if(type == '7:00-14:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.price - b.price);
        console.log(mem);
        let table = drawMshipTable(mem, "Утренние абонементы","7:00-14:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.firstChild);
        lineForTables.insertBefore(table,lineForTables.firstChild);
    }
    if(type == '7:00-23:00'){
        let mem = memberships.filter(m=>m.timein == type)
        mem = mem.sort((a, b) => a.price - b.price);
        console.log(mem);
        let table = drawMshipTable(mem, "Абонементы на полный день","7:00-23:00");
        table.querySelectorAll('*').forEach(t => {
            t.classList.add('adminText')
        })
        lineForTables.removeChild(lineForTables.lastChild);
        lineForTables.append(table);
    }
}

function closeFormNewMship(){
    inputPriceForNewMship.value = '';
    inputDurationForNewMship.value = '';
    inputDurationForNewMship.textContent = '';
    createNewMship.setAttribute('style','visibility:hidden');
}

function openFormForNewMship(type){
    // console.log(createNewMship);
    createNewMship.setAttribute('style','visibility:visible');
    mshipTimein.textContent = type;
}

async function makeNewMship(){
    let type = newMshipType.value;
    let duration = inputDurationForNewMship.value;
    let price = inputPriceForNewMship.value;
    let id = new Date().getTime().toString().slice(8)+Math.round(Math.random()*10);
    type = memberships.filter(m => m.name == type)[0].mtype_id;
    let timein = mshipTimein.textContent;
    if(duration =='' || price == ''){
        alert('Не все поля заполнены');
    }
    else{
        let mships = memberships.filter(m => {
            return m.duration == duration && type == m.mtype_id && m.timein == timein;
        });
        if( mships.length > 0){
            alert('Такой абонемент уже есть');
        }
        else{
            closeFormNewMship();
            let dataToSend = {
                type,
                price,
                duration,
                id,
                timein
            }
            const sendToServer = new SendToServer();
            sendToServer.postRequest('/addNewMship', dataToSend, result => {
                let msg = JSON.parse(result).message;
                console.log(msg);
                if(msg === 'error'){
                    alert('Такой абонемент уже есть. Изменить стоимость можно в соответстующей строке');
                }
            });  
            await readAllMemberships();
            showMemberships();
        }
    }    
}

function showMemberships(){
    adminMemberships.innerHTML =`<button class="helpAdmin" onclick="showHelp('adminmembership')">?</button>`;
    allDisplayNone();   

    memberships = memberships.sort((a, b) => a.mship_id - b.mship_id);

    let div = document.createElement('div');
    div.setAttribute('style','display:flex');
    div.setAttribute('id','lineForTables')

    adminMemberships.append(div);
    adminMemberships.setAttribute('style','display:block');

    let morning = memberships.filter(m => m.timein == '7:00-14:00');
    let table = drawMshipTable(morning, "Утренние абонементы","7:00-14:00");
    lineForTables.append(table);
    
    let full = memberships.filter(m => m.timein == '7:00-23:00');
    table = drawMshipTable(full,'Абонементы на полный день',"7:00-23:00");
    lineForTables.append(table);

    admin__info.querySelectorAll('*').forEach(d=>{
        d.classList.add('adminText');
    })

    drawMshipChart();
}

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

async function getStatisticMship(){       
    let count = await fetch("/countMshipsById", {method:"GET"});
    count = await count.json();
    return count;
}

async function drawMshipChart(){
    let values = await getStatisticMship();
    values = values.map(v => v.count);
    let chartId = document.createElement('div');
    chartId.setAttribute('class','mshipChart');

    let chart = document.createElement('canvas');
    chart.setAttribute('id','mshipchart');

    chartId.append(chart);

    adminMemberships.append(chartId);

    let labels = memberships.map(m => m.name + '\n' + m.timein +'\n'+m.duration+' мес.');

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.legend.display = false;
    let mshipChart = new Chart(document.getElementById("mshipchart").getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                'rgba(0, 99, 132, 0.6)',
                'rgba(30, 99, 132, 0.6)',
                'rgba(60, 99, 132, 0.6)',
                'rgba(90, 99, 132, 0.6)',
                'rgba(120, 99, 132, 0.6)',
                'rgba(150, 99, 132, 0.6)',
                'rgba(180, 99, 132, 0.6)',
                'rgba(210, 99, 132, 0.6)',
                'rgba(240, 99, 132, 0.6)'
              ],
              borderColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(30, 99, 132, 1)',
                'rgba(60, 99, 132, 1)',
                'rgba(90, 99, 132, 1)',
                'rgba(120, 99, 132, 1)',
                'rgba(150, 99, 132, 1)',
                'rgba(180, 99, 132, 1)',
                'rgba(210, 99, 132, 1)',
                'rgba(240, 99, 132, 1)'
              ],
              borderWidth: 2,
              hoverBorderWidth: 0,
              data: values
            }
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: {
              labels: {
                display:false
              },
              tooltips: {
                enabled: false
             }
          },
          title: {
            display: true,
            text: 'Статистика популярности купленных абонементов'
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
          }
        }
    });
    
}

async function afterKeyPress(e, id){
    
    if(e.keyCode == 13){
        let newPrice = id.value;
        if(id.value[0]==0){
            newPrice = id.value.slice(1);
        }
        dataToSend = {
            id: id.id.slice(5),
            price: newPrice
        }
        const sendToServer = new SendToServer();
        await sendToServer.postRequest('/changePriceMship', dataToSend, result => {
        }); 
        adminMemberships.innerHTML =`<button class="helpAdmin" onclick="showHelp('adminmembership')">?</button>`;
        await readAllMemberships();
        showMemberships();
        closeInputForNewPrice(id);
    }

}

function closeInputForNewPrice(id){
    id.value = '';
    id.setAttribute('style','display:none');    
}

function openInputForNewPrice(id){
    id.setAttribute('style','display:block');
    id.focus();
}

function makeButtonPriceHidden(id){
    let btn = document.getElementById(id);
    btn.setAttribute('style','visibility:hidden');
}

function makeButtonPriceVisible(id){
    let btn = document.getElementById(id);
    btn.setAttribute('style','visibility:visible');
}























function initAdminLevels(){
    
    let levels = coaches.map(c => {
        return {
            level_id: c.level_id,
            level: c.level,
            price: c.price
        }
    })
    levels = levels.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.level_id === thing.level_id
    )))

    levels = levels.sort((a,b) => a.level_id - b.level_id);

    levels.forEach(l =>{
        let line = document.createElement('div');
        line.setAttribute('class','admin_table_line');

        let p = document.createElement('p');
        p.setAttribute('style','font-size:16px')
        p.textContent = l.level;
        line.append(p);

        p = document.createElement('p');
        p.innerHTML = `${l.price} &#x20b4`;
        p.setAttribute('style','font-size:16px')
        line.append(p);

        adminCoachLevel.append(line);
    })
}

function initAdminCoaches(month){
    // month = month<10?'0'+month:month;
    // console.log(month);
    adminCoachesData.innerHTML =` `;
    
    month = month+'.2020';
    // console.log(month);
    let trainingsMonth = trainings.filter(t => {
        return t.date.includes(month)
    })
    coaches = coaches.sort((a,b) => a.coach_id - b.coach_id);
    coaches.forEach(c => {
        let line = document.createElement('div');
        line.setAttribute('class','admin_table_line');
        line.setAttribute('id',`${c.coach_id}`);
        line.setAttribute('onclick',`openFormRemoveEditCoach(${c.coach_id})`)

        let p = document.createElement('p');
        p.setAttribute('style','font-size:16px')
        p.textContent = c.name+' '+c.surname;
        line.append(p);

        p = document.createElement('p');
        p.textContent = c.level;
        p.setAttribute('style','font-size:16px')
        line.append(p);
        
        let hours = trainingsMonth.filter(t => t.coach_id == c.coach_id).length;
        p = document.createElement('p');
        p.textContent = hours;
        p.setAttribute('style','font-size:16px')
        line.append(p);

        let rating = 0;
        if(hours>0){
            rating = trainings.filter(t => t.mark != '' && t.coach_id == c.coach_id).map(a => a.mark);
            rating = Math.round((rating.reduce((a,b) => a+b)/rating.length)*50)/10;
        }
        // console.log(hours,rating);
        ratingCoaches[c.name+' '+c.surname] = {rating,hours};

        p = document.createElement('p');
        p.textContent = rating;
        p.setAttribute('style','font-size:16px')
        line.append(p);

        let sallary = hours*c.price;
        p = document.createElement('p');
        p.textContent = sallary;
        p.setAttribute('style','font-size:16px')
        line.append(p);

        adminCoachesData.append(line);
    })
    
}

function openFormRemoveEditCoach(coachId){
    editRemoveCoach.setAttribute('style','visibility:visible');
    let coach = coaches.filter(c => c.coach_id == coachId)[0];
    coachNameToEdit.textContent = coach.name+' '+coach.surname;
}

function closeFormEditRemoveCoach(){
    editRemoveCoach.setAttribute('style','visibility:hidden');
    coachNameToEdit.textContent = '';
}

async function removeCoachFunc(name){
    if(confirm('Вы уверенны, что хотите уволить тренера')){
        let coach = coaches.filter(c => c.name+' '+c.surname == name)[0];
        let dataToSend = {
            id: coach.coach_id
        }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/removeCoach', dataToSend, result => {
            let msg = JSON.parse(result).message;
            if(msg === 'already deleted'){
                alert('Тренер уже уволен');
            }
        });
        let coachLine = document.getElementById(coach.coach_id);
        coachLine.remove();
        closeFormEditRemoveCoach();
        await readCoaches();
    }
}

async function editCoachLevelFunc(name){
    let coach = coaches.filter(c => c.name+' '+c.surname == name)[0];
    let newLevel = editCoachLevel.value;
        let dataToSend = {
            id: coach.coach_id,
            level_id: newLevel
        }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/editLevelCoach', dataToSend, result => {
        });
        let line = document.getElementById(coach.coach_id);
        let level = line.getElementsByTagName('p')[1];
        console.log(editCoachLevel.options[editCoachLevel.selectedIndex].text)
        level.textContent = editCoachLevel.options[editCoachLevel.selectedIndex].text;
        closeFormEditRemoveCoach();
        await readCoaches();
}

function showCoaches(){
    activeLink('coachId');
    allDisplayNone();
    document.getElementById('adminCoaches').setAttribute('style','display:block');    
    drawCoachesChartRating();
    drawCoachesChartHours();
}

function drawCoachesChartRating(){
    console.log(ratingCoaches);
    let labels = Object.keys(ratingCoaches);
    let values = Object.values(ratingCoaches).map(i => i.rating);

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.legend.display = false;
    new Chart(document.getElementById("adminCoachRatingChart").getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                'rgba(0, 99, 132, 0.6)',
                'rgba(30, 99, 132, 0.6)',
                'rgba(60, 99, 132, 0.6)',
                'rgba(90, 99, 132, 0.6)',
                'rgba(120, 99, 132, 0.6)',
                'rgba(150, 99, 132, 0.6)',
                'rgba(180, 99, 132, 0.6)',
                'rgba(210, 99, 132, 0.6)',
                'rgba(240, 99, 132, 0.6)'
              ],
              borderColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(30, 99, 132, 1)',
                'rgba(60, 99, 132, 1)',
                'rgba(90, 99, 132, 1)',
                'rgba(120, 99, 132, 1)',
                'rgba(150, 99, 132, 1)',
                'rgba(180, 99, 132, 1)',
                'rgba(210, 99, 132, 1)',
                'rgba(240, 99, 132, 1)'
              ],
              borderWidth: 2,
              hoverBorderWidth: 0,
              data: values
            }
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: {
              labels: {
                display:false
              },
              tooltips: {
                enabled: false
             }
          },
          title: {
            display: true,
            text: 'Рейтинг тренеров'
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
          }
        }
    });
}

function drawCoachesChartHours(){
    let labels = Object.keys(ratingCoaches);
    let values = Object.values(ratingCoaches).map(i => i.hours);    

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.legend.display = false;
    new Chart(document.getElementById("adminCoachCountChart").getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                'rgba(0, 99, 132, 0.6)',
                'rgba(30, 99, 132, 0.6)',
                'rgba(60, 99, 132, 0.6)',
                'rgba(90, 99, 132, 0.6)',
                'rgba(120, 99, 132, 0.6)',
                'rgba(150, 99, 132, 0.6)',
                'rgba(180, 99, 132, 0.6)',
                'rgba(210, 99, 132, 0.6)',
                'rgba(240, 99, 132, 0.6)'
              ],
              borderColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(30, 99, 132, 1)',
                'rgba(60, 99, 132, 1)',
                'rgba(90, 99, 132, 1)',
                'rgba(120, 99, 132, 1)',
                'rgba(150, 99, 132, 1)',
                'rgba(180, 99, 132, 1)',
                'rgba(210, 99, 132, 1)',
                'rgba(240, 99, 132, 1)'
              ],
              borderWidth: 2,
              hoverBorderWidth: 0,
              data: values
            }
          ]
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          legend: {
              labels: {
                display:false
              },
              tooltips: {
                enabled: false
             }
          },
          title: {
            display: true,
            text: 'Часы работы тренеров'
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
          }
        }
    });
}

function openFormForNewCoach(){
    let createNewCoach = document.getElementById('createNewCoach');
    createNewCoach.setAttribute('style','visibility:visible');
}

function closeFormNewCoach(){
    createNewCoach.setAttribute('style','visibility:hidden');
    inputCoachName.value ='';
    inputCoachSurname.value ='';
}

async function makeNewCoach(){
    let id = new Date().getTime().toString().slice(8)+Math.round(Math.random()*10);
    let age = Math.round(Math.random()*10)+20
    let dataToSend = {
        name: inputCoachName.value,
        surname: inputCoachSurname.value,
        level_id: levelSelect.value,
        id:id,
        age:age
    }
    const sendToServer = new SendToServer();
    sendToServer.postRequest('/addNewCoach', dataToSend, result => {
    });
    closeFormNewCoach();
    await readCoaches();
    initAdminCoaches();
}

function openFormForNewSallary(){
    editCoachSallary.setAttribute('style','visibility:visible')
}

function closeFormEditSallary(){
    editCoachSallary.setAttribute('style','visibility:hidden')
    inputCoachSallary.value ='';
}

async function editCoachSallaryFunc(){
    let dataToSend = {
        id: levelSelectSallary.value,
        price:inputCoachSallary.value
    }
    console.log(dataToSend)
    const sendToServer = new SendToServer();
    sendToServer.postRequest('/editCoachSallary', dataToSend, result => {
    });
    closeFormEditSallary();
    adminCoachLevel.innerHTML = '';
    await readCoaches();
    initAdminLevels();
    let month = new Date().getMonth();
    initAdminCoaches(month+1);
}





















function showCustomers(){
    allDisplayNone();
    adminCustomers.setAttribute('style','display:block');
    drawCustomers('all');
}

function drawCustomers(status){
    adminCustomersDiv.innerHTML = '';
    let custByStatus = customers.sort((a,b) => a.customer_id - b.customer_id);
    if(status != 'all'){
        custByStatus = custByStatus.filter(c => c.status == status)
    }

    custByStatus.forEach(c => {
        let line = document.createElement('div')
        line.setAttribute('class','admin_table_line')

        let p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = c.firstname+' '+c.lastname;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = c.name;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = c.duration;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = c.startdate;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = c.status;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');        
        if(c.status == 'waiting'){
            let btn = document.createElement('button');
            btn.textContent = 'Активировать';
            btn.setAttribute('onclick',`activateMembership(${c.customer_id})`)
            p.append(btn)
        }
        line.append(p);

        adminCustomersDiv.append(line)
    })
}

async function activateMembership(id){
    let date = new Date();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    let month = date.getMonth() < 9 ? '0' + date.getMonth() + 1 : date.getMonth() + 1 ;
    date = day + '.' + month + '.' + date.getFullYear();
    let dataToSend = {
        date: date,
        id: id
    }
    const sendToServer = new SendToServer();
    sendToServer.postRequest('/startMship', dataToSend, result => {
    }); 
    await readCustomers();
    drawCustomers('all');
}

function coachSchedule(id){
    let date = new Date();
    let day = date.getDate() ;
    let month = date.getMonth() + 1 ;
    date = day + '.' + month + '.' + date.getFullYear();
    let coach = coaches.filter(c => c.name+' '+c.surname == id)[0];
    schedule = trainings.filter(t => t.coach_id == coach.coach_id && t.date == date);
    if(schedule.length == 0){
        let line = document.createElement('div');
        let p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent =  "На данный момент у тренера нет записей на тренировку";
        p.setAttribute('style','margin:0; width:100%')
        line.append(p);
        document.getElementById('schedule').append(line);
        printScheduleDiv.textContent = "На данный момент у тренера нет записей на тренировку";
    }
    else{
        let line = document.createElement('div');
        line.setAttribute('class','');
        let printLine = document.createElement('p');
        let str = '';

        let p = document.createElement('p');
        p.textContent = 'Время';
        // str += t.time_stat;
        p.setAttribute('class','black_text');
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = "Клиент"
        // str+=" "+p.textContent;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = "Оплата";
        // str+=" "+p.textContent;
        line.append(p);

        // printLine.textContent = str;
        // printScheduleDiv.append(printLine);
        let sc = document.getElementById('schedule');
        sc.append(line);

        schedule.forEach(t =>{
        let line = document.createElement('div');
        line.setAttribute('class','');
        let printLine = document.createElement('p');
        let str = '';

        let p = document.createElement('p');
        p.textContent = t.time_stat;
        str += t.time_stat;
        p.setAttribute('class','black_text');
        line.append(p);

        let customer = customers.filter(c => c.customer_id == t.customer_id)[0];
        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = customer.firstname + ' ' + customer.lastname;
        str+=" "+p.textContent;
        line.append(p);

        p = document.createElement('p');
        p.setAttribute('class','black_text');
        p.textContent = coach.price + ' uah';
        str+=" "+p.textContent;
        line.append(p);

        printLine.textContent = str;
        printScheduleDiv.append(printLine);
        let sc = document.getElementById('schedule');
        sc.append(line);
        })
    }   
    scheduleDiv.setAttribute('style','visibility:visible');
}

function closeSchedule(){
    scheduleDiv.setAttribute('style','visibility:hidden')
    document.getElementById('schedule').innerHTML = '';
    printScheduleDiv.innerHTML='';
}

function printSchedule(){
    let divToPrint = document.getElementById('printScheduleDiv');
    

    newWin= window.open("");
    divToPrint.setAttribute('style','display:block');
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
    divToPrint.setAttribute('style','display:none');
}

function leavePage(){
    window.location = '/';
}

function allDisplayNone(){
    adminMemberships.setAttribute('style','display:none');
    // let adminCoaches = document.getElementById('adminCoaches')
    adminCoaches.setAttribute('style','display:none');
    adminCustomers.setAttribute('style','display:none');
}

async function init(){
    await readAllMemberships();
    await readCoaches();
    await readCustomers();
    initAdminLevels();
    let month = new Date().getMonth();
    initAdminCoaches(month+1);
    
}

init();