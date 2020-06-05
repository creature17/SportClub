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
            button.setAttribute('onclick',`extendMembership(${m.mship_id})`);
            button.textContent = 'Продлить';

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

async function extendMembership(mship_id){
    if(confirm('Продлить абонемент?')){
        let dataToSend = {
            id: customerMembership[0].customer_id,
            mship_id: mship_id
        }
        const sendToServer = new SendToServer();
        sendToServer.postRequest('/extendMship', dataToSend, result => {
        });    
        await readCurrentCustomer();
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



async function init(){
    await readAllMemberships();
    await readCurrentCustomer();
    drawMemberships();
    initPriceInput();
    initMemTimeSelect();
    initMemTypeSelect();
    initMemDurationInput();
}

init();