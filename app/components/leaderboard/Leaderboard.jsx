import { useSelector } from "react-redux"
import Info from "../../assets/components/info/Info"
import MyScore from "../../assets/components/myScore/MyScore"
import LeaderboardTable from "../../assets/components/leaderboardTable/LeaderboardTable"
import ProjectsStats from "../../assets/components/projectsStats/ProjectsStats"
import Hidden from "../../assets/components/HiddenComponent/Hidden"
import styles from '../styles/leaderboard.module.scss'
import useProjects from "../../hooks/useProjects"
import Loader from '../../assets/components/loader/Loader'

export default function Leaderboard() {
  const userData = useSelector((state) => state.auth.userData)
  const {allProjects,loading} = useProjects({})

  if(loading) return <Loader/>

  return (
    userData.isAuth
    ? 
    <div className={styles.marginTop}>
        <Info 
        title={'Leaderboard'} 
        text={'The most active and successful members of No name community'}
        />
        <div className={styles.wrapper}>
            <MyScore userData={userData}/>
            <LeaderboardTable/>
        </div>
        <div className={styles.projectStats}>
          <ProjectsStats projects={allProjects}/>
        </div>
    </div>
    :
    <Hidden>
        Please, connect wallet to use Leaderboard
    </Hidden>
  )
}
