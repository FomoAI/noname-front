import { useState } from 'react'
import styles from './purchase-data.module.scss'

export default function PurchaseData({closes,card,isVisible,value,valueHandler}) {
    if(!isVisible){
        return <></>
    }

  return (
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.colum}>
                <span className={styles.key}>You can claim your IDIA in</span>
                <span className={styles.blueText}>{`${closes.days}d ${closes.hours}h ${closes.minutes}m`}</span>
            </div>
            <div className={styles.colum}>
                <span className={styles.key}>Total staked in this pool: 10 328 708,67</span>
                <div className={styles.input}>
                    <input value={value} onChange={valueHandler} type="text" />
                    <span className={styles.value}>IDIA</span>
                </div>
            </div>
        </div>
    </div>
  )
}
