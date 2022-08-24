import * as React from "react";
import type { NextPage } from "next";
import type { CoinMarket } from "@/types/index";
import ExchangeSection from "./section/exchangeSection";

// CONSTANT
// For easier adding new coin to the list
const SUPPORTED_CRYPTO = [
  "bitcoin, defichain, ethereum, dogecoin, tether, solana, cardano",
];

export interface DropdownProps {
  data: CoinMarket[];
  lists: CoinMarket[];
  activeList: CoinMarket;
  onChange: (value: CoinMarket) => void;
}

interface PageProps {
  coinLists?: CoinMarket[];
}

export const getServerSideProps = async () => {
  const coins = SUPPORTED_CRYPTO.join("%2C");
  const fetchCoins = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (fetchCoins.ok) {
    const coinLists: CoinMarket[] = await fetchCoins.json();
    return { props: { coinLists } };
  }

  return {
    props: {},
  };
};

const Home: NextPage<PageProps> = ({ coinLists = [] }) => {
  return (
    <section className="w-full mx-auto px-5 max-w-[1200px]">
      <div className="absolute inset-0 bg-gradient-spectrum" />
      <div className="absolute inset-0 bg-grid-tile-light bg-top flex items-center justify-center overflow-hidden" />
      <ExchangeSection coinLists={coinLists} />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-[#18181800] to-neutral-100 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-[#18181800] to-neutral-100 z-10" />
    </section>
  );
};

export default Home;
