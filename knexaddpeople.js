const settings = require("./settings"); // settings.json
// const input = process.argv[2];
const moniker = process.argv[2];
const surname = process.argv[3];
const dob = process.argv[4];
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});
const moment = require('moment');

function addName(moniker, surname, dob) {
    knex.insert([{ first_name: moniker, last_name: surname, birthdate: dob }]).into('famous_people').then(printTable).then(close());
}

addName(moniker, surname, dob);

function printTable() {
    knex.select().from('famous_people').then(function (resp) {
        resp.forEach(function (row) {
            let m = moment(row.birthdate);
            console.log(`${row.id}:${row.first_name} ${row.last_name} born ${m.format('MMMM do YYYY')}`);
        })
    })
}

function close() {
    setTimeout(function () { process.exit(); }, 2000);
}


//this gets name from comd line and prints stuff
// function getName(name) {
//     knex.select().from('famous_people').where('first_name', `${ name }`).then(function (resp) {
//         resp.forEach(function (row) {
//             console.log(`${ row.first_name } ${ row.last_name } born ${ row.birthdate }`);
//         })

//     })
// }
// getName(input)