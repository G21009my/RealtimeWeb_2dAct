import express from "express";
import http from "http";
import * as socketio from "socket.io";
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);
const PORT = process.env.PORT || 8080;
import fs from "fs";
app.use(express.static("public"));
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┣━┳━━━━━━━━━━━━━━━━━━━━━━┛
 * ┣━┫ ゲーム空間を構成する中立実体の宣言と初期化
 * ┣━┫ マップや共有オブジェクト etc
 * ┣┳╋┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┓*/
// マップデータ全体の読み込み
const worldData = JSON.parse(fs.readFileSync('./mapObj.json', 'utf8'));
// ゲーム空間の大きさの読み込み
let worldWidth = worldData['mapSize']['width'];
let worldHeight = worldData['mapSize']['height'];
// 地形データの読み込み
let mapBlockArray = [];
for (const key in worldData["mapBlock"]) {
    mapBlockArray[key] = worldData['mapBlock'][key];
}
// 共有オブジェクトの座標
let shareBallCoor = worldData["ball"];
/* ┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┛
 * △▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼ */
/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┣━┳━━━━━━━━━━━━━━━━━━━━━━┛
 * ┣━┫ チューニングパラメータの設定
 * ┣┳╋┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┓*/
// チューニングパラメータ一覧の読み込み
const tuning = JSON.parse(fs.readFileSync('./tuningParameter.json', 'utf8'));
// ゲームの基本設定
const fps = tuning['basicInfoGame']['fps'];
const signalInter = tuning['basicInfoGame']['signalFrequency'];
const roundTime = tuning['basicInfoGame']['roundTime'];
const logPermit = tuning['basicInfoGame']['logPermit'];
const predictFlag = tuning['predict']['drFlag'];
// 各種法則の動作フラグ
const gravityExis = tuning['gravity']['exis']; // 重力の有無
const thrustExis = tuning['thrust']['exis']; // 加速力の有無
const jumpExis = tuning['jump']['exis']; // ジャンプの有無
const resistExis = tuning['resist']['exis']; // 抵抗の有無
// 各種法則の初期化
// 基本的なゲーム空間の要件
let thrustFlag = true;
let gravityFlag = true;
/* ┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┛
 * △▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼ */
let logArray = [];
// ルームの制限人数
const inTheRoom = 2;
/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┣━┳━━━━━━━━━━━━━━━━━━━━━━┛
 * ┣━┫ socket空間
 * ┣┳╋┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┓*/
const game = io.sockets.on("connection", (socket) => {
    // socket 空間内での変数定義
    const socketId = socket.id;
    console.log(`[connect] socketId: ${socketId}`);
    let clientId = '';
    let roomId = '';
    let pNum = 0;
    let avatarInfo = {
        'x': 0,
        'y': 0,
        'obj': {}
    };
    socket.on('join_to_room', function (id) {
        roomId = id;
        socket.join(roomId);
        let roomArray = game.adapter.rooms.get(id).size;
        if (roomArray <= inTheRoom) {
            pNum = roomArray;
            io.sockets.to(socketId).emit('deciRoom', socketId, pNum);
        }
        else {
            io.sockets.to(socketId).emit("no_vacancy");
        }
    });
});
/* ┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┛
 * △▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼ */
/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┣━┳━━━━━━━━━━━━━━━━━━━━━━┛
 * ┣━┫
 * ┣┳╋┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┓*/
/* ┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┛
 * △▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼ */ 
//# sourceMappingURL=server.js.map