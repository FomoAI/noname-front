import styles from '../styles/table-item.module.scss'

export default function TableItem({item}) {
  return (
    <div className={styles.item}>
      <div className={styles.body}>
          <span className={styles.bold}>{item.pool}</span>
          <span className={styles.bold}>{item.Amount}</span>
          <div className={styles.statys}>
            {
            item.status
            ?
            <span className={styles.unlocked}>Unlocked</span>
            :
            <span className={styles.locked}>Locked</span>
            }
          </div>
          <span>{item.locked}</span>
          <span>{item.claimed}</span>
          <div className={styles.mobileDates}>
            <span className={styles.mobileDate}>{item.investDate}</span>
            <span className={styles.mobileDate}>{item.unlockDate}</span>
          </div>
          <span className={styles.date}>{item.investDate}</span>
          <span className={styles.date}>{item.unlockDate}</span>
          <button className={styles.btn}>{item.action[0]}</button>
          {
             item.action[1]
             ?
             <button className={styles.rect}>
              {item.action[1]}
              </button>
              :
            ''
          }

      </div>
      <hr className={styles.line}/>
    </div>
  )
}
