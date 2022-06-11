import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import type { CoinMarket } from "@/types/index";
import clsx from "clsx";
import { Exchange } from "@/components/Exchange";

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
    <Layout>
      <Head>
        <title>La Coco Exchange</title>
        <meta name="description" content="La Coco scammer exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-gradient-spectrum" />
      <div className="absolute inset-0 bg-grid-tile-light bg-top flex items-center justify-center overflow-hidden" />

      <Exchange coinLists={coinLists} />

      <div
        className={clsx(
          "absolute inset-0",
          "bg-gradient-to-b from-neutral-100 via-[#18181800] to-neutral-100"
        )}
      />
      <div
        className={clsx(
          "absolute inset-0",
          "bg-gradient-to-r from-neutral-100 via-[#18181800] to-neutral-100"
        )}
      />
    </Layout>
  );
};

export default Home;
