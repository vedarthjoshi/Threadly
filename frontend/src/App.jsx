import { useState } from 'react'
import './App.css'
import Navbar from './componants/Navbar/Navbar'
import ExpandingSearchBarTailwind from './componants/expandingsearchbar/expandingsearchbar'
import Search from './componants/search/search'

function App() {

  return (
    <>
      <div>
        <div className="font-virgil w-full h-40  m-auto p-20 text-center ">
          <span className='mt-5 text-7xl'>
            Threadly
          </span>
        </div>

          <div >
            <Navbar/>
          </div>

          <div className=' m-auto mt-20 p-3.5 w-5/6 h-screen '>
            <div className='font-virgil flex  justify-center  text-5xl p-5'>
              <div className="border-b-4 border-0 border-black">
                <ExpandingSearchBarTailwind />
              </div>
            </div>

            <div>
              <Search/>
            </div>
          </div>

      </div>
    </>
  )
}

export default App