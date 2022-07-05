import { FC } from 'react';
import style from '../styles/LoadingIndicator.module.css';
const LoadingIndicator: FC = () => {
  return (
    <div className={style.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
