const {Client} = require('pg');
const express = require('express')
const app = express();
let email 	= require("./node_modules/emailjs/email");

let server = email.server.connect({
  user: 'sportforlife.kyiv@gmail.com',
  password: 'sport4life',
  host: 'smtp.gmail.com',
  ssl: true
});

app.use(express.static('./html/'));
app.use(express.json());

const client = new Client({
    user: 'postgres',
    password: '1111',
    host: '',
    port: 5433,
    database: 'SportClub'
})

app.get("/prices", async (req,res) => {
    const rows = await readMemberships();
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.get("/customers", async (req,res) => {
    const rows = await readCustomers();
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.get("/countMshipsById", async (req,res) => {
    const rows = await countMshipsById();
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.get("/coaches", async (req,res) => {
    const rows = await readCoaches();
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/changeCustomerPassword", async (req,res) => {
    const rows = await changeCustomerPassword(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/changeCustomerEmail", async (req,res) => {
    const rows = await changeCustomerEmail(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/removeTraining", async (req,res) => {
    const rows = await removeTraining(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/addTrainingMark", async (req,res) => {
    const rows = await addTrainingMark(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/addNewCoach", async (req,res) => {
    const rows = await addNewCoach(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/startMship", async (req,res) => {
    const rows = await startMship(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/removeCoach", async (req,res) => {
    const rows = await removeCoach(req.body);
    res.setHeader("content-type","application/json");
    res.send(JSON.stringify({message:rows}));
})

app.post("/editLevelCoach", async (req,res) => {
    const rows = await editLevelCoach(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/addNewMship", async (req,res) => {
    const result = await addNewMship(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify({message:result}))
})

app.post("/changePriceMship", async (req,res) => {
    const rows = await changePriceMship(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/extendMship", async (req,res) => {
    const rows = await extendMship(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/editCoachSallary", async (req,res) => {
    const rows = await editCoachSallary(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/addTraining", async (req,res) => {
    const rows = await addTraining(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify({message:rows}))
})

app.post('/changeStatus', async (req,res) => {
    const rows = await changeStatus(req.body);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post("/customerInfo", async (req,res) => {
    const rows = await readAllAboutCustomer(req.body.email);
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

app.post('/addMembership', async (req, res) => {
   let result = await sendMembership(req.body);
   if(result!=='ok' && result !== 'no places')
   {
    result = result.slice(7,12);
   }
   const data = {
       message:result
   }
    res.send(JSON.stringify(data));
})

app.post('/regCustomer', async (req, res) => {
    let result = await registraitionCustomer(req.body);
     res.send(JSON.stringify({message:result}));
 })

 app.post('/submitEmail', async (req, res) => {
    let result = await submitEmail(req.body);
     res.send(JSON.stringify(result));
 })

app.listen(5000, () => console.log("Listening"));

start()
async function start(){
    await connect();
}

async function connect(){
    try{
        await client.connect();
    }
    catch(e){
        console.error(`Failed to connect ${e}`)
    }
}

async function sendMembership(membershipData)
{
    try{
    //    await client.query(`BEGIN;
    //    LOCK TABLE customers IN ROW EXCLUSIVE MODE;
    //    insert into customers values (${Number(membershipData.customer_id)},'${membershipData.name}','${membershipData.surname}',false,${membershipData.phone},'${membershipData.email}','',${Number(membershipData.mship_id)},'${membershipData.birthday}','');
    //    COMMIT;`);

    

    let a = await client.query(`BEGIN;
                                SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
                                INSERT INTO customers SELECT ${Number(membershipData.customer_id)},'${membershipData.name}',
                                '${membershipData.surname}',false,${membershipData.phone},'${membershipData.email}','',
                                ${Number(membershipData.mship_id)},'${membershipData.birthday}','' 
                                WHERE (SELECT COUNT(*) FROM customers) < 22;
                                END;`);


       
       if(a[2].rowCount){
           return 'ok';
       }
       else{
           return 'no places';
       }             
    }
    catch(e){
        return e.detail;
    }
}

async function readMemberships(){
    try{
        const memberships = await client.query('SELECT *    FROM memberships inner JOIN mtypes ON (memberships.mtype_id = mtypes.mtype_id)');
        const accessTime = await client.query('SELECT unnest(enum_range(NULL::access_time))');
        const memTypes = await client.query('SELECT mtypes.name from mtypes');
        return {
            memberships:memberships.rows,
            accessTime:accessTime.rows,
            memTypes:memTypes.rows
        };
    }
    catch(e){
        return[];
    }
}

async function readCustomers(){
    try{
        const customers = await client.query('select * from customers inner join memberships on (customers.mship_id = memberships.mship_id) inner join mtypes on (mtypes.mtype_id = memberships.mtype_id)');
        return customers.rows;
    }
    catch(e){
        return[];
    }
}

async function registraitionCustomer(customer){
    try{
        let a = await client.query(`begin;
                                    LOCK TABLE customers IN ROW EXCLUSIVE MODE;
                                    update customers set password = '${customer.password}'
                                    where email = '${customer.email}' and password = '';
                                    end;`);

                                    
        // console.log(a[2].rowCount);
        if(a[2].rowCount){
            return 'ok';
        }
        else{
            return 'already exists';
        }
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function submitEmail(email){
    server.send({
        text: `${email.code}`,
        from: 'Sport Life',
        to: ` <${email.email}>`,
        cc: '',
        subject: ''
      }, function (err, message) {
        return (err || message);
      });
}

async function readCoaches(){
    try{
        const coaches = await client.query('select * from coaches inner join coach_level on(coaches.level_id = coach_level.coach_level_id)');
        const trainings = await client.query('select * from trainings inner join coaches on(trainings.coach_id = coaches.coach_id) inner join coach_level on (coaches.level_id = coach_level.coach_level_id)');
        data = {
            coaches:coaches.rows,
            trainings:trainings.rows
        }
        return data;
    }
    catch(e){
        return[];
    }
}

async function readAllAboutCustomer(email){
    try{
        const trainings = await client.query(`select * from trainings inner join coaches on(trainings.coach_id = coaches.coach_id) inner join coach_level on(coach_level.coach_level_id = coaches.level_id) inner join customers on(trainings.customer_id = customers.customer_id) where customers.email = '${email}'`);
        const membership = await client.query(`select * from customers inner join memberships on(memberships.mship_id = customers.mship_id) inner join mtypes on(mtypes.mtype_id = memberships.mtype_id) where customers.email='${email}'`);
        const data ={
            trainings:trainings.rows,
            membership:membership.rows
        }
        return data;
        }
    catch(e){
        return[];
    }
}

async function addTraining(tr){
    try{
        let a = await client.query(`begin transaction; 
                                    insert into trainings values (${tr.tr_id},'${tr.time}',null,
                                    ${tr.customer},'${tr.coach}','${tr.date}') 
                                    ON CONFLICT ON CONSTRAINT training_info do nothing; 
                                    commit;`);


        if(a[1].rowCount) {
            return 'Вы записаны на тренировку!';

        }
        else{
            return 'Это время уже занято!';
        }
        
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function changeStatus(c){ 
    try{
        console.log(c.status,c.customer_id);
        await client.query(`UPDATE customers SET status = '${c.status}' WHERE customer_id=${c.customer_id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function changePriceMship(m){ 
    try{
        await client.query(`UPDATE memberships SET price = '${m.price}' WHERE mship_id=${m.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function countMshipsById(){ 
    try{
        let countMships = await client.query(`SELECT COUNT(customer_id)  FROM customers  GROUP BY mship_id order by mship_id`);

        return countMships.rows;
    }
    catch(e){
        return 'error';
    }
}

async function addNewMship(m){
    try{
        let a = await client.query(`begin;
                                    LOCK TABLE customers IN EXCLUSIVE MODE;
                                    insert into memberships values (${m.id},${m.price},
                                    ${m.duration},'${m.timein}',${m.type},0) 
                                    ON CONFLICT do nothing;
                                    end;`);



        if(a[2].rowCount){
            return 'ok';
        }
        else{
            return 'error';
        }
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function addTrainingMark(t){
    try{
        await client.query(`update trainings set mark = ${t.mark} where training_id = ${t.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function removeTraining(t){
    try{
        await client.query(`delete from trainings where training_id = ${t.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function changeCustomerEmail(c){
    try{
        await client.query(`update customers set email = '${c.email}' where customer_id = ${c.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function changeCustomerPassword(c){
    try{
        await client.query(`update customers set password = '${c.password}' where customer_id = ${c.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function addNewCoach(c){
    try{
        await client.query(`insert into coaches values (${c.id},'${c.name}','${c.surname}',${c.age},${c.level_id})`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function editCoachSallary(c){
    try{
        await client.query(`update coach_level set price = ${c.price} where coach_level_id = ${c.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function removeCoach(c){
    try{
        let a = await client.query(`begin;
                                    LOCK TABLE customers IN ROW EXCLUSIVE MODE;
                                    delete from coaches where coach_id = ${c.id};
                                    end;`);


        // console.log(a[2].rowCount);
        if(a[2].rowCount){
            return 'ok';
        }
        else{
            return 'already deleted';
        }
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function editLevelCoach(c){
    try{
        await client.query(`update coaches set level_id = ${c.level_id} where coach_id = ${c.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function startMship(c){
    try{
        let a = await client.query(`UPDATE customers set startdate = '2.6.2020', status = 'active' where customer_id = ${c.id};`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}

async function extendMship(c){
    try{
        await client.query(`update customers set startdate = '', status = 'waiting', mship_id  = ${c.mship_id} where customer_id = ${c.id}`);
        return 'ok';
    }
    catch(e){
        console.log(e);
        return 'error';
    }
}