import { useState } from 'react'

import CameraView from './components/CameraView'
import WasteChart from './components/WasteChart'

function App() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full py-20 px-4 mb-12 border-b border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-b-[40px] shadow-2xl overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-emerald-500/20 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-20 flex flex-col justify-center items-center text-center">
               <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg mb-6">
                  Waste Detection AI
               </h1>
               <p className="subtitle text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                 Advanced Semantic Waste Classification & Analytics
               </p>
          </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center gap-8 md:gap-12 pb-24">
        
        {/* Main Interface */}
        <CameraView />

        {/* Analytics Section */}
        <div className="w-full max-w-5xl flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></span>
                Live Analytics
                <span className="w-8 h-1 bg-gradient-to-l from-emerald-500 to-cyan-500 rounded-full"></span>
            </h2>
            <p className="text-slate-400 mb-6">Real-time waste segregation data</p>
            <WasteChart />
        </div>

      </div>
    </>
  )
}

export default App
