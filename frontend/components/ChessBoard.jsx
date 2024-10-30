import React, { useState } from 'react'

const ChessBoard = ({board, socket , setBoard ,chess,turn}) => {


 const [from, setFrom] = useState(null);


  return <div className="text-white-200 border-4 border-white shadow-xl bg-white">
     

     {board.map((row,i) => {
      
      return <div key={i} className='flex '>
          {row.map((square,j) =>{
            const squareBlock = String.fromCharCode(97 + (j % 8) ) +""
            +(8 - i)
            return <div key={j}
            onClick={()=>{
              console.log("onclicked");
              if(turn == false){return}
              console.log("passed return");
              if(!from){
                setFrom(squareBlock);
                console.log("From noted")
              }
              else{
                console.log("To noted")
                socket.send(JSON.stringify({
                  type:"move",
                  payload :{
                    move:{
                      from,
                      to:squareBlock
                    }
                  }
                }))
               console.log({
                from:from,
                to:squareBlock
               })
                setFrom(null);
                chess.move({
                  from,
                  to:squareBlock
                });
                setBoard(chess.board());
              }
            }}
            className={`w-[80px] h-[80px] ${(i+j)%2 == 0 ? 'bg-[#b1e4b8]' : 'bg-[#70a2a3]'}`}>
             
              <div className="flex justify-center items-center h-full text-xl font-bold">
    
              {/* {square ? square.type : ""} */}
              {square &&  
              <img className="w-14 h-14" 
              src={`${square.color ==="b" ? 
                `b${square.type}.png` : `w${square.type}.png`  }`} 
              ></img>}
              </div>

            </div>

          })}
      </div>

     })}



        </div> 
}

export default ChessBoard

