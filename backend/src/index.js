import { WebSocketServer } from 'ws';
import {GameManager}  from '../src/GameManager.js';

const wss = new WebSocketServer({ port: 8080 });

const gameManger = new GameManager();

wss.on('connection', function connection(ws) {
  gameManger.addUser(ws);


  ws.on('close',()=>{
    gameManger.removeUser(ws);
  })
});