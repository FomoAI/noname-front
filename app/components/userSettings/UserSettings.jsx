import styles from '../styles/user-settings.module.scss'
import icons from '../../assets/icons/user/user'
import Image from 'next/image'
import { useState , useRef} from 'react'
import { Transition } from 'react-transition-group'
import { useSelector , useDispatch} from 'react-redux'
import { useRouter } from 'next/router'
import { toggleModal, toggleModalWithoutBlock } from '../../store/slices/modalsSlice'
import closeSvg from '../../assets/icons/close-gray.svg'
import KYCsvg from '../../assets/icons/kyc.svg'
import supportSvg from '../../assets/icons/support.svg'
import discordSvg from '../../assets/icons/discordBlue.svg'
import KYCModal from '../../assets/components/KYCModal/KYCModal'
import MultichainModal from '../../assets/components/multichainwallets/MultichainModal'
import SupportModal from '../../assets/components/supportModal/SupportModal'
import copyText from '../../utils/copyText'
import loader from '../../utils/loader'

export default function UserSettings({disconnect,user}) {
  const [KYCmodal,setKYCmodal] = useState(false)
  const [multichain,setMultiChain] = useState(false)
  const [support,setSupport] = useState(false)
  const [success,setSuccess] = useState(false)
  const [refCoppied,setRefCoppied] = useState(false)
  const router = useRouter()

  const state = useSelector((state) => state.modals.settings.state)
  const dispatch = useDispatch()
  const nodeRef = useRef(null)
  const referall = useRef(null)

  const transitionStyles = {
    entering: { opacity: 1 ,visibility:'visible'},
    entered:  { opacity: 1 ,visibility:'visible'},
    exiting:  { opacity: 0 ,visibility:'hidden'},
    exited:  { opacity: 0 ,visibility:'hidden'},
  };

  const rotateStyles = {
    entering: {transform: 'rotate(180deg)'},
    entered:  {transform: 'rotate(180deg)' },
    exiting:  {transform: 'rotate(0deg)' },
    exited:   {transform: 'rotate(0deg)' },
  }

  const KYCmodalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setKYCmodal((state) => !state)
      setSuccess(false)
    }
  }

  const walletsModalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setMultiChain((state) => !state)
      setSuccess(false)
    }
  }

  const supportModalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setSupport((state) => !state)
      setSuccess(false)
    }
  }

  const copyRef = () => {
    setRefCoppied(true)
    copyText(user._id)
  }


  return (
    <>
    <div className={styles.modalBody}>
      <Transition in={state} timeout={1000}>
      {(state) => {
        return(
          <div onClick={() => dispatch(toggleModalWithoutBlock('settings'))} className={styles.button}>
            <div className={styles.photo}>
              {
                       user?.discordData?.avatar
                       ?
                       <Image
                       alt='user-img'
                       width={'24'}
                       height={'24'}
                       loader={() => `https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       src={`https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       />
                       :
                      <Image src={icons.photo} alt={'user-photo'}/>     
              }
            </div>
            <span className={styles.username}>{user?.address ? user.address : 'Username'}</span>
            <div style={{...rotateStyles[state]}} className={styles.arrow}>
              <Image src={icons.arrow} alt={'arrow'}/>
            </div>
          </div>
        )
      }}
      </Transition>

      <Transition in={state} timeout={1000}>
      {
        (state) => {
          return (
            <div id='toggle-modal' style={{...transitionStyles[state]}} ref={nodeRef} className={styles.modal}>
                <div className={styles.userInfo}>
                  <div className={styles.usernameInfo}>
                    <div className={styles.modalPhoto}>
                      {
                       user?.discordData?.avatar
                       ?
                       <Image
                       width={'24'}
                       height={'24'}
                       alt='user-img'
                       loader={() => `https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       src={`https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       />
                       :
                      <Image src={icons.photo} alt={'user-photo'}/>     
                      }    
                    </div>
                    <span className={styles.username}>{user?.address ? user.address : 'Username'}
                    </span>
                  </div>
                  <button 
                  className={styles.closeBtn} 
                  onClick={() => dispatch(toggleModalWithoutBlock('settings'))}>
                    <Image src={closeSvg} alt='close-modal'/>
                  </button>
                </div>
        <div className={styles.row}>
         <span className={styles.key}>
           Partners:
         </span>
         <span className={styles.value}>
           0
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Balance:
         </span>
         <span className={styles.value}>
         {user?.balance ? user.balance : '2,054.45'}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Awards:
         </span>
         <span className={styles.value}>
           0
         </span>
        </div>

        <div className={styles.btns}>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'stale'} src={icons.stake}/>
              <span>Stake</span>
           </button>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'claim'} src={icons.claim}/>
              <span>Claim</span>
           </button>
           <span className={styles.value}>0</span>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'nft'} src={icons.nft}/>
              <span>NFT</span>
           </button>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'connect'} src={icons.connect}/>
              <span>Connect another wallet</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setMultiChain((state) => !state)} className={styles.btn}>
              <Image alt={'connect'} src={icons.connect}/>
              <span>Multi-chain wallet</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setKYCmodal((state) => !state)} className={styles.btn + ' ' + styles.kyc}>
              <Image alt={'connect email'} src={KYCsvg}/>
              <span>KYC (email)</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setSupport((state) => !state)} className={styles.btn + ' ' + styles.kyc}>
              <Image alt={'connect'} src={supportSvg}/>
              <span>Support</span>
           </button>
        </div>
        <div className={styles.row}>
           <button 
           onClick={() => router.push('https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=https%3A%2F%2Fnoname-backend-production.up.railway.app%2Fdiscord&response_type=code&scope=identify')} className={styles.btn}>
              <Image alt={'discord'} src={discordSvg}/>
              <span className={styles.blueText}>
                {user?.discordData?.username ? user?.discordData?.username : 'Connect Discord'}
              </span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={copyRef} className={styles.btn}>
              <Image alt={'copy'} src={icons.copy}/>
              <span>Copy referall link</span>
              {
                refCoppied
                ?
                <span className={styles.copied}>Copied</span>
                :
                ''
              }
           </button>
        </div>
        </div>
        <div className={styles.logout}>
          <button onClick={disconnect} type={'button'}>Log out</button>
        </div>
      </div>
          )
        }
      }
      </Transition>
    </div>
    <KYCModal 
    userEmail={user.KYC}
    success={success} 
    setSuccess={setSuccess} 
    isVisible={KYCmodal} 
    handler={KYCmodalHandler}/>
      
    <MultichainModal
    success={success}
    setSuccess={setSuccess}
    userWallets={user.multichainwallets}
    handler={walletsModalHandler}
    isVisible={multichain}
    />
    <SupportModal
    user={user}
    handler={supportModalHandler}
    success={success}
    setSuccess={setSuccess}
    isVisible={support}
    />
    </>
  
  )
}
