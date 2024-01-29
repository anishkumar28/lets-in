import React from "react";

function Dashboard(){
   return(
     <div className="bg-blue-400 flex flex-wrap max-w-fit m-0">
      <div className="bg-white flex flex-col flex-nowrap gap-4">
        
      <div className="m-5 border-solid border-2 border-slate-300 gap-4">
      <div className=" flex felx-row flex-nowrap bg-gray-100 justify-center">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Wishlist</h1>
          <button
            type="button"
            class="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div>
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

      <div className="bg-white flex flex-col flex-nowrap gap-4">
        
      <div className="m-5 border-solid border-2 border-slate-300">
      <div className=" flex felx-row bg-gray-100 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Applied</h1>
          <button
            type="button"
            class="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
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

      <div className="bg-white flex flex-col flex-nowrap gap-4">
        
      <div className="m-5 border-solid border-2 border-slate-300">
      <div className=" flex felx-row bg-gray-100 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Interview</h1>
          <button
            type="button"
            class="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
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

      <div className="bg-white flex flex-col flex-nowrap gap-4">
        
      <div className="m-5 border-solid border-2 border-slate-300">
      <div className=" flex felx-row bg-gray-100 justify-center">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Offer</h1>
          <button
            type="button"
            class="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
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

      <div className="bg-white flex flex-col flex-nowrap gap-4">
        
      <div className="m-5 border-solid border-2 border-slate-300">
      <div className=" flex felx-row bg-gray-100 justify-center justify-">
          <h1 className="pl-4 pr-4 justify-center text-2xl">Rejected</h1>
          <button
            type="button"
            class="rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
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
   );
   
}

export default Dashboard;