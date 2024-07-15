import icons from '../assets/icons.tsx';
import styles from './FetchingError.module.scss';

export default function FetchingError() {
  return (
    <div className={styles.error}>
      {icons.error}
      Ошибка получения данных
    </div>
  );
}
