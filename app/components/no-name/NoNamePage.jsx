import { useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { openModalWithoutBlock, toggleModalWithoutBlock } from '../../store/slices/modalsSlice'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../assets/icons/no-name-logo.svg'
import CloseSvg from '../../assets/icons/close.svg'
import socialmediaicons from '../../assets/icons/no-name-socialmedia/socialmedia'
import Burger from '../../assets/components/nonameBurger/Burger'
import styles from '../styles/no-name.module.scss'

const listNNInfo = [
  {
    name:'About us',
    href:'/info/#about-us'
  },
  {
    name:'Portfolio',
    href:'/info/#portfolio'
  },
  {
    name:'Partners',
    href:'/info/#partners'
  },
  {
    name:'Contact',
    href:'/info/#contact'
  },
]

const listInvest = [
  {
    name:'NFT Launch',
    href:'/startups'
  },
  {
    name:'Public Launch',
    href:'/donates'
  },
  {
    name:'Early rounds',
    href:'/crypto'
  },
  {
    name:'Business',
    href:'/business'
  },
]

// const links = [
//   {
//     name:'NFT Marketplace',
//     href:'/marketplace'
//   },
//   {
//     name:'Leaderboard',
//     href:'/leaderboard'
//   },
//   {
//     name:'Dashboard',
//     href:'/dashboard'
//   },
//   {
//     name:'Calendar',
//     href:'/calendar'
//   },
//   {
//     name:'Blog',
//     href:'/blog'
//   },
// ]

export default function NoNamePage({socialMedia,whitepaper,shillClub}) {
  const [links,setLinks] = useState(() => [
    {
      name:'NFT Marketplace',
      href:'/marketplace'
    },
    {
      name:'Leaderboard',
      href:'/leaderboard'
    },
    {
      name:'Dashboard',
      href:'/dashboard'
    },
    {
      name:'Shill Club',
      href:shillClub,
      type:'a'
    },
    {
      name:'Calendar',
      href:'/calendar'
    },
    {
      name:'Blog',
      href:'/blog'
    },
    {
      name:'Whitepaper',
      href:whitepaper,
      type:'a',
    },
  ])
  const videoEl = useRef(null);
  const router = useRouter()
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.modals.nonameNavigation.state)

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  const navModalHandler = (event) => {
    const id = event.target.id

    if(id === 'toggle-modal'){
      return
    }

    if(id === 'open-modal'){
      dispatch(toggleModalWithoutBlock('nonameNavigation'))
      return
    }

    isVisible && dispatch(toggleModalWithoutBlock('nonameNavigation'))
  }

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div 
    onClick={navModalHandler} 
    className={styles.body}>
      <div className={styles.burgerWrapper}>
        <Burger
        id={'open-modal'}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.info}>
          <Image
          className={styles.logo} 
          src={Logo} 
          alt='no-name logo'/>
          <h1 className={styles.title}>NO NAME</h1>
          <p className={styles.text}>No name is a multipurpose platform 
            designed to open the world of investments for you.</p>
          <div className={styles.socialmedia}>
            {
              socialMedia?.map((socialItem) => {
                return (
                  <a 
                  href='/'
                  key={socialItem.alt}
                  className={styles.socialmediaItem}>
                    <Image src={socialmediaicons[socialItem.alt]} alt={socialItem.alt}/>
                  </a>
                )
              })
            }

          </div>
          <button 
          onClick={() => router.push('/info')}
          className={styles.investmentsBtn}>
            GO to investmens
          </button>
        </div>
        <div className={styles.column}>

            <div className={styles.videoWrapper}>
              <video
              className={styles.video}
              loop
              muted
              ref={videoEl}
              src={'http://localhost:5000/api/static/no-name.webm'}
              />
            </div>
        </div> 
      </div>
      <div 
          id='toggle-modal'
          className={
          isVisible
          ?
          styles.menu + ' ' + styles.visible 
          :
          styles.menu
          }>  
          <button
            id='open-modal'
            className={styles.closeBtn}
          >
            <Image src={CloseSvg} alt='close'/>
          </button>
          <div id='toggle-modal' className={styles.menuСhapter}>
            <Link href={'/info'} className={styles.chapterLink}>
              NN INFO
            </Link>
            <div id='toggle-modal' className={styles.list}>
              {
                listNNInfo.map((link) => {
                  return (
                    <Link 
                    key={link.href}
                    className={styles.link} 
                    href={link.href}>
                      {link.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div id='toggle-modal' className={styles.menuСhapter}>
            <div id='toggle-modal' className={styles.chapterTitle}>
            Invest
            </div>
            <div id='toggle-modal' className={styles.list}>
              {
                listInvest.map((link) => {
                  return (
                    <Link 
                    key={link.href}
                    className={styles.link} 
                    href={link.href}>
                      {link.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div id='toggle-modal' className={styles.chapters}>
              {
                links.map((link) => {
                  if(link.type === 'a'){
                    return (
                      <a
                      className={styles.chapterLink}
                      target='_blank'
                      href={link.href}
                      >
                        {link.name}
                      </a>
                    )
                  }

                  return (
                    <Link 
                    key={link.href}
                    href={link.href} 
                    className={styles.chapterLink}>
                      {link.name}
                    </Link>
                  )
                })
              }
          </div>
       </div>
    </div>
  )
}
