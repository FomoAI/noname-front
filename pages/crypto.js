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
  <div>
    <p>
      Cryptocurrency is a highly volatile asset. Mostly it is a short-term investment.
      It allows users to multiply their money, sometimes easily. However, as mentioned 
      it is volatile, which makes it very risky and there is a good chance to lose big. 
      It is no secret that any cryptoproject can go bankrupt overnight.
    </p>
    <p>
      With No name those risks will be significantly lowered as we would not offer you a 
      project in which we would not invest. 
    </p>
  </div>
  <div>
    <p className='no-margin'>
      No name has an experienced team that has been in crypto since 2017.
      We are responsible for every choice we make about offering a project to invest in. 
    </p>
    <p className='no-margin'>
      No name offers you a gem which will go to the moon.
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

