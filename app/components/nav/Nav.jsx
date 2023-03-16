import { useState , useCallback , useEffect} from 'react';
import styles from '../layout/styles/nav.module.scss'
import Image from 'next/image';
import logo from '../../assets/img/logo-beta.svg'
import Link from 'next/link';
import PinkBtn from '../UI/buttons/PinkBtn';
import Wallets from '../../assets/components/wallets/Wallets'
import Burger from '../../assets/components/burger/Burger';
import MobileNav from '../../assets/components/mobileNav/MobileNav';
import blockScroll from '../../utils/blockScroll';
import UserSettings from '../userSettings/UserSettings'
import { useWeb3Modal } from "@web3modal/react";
import { useDispatch , useSelector} from 'react-redux'
import {setUserData} from '../../store/slices/authSlice' 
import { useAccount} from 'wagmi'
import useWallet from '../../hooks/useWallet';
import useAuth from '../../hooks/useAuth';
import { closeModal, toggleModal } from '../../store/slices/modalsSlice';
import SearchBar from '../../assets/components/searchBar/SearchBar';
import NavModal from '../../assets/components/navModal/NavModal';

const links = [
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Waiting list',
        href:'/waitinglist'
    },
]

const mobileLinks = [
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Waiting list',
        href:'/waitinglist'
    },
    {
        title:'NN Info',
        href:'/'
    },
]

const Nav = ({userData}) => {
    const walletState = useSelector((state) => state.modals.wallet.state)
    const navModalState = useSelector((state) => state.modals.nav.state)
    const [modal,setModal] = useState(false)
    const [config,setConfig] = useState({})
    const {connectWallet} = useWallet()
    const {open} = useWeb3Modal();
    const dispatch = useDispatch()
    const {changeAccount} = useAuth()

    const disconnectHandler = () => {
        dispatch(setUserData({address:'',balance:'',isAuth:false}))
    }

    const { address, isConnected ,status} = useAccount({onConnect:changeAccount,onDisconnect:disconnectHandler})

    const walletsHandler = (event) => {
        if(event){
            event.preventDefault()
        }
        dispatch(toggleModal('wallet'))
    }
    
    const connect = async (config,wallet) => {
      if(wallet === 'Connect Wallet'){
        setConfig(config)
        open()
      }
      if(wallet === 'Metamask'){
        if(!window?.ethereum?.isMetaMask){
            setConfig(config)
            open()
            return
        }
        await connectWallet('Metamask',walletsHandler)
      }
      if(wallet === 'TrustWallet'){
        if(!window?.ethereum?.isTrustWallet){
            setConfig(config)
            open()
            return
        }
        await connectWallet('TrustWallet',walletsHandler)
      }
    }

    useEffect(() => {
        if(isConnected){
            changeAccount(address)
            walletsHandler(false)
        }
    },[isConnected])

    const modalHandler = (event) => {
        event.stopPropagation()
        if(event.target.id === 'remove-block'){
            blockScroll('remove')
        }
        if(event.target.id === 'brg-btn' || event.target.id === 'modal'){
            walletState && walletsHandler()
            setModal(!modal)
            dispatch(closeModal('settings'))
            dispatch(closeModal('nav'))
            blockScroll()
        }
    }

    return (
        <div onClick={modalHandler} className={styles.row}>
            <div className={styles.logo}>
                <Link href={'/'}>
                   <Image width={'160'} src={logo} alt='logo'/>
                </Link>
            </div>
            <div className={styles.infoLink}>
                <Link href={'/'}>
                    NN info
                </Link>
            </div>
            <div className={styles.input}>
                <SearchBar/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.links}>
                <li className={styles.investsBtn}>
                    <button 
                    className={navModalState ? styles.rotate : 'none'}
                    onClick={() => dispatch(toggleModal('nav'))}>
                        Invest
                    </button>
                </li>
                {links.map((link,index) => {
                    return <li key={index}><Link className={styles.link} href={link.href}>{link.title}</Link></li>
                })}
                </ul>
            </nav>
            <div className={styles.btn}>
                {
                    userData.isAuth
                    ?
                    <UserSettings user={userData} disconnect={disconnectHandler}/>
                    :
                    <PinkBtn handler={walletsHandler} text={'Connect wallet'} href={''} id={'wallet-btn'}/>
                }
            </div>
            <div className={styles.wlModal}>
                <Wallets config={config} connect={connect} handler={walletsHandler} isVisible={walletState}/>
            </div>
            <Burger/>
            <MobileNav 
            navModalState={navModalState}
            disconnect={disconnectHandler} 
            user={userData} 
            isAuth={userData.isAuth} 
            walletsHandler={walletsHandler} 
            isVisible={modal} 
            modalHandler={modalHandler} 
            links={mobileLinks}
            />
            <NavModal isVisible={navModalState}/>
        </div>
    );
}

export default Nav;
