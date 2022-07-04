import { useState, useEffect, FC } from 'react';
import { Contract, providers } from 'ethers';
import { motion } from 'framer-motion';
import abi from './chatContract.json';

const { ethereum } = window as any;

const contractAddress = '0xBC334BE979Cf5a5211aAb0f4e4AAD63D7C737947';
const contractABI = abi.abi;
const Chat: FC = () => {
  const [chatContract, setChatContract] = useState<
    Contract | undefined
  >();
  const [currentAccount, setcurrentAccount] = useState('');
  const [message, setmessage] = useState('');
  const [waves, setwaves] = useState([]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert('Download Metamask');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected!', accounts[0]);
      setcurrentAccount(accounts[0]);
      //displayWaves();
      getEventHistory();
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0 && currentAccount !== accounts[0]) {
        console.log('Found an authorized account:', accounts[0]);
        setcurrentAccount(accounts[0]);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getContract = async () => {
    if (ethereum) {
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);
      console.log('Get chatContract!', contract.address);
      setChatContract(contract);
    }
  };

  useEffect(() => {
    const check = setInterval(() => {
      checkIfWalletIsConnected();
    }, 3000);
    getContract();
    getEventHistory();
    //if(currentAccount){
    //displayWaves();
    //};
    //getEventsAndShow();
    //getEventHistory();
    return () => {
      clearInterval(check);
    };
  }, [currentAccount]);

  const Wave = async () => {
    try {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      if (!chatContract) {
        console.log('Contract no found');
        return;
      }
      //getContract();  用useState就不用每次按按鈕就重新拉合約，提高效能但有風險如果不重新拉合約可能會拉到舊合約
      const waveTxn = await chatContract.wave(message, {
        gasLimit: 300000,
      });
      console.log('Mining...', waveTxn.hash);
      const receipt = await waveTxn.wait();
      console.log('Mined!', receipt);

      //displayWaves();
      //getEventsAndShow();
      getEventHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const getEventHistory = async () => {
    if (!chatContract) {
      console.log('Contract no found');
      return;
    }
    const luckyTransferEvent = await chatContract.queryFilter(
      'luckyTransferEvent',
      0,
      'latest'
    );
    console.log('luckyTransferEvent', luckyTransferEvent);
    const waveEvent = await chatContract.queryFilter(
      'waveEvent',
      0,
      'latest'
    );
    console.log('waveEvent', waveEvent);

    const mmap = new Map();
    const newArray = [];
    luckyTransferEvent.forEach((e) => {
      mmap.set(e.blockHash, e.args[1]);
    });
    waveEvent.forEach((wave, index) => {
      newArray.unshift({
        waver: wave.args[0],
        message: wave.args[1],
        time: wave.args[2],
        order: index + 1,
        amount: mmap.has(wave.blockHash) ? mmap.get(wave.blockHash) : 0,
      });
    });
    setwaves(newArray);
  };

  // const newArray=[];
  // const getEventsAndShow = () => {
  //   let luckyMoney = 0;
  //   chatContract.on("luckyTransferEvent",(from, amount, time)=>{
  //     luckyMoney = amount;
  //   })
  //   chatContract.on("waveEvent",(from, message, time) => {
  //     let structure = {waver:from, message:message, time:time, order:waveEventCount, amount: luckyMoney};
  //     newArray.push(structure);
  //     setwaves((prev)=>{
  //       return [structure, ...prev]
  //     });
  //     console.log(waves)
  //     setwaveEventCount(prev => prev+1);
  //     console.log(waveEventCount)
  //   })
  // }
  const wel = 'WelcomeToRaysGarden';
  return (
    <div className='mainContainer'>
      <div className='dataContainer'>
        <motion.div className='text-center text-3xl flex'>
          {wel.split('').map((word, index) => {
            return (
              <motion.p
                key={index}
                className={index === 7 || index === 9 ? 'pl-4' : ''}
                variants={displayTitle}
                initial='hidden'
                animate='animate'
                custom={index}
              >
                {word}
              </motion.p>
            );
          })}
        </motion.div>

        <div className='bio'>I am Ray. Share some Info. below~~</div>

        <div className='inputtext'>
          <input
            type='text'
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            placeholder='Type something...'
          />
        </div>

        {currentAccount && (
          <motion.button
            className='waveButton'
            onClick={Wave}
            whileHover={{
              scale: 1.2,
              transition: { repeat: Infinity, duration: 0.2 },
            }}
          >
            Send
          </motion.button>
        )}

        {!currentAccount && (
          <motion.button
            className='waveButton'
            onClick={connectWallet}
            whileHover={{ scale: 1.1 }}
          >
            Connect Wallet First
          </motion.button>
        )}

        {waves.map((wave, index) => {
          const waver = wave.waver.toString();
          const waverSub = waver.slice(0, 4) + '...' + waver.slice(38, 42);
          const time = new Date(wave.time * 1000);
          const amount = wave.amount / 10 ** 18;

          return (
            <div className='displayMsg' key={index}>
              <div className='displayMsg1'>
                <span className='waver'> From : {waverSub}</span>
                <span className='time'>{time.toUTCString()}</span>
              </div>
              {wave.amount !== 0 && (
                <div className='messgae'>
                  He got {amount} lucky Eth !!!!!!! Congrats
                </div>
              )}
              <div className='message'>
                Message {wave.order} : {wave.message}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Chat;

const displayTitle = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 3,
      stiffness: 10,
      mass: 0.5,
      delay: i * 0.05,
    },
  }),
};
