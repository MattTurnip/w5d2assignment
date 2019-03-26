const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

const input = process.argv[2];

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }

    function getName(name) {
        client.query(`SELECT id, first_name, last_name, to_char(birthdate, 'yyyy-MM-dd') AS birthdate FROM famous_people WHERE first_name='${name}'`, [], function (err, results) {
            console.log(`Found ${results.rows.length} person(s) by the name ${name}`)
            results.rows.forEach(function (row) {
                console.log(`${row.id}: ${row.first_name} ${row.last_name} born ${row.birthdate}`);
            })
            client.end();
        })
    }

    getName(input);

});

console.log("searching.......................");