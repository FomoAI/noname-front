import styles from './rewards-card.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Modal from '../modal/Modal'
import ClaimModal from '../claimModal.jsx/ClaimModal'
import { useState } from 'react'
import blockScroll from '../../../utils/blockScroll'

export default function RewardsCard({estimated = '0.00',available = '0.00',breed = '0.00'}) {
    const [modal,setModal] = useState(false)

    const modalHandler = (event) => {
      if(event.target.id === 'toggle-modal'){
        setModal(!modal)
        blockScroll()
      }
    }

  return (
    <div className={styles.body}>
    <div className={styles.row}>
        <span>Rewards</span>
        <span>{breed} BREED</span>
    </div>
    <div className={styles.colums}>
        <div className={styles.valueBlock}>
            <span className={styles.key}>Estimated Rewards</span>
            <span className={styles.value}>${estimated}</span>
        </div>
        <div className={styles.valueBlock}>
            <span className={styles.key}>Available to claim</span>
            <span className={styles.value}>${available}</span>
        </div>
    </div>
    <div className={styles.btns}>
       <SquareBtn handler={modalHandler} width={'406'} text={'Claim'}/>
    </div>
    <Modal bodyClass={'claim'} padding='16px 0 16px 0' width='900' handler={modalHandler} isVisible={modal} title={'Unstaking'}>
      <ClaimModal/>
    </Modal>
</div>
  )
}
