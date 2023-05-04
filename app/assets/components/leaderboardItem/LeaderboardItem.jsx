import styles from './leader-item.module.scss'

export default function LeaderboardItem({item}) {

  return (
    <>
    <div className={styles.body}>
        <div className={styles.bold}>
            {item.rank}
        </div>
        <div className={styles.value}>
            {item.address}
        </div>
        <div className={styles.value}>
            {item.totalScore}
        </div>
    </div>
    <div className={styles.line}>

    </div>
    </>
  )
}
