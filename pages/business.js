import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Main from '../app/components/main/Main'
import fetchProjects from '../app/services/fetchProjects.js'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'
import Hidden from '../app/assets/components/HiddenComponent/Hidden'

export async function getServerSideProps() {
  try{
    const {projects} = await fetchProjects('realestate')
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
  title:'Business',
  description:
  `
  <div class="center-text">
    <p> 
    Find the most appealing asset for you to invest in. We ensure the best mid-term and long term projects, 
    choosing from real estate projects and various startups. 
    </p>
  </div>
  `
}

  return (
    < >
      <HeadBlock title={'Business'}/>
      <Layout>
        {/* <Main 
        info={pageInfo}
        type={'Business'} 
        /> */}
        <Hidden>
          A bit of patience... coming soon
        </Hidden>
      </Layout>
    </>
  )
}

