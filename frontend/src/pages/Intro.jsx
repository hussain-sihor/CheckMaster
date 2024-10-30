import React from 'react'
import IntroImg from '../assets/images/intro.png';
import { FaChess } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Intro = () => {

  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex bg-[url('assets/images/bg_1.webp')]
     bg-left bg-cover " >

       
      <div className="w-[55%] h-screen  flex justify-center items-center">
        <img src={IntroImg} alt="" className='w-[500px] h-[500px] border-4 shadow-xl shadow-white border-gray-200 rounded-md'/>
      </div>

      <div className="w-[45%] h-screen  flex pt-[15%] flex-col gap-[20px]">

        <div className=" h-[15%] bg-[#70a2a3] bg-opacity-70 flex justify-center items-center rounded-lg shadow-lg w-[70%] border-2 border-white">

        <h1 className='text-[55px] font-bold text-white font-happ tracking-widest p-4'>CheckMaster</h1>
        </div>

      <div className="w-[70%] flex justify-center items-start flex-col gap-7 bg-[#70a2a3] p-4 rounded-xl border-4 border-white">
        
      <div className="w-full flex justify-center items-start bg-[#70a2a3] rounded-lg flex-col">
          
         <h1 className='text-xl font-bold text-white'><span className='text-2xl font-happ2 text-white'>Conquer the Board</span> with <span className='text-2xl font-happ2 text-white'>CheckMaster</span><br/></h1>
         
         <h1 className='text-xl font-bold text-white mt-1'>Play, Learn, and Challenge at Our Chess Haven!</h1>
          </div>

        <button className='flex justify-center items-center pl-4 pr-4 pt-2 pb-2 bg-[#b1e4b8] text-black w-[50%] rounded-xl text-2xl font-happ border-4 border-slate-500 shadow-lg  hover:bg-gray-400 hover:text-black hover:border-stone-700 gap-3' onClick={()=>{navigate("./game")}}><FaChess className='text-2xl'/>Play Online</button>

     
      </div>





      </div>
    </div>
  )
}

export default Intro
