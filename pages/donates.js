import Layout from '../app/components/layout/index'
import HeadBlock from '../app/components/head/Head'
import Main from '../app/components/main/Main'
import fetchProjects from '../app/services/fetchProjects.js'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'

export async function getServerSideProps() {
  const {projects} = await fetchProjects('donates')
  
  return { props: { projects } }
}


export default function donates({projects}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProjects(projects))
  },[])

  
  const pageInfo = {
    title:'Donates',
    description:
    `
    <div>
      <p>
        Since February of 2022 the war has been devastating Ukrainian lands.
        Lots of cities and villages destroyed. Many people were killed.
        Chaos and destruction is spreading. 
      </p>
      <p>
        <b>
          That is why No name presents section Donates. 
        </b>
      </p>
      <p>
        If you are willing to aid, No name will help you 
        to do it right, to do it efficiently and clearly.
        We take this noble mission seriously because our 
        country is on fire. 
      </p>
    </div>
    <div>
      <p className='no-margin'>
      Here, you can help people, make a real difference 
      for those who are in need. By combining our efforts we can:
      </p>
      <ul>
        <li>help rebuild hospitals;</li>
        <li>help rebuild schools;</li> 
        <li>provide essentials for those who suffer from combat actions (food, medicine etc.);</li> 
        <li>help the wounded with rehabilitation.</li>
      </ul>
      <p>
        We can’t change everything at once, 
        but step by step, together, eventually 
        we are going to make a huge difference.
      </p>
    </div>
    `
  }

  return (
    <>
    <HeadBlock title={'Donates'}/>
    <Layout>
      <Main 
      info={pageInfo}
      type={'Donates'} 
      />
    </Layout>
    </>
  )
}
