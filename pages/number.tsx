import { useContractRead } from 'wagmi'
const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'num',
        type: 'uint256',
      },
    ],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
const address = '0x4b79fcb4f4c2e0609d7ff2457dbca789d67aea44'

const Number = () => {
  const { data, isLoading, isError, error } = useContractRead({
    address,
    abi,
    functionName: 'retrieve',
  })
  return (
    <div>
      {data?.toNumber()}
      {isLoading && <div>Loading</div>}
      {isError && <div>{JSON.stringify(error)}</div>}
    </div>
  )
}

export default Number
