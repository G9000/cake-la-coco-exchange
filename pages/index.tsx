import * as React from "react";
import type { NextPage } from "next";
import type { CoinMarket } from "@/types/index";
import ExchangeSection from "@/components/section/exchangeSection";
import MockCoinData from "./mocks/CoinMock.json";

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
  const coinLists: CoinMarket[] = MockCoinData;
  return { props: { coinLists } };
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
