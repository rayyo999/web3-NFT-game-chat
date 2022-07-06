import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Inft } from '../utils/types/Inft';
import LoadingIndicator from './LoadingIndicator';
import { useNftContext } from './NftContext';

enum AttackState {
  Attacking,
  Hit,
  Idle,
}

const BattleNft: FC = () => {
  const { nftContract, transfromNFTData, tokenIds, tokenIdToNFT, setMap }: any =
    useNftContext();
  const [Boss, setBoss] = useState<Inft | undefined>();
  const [attackState, setAttackState] = useState(AttackState.Idle);
  const [showToast, setShowToast] = useState(false);
  const [attackingTokenId, setAttackingTokenId] = useState(1); //

  const getBoss = async () => {
    try {
      if (nftContract) {
        const boss = await nftContract.boss();
        setBoss(transfromNFTData(boss));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const attack = async (tokenId: number) => {
    try {
      if (nftContract) {
        setAttackingTokenId(tokenId);
        setAttackState(AttackState.Attacking);
        console.log('Attacking boss...');
        const attackTxn = await nftContract.attack(tokenId);
        await attackTxn.wait();
        console.log('attackTxn:', attackTxn);
        setAttackState(AttackState.Hit);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error attacking boss:', error);
      setAttackState(AttackState.Idle);
    }
  };

  const attackComplete = async (
    tokenId: BigNumber,
    newPlayerHp: BigNumber,
    newBossHp: BigNumber
  ) => {
    console.log(
      `attack Complete!! BossHp: ${newBossHp.toString()}, PlayerHp: ${newPlayerHp.toString()} `
    );
    setBoss((prev: Inft | undefined) => {
      return prev ? { ...prev, hp: newBossHp?.toString() } : undefined;
    });
    getBoss(); //
    const old = tokenIdToNFT.get(tokenId.toNumber());
    await setMap(tokenId.toNumber(), { ...old, hp: newPlayerHp.toString() });
  };

  const renderBoss = () => {
    if (!Boss) {
      console.log('Boss no found');
      return;
    }
    return (
      <div className='w-3/5 m-auto md:w-1/3 lg:w-1/4'>
        <div className='bg-stone-400 rounded-xl py-3 px-6'>
          <h2 className='text-2xl'>🔥 {Boss.name} 🔥</h2>
          <div className='rounded-xl overflow-hidden my-3'>
            <img
              src={Boss.imageURI}
              alt={`Boss ${Boss.name}`}
              className='aspect-square object-cover'
            />
            <div className='relative'>
              <progress
                value={Boss.hp}
                max={Boss.maxHp}
                className='absolute inset-0 w-full h-6'
              />
              <p className='relative h-6'>{`${Boss.hp} / ${Boss.maxHp} HP`}</p>
            </div>
          </div>
          <h4 className='font-bold'>{`⚔️ Attack Damage: ${Boss.attackDamage}`}</h4>
        </div>
      </div>
    );
  };
  console.log('t2', tokenIds);
  console.log('map2', tokenIdToNFT);
  console.log('boss', Boss);

  const renderPlayers = () => {
    return (
      <div className='flex gap-3 justify-center pt-6'>
        {tokenIds.map((tokenId: number, index: number) => {
          const character = tokenIdToNFT.get(tokenId);
          if (!character) return;
          return (
            <div
              className='flex-initial bg-stone-500 py-3 px-4 rounded-xl w-1/2 m-auto md:w-1/3 lg:w-1/4'
              key={index}
            >
              <h2>Your Character</h2>
              <h2>{character.name}</h2>
              <div className='rounded-xl overflow-hidden'>
                <img
                  src={character.imageURI}
                  alt={`Character ${character.name}`}
                  className='aspect-square object-cover'
                />
                <div className='relative'>
                  <progress
                    value={character.hp}
                    max={character.maxHp}
                    className='absolute inset-0 w-full h-6'
                  />
                  <p className='relative h-6'>{`${character.hp} / ${character.maxHp} HP`}</p>
                </div>
              </div>
              <div className='py-4'>
                <h4>{`⚔️ Attack Damage: ${character.attackDamage}`}</h4>
              </div>
              <button
                className='w-full h-10 rounded-md bg-gradient-to-r from-orange-600 via-amber-400 to-red-600'
                onClick={() => {
                  attack(character.tokenId);
                }}
              >{`💥 Attack `}</button>
            </div>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    getBoss();
    if (nftContract) {
      nftContract.on('attackEvent', attackComplete);
    }
    return () => {
      nftContract.off('attackEvent', attackComplete);
    };
  }, []);
  return (
    <div className=''>
      {showToast && tokenIdToNFT.get(attackingTokenId) && (
        <div>{`💥 ${Boss?.name} was hit for ${
          tokenIdToNFT.get(attackingTokenId).attackDamage
        }!`}</div>
      )}
      {/* {Boss && renderBoss()} */}
      {renderBoss()}
      {attackState === AttackState.Attacking && (
        <div className='loading-indicator'>
          <LoadingIndicator />
          <p>Attacking ⚔️</p>
        </div>
      )}
      {tokenIds.length > 0 && renderPlayers()} {/*//*/}
    </div>
  );
};

export default BattleNft;
