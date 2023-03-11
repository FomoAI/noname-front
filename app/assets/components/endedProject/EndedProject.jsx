import styles from  './ended.module.scss'
import Image from 'next/image'
import loader from '../../../utils/loader'

export default function EndedProject({project}) {
    if(!project){
        return <></>
    }

  return (
    <div className={styles.body}>
      <div className={styles.info}>
        <div className={styles.img}>
            <Image loader={() => loader(project.img)} width={'64'} height={'64'} src={project.img} alt={'project-img'}/>
        </div>
        <div className={styles.title}>
            Aura Network - Unlimited Sale
        </div>
        <div className={styles.description}>
            This is an unlimited sale. Each wallet can receive 
            unlimited allocation until the total supply is achived
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
            The IDIA sale has ended
        </div>
        <div className={styles.cardItem}>
            <span className={styles.cardKey}>Participants</span>
            <span className={styles.cardTitle}>1672</span>
        </div>
        <div className={styles.cardItem}>
            <span className={styles.cardKey}>Total Sales</span>
            <span className={styles.cardTitle}>238950.033 BUSD</span>
        </div>
      </div>
      <div className={styles.btn}>
        <button>Add IDIA to the wallet</button>
      </div>
    </div>
  )
}
