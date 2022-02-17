const Koa = require('koa');
const app = new Koa();
const axios = require('axios');

const sorareUrl = 'https://api.sorare.com/graphql';
const cardsQueryOperationId = 'React/770b7014bd2cf0dd747b4edd323b766d69f03c225c3a75b0d413dcf606f4bbcd';
const playerQueryOperationId = 'React/21bf1017b898a2e81f8e5abc62ab780b39c8577d4cd1b8dacb3d27c3114371a0';
const testBody = {"operationName":"CardsQuery","variables":{"singleCardSlugs":["erling-haland-2021-limited-1","ugurcan-cakir-2021-limited-101","ugurcan-cakir-2021-limited-102","ugurcan-cakir-2021-limited-103","ugurcan-cakir-2021-limited-104", "ugurcan-cakir-2021-limited-106", "ugurcan-cakir-2021-limited-1067"],"bundledCardSlugs":[]},"extensions":{"operationId":"React/770b7014bd2cf0dd747b4edd323b766d69f03c225c3a75b0d413dcf606f4bbcd"}};

const fetchPlayer = async ({ playerName }) => {
    return await axios({
        method: 'post',
        url: sorareUrl,
        data: {
            operationName: 'playerQuery',
            variables: {
                slug: playerName
            },
            extensions: {
                operationId: playerQueryOperationId,
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const fetchCards = async ({ playerName, season, cardSupply }) => {
    return await axios({
        method: 'post',
        url: sorareUrl,
        data: {
            operationName: 'CardsQuery',

        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    const query = ctx.request.query;
    const url = ctx.request.url;
    let res = null;
    if (url.indexOf('/playerQuery') === 0) {
        if (query.playerName) {
            res = await fetchPlayer({ playerName: query.playerName});
            console.log(res.data);
        }
    }

    if (url.indexOf('/cardQuery') === 0) {
        res = await fetchCards();
    }
    console.log(res.data)
    if (res && res.data && res.data.data) {
        ctx.body = res.data.data;
    }

});

app.listen(3001);