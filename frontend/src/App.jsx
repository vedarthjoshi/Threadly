import { useState } from 'react'
import './App.css'
import Navbar from './componants/Navbar/Navbar'
import ExpandingSearchBarTailwind from './componants/expandingsearchbar/expandingsearchbar'
import Threadlist from './componants/Threadlist/ThreadList'

function App() {

  return (
    <>
      <div>
        <div className="font-virgil w-full h-10  m-auto p-10 text-center mb-30">
          <span className='mt-2 text-9xl'>
            Threadly
          </span>
        </div>

          <div >
            <Navbar/>
          </div>

          <div className=' m-auto  mt-20 ml-auto p-3.5 w-5/6 h-screen '>
            <div className=' flex justify-center'>
              <Threadlist/>
            </div>
          </div>

      </div>
    </>
  )
}

export default App