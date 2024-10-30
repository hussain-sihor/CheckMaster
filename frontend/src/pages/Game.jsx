import React, { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { Chess } from "chess.js";
import ChessBoard from "../../components/ChessBoard";
import ChatBox from "../../components/ChatBox";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const WON = "won";
export const OPPTURN = "oppturn";
export const INVALID = "invalid";
export const MESSAGE = "message";

const Game = () => {
	const [gameStarted, setGameStarted] = useState(false);
	const [winner, setWinner] = useState(false);
	const [pairing, setPairing] = useState(false);

	const socket = useSocket();
	const [chess, setChess] = useState(new Chess());
	const [board, setBoard] = useState(chess.board());
	const [color, setColor] = useState("");
  const [turn,setTurn] = useState(false);
	const[invalidMove,setInvalidMove] = useState(false);
	// let color = "Black";

	const playerWon = () => {
		setWinner(true);
	};


	const updateChats = (message) =>{
  let myList = [...chats];
	myList.push(message);

   if(!chats){return}
	socket.send(JSON.stringify({
		type:MESSAGE,
		payload :{
			chats:myList,
		}
	}))
	}


	useEffect(() => {
		if (!socket) {
			return;
		}

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log("mess",message);

			switch (message.type) {

				case INIT_GAME:
					setPairing(false);
					setBoard(chess.board());
					let colo = message.payload.color.toUpperCase();

          if(colo == "WHITE" || colo == "white"){
						const myturn = true;
            setTurn(myturn);
          }
					setColor(colo);
					break;

       case OPPTURN:
				let myturn = false;
        setTurn(myturn);
				break;

				case MOVE:
					setInvalidMove(false);
					const move = message.payload;
					chess.move(move);
					setBoard(chess.board());
          const myturn2 = true;
					setTurn(myturn2);
					break;

      case INVALID:
				console.log("inside invalid");
				setInvalidMove(true);
				console.log(message);
				break;

				case GAME_OVER:
					console.log("Game Over");
					break;
      
			case MESSAGE:
				console.log("chitti ayi hai");
				console.log(message);
				setChats(message.payload.chats);
				break;


				case WON:
					console.log("Won...");
					playerWon();
			


				}
		};
	}, [socket]);

	const [chats,setChats]=useState([])
	return (
		<div className="justify-center flex h-screen bg-black">

			<div className="pt-8  w-full">

				<div className="grid grid-cols-6 w-full h-full">


					<div className="col-span-4  w-[80%]  flex justify-center h-full  items-start ">
						<ChessBoard
						 turn = {turn}
							board={board}
							socket={socket}
							setBoard={setBoard}
							chess={chess}
						/>
					</div>

					<div className="col-span-2 w-full flex justify-start items-start flex-col  h-full">

						<div className="w-[80%] h-full bg-[#70a2a3] flex justify-between rounded-xl border-slate-500 border-4 items-center flex-col shadow-lg shadow-slate-800">

							<div className="w-full h-[60%]  flex justify-center items-center flex-col gap-8 ">
								{!gameStarted && (
									<button
										className="w-[70%] pt-4 pb-4  text-xl font-bold bg-[#b1e4b8] rounded-xl  border-4 border-slate-500 shadow-xl  text-black"
										onClick={() => {
											setGameStarted(true);
											setPairing(true);
											socket.send(
												JSON.stringify({
													type: INIT_GAME,
												})
											);
										}}
									>
										Find Opponent
									</button>
								)}

								{pairing && (
									<button className="w-[70%] pt-4 pb-4  text-xl font-bold cursor-default rounded-xl  border-4 border-slate-500 shadow-xl  text-black">
										Searching for Opponent...
									</button>
								)}

								{gameStarted && !pairing && !winner && (
									<div className="w-full h-[13%] flex justify-center items-center text-black font-semibold text-2xl">
										<h1>
											You are playing as{" "}
											<span className="font-bold font-happ2">{color}</span>
										</h1>
									</div>
								)}
								{winner && (
									<div className="text-white w-[70%] h-[22%] bg-gradient-to-b from-blue-500 to-purple-500 flex justify-center items-center shadow-xl rounded-lg text-4xl font-won tex tracking-widest border-white border-2">
										YOU WON 🏆
									</div>
								)}

								{!winner && turn && (<div className="text-white w-[70%] h-[18%]  flex justify-center items-center shadow-xl rounded-lg text-xl border-white border-2 cursor-default font-semibold bg-green-500">
										Your Turn !!!
									</div>)
								}
								{invalidMove && turn && (<div className="text-white bg-red-500 w-[70%] h-[18%]  flex justify-center items-center shadow-xl rounded-lg text-xl border-white border-2 cursor-default font-semibold">
										Invalid Move ...
									</div>)
								}
								
							</div>

							<div className="w-full h-[40%] flex">
							<ChatBox chats={chats} gameStarted={gameStarted} updateChats={updateChats}/>
						</div>

						</div>


						<div className="w-[80%] h-[8%] flex justify-center items-center text-white font-semibold text-lg">
								<h1>
									Design & Developed by{" "}
									<span className="text-[#b1e4b8] text-xl">Hussain</span>
								</h1>
							
							</div>
						

					</div>

				
				</div>
			</div>
		</div>
	);
};

export default Game;
