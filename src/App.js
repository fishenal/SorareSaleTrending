import './App.css';
import { fetchPlayer } from './fetch/fetch.js';
import { useState } from "react";

function App() {
  const [playerName, setPlayerName] = useState("");

  const queryPlayer = () => {
    fetchPlayer(playerName)
  }

  return (
    <div className="App">
      <header className="w-full border-b">
        <h1 className="text-lg text-left p-2 font-bold">Sorare Sale Trending</h1>
      </header>
      <main className="w-full p-5">
        <div className="grid grid-cols-4 my-2.5">
          <span className="my-2.5">Player name:</span>
          <span className="col-span-2">
            <input
            className="px-5 py-2.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => setPlayerName(e.target.value)}/>
          </span>
          <span>
            <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
            onClick={queryPlayer}
            >Search</button>
          </span>
        </div>
        <div className="grid grid-cols-3 my-2.5">
          <span className="my-2.5">Lowest sale card price:</span>
          <span className="col-span-2 text-left my-2.5">
            <span className="text-left text-rose-600 font-bold text-lg">0.10ETH</span>
          </span>
        </div>
        <div className="grid grid-cols-3 my-2.5">
          <span className="my-2.5">Average sale card price:</span>
          <span className="col-span-2 text-left my-2.5">
            <span className="text-left text-fuchsia-500 font-bold text-lg">0.30ETH</span>
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
