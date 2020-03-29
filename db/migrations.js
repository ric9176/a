const path = require('path');
const marv = require('marv');
const driver = require('marv-pg-driver');
const url = require('url');

const db_url = url.parse(process.env.DATABASE_URL);

console.log(db_url)

const user = db_url.auth.substr(0, db_url.auth.indexOf(':'));
const password = db_url.auth.substr(1, db_url.auth.indexOf(':'));
const host = db_url.hostname;
const database = db_url.path.substr(1);
const port = db_url.port;

console.log('Migrations running on: ', host);
const directory = path.join(process.cwd(), 'db', 'migrations');

marv.scan(directory, {namespace: 'test1'}, (err, migrations) => {
    if (err) throw err;
    if (migrations.length === 0) throw new Error(`No migrations found in ${directory}`);
    marv.migrate(migrations, driver({connection: { host, port, user, password, database, ssl: true }}), err => {
        if (err) throw err;
        console.log('Migrations complete');
    });
});


