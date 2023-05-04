import styles from './my-score.module.scss'

const checkStatus = (status) => {
    if(status === 'pass'){
        return (
            <div className={styles.pass}></div>
        )
    }
    if(status === 'potential'){
        return (
        <div className={styles.potentialWrapper}>
            <div className={styles.potential}></div>
        </div>
        )
    }
    if(status === 'nopass'){
        return (
            <div className={styles.nopass}></div>
        )
    }
}

export default function MyScore({userData}) {
    
  return (
    <div>       
        <div className={styles.title}>
            My score
        </div>
        <div className={styles.table}>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Rank:
                </div>
                <div className={styles.value}>
                    200
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Address:
                </div>
                <div className={styles.value}>
                    0xc038...d4a82
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Projects participated:
                </div>
                <div className={styles.value}>
                    0
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Total score:
                </div>
                <div className={styles.value}>
                    0
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Status:
                </div>
                <div className={styles.value}>
                    {checkStatus('pass')}
                </div>
            </div>
        </div>
    </div>
  ) 
}
