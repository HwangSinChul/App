const express = require('express');
const app = express();
const port = 3000;
const database = require("./database");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//이미지 업로드 관련
const multer = require('multer');
const path = require('path');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const jwtKey = "abc1234567";

const upload = multer({
    storage: multer.diskStorage({
      	filename(req, file, done) {
          	//console.log(file);
			done(null, file.originalname);
        },
		destination(req, file, done) {
      		//console.log(file);
		    done(null, path.join(__dirname, "public/uploads"));
	    },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
const uploadMiddleware = upload.single('productImg');

app.post("/api/admin/upload", async(req, res) => {
    uploadMiddleware(req, res, async function error(error) {
        //파일 없을 때
        if(!req.file){
            res.status(500).send('업로드 파일이 없습니다.');
            return;
        }

        if(error){
            res.status(500).send('파일 업로드 실패');
        }else{
            //상품 db
            const BRANCH_IDX = req.body.branchIdx;
            const PRODUCT_NAME = req.body.productName;
            const MANUFACTURER = req.body.manufacturer;
            const PRICE = req.body.price || 0;
            const DISCOUNT_RATE = req.body.discountRate || 0;
            const DISCOUNT_PRICE = req.body.discountPrice || 0;
            const START_DATE = req.body.startDate;
            const END_DATE = req.body.endDate;
            //파일 db 
            const ORIGINAL_NAME = req.file.originalname;
            const MIME_TYPE = req.file.mimetype;
            const PATH = req.file.path;
            const SIZE = req.file.size || 0;
            try{
                const productParameter = {
                    P_PRODUCT_NAME : PRODUCT_NAME,
                    P_MANUFACTURER: MANUFACTURER,
                    P_ORIGINAL_NAME: ORIGINAL_NAME,
                    P_MIME_TYPE : MIME_TYPE,
                    P_PATH : PATH,
                    P_SIZE : SIZE,
                    P_BRANCH_IDX: BRANCH_IDX,
                    P_PRICE : PRICE,
                    P_DISCOUNT_RATE : DISCOUNT_RATE,
                    P_DISCOUNT_PRICE : DISCOUNT_PRICE,
                    P_START_DATE : START_DATE,
                    P_END_DATE : END_DATE
                }

                queryParams = [
                    productParameter['P_PRODUCT_NAME'],
                    productParameter['P_MANUFACTURER'],
                    productParameter['P_ORIGINAL_NAME'],
                    productParameter['P_MIME_TYPE'],
                    productParameter['P_PATH'],
                    productParameter['P_SIZE'],
                    productParameter['P_BRANCH_IDX'],
                    productParameter['P_PRICE'],
                    productParameter['P_DISCOUNT_RATE'],
                    productParameter['P_DISCOUNT_PRICE'],
                    productParameter['P_START_DATE'],
                    productParameter['P_END_DATE'],
                ];
                const result = database.run('CALL INSERT_PRODUCT(?,?,?,?,?,?,?,?,?,?,?,?)', queryParams);
                // if(err){
                //     res.status(500).send('DB PRODUCT INSERT FAIL');
                // }
            
                res.status(200).send(result);
            }catch(error){
                res.status(500).send('DB INSERT FAIL');
            }

            //res.status(200).send('uploaded');
         
        }
    });
    
});

app.get("/api/admin/branch", async(req, res) => {
    const result = await database.run(`SELECT A.IDX, B.NAME, A.BRANCH_NAME FROM branch A JOIN company B ON A.COMPANY_IDX = B.IDX;`);
    console.log(result);
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