import styles from './waiting-item.module.scss'
import starSvg from '../../../assets/icons/star.svg'
import Image from 'next/image'
import loader from '../../../utils/loader'

export default function WaitingItem({remove,nftHandler,item}) {

  return (
    <>    
    <div onClick={(event) => nftHandler(event,item)} className={styles.body}>
       <div className={styles.project}>
            <div className={styles.projectImg}>
                <Image loader={() => loader(item.img)} width={'32'} height={'32'} src={item.img} alt={item.title}/>
            </div>
            <div className={styles.projectInfo}>
                <span className={styles.name}>{item.title}</span>
                <span className={styles.value}>NFT & Collectibles</span>
            </div>
       </div>
       <div className={styles.status}>
         {item.status}
       </div>
       <div className={styles.info}>
            {item.goal}
       </div>  
       <div className={styles.info}>
            {item.funded}
       </div>
       <div className={styles.info}>
         Mar 8, 2022
       </div>
       <div className={styles.info}>
         {item.type}
       </div>
       <div className={styles.rating}>
         {new Array(item.rating).fill(1).map((value,index) => {
            return <Image src={starSvg} alt='star' key={index}/>
         })}
       </div>
       <div className={styles.remove}>
         <button onClick={() => remove(item)} type={'button'}>-</button>
       </div>
    </div>
    <hr className={styles.line}/>
 
    </>
  )
}
