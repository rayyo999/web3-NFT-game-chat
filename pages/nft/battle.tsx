import { FC } from 'react';
import { useIsMounted } from '../../components/useIsMounted';
import BossCard from '../../components/Nft/BossCard';
import PenCards from '../../components/Nft/PenCards';

const Battle: FC = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <></>;
  }
  return (
    <>
      <BossCard />
      <PenCards isBattle={true}/>
    </>
  );
};
export default Battle;
