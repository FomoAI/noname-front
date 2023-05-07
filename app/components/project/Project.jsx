import { useMemo, useState ,useEffect} from 'react'
import parseFunded from '../../utils/parseFunded'
import styles from '../styles/project.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import loader from '../../utils/loader'
import useDates from '../../hooks/useDates'
import hiddenSvg from '../../assets/icons/hidden.svg'
import { useSelector } from 'react-redux'

const getProjectPath = (path) => {
    if(path === 'realestate'){
        return 'realestate'
    }
    return path
}

export default function Project({type,project,index,filter}) {
    const [time,setTime] = useState({d:0,h:0,m:0})
    const {days,hours,minutes} = useDates(project.dateStart,project.timeStart,project.status === 'Upcoming')
    const isAuth = useSelector((state) => state.auth.userData.isAuth)
    const progress = useMemo(() => {
        return project?.funded && parseFunded(project.funded)
    },[project])
    const router = useRouter()

    const navigation = () => {
        router.push(`/${getProjectPath(project.path)}/${project._id}`)
    }

    useEffect(() => {
        setTime({
            d:days,
            h:hours,
            m:minutes
        })
    },[days,hours,minutes])

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
                        </div>
                        <div className={styles.titleBox}>
                            <div className={styles.title}>
                            {project.title}
                            </div>
                         
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
                    <div className={styles.colum}>
                        <div className={styles.info}>
                            <div className={styles.dates}>
                                <span>{project.dateStart}</span>
                                <span>-</span>
                                <span>{project.dateEnd}</span>
                            </div>
                        </div>
                        <div className={styles.titleBox}>
                            <div className={styles.title}>
                            {project.title}
                            </div>
                         
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
