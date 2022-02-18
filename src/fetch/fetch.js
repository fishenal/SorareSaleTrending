import axios from 'axios';

export const fetchPlayer = async (playerName) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/playerQuery',
        params: {
          playerName
        }
    })
}

export const fetchCard = async ({ slug, season, maxCardNum }) => {
  console.log('%c [ fetchCard: slug, season, maxCardNum ]-14', 'font-size:13px; background:pink; color:#bf2c9f;', slug, season, maxCardNum)
  return axios({
      method: 'get',
      url: 'http://localhost:3001/cardQuery',
      params: {
        slug, season, maxCardNum
      }
  })
}
