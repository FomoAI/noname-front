import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Main from '../app/components/main/Main'
import fetchProjects from '../app/services/fetchProjects.js'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'

export async function getServerSideProps() {
  try{
    const {projects} = await fetchProjects()
    if(!projects){
      return { props: { projects :[]} }   
    }
    return { props: { projects } }
    
  }catch(error){
    return { props: { projects:[] } }
  }
}

export default function Home({projects}) {
  const dispatch = useDispatch()

  useEffect(() => {
    if(projects){
      dispatch(setProjects(projects))
    }else{
      dispatch(setProjects([]))
    }
  },[])

const pageInfo = {
  title:'NFT Launch',
  description:
  `
  <div class="center-text">
    <p>
      The best place for NFT projects to start. Fair terms and conditions for
      IDO and INO. Build your audience, get funding, do the marketing and launch your project with us.
    </p>
  </div>
  `
}

  return (
    < >
      <HeadBlock title={'Home'}/>
      <Layout>    
        <Main 
        info={pageInfo}
        type={'NFT Launch'} 
        />
      </Layout>
    </>
  )
}

