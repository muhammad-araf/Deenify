"use client"
import React, { useState } from 'react'
const Page = () => {
    const[count,setCount] = useState("0")
    const[Value,setValue] = useState(0);
    const[show ,setShow] = useState(false)
  return (
<div className="min-h-screen w-full bg-gradient-to-b from-[#11182700] to-[#132d24] text-white flex flex-col items-center p-6 mt-25 lg:mt-8">
    <div
    onClick={() => setCount((parseInt(count) + 1).toString())}
    className=' w-full h-[90hv] text-white flex flex-col items-center p-6 pb-30'
    >
  <div
    className={`mt-30 pl-15 pr-15 pt-10 pb-10 rounded-full cursor-pointer text-8xl transition-all duration-300 select-none w-auto
      ${count.endsWith("00") ? "border-9 border-green-500" : count.endsWith("0")? "border-9 border-white":"border-9 border-transparent"}`
    }
  >
    <strong>{count}</strong>
  </div>
  </div>


  <div className='mt-25 space-x-3'>
  <button 
  className='p-4 bg-transparent rounded-4xl text-4xl  select-none cursor-pointer'
    onClick={() => {
        if(count === "0") return
        setCount((parseInt(count) - 1).toString())
    }
    }
  >―</button>
  <button 
  className='p-4 bg-transparent rounded-4xl text-4xl  select-none cursor-pointer'
    onClick={() => setCount((0).toString())}
  >⟳</button>
  <button 
  className='p-4 bg-transparent rounded-4xl text-4xl  select-none cursor-pointer'
    onClick={() => setShow(!show)}
  >⚙️</button>
  </div>
  {
    show?(
<>
<div className="w-full flex flex-col justify-center items-center gap-3">
  <input
    type="number"
    className="bg-white/5 border border-green-500/40 px-4 py-3 rounded-full text-lg text-emerald-50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder:text-emerald-200/50 shadow-sm"
    placeholder="Enter number"
    value={Value}
    onChange={(e) => setValue(Number(e.target.value))}
  />
  
  <button
    className="px-6 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 transition-all shadow-md hover:shadow-lg active:scale-95"
    onClick={() => {
        setShow(false)
        setCount(Value.toString())
    }}
  >
    Done
  </button>
</div>

</>

    ):null
  }
</div>

  )
}

export default Page