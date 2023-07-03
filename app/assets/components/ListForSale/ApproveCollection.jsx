import Image from 'next/image'
import loader from '../../../utils/loader'
import nftImg from '../../../assets/img/img1.jpg'
import styles from './list-for-sale.module.scss'


export default function ApproveCollection({handler}) {
  return (
    <div className={styles.approveNft}>
    <div className={styles.approveNftWrapper}>
        <Image 
        width={40}
        height={40}
        className={styles.approveNftImg}
        src={nftImg} 
        alt='nft-img'
        />
        <div className={styles.approveNftInfo}>
            <div className={styles.approveNftTitle}>
                Secret NFT Key #2
            </div>
            <div className={styles.approveNftDescription}>
                No name key
            </div>
        </div>
    </div>
    <div className={styles.approveNftText}>
    <span>Go to your wallet</span>
        <div>
        You'll be asked to approve this collection from your wallet. 
        You only need to approve each collection once.
        </div>
    </div>
</div>
  )
}
