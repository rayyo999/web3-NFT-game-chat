import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className='h-full bg-teal-700 text-white text-center'>
      <Head>
        <title>Web3 ship to next</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <h2 className='pt-10 text-3xl bg-clip-text bg-gradient-to-r from-slate-400 via-zinc-300 to-stone-400 text-transparent'>
        Welcome to Rayven World
      </h2>
      <p className='py-4'>Here you can chat with your teammates</p>
      <p>
        and mint a NFT role together to kill the enemy to show your Team
        Spirit!!!! Have fun~
      </p>
    </div>
  );
};
export default Home;