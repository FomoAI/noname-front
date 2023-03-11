import styles from "./claim-data.module.scss";

export default function ClaimData({ card, isVisible }) {
  if (!isVisible) {
    return <></>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>The IDIA sale has ended</div>
      <div className={styles.info}>
        <span className={styles.key}>Claimable share</span>
        <span className={styles.value}>{card.claim}</span>
      </div>
    </div>
  );
}
