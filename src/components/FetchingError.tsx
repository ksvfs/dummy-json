import styles from './FetchingError.module.scss';
import icons from '../assets/icons';

export default function FetchingError() {
  return (
    <div className={styles.error}>
      {icons.error}
      Ошибка получения данных
    </div>
  );
}
