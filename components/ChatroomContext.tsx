import { useState, useEffect, createContext, FC, useContext } from 'react';
import { Contract, providers, EventFilter, Event, utils } from 'ethers';
import chatContractInterface from '../utils/contracts/chatContract.json';
import { Ichat } from '../utils/types/Ichat';

declare var window: any;

const chatContractAddress = '0x8b4E564967E54a8f7a6A493D5EDE1759e78DfD53';
const chatContractABI = chatContractInterface.abi;
const defaultMessageReceiver = '0x8b4E564967E54a8f7a6A493D5EDE1759e78DfD53';
const from = '0x93e726D9e9629A1cb0eD8ff4Ffd4123cbcb95373';
const to = '0xbe61E58374B311E1266c1A2c100736A2D3c88789';
const admain = '0xD23Fe32da86644edE2B9c3b8c3e80Bc95D429e02';

const ChatroomContext: any = createContext(null);
export const useChatroomContext = () => useContext(ChatroomContext);

const ChatroomProvier: FC<any> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [chatContract, setChatContract] = useState<Contract | undefined>();
  const [chats, setChats] = useState<Ichat[]>([]);
  // const [chatsFiltered, setChatsFiltered] = useState<Ichat[]>([]);
  let ethereum: any;
  if (typeof window !== 'undefined') {
    ethereum = window.ethereum;
  }
  const getAccount = async () => {
    try {
      if (!ethereum) return;
      // TODO del
      console.log('ethereum', ethereum);
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length === 0) {
        console.log('no accounts found');
        return;
      }
      setCurrentAccount(accounts[0]);
      // TODO del
      console.log('get currentAccount : ', accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const checkCurrentAccount = async () => {
    try {
      // const { ethereum } = window;
      if (!ethereum) {
        console.log("u don't get ethereum object");
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        console.log('no accounts found');
        return;
      }
      if (accounts[0] === currentAccount) {
        console.log('same as currentAccount');
        return;
      }
      setCurrentAccount(accounts[0]);
      console.log('set currentAccount : ', accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const checkNetwork = async () => {
    try {
      // const { ethereum } = window;
      if (ethereum && ethereum.networkVersion !== '4') {
        alert('Please Connect To Rinkeby Testnet !!!!!!!');
      } else {
        //console.log('you are now connecting to rinkeby!!!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getChatContract = async () => {
    try {
      // const { ethereum } = window;
      if (!ethereum) {
        console.log("u don't get ethereum object");
        return;
      }
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractInstance = new Contract(
        chatContractAddress,
        chatContractABI,
        signer
      );
      console.log('Get chatContract!', contractInstance.address);
      setChatContract(contractInstance);
    } catch (error) {
      console.error(error);
    }
  };

  // const filterChats = async () => {
  //   try {
  //     if (!chatContract) {
  //       console.log('no chatContract object');
  //       return;
  //     }
  //     const filter = chatContract.filters.chatEvent(from, null);
  //     // const filter = chatContract.filters.chatEvent(null,to)
  //     // const filter = chatContract.filters.chatEvent(from,to)
  //     // const filter = chatContract.filters.chatEvent(null,[from,to])
  //     const chats = await chatContract.queryFilter(filter, 0, 'latest');
  //     const array = transformMessage(chats);
  //     console.log('chats : ', array);
  //     setChatsFiltered(array);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getAllChats = async () => {
    try {
      if (!chatContract) {
        console.log('no chatContract object');
        return;
      }
      //all
      const chats = await chatContract.queryFilter(
        'chatEvent' as EventFilter,
        0,
        'latest'
      );
      //public
      // const filter = chatContract.filters.chatEvent(null,null,defaultMessageReceiver);
      // const chats = await chatContract.queryFilter(filter, 0, "latest");

      const array = transformMessage(chats);
      console.log('chats : ', array);
      setChats(array);
    } catch (error) {
      console.error(error);
    }
  };
  const sendMessage = async (
    message: string,
    to: string = defaultMessageReceiver
  ) => {
    try {
      //getChatContract();  用useState就不用每次按按鈕就重新拉合約，提高效能但有風險如果不重新拉合約可能會拉到舊合約
      if (!chatContract) {
        console.log('no chatContract object');
        return;
      }
      const chatTxn = await chatContract.chat(to, message, {
        gasLimit: 300000,
      });
      console.log('Mining...', chatTxn.hash);
      const receipt = await chatTxn.wait();
      console.log('Mined!', receipt);
      // getChatHistory();
    } catch (error) {
      console.log(error);
    }
  };
  const transformMessage = (chats: Event[]) => {
    const array: Ichat[] = [];
    chats.forEach((event: any) => {
      if (!event.args) return;
      const template = {
        index: event.args[0].toNumber(),
        from: event.args[1],
        to: event.args[2],
        message: event.args[3],
        time: event.args[4].toNumber(),
        isAddressShort: true,
      };
      array.push(template);
    });
    return array;
  };

  useEffect(() => {
    getChatContract();
    getAllChats();
    const check = setInterval(() => {
      checkCurrentAccount();
    }, 3000);
    return () => {
      clearInterval(check);
    };
  }, [currentAccount]);

  useEffect(() => {
    if (!chatContract) return;
    chatContract.on('chatEvent', () => {
      console.log('log from event listener');
      getAllChats();
    });

    return () => {
      chatContract.off('chatEvent', () => {
        console.log('remove event listener');
      });
    };
  }, [chatContract]);

  return (
    <ChatroomContext.Provider
      value={{
        currentAccount,
        getAccount,
        defaultMessageReceiver,
        chats,
        setChats,
        sendMessage,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  );
};
export default ChatroomProvier;

// const a = '0123456789012345678901234567892';
// const ahex = utils.formatBytes32String(a);
//0x3132330000000000000000000000000000000000000000000000000000000000
// console.log(ahex);

// const bstring = utils.parseBytes32String(ahex)
// console.log(bstring);
