import styles from './project-card.module.scss'
import Image from 'next/image'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import heartSvg from '../../icons/heart.svg'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import parseFunded from '../../../utils/parseFunded'
import favourites from '../../../services/favourites'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../../store/slices/authSlice'
import { toggleModal, toggleModalWithoutBlock } from '../../../store/slices/modalsSlice'
import shareSvg from '../../../assets/icons/share.svg'
import shareLinkSvg from '../../../assets/icons/share-link.svg'
import telegramSvg from '../../../assets/icons/telegram.svg'
import twitterSvg from '../../../assets/icons/twitter.svg'
import loader from '../../../utils/loader'
import { TelegramShareButton,TwitterShareButton} from 'react-share';
import { url } from '../../../config/api'
import icons from '../../icons/socialmedia/socialmedia'

export default function ProjectCard({modalHandler,project}) {
    const shareModalState = useSelector((state) => state.modals.share.state)
    const userData = useSelector((state) => state.auth.userData)
    const progress = useMemo(() => {
        return project?.funded && parseFunded(project.funded)
    },[project])
    const dispatch = useDispatch()
    
    const addProject = async () => {
        if(!userData.isAuth){
            dispatch(toggleModal('wallet'))
            return
        }

        if(userData?.favourites?.includes(project._id)) return

        const updatedUserData = {...userData,favourites:[...userData.favourites,project._id]}
        dispatch(setUserData(updatedUserData))
        
        const {success} = await favourites(project._id,userData.address)
        if(success){
            modalHandler(null,true)
        }
    }

    const shareReferral = async () => {
        const result = await navigator.share({
            url:`${url}/${project.path}/${project._id}`,
            text:"Noname referral link"
        })
    }

    const router = useRouter()
    
  return (
    <div className={styles.container}>
    <div className={styles.body}>
        <div className={styles.banner}>
            <span className={styles.important}>Important:</span>
            <span>{project.banner}</span>
        </div>
        <div className={styles.row}>
            <div className={styles.img}>
                <Image loader={() => loader(project.img)} width={'84'} height={'84'} src={project.img} alt={project.title}/>
            </div>
            <div className={styles.info}>
                <div className={styles.infoRow}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.status}>{project.status}</div>
                        <div className={styles.socialmedia}>
                            {
                            project.socialmedia?.length 
                            ?
                            project.socialmedia.map((item,index) => {
                                if(item.alt.includes('web')){
                                    return (
                                        <a key={index} href={item.link} target={'_blank'}>
                                            <Image width={'20'} height={'18'} src={icons.web} alt={item.alt}/>
                                        </a>
                                    )
                                }
                                return (
                                    <a key={index} href={item.link} target={'_blank'}>
                                        <Image width={'20'} height={'18'} src={icons[item.alt]} alt={item.alt}/>
                                    </a>
                                )
                            })
                            :
                            <></>
                            }
                        </div>
                    </div>
                    <div className={styles.shareBtn}>
                        <button onClick={() => dispatch(toggleModalWithoutBlock('share'))}>
                            <Image src={shareSvg} alt='share'/>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
                <div className={styles.infoTitleBlock}>
                    <div className={styles.infoTitle}>{project.title}</div>
                </div>
                <div className={styles.infoDescription}>
                    {project.description}
                </div>
            </div>
        </div>
        <div className={styles.details}>
        <div className={styles.dates}>
            <div className={styles.startDate}>
                <span className={styles.key}>Start date: </span>
                <span className={styles.value}>{project.dateStart}</span>
            </div>
            <div className={styles.endDate}>
                <span className={styles.key}>End date: </span>
                <span className={styles.value}>{project.dateEnd}</span>
            </div>
        </div>
        <div className={styles.investments}>
        <div className={styles.startDate}>
                <span className={styles.key}>Min.investment: </span>
                <span className={styles.value}>{`$${project.minInvest}`}</span>
            </div>
            <div className={styles.endDate}>
                <span className={styles.key}>Max.investment: </span>
                <span className={styles.value}>{`$${project.maxInvest}`}</span>
            </div>
        </div>
        </div>
        <div className={styles.btns}>
            <SquareBtn
            handler={() => dispatch(toggleModal('offers'))} 
            // handler={() => router.push(`/participate/${project.path}/${project._id}`)} 
            text={'Participate'} width={'524'}/>
            <button onClick={addProject} type={'button'} className={styles.likeBtn}>
                <Image src={heartSvg} alt='btn'/>
            </button>                   
        </div>
        <div 
        className={
            shareModalState 
            ? 
            styles.shareModal + ' ' + 'open-modal'
            :
            styles.shareModal
        }>
            <button onClick={shareReferral} className={styles.shareButton}>
                <Image src={shareLinkSvg} alt='share-referral'/>
                <span>Share referral link</span>
            </button>
                <TelegramShareButton url={`${url}/${project.path}/${project._id}`}>
                <Image src={telegramSvg} alt='share-telegram'/>
                <span>Telegram</span>
                </TelegramShareButton>
            <TwitterShareButton
            url={`${url}/${project.path}/${project._id}`}
            >
                <Image src={twitterSvg} alt='share-twitter'/>
                <span>Twitter</span>
            </TwitterShareButton>
        </div>
    </div>

    <hr className={styles.line}/>

    <div className={styles.progress}>
      <div className={styles.progressRow}>
        <div className={styles.rowItem}>
            <span className={styles.key}>Field:</span>
            <span className={styles.value}>{project.field}</span>                    
        </div>
        <div className={styles.rowItem}>
            <span className={styles.key}>Funding goal:</span>
            <span className={styles.goalValue}>{project.goal}</span>                    
        </div>
      </div>
      <div className={styles.progressBar}>
        <div style={{width:`${progress ? progress : 0}%`}} className={styles.progressBarBody}>

        </div>
      </div>
    </div>    
    <div className={styles.funded}>
        <span className={styles.key}>Funded:</span>                    
        <span className={styles.textBlue}>{project.funded}</span>                    
    </div>

    <hr className={styles.line}/>

    </div>
  )
}
