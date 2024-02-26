// import { BigNumber } from 'ethers';

// export interface Ichat {
//   index: BigNumber;
//   from: string;
//   to: string;
//   message: string;
//   time: BigNumber;
//   isAddressShort: boolean;
// }
export interface Ichat {
  index: number;
  from: string;
  to: string;
  message: string;
  time: number;
  isAddressShort: boolean;
}
