//======================================
//Puerto
//======================================
process.env.PORT = process.env.PORT || 3000;


//======================================
//Entorno
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//======================================
//Vencimiento del token
//======================================
process.env.CADUCIDAD_TOKEN = '48h';


//======================================
//Seed
//======================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';



let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/chat';
} else {
    urlDB = process.env.NODE_URL;
}

process.env.URLDB = urlDB;


//======================================
//Google client id
//======================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '541665779791-kf80l6g9jgaf7vci4j87bks8a4r1ha1c.apps.googleusercontent.com';