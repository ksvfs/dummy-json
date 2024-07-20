import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <section className={styles.errorSection}>
      <div className={styles.errorCode}>404</div>
      <div>Страница не найдена</div>
    </section>
  );
}
