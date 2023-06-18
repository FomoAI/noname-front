import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import MetaMaskImage from '../../../img/metaMask.svg'
import smartCopy from '../../../icons/smart-copy.svg'
import styles from '../success-connect.module.scss'
import { closeModal, openModal, toggleModal } from '../../../../store/slices/modalsSlice'
import sliceAddress from '../../../../utils/sliceAddress'
import discordImage from '../../../img/discord.svg'

export default function SecondStep({steps,stepHandler,userData}) {
  const isVisible = steps.secondStep

  return (
    isVisible
    ?
      <div className={styles.secondStep}>
        <div className={styles.discordBody}>
          <Image className={styles.discord} src={discordImage} alt='discord'/>
          <div className={styles.subTitle}>
          Connect Discord
          </div>
        </div>
        <SquareBtn 
        handler={() => stepHandler(3)}
        btnId='none'
        text='Login' 
        width='400' 
        type='red'/>
      </div>
    :
    <></>
  )
}
