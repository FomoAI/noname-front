import styles from '../styles/waiting.module.scss'
import WaitingList from '../waitingList/WaitingList'

export default function WaitingPage({allProjects}) {
  return (
    <main className={styles.list}>
        <WaitingList allProjects={allProjects}/>
    </main>
  )
}
