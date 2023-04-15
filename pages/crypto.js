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
    const {projects} = await fetchProjects('crypto')
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
  title:'Crypto',
  description:
  `
  <div className='center-text'>
    <p>
      In this section you will find crypto startups which are based on one
      of the best Layer 2 solutions - zkSynk. Choose the best for you and
      invest using our simple interface. Also, here you will find other 
      interesting and beneficial cryptoprojects which fit our understanding
      of a qualitative and safe project. Only the best offers here.
    </p>
  </div>
  `
}


  return (
    < >
      <HeadBlock title={'Crypto'}/>
      <Layout>
        {/* <Main 
        info={pageInfo}
        type={'Crypto'} 
        /> */}
        <Hidden>
        A bit of patience... coming soon
        </Hidden>
      </Layout>
    </>
  )
}

