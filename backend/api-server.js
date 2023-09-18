const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require("./database");
const fileUpload = require('express-fileupload');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));

const jwtKey = "abc1234567";

app.post('/api/admin/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: '파일 업로드 실패'
            });
        } else {
            let f = req.files.uploadFile;
            f.mv('./uploads/' + f.name);
            res.send({
                status: true,
                message: '파일이 업로드 되었습니다.',
                data: {
                    name: f.name,
                    minetype: f.minetype,
                    size: f.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get("/api/admin/branch", async(req, res) => {
    const result = await database.run(`SELECT A.IDX, B.NAME, A.BRANCH_NAME FROM branch A JOIN company B ON A.COMPANY_IDX = B.IDX;`);
    res.send(result);
});

app.get("/api/admin/company", async(req, res) => {
    const result = await database.run(`SELECT IDX,NAME FROM COMPANY;`);
    res.send(result);
});

app.post("/api/admin/setBranch", async(req, res) => {
    const exists = await database.run(`SELECT 1 as cnt FROM BRANCH WHERE BRANCH_NAME = ?;`,  req.body.args.paramBranchName);
    if(exists[0].cnt > 0){
        res.send("exists");
    }else{
        await database.run(`INSERT INTO BRANCH (COMPANY_IDX, BRANCH_NAME, LATITUDE, LONGITUDE) VALUES (
            (SELECT IDX FROM COMPANY WHERE NAME = ? ), ?, ?, ?);`, 
            [req.body.args.paramCompany , req.body.args.paramBranchName, req.body.args.paramLatitude, req.body.args.paramLongitude]
        );
    }
    res.send();
});

app.get("/api/validEmail", async(req, res) => {
    const result = await database.run(`SELECT EMAIL FROM USER WHERE EMAIL = ?;`, [req.query.email]);
    res.send(result);
});

app.post("/api/signup", async(req, res) => {
    await database.run(`INSERT INTO USER (EMAIL, PASSWORD) VALUES (? , ?);`, [req.body.args.email , req.body.args.password]);
    const result = await database.run(`SELECT EMAIL FROM USER WHERE EMAIL = ?;`, req.body.args.email);
    res.send(result);
});

app.get("/api/searchBranch", async(req, res)=>{
    const result = await database.run(`SELECT 
    (
      6371 *
      acos(
        cos(radians(?)) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - 
            radians(?)) + 
        sin(radians(?)) * 
        sin(radians(latitude)))
    ) AS distance 
    FROM TABLE_NAME
    HAVING distance < 1
    ORDER BY distance;`, [req.query.latitude , req.query.longitude, req.query.latitude] );
    res.send(result);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})