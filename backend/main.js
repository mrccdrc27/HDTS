const {Client} = require ('pg');

const con=new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "oklangyan421",
    database: "group5capstone"
})

con.connect().then(() => console.log("connected"))

con.query("SELECT * FROM yosertibol", (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    con.end;
})

