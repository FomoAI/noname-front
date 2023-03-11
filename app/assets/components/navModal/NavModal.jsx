import { useDispatch } from 'react-redux'
import { closeModal } from '../../../store/slices/modalsSlice'
import styles from './nav-modal.module.scss'
import { Transition } from 'react-transition-group'
import { useRef , useEffect} from 'react'
import closeSvg from '../../icons/close.svg'
import Image from 'next/image'
import cryptoSvg from '../../icons/crypto.svg'
import donateSvg from '../../icons/donate.svg'
import realEstateSvg from '../../icons/real-estate.svg'
import rocketSvg from '../../icons/rocket.svg'
import Link from 'next/link'

const links = [
    {
        img:rocketSvg,
        href:'/startups',
        title:'Startups',
        description:'Become an angel investor of a promising startup ',
    },
    {
        img:donateSvg,
        href:'/donates',
        title:'Donates',
        description:'Help to fight consequences of the war in Ukraine',
    },
    {
        img:cryptoSvg,
        href:'/crypto',
        title:'Crypto',
        description:'Invest in the best proposition of the сrypto market',
    },
    {
        img:realEstateSvg,
        href:'/realestate',
        title:'Real estate',
        description:'Invest in the best proposition of the real estate market',
    },
]

export default function NavModal({isVisible}) {
    const dispatch = useDispatch()
    const nodeRef = useRef(null)
    const transitionStyles = {
        entering: { opacity: 1 ,visibility:'visible'},
        entered:  { opacity: 1 ,visibility:'visible'},
        exiting:  { opacity: 0 ,visibility:'hidden'},
        exited:  { opacity: 0 ,visibility:'hidden'},
    };

    const close = () => {
        dispatch(closeModal('nav'))
    }

  return (
    <Transition in={isVisible} timeout={1000} nodeRef={nodeRef}>
        {
            (state) => (
                    <div ref={nodeRef} style={{...transitionStyles[state]}} className={styles.body}>
                        {
                            links.map((link) => {
                                return (
                                    <Link id='remove-block' key={link.title} onClick={close} className={styles.link} href={link.href}>
                                        <div id='remove-block' className={styles.img}>
                                            <Image src={link.img} alt='link-img'/>
                                        </div>
                                        <div id='remove-block' className={styles.info}>
                                            <div id='remove-block' className={styles.title}>
                                                {link.title}
                                            </div>
                                                <div id='remove-block' className={styles.description}>
                                                {link.description}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        
                        <div className={styles.line}></div>
                    </div>
            )
        }
    </Transition>
   
  )
}
