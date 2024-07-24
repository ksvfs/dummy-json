import styles from './Loading.module.scss';
import icons from '../assets/icons';

export default function Loading() {
  return <div className={styles.loading}>{icons.loading}</div>;
}
