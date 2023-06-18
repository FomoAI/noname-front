import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { closeModal, openModal, toggleModal } from '../../../../store/slices/modalsSlice'
import { setUserData } from '../../../../store/slices/authSlice'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import MetaMaskImage from '../../../img/metaMask.svg'
import smartCopy from '../../../icons/smart-copy.svg'
import styles from '../success-connect.module.scss'
import sliceAddress from '../../../../utils/sliceAddress'
import discordImage from '../../../img/discord.svg'

export default function FourthStep({steps,stepHandler,userData}) {
  const isVisible = steps.fourthStep
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userData)
  
  const confirmAuthHandler = () => {
    stepHandler(4)
  }

  return (
    isVisible
    ?
      <div className={styles.thirdStep}>
        <div className={styles.discordBody + ' ' + styles.success}>
          <Image className={styles.discord} src={discordImage} alt='discord'/>
          <div className={styles.subTitle}>
          Discord connected
          </div>
          <div className={styles.wallet}>
            <span>{userData?.discordData?.username}</span>
            <Image src={smartCopy} alt='icon'/>
          </div>
        </div>
        <SquareBtn 
        handler={confirmAuthHandler}
        btnId='none'
        text='Login to No Name' 
        width='400' 
        type='red'/>
      </div>
    :
    <></>
  )
}
