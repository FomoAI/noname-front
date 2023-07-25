import icons from '../../assets/icons/user/user'
import Image from 'next/image'
import { useState , useRef, useMemo} from 'react'
import { Transition } from 'react-transition-group'
import { useSelector , useDispatch} from 'react-redux'
import { useRouter } from 'next/router'
import Lottie from 'lottie-react'
import { ethers } from "ethers";
import { Contract } from "ethers";
import { openModal, toggleModal, toggleModalWithoutBlock } from '../../store/slices/modalsSlice'
import closeSvg from '../../assets/icons/close-gray.svg'
import KYCsvg from '../../assets/icons/user/kyc.svg'
import walletSvg from '../../assets/icons/wallet.svg'
import supportSvg from '../../assets/icons/user/support.svg'
import discordSvg from '../../assets/icons/discordBlue.svg'
import cartSvg from '../../assets/icons/user/cart.svg'
import anotherSvg from '../../assets/icons/user/another-wallet.svg'
import KYCModal from '../../assets/components/KYCModal/KYCModal'
import MultichainModal from '../../assets/components/multichainwallets/MultichainModal'
import SupportModal from '../../assets/components/supportModal/SupportModal'
import copyText from '../../utils/copyText'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import MenuCloseAnim from '../../assets/lotties-animations/menu.json'
import sliceAddress from '../../utils/sliceAddress'
import styles from '../styles/user-settings.module.scss'



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function getStatus() {
  try{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const chainId = await provider.getNetwork()
   if (chainId.chainId!=280){
     await sleep(4000);
     return true
   }
  } catch (err) {
   console.info('err', err.message);
   await sleep(4000);
   return false
 }
  return false
 }
 
 function sleep(ms) {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   });
 }


async function get_nft_b() {
 try{

  const provider = new ethers.providers.Web3Provider(window.ethereum);  
  if (window.ethereum.selectedAddress == null){
    await sleep(4000);
    return 0
  }
  const address_nft_sale= '0xDcc5e641f73a60d6AD996FB916D24b88c920a0f5';
  const abi_nft_sale = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_buyer","type":"address"}],"name":"Bought","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_media","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_public","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addressInWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"},{"internalType":"address","name":"referal","type":"address"}],"name":"buy_nft_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_Nft_count_and_owners","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_rewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"get_prise_presale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_NFTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"referals_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"reward_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"},{"internalType":"address[]","name":"_wl","type":"address[]"}],"name":"startNFTsale_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wl_presale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];  const contract_nft_sale=new Contract(address_nft_sale, abi_nft_sale, provider);   

  const allowance_sum = await contract_nft_sale.NFTcount(window.ethereum.selectedAddress);
  let ds = allowance_sum.toNumber() 
  return ds
 }
 catch (err) {
  console.info('err in usersettings', err.message);
  await sleep(4000);
  return 0
}
}

async function get_nft_ref() {
 try{

  const provider = new ethers.providers.Web3Provider(window.ethereum);  
  if (window.ethereum.selectedAddress == null){
    await sleep(4000);
    return 0
  }
  const address_nft_sale= '0xDcc5e641f73a60d6AD996FB916D24b88c920a0f5';
  const abi_nft_sale = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_buyer","type":"address"}],"name":"Bought","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_media","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_public","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addressInWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"},{"internalType":"address","name":"referal","type":"address"}],"name":"buy_nft_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_Nft_count_and_owners","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_rewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"get_prise_presale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_NFTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"referals_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"reward_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"},{"internalType":"address[]","name":"_wl","type":"address[]"}],"name":"startNFTsale_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wl_presale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];  const contract_nft_sale=new Contract(address_nft_sale, abi_nft_sale, provider);   

  const allowance_sum = await contract_nft_sale.referals_sum(window.ethereum.selectedAddress);
  let ds = allowance_sum.toNumber() 
  return ds
 }
 catch (err) {
  console.info('err in usersettings', err.message);
  await sleep(4000);
  return 0
}
}

async function get_nft_award() {
 try{

  const provider = new ethers.providers.Web3Provider(window.ethereum);  
  if (window.ethereum.selectedAddress == null){
    await sleep(4000);
    return 0
  }
  const address_nft_sale= '0xDcc5e641f73a60d6AD996FB916D24b88c920a0f5';
  const abi_nft_sale = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_buyer","type":"address"}],"name":"Bought","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_media","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_public","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addressInWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"},{"internalType":"address","name":"referal","type":"address"}],"name":"buy_nft_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_Nft_count_and_owners","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_rewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"get_prise_presale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_NFTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"referals_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"reward_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"},{"internalType":"address[]","name":"_wl","type":"address[]"}],"name":"startNFTsale_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wl_presale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];  const contract_nft_sale=new Contract(address_nft_sale, abi_nft_sale, provider);   

  const allowance_sum = await contract_nft_sale.reward_sum(window.ethereum.selectedAddress);
  let ds = ethers.utils.parseUnits(allowance_sum.toString(), "wei");
  ds = ds / 1000000;  
  return ds
 }
 catch (err) {
  console.info('err in usersettings', err.message);
  await sleep(4000);
  return 0
}
}

