let coaches;
let memberships;
let trainings;
let customers;
let accessTime;
let memTypes;

async function readAllMemberships(){
    let result = await fetch("/prices", {method:"GET"});
    result = await result.json();
    memberships = result.memberships;
    accessTime = result.accessTime;
    memTypes = result.memTypes;
}

async function readCustomers(){
    let result = await fetch("/customers", {method:"GET"});
    let cust = await result.json();
    let now = new Date()
    now = now.getTime();
    cust.forEach(async c => {        
        if(c.status == 'active'){
            let date = c.startdate.split('.');
            date = date[1]+'.'+date[0]+'.'+date[2];
            date = new Date(date);
            date = date.getTime(); 
            let days = (now - date)/(1000*3600*24);
            if(days > c.duration*30){
                c.status = 'finished';
                let dataToSend = {
                    status:'finished',
                    customer_id: c.customer_id
                }
                await fetch("/changeStatus", {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(dataToSend)
            })
            }
        }        
    });
    customers = cust;
}

async function readCoaches(){
    let result = await fetch("/coaches", {method:"GET"});
    
    result = await result.json();
    coaches = result.coaches;
    trainings = result.trainings;
}

function openMessageToAdmin(){
    messageToAdminMail.setAttribute('style','visibility:visible');
    messageToAdminBox.setAttribute('style','visibility:visible');
}

function closeMessageToAdmin(){
    messageToAdminMail.setAttribute('style','visibility:hidden');
    messageToAdminBox.setAttribute('style','visibility:hidden');
    uncheckEmail();
    uncheckText();
    senderEmail.value = '';
    senderText.value = '';
}


function uncheckEmail(){
    if(senderEmail.classList.contains('invalid')){
        senderEmail.classList.remove('invalid');
    }
}

function uncheckText(){
    if(senderText.classList.contains('invalid')){
        senderText.classList.remove('invalid');
    }
}

function checkEmail(){
    if(!senderEmail.value.endsWith('@gmail.com')){
        senderEmail.classList.add('invalid');
    }
}

async function sendMessageToAdmin(){
    if(senderText.value.length === 0){
        if(!(senderText.classList.contains('invalid'))){
            senderText.classList.add('invalid');
        }
    }
    if(!(senderText.classList.contains('invalid') || senderEmail.classList.contains('invalid')))
    {
        alert('send');
        let mes = senderText.value + '\nAnswer me: ' + senderEmail.value;
        let dataToSend ={
            code:mes,
            email:'sportforlife.kyiv@gmail.com'
        }
        const sendToServer = new SendToServer();
        await sendToServer.postRequest('/submitEmail', dataToSend, result => {
        }); 
        closeMessageToAdmin();
    }
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

var TRange = null;

function findString(str) {
    if (parseInt(navigator.appVersion) < 4) return;
    var strFound;
    if (window.find) {
        // CODE FOR BROWSERS THAT SUPPORT window.find
        strFound = self.find(str);
        if (strFound && self.getSelection && !self.getSelection().anchorNode) {
            strFound = self.find(str)
        }
        if (!strFound) {
            strFound = self.find(str, 0, 1)
            while (self.find(str, 0, 1)) continue
        }
    } else if (navigator.appName.indexOf("Microsoft") != -1) {
        // EXPLORER-SPECIFIC CODE        
        if (TRange != null) {
            TRange.collapse(false)
            strFound = TRange.findText(str)
            if (strFound) TRange.select()
        }
        if (TRange == null || strFound == 0) {
            TRange = self.document.body.createTextRange()
            strFound = TRange.findText(str)
            if (strFound) TRange.select()
        }
    } else if (navigator.appName == "Opera") {
        alert("Opera browsers not supported, sorry...")
        return;
    }
    if (!strFound) alert("String '" + str + "' not found!")
        return;
};

document.getElementById('searchWindow').onkeypress = function(event) {
    if(event.keyCode == 13){
        findString(searchWindow.value);
        return false;
    }    
};

function showHelp(pageName){
    let path = "./справкаДляКлуба/"+pageName+'.html';
    if(pageName === 'enter'){
       
        let reg = document.getElementById('indexbody').innerHTML;
        let text = `<div class="login not_visible" id="registration" style="visibility:visible">`;
        if(reg.includes(text)){
            path = "./справкаДляКлуба/"+'register'+'.html';   
        }        
    }    
    window.open(path);
}