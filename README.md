# SorareSaleTrending
A website to check sorare players info, cards info, order infos.

# Screenshot
![alt screenshot](https://github.com/fishenal/SorareSaleTrending/blob/main/demoImages/demo1.jpg?raw=true)

# Start project
```
npm install
npm run start

// in another terminal
npm run server
```

visit http://localhost:3000/

# Dependencies
React, nodejs

# Theory
Sorare Graphql API currently open without authorization(only a getable operationId), I make a nodejs(Koa) middleware to fetch datas from sorare.com. Then get them from a front-end site, and combine datas, and fine display on website UI(tailwind.css).

# Issues
- Can't get available card list. sorare.com seems using a third-party API to handle player card list, which is highly safety and not easy to hack in.
- So I tried to loop all cards base on supply ids.
- But ```CardsQuery``` has a 100 cards limited.
- So now we can only get latest 100 cards order info.

# Note
I don't think this site should run on Internet. Only use for local and guide you to buy/sale cards on Sorare.com.

# Contribute
Welcome contribute if you want to make this project better. Create issues or PR.

# Plan
- Input query only support player slug, may can be upgrade.
- Solve 100 cards limit and hack more.
- Wait Sorare.com to support more office/legal APIs.

