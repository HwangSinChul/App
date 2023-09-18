const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'qwer1234!',
    connectionLimit: 5,
    database: 'culover'
});

// async function testConn(){
//     let conn, rows;
//     try{
//         conn = await pool.getConnection();
//         conn.query('USE culover');
//         rows = await conn.query('SELECT 1');
//     }
//     catch(err){
//         throw err;
//     }
//     finally{
//         if(conn) conn.end();
//         return rows[0];
//     }
// }

// testConn()
// .then( (rows)=> {
//     console.log(rows);
// })
// .catch( (errMsg) => {
//     console.log(`error : ${errMsg}`);
// });

module.exports = {
    async run(query, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    conn.query(query, params)
                        .then((rows) => {
                            resolve(rows);
                            conn.end(); // (필수) connection 종료
                        })
                        .catch(err => {
                            console.log(err);
                            conn.end(); // (필수) connection 종료
                            reject(err);
                        })

                }).catch(err => {
                    //not connected
                    console.log(err);
                    reject(err);
                });
        });
    }
}