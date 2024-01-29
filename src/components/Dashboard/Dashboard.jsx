import React from "react";
import AddButton from "../../assets/AddButton";

function Dashboard(){
   return(
    <div className="shrink w-full h-full">
     <div className="bg-blue-400 flex flex-wrap w-100 m-0">
      <div className="bg-white flex flex-col flex-nowrap mt-2">
        
      <div className="m-5">
      <div className=" flex felx-row flex-nowrap bg-gray-200 justify-center">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Wishlist</h1>
          <button
            type="button"
            className="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-500/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        
          >
            <AddButton />
          </button>
        </div>
        <div className="border-solid border-2 border-slate-300">
        <div id="list" className="bg-green-600 h-14 m-2 rounded-lg">
          List item 1
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 2
        </div>
        <div id="list" className="bg-yellow-600 h-14 m-2 rounded-lg" >
          List item 3
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 4
        </div>
        </div>
      </div>
      </div>

      <div className="bg-white flex flex-col flex-nowrap mt-2">
        
      <div className="m-5">
      <div className=" flex felx-row bg-gray-200 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Applied</h1>
          <button
            type="button"
            className="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        
          >
            <AddButton />
          </button>
        </div>
        <div className="border-solid border-2 border-slate-300">
        <div id="list" className="bg-green-600 h-14 m-2 rounded-lg">
          List item 1
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 2
        </div>
        <div id="list" className="bg-yellow-600 h-14 m-2 rounded-lg" >
          List item 3
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 4
        </div>
        </div>
      </div>
      </div>

      <div className="bg-white flex flex-col flex-nowrap mt-2">
        
      <div className="m-5">
      <div className=" flex felx-row bg-gray-200 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Interview</h1>
          <button
            type="button"
            className="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        
          >
            <AddButton />
          </button>
        </div>
        <div className="border-solid border-2 border-slate-300">
        <div id="list" className="bg-green-600 h-14 m-2 rounded-lg">
          List item 1
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 2
        </div>
        <div id="list" className="bg-yellow-600 h-14 m-2 rounded-lg" >
          List item 3
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 4
        </div>
        </div>
      </div>
      </div>

      <div className="bg-white flex flex-col flex-nowrap mt-2">
        
      <div className="m-5">
      <div className=" flex felx-row bg-gray-200 justify-center">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Offer</h1>
          <button
            type="button"
            className="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        
          >
            <AddButton />
          </button>
        </div>
        <div className="border-solid border-2 border-slate-300">
        <div id="list" className="bg-green-600 h-14 m-2 rounded-lg">
          List item 1
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 2
        </div>
        <div id="list" className="bg-yellow-600 h-14 m-2 rounded-lg" >
          List item 3
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 4
        </div>
        </div>
      </div>
      </div>

      <div className="bg-white flex flex-col flex-nowrap mt-2">
        
      <div className="m-5">
      <div className=" flex felx-row bg-gray-200 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Rejected</h1>
          <button
            type="button"
            className="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        
          >
            <AddButton />
          </button>
        </div>
        <div className="border-solid border-2 border-slate-300">
        <div id="list" className="bg-green-600 h-14 m-2 rounded-lg">
          List item 1
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 2
        </div>
        <div id="list" className="bg-yellow-600 h-14 m-2 rounded-lg" >
          List item 3
        </div>
        <div id="list" className="bg-red-600 h-14 m-2 rounded-lg" >
          List item 4
        </div>
        </div>
      </div>
      </div>

     </div>
     </div>
   );
   
}

export default Dashboard;