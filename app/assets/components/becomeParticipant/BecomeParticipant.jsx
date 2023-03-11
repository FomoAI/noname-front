import styles from './become.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import heartSvg from '../../icons/heart.svg'
import favourites from '../../../services/favourites'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../../store/slices/authSlice'
import Image from 'next/image'
import { useRouter } from 'next/router'


export default function BecomeParticipant({project,modalHandler}) {
    const userData = useSelector((state) => state.auth.userData)
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

    const router = useRouter()

  return (
    <div className={styles.body}>
      <div className={styles.subTitle}>
        Become participant
      </div>
      <div>
        <div className={styles.btns}>
            <SquareBtn 
            handler={() => router.push(`/participate/${project.path}/${project._id}`)} 
            width='524' 
            text={'Participate'} />
            <button onClick={addProject} type={'button'} className={styles.likeBtn}>
                <Image src={heartSvg} alt='btn'/>
            </button>             
        </div>
      </div>
    </div>
  )
}
