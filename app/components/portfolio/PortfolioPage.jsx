import styles from '../styles/portfolio.module.scss'
import Info from '../../assets/components/info/Info'
import Project from '../project/Project'
import Hidden from '../../assets/components/HiddenComponent/Hidden'
import StakingBlock from '../staking/StakingBlock'
import { useSelector } from 'react-redux'

export default function PortfolioPage() {
  const myProjects = useSelector((state) => state.myProjects)

  const isAuth = useSelector((state) => state.auth.userData.isAuth)

  if(!isAuth){
    return (
      <Hidden>
        Please, connect wallet to use Dashboard
      </Hidden>
    )
  }

  return (
    <main className={styles.body}>
      <Info title={'My projects'} text={'Projects that I have invested in'}/>
      <div className={styles.projects}>
        {myProjects.map((project) => {
            return <Project key={project.id} project={project} inDashboard={true}/>
        })}
      </div>
      <StakingBlock/>
    </main>
  )
}
