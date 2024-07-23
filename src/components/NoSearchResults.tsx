import icons from '../assets/icons.tsx';
import styles from './NoSearchResults.module.scss';

export default function NoSearchResults() {
  return (
    <div className={styles.noSearchResults}>
      {icons.noSearchResults}
      Ничего не найдено
    </div>
  );
}
