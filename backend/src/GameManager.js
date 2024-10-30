import  {Game}  from "../src/Game.js";
import  {INIT_GAME, MESSAGE, MOVE, WON}  from "./messages.js";

// User Game class 
export class GameManager {
 
  games ; // Array to store all games
  pendingUser; 
  users = []; //list of users playing a game

  constructor(){
    this.games = [];
    this.pendingUser = null;
    this.users = [];
    //users,pendingUser can be initialized
  }

  addUser(socket){
    this.users.push(socket);
    this.addHandler(socket) 
  
  }
  removeUser(socket){
   this.users = this.users.filter(user => user !== socket);
   const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
   if(this.pendingUser == socket){
    this.pendingUser = null;
   }
   if(game){
     game.declareWinner(socket);
   }
   //STOP THE GAME BECAUSE USER LEFT

  }

   addHandler(socket){
    socket.on("message",(data) => {
      const message = JSON.parse(data.toString());

      if(message.type === INIT_GAME){

        if(this.pendingUser){
          //START A GAME
          console.log("Game should start");
          const game = new Game(this.pendingUser,socket);

          this.games.push(game);
          this.pendingUser = null;

        }
        else{
          // ADD USER TO PENDING AND MAKE HIM WAIT
          this.pendingUser = socket;
        }

      }

      if(message.type === MOVE){

        // TO FIND SPECIFIC GAME FROM GAMES ARRAY
        const game = this.games.find(game => game.player1 === socket || game.player2 === socket);

        if(game){
          // const move = {
          //   from:"",
          //   to:""
          // }
            game.makeMove(socket,message.payload.move);
        }
      }

      if(message.type === MESSAGE){
        const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
        if(game){
        game.sendMessage(message.payload.chats);
        }

      }
    })

  }


};