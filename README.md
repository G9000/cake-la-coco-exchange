# La Coco Crypto Exchange

## Setup

---

## Checklist

---

## The app should do the following:

1. Display his store name and current date/time - La Coco Crypto Exchange. **DONE**
2. Should support these cryptocurrencies - BTC, ETH, USDT, DFI, DOGE **DONE**
3. Should have two input fields **DONE**
4. Input #1 - Token to swap **DONE**
5. Input #2 - Token to receive **DONE**
6. On change of input #1 or input #2, both fields should recalculate. Meaning, if I change input 1, input 2 will display the amount to receive. If I change input 2, input 1 will display the amount I need. **DONE**
7. Both inputs should be able to switch to other currency **DONE**
8. Should not be able to select on same currency on both fields **DONE**

## Bonus:

1. Prices should be displayed (e.g, 1 BTC = 16.47 ETH) **DONE**
2. Should have a swap button. When clicked, it will reverse the currencies. (e.g, BTC => ETH, Press swap, ETH => BTC) **DONE**
3. Unit or E2E tests **DONE**

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

So bascially it was my first time using coingecko api. I was trying to find the correct endpoint between

```
/simple/price
```

or

```
/coins/markets
```

the second one is a better endpoint due to I'm able to pull more than just a price in case I need to add more functionality in the near future.
