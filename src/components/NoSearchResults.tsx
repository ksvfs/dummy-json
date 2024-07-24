import styles from './NoSearchResults.module.scss';
import icons from '../assets/icons';

export default function NoSearchResults() {
  return (
    <div className={styles.noSearchResults}>
      {icons.noSearchResults}
      Ничего не найдено
    </div>
  );
}
