import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Inft } from '../utils/types/Inft';
import LoadingIndicator from './LoadingIndicator';
import { useNftContext } from './NftContext';

const BattleNft: FC = () => {
  const { nftContract, transfromNFTData, tokenIds, tokenIdToNFT, setMap }: any =
    useNftContext();
  const [Boss, setBoss] = useState<Inft | undefined>();
  const [attackState, setAttackState] = useState('');
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
        setAttackState('attacking');
        console.log('Attacking boss...');
        const attackTxn = await nftContract.attack(tokenId);
        await attackTxn.wait();
        console.log('attackTxn:', attackTxn);
        setAttackState('hit');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error attacking boss:', error);
      setAttackState('');
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
      <div className='boss-container'>
        <div className={`boss-content`}>
          <h2>🔥 {Boss.name} 🔥</h2>
          <div className='image-content'>
            <img
              src={Boss.imageURI}
              alt={`Boss ${Boss.name}`}
            />
            <div className='health-bar'>
              <progress value={Boss.hp} max={Boss.maxHp} />
              <p>{`${Boss.hp} / ${Boss.maxHp} HP`}</p>
            </div>
          </div>
          <div className='stats'>
            <h4>{`⚔️ Attack Damage: ${Boss.attackDamage}`}</h4>
          </div>
        </div>
      </div>
    );
  };
  console.log('t2', tokenIds);
  console.log('map2', tokenIdToNFT);
  console.log('boss', Boss);

  const renderPlayers = () => {
    return (
      <div className='players-container'>
        {/*{characterNFT.map((character, index) => {*/}
        {tokenIds.map((tokenId:number, index:number) => {
          const character = tokenIdToNFT.get(tokenId);
          if (character) {
            return (
              <div className='player-container' key={index}>
                <h2>Your Character</h2>
                <div className='player'>
                  <div className='image-content'>
                    <h2>{character.name}</h2>
                    <img
                      src={character.imageURI}
                      alt={`Character ${character.name}`}
                    />
                    <div className='health-bar'>
                      <progress value={character.hp} max={character.maxHp} />
                      <p>{`${character.hp} / ${character.maxHp} HP`}</p>
                    </div>
                  </div>
                  <div className='stats'>
                    <h4>{`⚔️ Attack Damage: ${character.attackDamage}`}</h4>
                  </div>
                  <div className='attack-container'>
                    <button
                      className='cta-button'
                      onClick={() => {
                        attack(character.tokenId);
                      }}
                    >{`💥 Attack `}</button>
                  </div>
                </div>
              </div>
            );
          }
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
    <div className='arena-container'>
      {Boss &&
        // characterNFT.length > 0 && (
        tokenIdToNFT.get(attackingTokenId) && ( //
          <div id='toast' className={showToast ? 'show' : ''}>
            <div id='desc'>{`💥 ${Boss.name} was hit for ${
              //characterNFT[0].attackDamage
              tokenIdToNFT.get(attackingTokenId).attackDamage //
            }!`}</div>
          </div>
        )}
      {Boss && renderBoss()}
      {attackState === 'attacking' && (
        <div className='loading-indicator'>
          <LoadingIndicator />
          <p>Attacking ⚔️</p>
        </div>
      )}
      {/* {characterNFT && renderPlayers()} */}
      {tokenIds.length > 0 && renderPlayers()} {/*//*/}
    </div>
  );
};

export default BattleNft;
