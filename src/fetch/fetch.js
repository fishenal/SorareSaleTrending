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
