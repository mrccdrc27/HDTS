import pkg from 'pg';
const { Client } = pkg;

const con=new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Oklangyan421!",
    database: "group5capstone"
})


con.connect().then(() => console.log("connected"))

con.query('SELECT * FROM core_employee', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    con.end;
})

