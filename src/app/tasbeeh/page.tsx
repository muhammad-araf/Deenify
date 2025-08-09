"use client"
import React, { useState } from 'react'
const Page = () => {
    const[count,setCount] = useState("99")
    const[Value,setValue] = useState(0);
    const[show ,setShow] = useState(false)
  return (
<div className="min-h-screen w-full bg-gradient-to-b from-[#11182700] to-[#132d24] text-white flex flex-col items-center p-6">
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
<h1 className='text-2xl mb-4'>Set Value</h1>
<div>
  <input
    type="number"
    className="bg-transparent border-2 border-green-500 p-2 rounded-4xl text-xl text-emerald-50"
    value={Value}
    onChange={(e) => setValue(Number(e.target.value))}
  />
  <button
    className="p-2 rounded-4xl text-1xl select-none cursor-pointer bg-transparent border border-amber-50 ml-4"
    onClick={() => {
      setCount((Value).toString());
    }}
  >
    ✅
  </button>
  </div>
</>

    ):null
  }
</div>

  )
}

export default Page