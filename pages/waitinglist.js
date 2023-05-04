import HeadBlock from '../app/components/head/Head'
import WaitingPage from '../app/components/waitingPage/WaitingPage'
import Layout from '../app/components/layout/index'
import fetchProjects from '../app/services/fetchProjects'

export async function getServerSideProps() {
  const {projects} = await fetchProjects()  
  const donates = await (await fetchProjects('donates')).projects
  const crypto = await (await fetchProjects('crypto')).projects
  const realestate = await (await fetchProjects('realestate')).projects
  
  return { props: { projects ,donates,crypto,realestate} }
}

export default function WaitingList({projects,donates,crypto,realestate}) {

  return (
    < >
      <HeadBlock title={'Waiting list'}/>
      <Layout>
        <WaitingPage allProjects={[...projects,...donates,...crypto,...realestate]}/>
      </Layout>
    </>
  )
}
