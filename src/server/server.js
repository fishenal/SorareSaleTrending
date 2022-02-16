const Koa = require('koa');
const app = new Koa();
const axios = require('axios');

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

app.use(async ctx => {
    const sorareUrl = 'https://api.sorare.com/graphql';
    const testBody = {"operationName":"CardsQuery","variables":{"singleCardSlugs":["erling-haland-2021-limited-1","ugurcan-cakir-2021-limited-101","ugurcan-cakir-2021-limited-102","ugurcan-cakir-2021-limited-103","ugurcan-cakir-2021-limited-104", "ugurcan-cakir-2021-limited-106", "ugurcan-cakir-2021-limited-1067"],"bundledCardSlugs":[]},"extensions":{"operationId":"React/770b7014bd2cf0dd747b4edd323b766d69f03c225c3a75b0d413dcf606f4bbcd"}};
    const res = await axios({
        method: 'post',
        url: sorareUrl,
        data: testBody,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(res.data.data)
    ctx.body = res.data.data;
});

app.listen(3001);