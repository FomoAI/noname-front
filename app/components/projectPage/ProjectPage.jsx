import { useRouter } from 'next/router'
import { useDispatch,useSelector } from 'react-redux'
import { toggleModal ,closeModal} from '../../store/slices/modalsSlice'
import styles from '../styles/project-page.module.scss'
import ProjectCard from '../../assets/components/projectCard/ProjectCard'
import ProjectInfoBlock from '../../assets/components/projectInfoBlock/ProjectInfoBlock'
import ProjectFilter from '../../assets/components/projectFilter/ProjectFilter'
import ProjectLinks from '../../assets/components/projectLinks/ProjectLinks'
import AboutCompany from '../../assets/components/AboutComapany/AboutCompany'
import BecomeParticipant from '../../assets/components/becomeParticipant/BecomeParticipant'
import Accordion from '../accordion/Accordion'
import RecommendedNews from '../recommended/RecommendedNews'
import Modal from '../../assets/components/modal/Modal'
import Success from '../../assets/components/success/Success'
import useModal from '../../hooks/useModal'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import OffersModal from '../../assets/components/offersModal/OffersModal'

const filtersInitialState = [
  {
      title:'Investors',
      isSelect:true,
  },
  {
      title:'Team',
      isSelect:false,
  },
  {
      title:'Partners',
      isSelect:false,
  },
]

export default function ProjectPage({project}) {
  const {state,modalHandler} = useModal()
  const dispatch = useDispatch()
  const isBuyModal = useSelector((state) => state.modals.offers.state)
  const userData = useSelector((state) => state.auth.userData)
  const router = useRouter()

  const buyModalHandler = (event,data) => {
    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      dispatch(closeModal('offers'))
      return
    }
    if(event !== 'confirm-offers') return

      dispatch(closeModal('offers'))
  }
  
  return (
    <>
    <div className={styles.container}>
    <div className={styles.body}>
        <ProjectCard 
        modalHandler={modalHandler} 
        project={project} 
        />
        <ProjectInfoBlock 
        tags={project.tags}
        img={project?.projectImg ? project?.projectImg : ''} 
        text={project?.descriptionFull ? project?.descriptionFull : ''}
        />
    </div>
    <div className={styles.filtersInfo}>
      <ProjectFilter 
      project={project} 
      filtersInitialState={filtersInitialState}/>  
    </div>
    <div className={styles.about}>
      <AboutCompany project={project}/>
    </div>
    <div className={styles.faq}>
      <Accordion items={project.faq} title={'FAQ'}/>
    </div>
    <div className={styles.risks}>
      <Accordion items={project.risks} title={'Risks'}/>
    </div>
    <div className={styles.recommended}>
      <RecommendedNews news={project.news}/>
    </div>
    <div className={styles.becomeParticipant}>
      <BecomeParticipant 
      modalHandler={modalHandler} 
      project={project}/>
    </div>
    <div className={styles.links}>
      <ProjectLinks links={project.links}/>
    </div>
    </div>
    <Modal handler={buyModalHandler} isVisible={isBuyModal}>
      <OffersModal handler={buyModalHandler}/>
    </Modal>
    <Modal handler={modalHandler} isVisible={state} >
      <Success/>
      <div className={styles.successBtn}>
        <SquareBtn 
        handler={() => router.push(`/waitinglist/${userData._id}`)} 
        width='330' 
        text={'Go to waiting list'}/>
      </div>
    </Modal>
    </>
  )
}
