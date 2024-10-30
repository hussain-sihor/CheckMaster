
import {Chess} from 'chess.js';
import { GAME_OVER, INIT_GAME, INVALID, MESSAGE, MOVE, OPPTURN, WON } from './messages.js';
export class Game{
  player1 = null;
  player2 = null;
  board;   //BOARD CAN BE IN 2D ARRAY OR IT CAN BE REPRESENTED AS A STRING
  startTime = null;
  moveCount = 0;
   
  constructor(player1, player2, ){
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    console.log("Game should start2");
    this.player1.send(JSON.stringify({
      type:INIT_GAME,
      payload:{
        color:"white"
      }
    }));

    this.player2.send(JSON.stringify({
      type:INIT_GAME,
      payload:{
        color:"black"
      }
    }));

  }

// move = {from:"",to:"" }
  makeMove(socket,move){

  //IS USERS MOVE ?
  if(this.moveCount % 2 === 0 && socket !== this.player1){
    return;
  }
  if(this.moveCount % 2 === 1 && socket !== this.player2){
    return;
  }

  //IS MOVE VALID ?
  try{
    this.board.move(move); //UPDATE BOARD 
  }catch(e){
    // console.log("under try catch");
    // console.log(e);
    socket.send(JSON.stringify({
      type:INVALID,
      payload:move,
    }))
    return;
  }
  //CHECK IF WIN
  //TODO GameOver fun
  if(this.board.isGameOver()){
 
   this.player1.emit(JSON.stringify({
    type: GAME_OVER,
    payload:{
      winner:this.board.turn() =="w" ? "black":"white"
    }
   }))

   this.player2.emit(JSON.stringify({
    type: GAME_OVER,
    payload:{
      winner:this.board.turn() =="w" ? "black":"white"
    }
   }))

  }

  //SEND UPDATED BOARD
  if(this.moveCount % 2 === 0){
    this.player2.send(JSON.stringify({
      type: MOVE,
      payload:move,
     }))
    this.player1.send(JSON.stringify({
      type: OPPTURN,
     }))
  }
  else{
    this.player1.send(JSON.stringify({
      type: MOVE,
      payload:move,
     }))
    this.player2.send(JSON.stringify({
      type: OPPTURN,
     }))
  }
  
  this.moveCount++;
  }
  
  declareWinner(socket){
    console.log("inside winner fun");
    if(socket == this.player1){
      this.player2.send(JSON.stringify({
        type:WON,
        payload:{
         winner:true
        }
      }));

    
    }
  else if(socket == this.player2){ 
   this.player1.send(JSON.stringify({
    type:WON,
    payload:{
     winner:true
    }
  }));
  }
  }

  sendMessage(chats){

      console.log("Message sending...");
      this.player1.send(JSON.stringify({
        type:MESSAGE,
        payload:{
          chats
        }
      }))

      this.player2.send(JSON.stringify({
        type:MESSAGE,
        payload:{
          chats
        }
      }))
    
  }

}

