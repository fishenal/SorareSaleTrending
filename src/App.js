import './App.css';
import { fetchPlayer, fetchCard } from './fetch/fetch.js';
import { useState } from "react";
import { parseETHFormat } from './utils';

const filterOnsaleCards = (cards) => {
  console.log('%c [ cards ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', cards)
  const filtered = cards.filter(item => item.liveSingleSaleOffer);
  console.log('%c [ filtered ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', filtered)
  const result = [];
  let lowestPrice = Infinity;
  let totalPrice = 0;
  filtered.forEach(({ slug, liveSingleSaleOffer: { price, sender, endDate } }) => {
    result.push({
      price: parseETHFormat(price),
      saller: sender?.slug,
      endDate: endDate,
      buyPage: `https://sorare.com/cards/${slug}`,
    });
    if (Number(price) < lowestPrice) {
      lowestPrice = Number(price);
    }
    totalPrice += Number(price);
  });

  return {
    result: result || [],
    lowestPrice: parseETHFormat(lowestPrice),
    avgPrice: parseETHFormat(totalPrice / result.length),
  };
}

function App() {
  const [playerName, setPlayerName] = useState("chukwunonso-madueke");
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerImage, setPlayerImage] = useState(undefined);
  const [gameStatus, setGameStatus] = useState({});
  const [last5, setLast5] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowestPrice, setLowestPrice] = useState('');
  const [avgPrice, setAvgPrice] = useState('');

  const currentSeason = 2021;

  const queryCard = ({ slug, season, maxCardNum }) => {
    if (slug && season && maxCardNum) {
      fetchCard({ slug, season, maxCardNum }).then(({ data }) => {
        if (data && data.cards) {
          const { result, lowestPrice, avgPrice } = filterOnsaleCards(data.cards);
          console.log('%c [ result, lowestPrice, avgPrice ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', result, lowestPrice, avgPrice)
          setOrders(result);
          setAvgPrice(avgPrice);
          setLowestPrice(lowestPrice);
        }
      })
    }

  }

  const queryPlayer = () => {
    fetchPlayer(playerName).then(({ data }) => {
      if (data && data.player) {
        const pData = data.player;
        const playerData = {
          displayName: pData?.displayName,
          age: pData?.age,
          position: pData?.position,
          slug: pData?.slug,
          followers: pData?.subscriptionsCount,
          country: pData?.country?.code,
          club: pData?.activeClub?.name,
        };
        setPlayerImage(pData?.squaredPictureUrl);
        setPlayerInfo(playerData);
        if (Array.isArray(pData.gameStats) && pData.gameStats.length > 0) {
          const lastFive = [];
          const len = pData.gameStats.length;
          let totalMin = 0;
          let totalScore = 0;
          pData.gameStats.forEach(game => {
              let mins = 0;
              let score = 0;
              if (typeof game.minsPlayed === 'number') {
                mins = game.minsPlayed;
              }
              if (game.so5Score && typeof game.so5Score.score === 'number') {
                score = game.so5Score.score;
              }
              totalMin += mins;
              totalScore += score;
              lastFive.push({
                mins,
                score,
              });
          });

          const gameStatus = {
            avgMinsPlayed: (totalMin / len).toFixed(2),
            avgScore: (totalScore / len).toFixed(2),
          };
          console.log('%c [ gameStatus ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', gameStatus)
          setGameStatus(gameStatus);
          setLast5(lastFive);

          // find currentSeason
          if (pData.cardSupply) {
            const currentSeasonInfo = pData.cardSupply.find(item => item.season && item.season.startYear === currentSeason);
            if (currentSeasonInfo && typeof currentSeasonInfo.limited === 'number') {
              console.log('%c [ currentSeasonInfo ]-75', 'font-size:13px; background:pink; color:#bf2c9f;', currentSeasonInfo)
              queryCard({
                slug: pData?.slug,
                season: currentSeason,
                maxCardNum: currentSeasonInfo.limited
              })
            }
          }
        }
      }
    })
  }

  return (
    <div className="App">
      <header className="w-full border-b">
        <h1 className="text-lg text-left p-2 font-bold">Sorare Sale Trending</h1>
      </header>
      <main className="w-full p-5">
        <div className="grid grid-cols-5 my-2.5">
          <span className="my-2.5 col-span-2" >
            <p>Player url path: </p>
            <p className="text-sm text-orange-500">"chukwunonso-madueke" in https://sorare.com/players/chukwunonso-madueke</p>
          </span>
          <span className="col-span-2">
            <input
            className="px-5 py-2.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => setPlayerName(e.target.value)}
            value={playerName}/>
          </span>
          <span>
            <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
            onClick={queryPlayer}
            >Search</button>
          </span>
        </div>
        <div className="flex justify-center p-2">
          {
            playerImage && <img className="w-64 ring-2" src={playerImage} alt={playerName}/>
          }
        </div>
        <h2 className="text-left my-2 font-bold">Price: <span className="text-sm text-orange-500">! Only check Last 100 supply cards for now !</span></h2>
        <table className="border-collapse border border-slate-400 table-auto w-full">
          <tr>
            <th className="border border-slate-300 bg-slate-100">Lowest sale card price:</th>
            <td className="border border-slate-300"><span className="text-left text-rose-600 font-bold text-lg">{`${lowestPrice}ETH`}</span></td>
          </tr>
          <tr>
            <th className="border border-slate-300 bg-slate-100">Average sale card price:</th>
            <td className="border border-slate-300"><span className="text-left text-fuchsia-500 font-bold text-lg">{`${avgPrice}ETH`}</span></td>
          </tr>
        </table>
        <h2 className="text-left my-2 font-bold">Active Orders: <span className="text-sm text-orange-500">! Only Last 100 supply cards !</span></h2>

        <table className="border-collapse border border-slate-400 table-auto w-full">
          <thead>
            <th className="border border-slate-300 bg-slate-100 py-1 px-2">Price</th>
            <th className="border border-slate-300 bg-slate-100 py-1 px-2">Saller</th>
            <th className="border border-slate-300 bg-slate-100 py-1 px-2">EndDate</th>
            <th className="border border-slate-300 bg-slate-100 py-1 px-2">BuyPage</th>
          </thead>
          <tbody>
          {
            orders.map(({price, saller, endDate, buyPage}, idx) => {
              return <tr>
                <td className="border border-slate-300 py-1 px-2">{`${price}ETH`}</td>
                <td className="border border-slate-300 py-1 px-2">{saller}</td>
                <td className="border border-slate-300 py-1 px-2">{endDate}</td>
                <td className="border border-slate-300 py-1 px-2">
                  <a href={buyPage} target="_blank" className="text-lime-600 underline" rel="noreferrer">To Buy!</a>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>

        <h2 className="text-left my-2 font-bold">Game Status:</h2>
        <table className="border-collapse border border-slate-400 table-auto w-full">
          {
            Object.keys(gameStatus).map((k) => {
              return <tr>
                <th className="border border-slate-300 bg-slate-100 py-1 px-2">{`${k}:`}</th>
                <td className="border border-slate-300 py-1 px-2">{gameStatus[k]}</td>
              </tr>
            })
          }
          <tr>
              <th className="border border-slate-300 bg-slate-100 py-1 px-2" colSpan="2">Last 5 Detail: </th>
          </tr>
          {
            last5.map(({mins, score}, idx) => {
              return <tr>
                <th className="border border-slate-300 bg-slate-100 py-1 px-2">Game {idx + 1}</th>
                <td className="border border-slate-300 py-1 px-2">{`mins: ${mins}, score: ${score}`}</td>
              </tr>
            })
          }
        </table>
        <h2 className="text-left my-2 font-bold">Player Info:</h2>
        <table className="border-collapse border border-slate-400 table-auto w-full">
          {
            Object.keys(playerInfo).map((k) => {
              return <tr>
                <th className="border border-slate-300 bg-slate-100 py-1 px-2">{`${k}:`}</th>
                <td className="border border-slate-300 py-1 px-2">{playerInfo[k]}</td>
              </tr>
            })
          }
        </table>
      </main>
    </div>
  );
}

export default App;
