import styles from './stake-card.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Modal from '../modal/Modal'
import { useState } from 'react'
import StakeModal from '../stakeModal/StakeModal'
import blockScroll from '../../../utils/blockScroll'

export default function StakeCard({value = '0.00',breed = '0.00'}) {
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
            <span>You staked</span>
            <span>{breed} BREED</span>
        </div>
        <div className={styles.valueBlock}>
            <span className={styles.key}>Value</span>
            <span className={styles.value}>${value}</span>
        </div>
        <div className={styles.btns}>
           <SquareBtn width={'198'} text={'Unstake'}/>
           <SquareBtn type='red' handler={modalHandler} width={'198'} text={'Stake'}/>
        </div>
          <Modal handler={modalHandler} isVisible={modal} title={'Stake BREED'}>
            <StakeModal/>
          </Modal>
    </div>
  )
}
