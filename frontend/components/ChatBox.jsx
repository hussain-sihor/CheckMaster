import React, { useEffect, useState } from 'react'

const ChatBox = ({chats,updateChats,gameStarted}) => {

  useEffect(()=>{
   
    setChatList(chats);

  },[chats])


  const [message,setMessage] = useState("");
  const [chatList,setChatList]=useState([]);

  return (
    <div className='w-full h-full flex justify-center items-center flex-col border-t-4 border-slate-500 rounded-b-xl bg-[#b1e4b8]'>

      {gameStarted && <div className="w-full h-[80%] flex justify-start items-start  flex-col gap-2 overflow-y-scroll pl-2 scrollbar-hidden pb-2 pt-2">

        {chatList.map((chat,i)=> <div key={i} className=" h-[30px] flex bg-white pl-2 pr-2 rounded-md justify-center items-center">
							{chat}
						</div>)}
      </div>}

      {!gameStarted && <div className="w-full h-[80%] flex justify-center items-center  text-lg font-bold">
       <h1>Start the match to chat with your opponent!</h1>
      </div>}





      <div className="w-full h-[20%] flex justify-between items-center pl-4 pr-4 bg-[#b1e4b8] rounded-b-xl border-t-2 border-slate-500">

        <input type="text" placeholder='Enter your text' value={message} className='w-[80%] pl-2 pt-[4px] pb-[4px] rounded-md border-slate-500 border-2'onChange={(e)=>setMessage(e.target.value)}/>

        <button type='button' className='pl-2 pr-[8px] bg-[#70a2a3] rounded-lg pt-[4px] pb-[4px] flex justify-center items-center border-slate-500 border-2' onClick={()=>{
          updateChats(message);
          setMessage("");
        }}>Send</button>
      </div>
    </div>
  )
}

export default ChatBox
