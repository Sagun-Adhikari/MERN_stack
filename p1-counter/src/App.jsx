import React, { useState } from 'react'

const App = () => {
  const [initial, setinitial] = useState(0);
  function clickinc(){
    setinitial(initial+1)
  }
  function clickdec(){
    setinitial(initial-1)
  }
  return (
    <>
    <h1 className='flex justify-center text-5xl'>project1:COUNTER</h1>
    <div className='text-center bg-gray-100 px-10 mx-150 h-80 my-50'>
      <br /><br />
      <input type="text"  value={initial}/>
      <br /><br /><br /><br /><br />

      <button value="+" onClick={clickinc}>+</button>
      <button value="-" onClick={clickdec}>-</button>
    </div>
      </>
  )
}

export default App