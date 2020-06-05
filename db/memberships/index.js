const {Client} = require('pg');


const client = new Client({
    user: 'postgres',
    password: '1111',
    host: '',
    port: 5433,
    database: 'SportClub'
})

// start()
// async function start(){
//     await connect();
//     const memberships = await readMemberships();
//     console.log(memberships);
// }


// async function connect(){
//     try{
//         await client.connect();
//     }
//     catch(e){
//         console.error('Failed to connect ${e}')
//     }
// }

// async function readMemberships(){
//     try{
//         const results = await client.query('SELECT * FROM Memberships');
//         return results.rows;
//     }
//     catch(e){
//         return[];
//     }
// }




client.connect()
.then(() => console.log('connected'))
.catch(e => console.log(e, '111111111'))


const getAllMemberships = async () => {
	return await client.query('SELECT * FROM Memberships')
		.then(res => res.rows)
		.catch(e => console.log(e))
		.finally(() => {});
}


module.exports = {getAllMemberships};