async function get_ETH_balance() {
  try{
 
   const provider = new ethers.providers.Web3Provider(window.ethereum);  
   if (window.ethereum.selectedAddress == null){
     await sleep(4000);
     return 1
   }

   let balance = await provider.getBalance(window.ethereum.selectedAddress)
    // convert a currency unit from wei to ether
   const ds = ethers.utils.formatEther(balance)

   return ds
  }
  catch (err) {
   console.info('err in get_ETH_balance', err.message);
   await sleep(4000);
   return 1
 }
 }
 

export default function UserSettings({disconnect,user}) {
  const [KYCmodal,setKYCmodal] = useState(false)
  const [multichain,setMultiChain] = useState(false)
  const [support,setSupport] = useState(false)
  const [success,setSuccess] = useState(false)
  const [refCoppied,setRefCoppied] = useState(false)
  const [isCustomAlert,setIsCustomAlert] = useState(false)
  const [open_switchModal, setOpen_switchModal] = useState(false)
  const router = useRouter()

  const state = useSelector((state) => state.modals.settings.state)
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const nodeRef = useRef(null)

  const [NFT_bougt,setNFT_bougt] = useState(0)
  const [NFT_partners,setNFT_partners] = useState(0)
  const [NFT_award,setNFT_award] = useState(0)
  const [ETHbalance,setETHbalance] = useState(1)
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
    setIsCustomAlert(true)
    copyText(user._id)
  }

  const switchModalHandler= (event) => {

    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      setOpen_switchModal(false)
      return
    }

    if(event == 'active_switch') {

      changeNetwork().then(result => setOpen(false))
      setOpen_switchModal(false)
      return
    }
  }

  getStatus().then(result => setOpen_switchModal(result))


  get_nft_b().then(result => {
    setNFT_bougt(result)})

  get_nft_ref().then(result => {
    setNFT_partners(result)})

  get_nft_award().then(result => {
    setNFT_award(result)})

  get_ETH_balance().then(result => {
      setETHbalance(result)})

  useMemo(() => {
    if(refCoppied){
      setTimeout(() => {
        setRefCoppied(false)
      },2000)
    }
  },[refCoppied])

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
            <span className={styles.username}>
            {
            user?.address 
            ? 
            user.address 
            : 
            'Username'
            }
            </span>
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
                    <span className={styles.username}>
                      {
                      user?.address 
                      ?
                      sliceAddress(user.address,'2x4') 
                      : 
                      'Username'
                      }
                    </span>
                  </div>
                  <button 
                  className={styles.closeBtn} 
                  onClick={() => dispatch(toggleModalWithoutBlock('settings'))}>
                    {/* <Image src={closeSvg} alt='close-modal'/> */}
                    <Lottie animationData={MenuCloseAnim}/>
                  </button>
                </div>
        <div className={styles.row}>
         <span className={styles.key}>
           Partners:
         </span>
         <span className={styles.value}>
			 {NFT_partners}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Balance:
         </span>
         <span className={styles.value}>
         {ETHbalance}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Awards:
         </span>
         <span className={styles.value}>
			 {NFT_award}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Score:
         </span>
         <span className={styles.value}>
           0
         </span>
        </div>

        <div className={styles.btns}>
        <div className={styles.row}>
           <button onClick={() => dispatch(openModal('cart'))} className={styles.btn}>
              <Image alt={'cart'} src={cartSvg}/>
              <span>Cart</span>
           </button>
           <span className={styles.value}>{cart.length}</span>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'stale'} src={icons.stake}/>
              <span>Stake</span>
           </button>
           <span className={styles.value}>0</span>
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
           <span className={styles.value}>{NFT_bougt}</span>
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
        <div className={styles.row}>
           <button onClick={() => setMultiChain((state) => !state)} className={styles.btn}>
              <Image alt={'connect'} src={walletSvg}/>
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
           <button className={styles.btn}>
              <Image alt={'connect'} src={anotherSvg}/>
              <span>Connect another wallet</span>
           </button>
        </div>
        </div>
        <div className={styles.logout}>
          <button onClick={disconnect} type={'button'}>Log out</button>
        </div>
        {
          !user.isNftAccess
          ?
          <div className={styles.nftError}>
            <Image src={icons.nftError} alt='Buy nft'/>
            <span>To gain a full access buy No name NFT!</span>
          </div>
          :
          <></>
        }

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
    <CustomAlert
    isAutoClose={true}
    position='left'
    type={'success'}
    title={'Сopied!'}
    text={`You have successfully copied a referral link`}
    isVisible={isCustomAlert}
    handler={() => setIsCustomAlert(false)}
    />
    <SwitchModal handler={switchModalHandler} isVisible={open_switchModal}/>
    </>
  
  )
}
