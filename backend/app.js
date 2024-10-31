import { WebSocketServer } from 'ws';
import {GameManager}  from './src/GameManager.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: port });

const gameManger = new GameManager();

wss.on('connection', function connection(ws) {
  gameManger.addUser(ws);


  ws.on('close',()=>{
    gameManger.removeUser(ws);
  })
});