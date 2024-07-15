import styles from './Loading.module.scss';
import icons from '../assets/icons.tsx';

export default function Loading() {
  return <div className={styles.loading}>{icons.loading}</div>;
}
