# La Pepe Crypto Exchange
![Third step](/public/pepe.png)

### Visit here https://cake-la-coco-exchange.vercel.app/

## Setup

```
git clone https://github.com/G9000/cake-la-coco-exchange.git
```

To run the web and test

```
npm run dev
npm run test
```

## The app should do the following:

Finding the latest exchange rate between two crypto currencies. Currently the following currencies are supported:

1. Bitcoin
2. DefiChain
3. Ethereum
4. Dogecoin
5. Tether
6. Solana
7. Cardano

... more can be added in the future here below on index.tsx.

```
const SUPPORTED_CRYPTO = [
  "bitcoin, defichain, ethereum, dogecoin, tether, solana, cardano",
];
```


```
/simple/price
```

or

```
/coins/markets
```
