import styles from './switch.module.scss'
import Modal from '../modal/Modal'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

export default function SwitchModal({isVisible,handler}) {

  return (
    <Modal
    title='Unsupported network'
    handler={handler}
    isVisible={isVisible}
    width='360'
    >
        <div className={styles.body}>
            <div className={styles.description}>
            Please change your dapp browser to Binance Smart Chain to continue
            </div>
            <SquareBtn type='red' width='330' text={'Switch to BSC'}/>
        </div>
    </Modal>
  )
}
