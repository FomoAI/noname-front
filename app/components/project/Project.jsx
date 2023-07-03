import { useMemo, useState ,useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setUserData } from '../../store/slices/authSlice'
import favourites from '../../services/favourites'
import Image from 'next/image'
import parseFunded from '../../utils/parseFunded'
import loader from '../../utils/loader'
import useDates from '../../hooks/useDates'
import hiddenSvg from '../../assets/icons/hidden.svg'
import starSvg from '../../assets/icons/star.svg'
import heartSvg from '../../assets/icons/heart.svg'
import heartFillSvg from '../../assets/icons/heartFill.svg'
import styles from '../styles/project.module.scss'
import { ColorRing } from  'react-loader-spinner'

export default function Project({type,project,index,filter,inDashboard}) {
    const [loading,setLoading] = useState(false)
    const [time,setTime] = useState({d:0,h:0,m:0})
    const {days,hours,minutes} = useDates(project.dateStart,project.timeStart,project.status === 'Upcoming')
    const user = useSelector((state) => state.auth.userData)
    const isAuth = useSelector((state) => state.auth.userData.isAuth)
    const isFavourite = user?.favourites?.includes(project._id)
    const dispatch = useDispatch()
    const router = useRouter()

    const navigation = (event) => {
        if(event.target.id === 'btn' || inDashboard) return

        router.push(`/${project.path}/${project._id}`)
    }

    const toggleProjectWaitingList = async (selectedProject) => {
        setLoading(true)

        const {success} = 
        await favourites(selectedProject._id,user.address,isFavourite ? 'remove' : 'create')

        setLoading(false)

        if(!success) return

        let changedFavourites;

        if(isFavourite){
            changedFavourites = user.favourites.filter((projectId) => {
                return projectId !== selectedProject._id
            })
        }else{
            changedFavourites = [...user.favourites,selectedProject._id]
        }

        dispatch(setUserData({...user,favourites:changedFavourites}))
    }

    const progress = useMemo(() => {
        return project?.funded && parseFunded(project.funded)
    },[project])

    useEffect(() => {
        setTime({
            d:days,
            h:hours,
            m:minutes
        })
    },[days,hours,minutes])

    if(loading){
        return (
            <div className={styles.project + ' ' + styles.loading}>
                <ColorRing
                visible={true}
                height="110"
                width="110"
                wrapperClass="blocks-wrapper"
                colors={['#FF507D', '#FF507D', '#FF507D', '#FF507D', '#FF507D']}
                />
            </div>
        )
    }
   
  return (
    project.hidden && !isAuth
    ?
    <div className={styles.projectWrapper}>
        <div className={styles.hiddenImg}>
            <Image src={hiddenSvg} alt='hidden'/>
        </div>
        <div className={styles.project + " " + styles.hidden}>
        <div className={styles.rows}>
            <div className={styles.row}>
                <div className={styles.colums}>
                    <div className={styles.colum}>
                        <Image loader={() => loader(project.img)} width={'64'} height={'64'} alt={'img' + index} src={project.img}/>
                    </div>
                    <div className={styles.colum}>
                        <div className={styles.info}>
                            <div className={styles.dates}>
                                <span>{project.dateStart}</span>
                                <span>-</span>
                                <span>{project.dateEnd}</span>
                            </div>
                            <div className={styles.rating}>
                            {new Array(project.rating).fill('1').map((item,index) => {
                                return <Image key={index} src={starSvg} alt='rating'/>
                            })}
                            </div>
                        </div>
                        <div className={styles.titleBox}>
                            <div className={styles.title}>
                            {project.title}
                            </div>
                            <button className={styles.waitingListBtn}>
                                <Image src={heartSvg} alt='heart'/>
                            </button>
                        </div>
                        <div className={styles.description}>
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.colums}>
                    <div className={styles.colum}>
                        <span className={styles.key}>Field: </span>
                        <span className={styles.value}>{project.field}</span>
                    </div>
                    <div className={styles.colum}>
                        <span className={styles.key}>Funding goal: </span>
                        <span className={styles.value}>{project.goal}</span>
                    </div>
                </div>
            </div>
            <hr className={styles.line}/>
            {
                filter === 'Upcoming'
                ?
                <div className={styles.starts}>
                    {`${time.d}d ${time.h}h ${time.m}m`}
                </div>
                :
                <>
                <div className={styles.row}>
                    <div className={styles.progressBar}>
                        <div style={{width:`${progress}%`}} className={styles.progressValue}></div>
                    </div>
                </div>
                <div className={styles.rowLast}>
                    <div className={styles.colums}>
                        <div className={styles.columLast}>
                            <span className={styles.key}>Funded: </span>
                            <span className={styles.textBlue}>{project.funded}</span>
                        </div>
                    </div>
                </div>
                </>
            }
            {
                project?.investments 
                &&
                <>
                <hr className={styles.line}/>
                <div className={styles.investments}>
                    <span className={styles.key}>My investments: </span>
                    <span className={styles.value}>{project.investments}</span>
                </div>
                </>
            }
        </div>
        </div>
    </div>
    :
    <div onClick={navigation} className={styles.project}>
        <div className={styles.rows}>
            <div className={styles.row}>
                <div className={styles.colums}>
                    <div className={styles.colum}>
                        <Image loader={() => loader(project.img)} width={'64'} height={'64'} alt={'img' + index} src={project.img}/>
                    </div>
                    <div className={styles.colum + ' ' + styles.infoColumn}>
                        <div className={styles.info}>
                            <div className={styles.dates}>
                                <span>{project.dateStart}</span>
                                <span>-</span>
                                <span>{project.dateEnd}</span>
                            </div>
                            <div className={styles.rating}>
                            {new Array(project.rating).fill('1').map((item,index) => {
                                return <Image key={index} src={starSvg} alt='rating'/>
                            })}
                            </div>
                        </div>
                        <div className={styles.titleBox}>
                            <div className={styles.title}>
                            {project.title}
                            </div>
                            {
                                !inDashboard
                                ?
                                <button 
                                className={styles.waitingListBtn}
                                onClick={() => toggleProjectWaitingList(project)}
                                >
                                    {
                                        user?.favourites?.includes(project._id)
                                        ?
                                        <Image 
                                        id='btn'
                                        src={heartFillSvg} 
                                        alt='heart'/>
                                        :
                                        <Image 
                                        id='btn'
                                        src={heartSvg} 
                                        alt='heart'/>
                                    }
    
                                </button>
                                :
                                <></>
                            }

                        </div>
                        <div className={styles.description}>
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.colums}>
                    <div className={styles.colum}>
                        <span className={styles.key}>Field: </span>
                        <span className={styles.value}>{project.field}</span>
                    </div>
                    <div className={styles.colum}>
                        <span className={styles.key}>Funding goal: </span>
                        <span className={styles.value}>{project.goal}</span>
                    </div>
                </div>
            </div>
            <hr className={styles.line}/>
            {
                filter === 'Upcoming'
                ?
                <div className={styles.starts}>
                    {`${time.d}d ${time.h}h ${time.m}m`}
                </div>
                :
                <>
                <div className={styles.row}>
                    <div className={styles.progressBar}>
                        <div style={{width:`${progress}%`}} className={styles.progressValue}></div>
                    </div>
                </div>
                <div className={styles.rowLast}>
                    <div className={styles.colums}>
                        <div className={styles.columLast}>
                            <span className={styles.key}>Funded: </span>
                            <span className={styles.textBlue}>{project.funded}</span>
                        </div>
                    </div>
                </div>
                </>
            }
            {
                project?.investments 
                &&
                <>
                <hr className={styles.line}/>
                <div className={styles.investments}>
                    <span className={styles.key}>My investments: </span>
                    <span className={styles.value}>{project.investments}</span>
                </div>
                </>
            }
        </div>
    </div>
  )
}
