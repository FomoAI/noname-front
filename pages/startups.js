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
  title:'Startups',
  description:
  `
  <div>
    <p>
      The definition for startup is a company in the first
      stages of operations. Startups are founded by one or 
      more entrepreneurs who want to develop a product or 
      service for which they believe there is demand.
    </p>
    <p>
      Investments in successful startups have the potential
      to deliver returns in excess of 10x money on money. 
      However, as with all investments, there's also the 
      risk that a business does not perform as expected 
      resulting in potential losses.
    </p>
  </div>
  <div>
    <b>
      There are several reasons to invest in startup: 
    </b>
    <ul>
     <li>an attractive valuation at early stage;</li>
     <li>a successful startup can potentially 
     change an industry and be highly profitable.</li>
    </ul>
    <p>
      Who knows, maybe that one of the startups that 
      are offered at No name will be the next Google or Apple.
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
        type={'Startup'} 
        />
      </Layout>
    </>
  )
}

