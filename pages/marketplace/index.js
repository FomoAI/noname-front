import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import fetchProjects from '../../app/services/fetchProjects.js'
import {setProjects} from '../../app/store/slices/allProjects'
import Hidden from '../../app/assets/components/HiddenComponent/Hidden'
import Marketplace from '../../app/components/marketplace/Marketplace'

// export async function getServerSideProps() {
//   const {projects} = await fetchProjects('donates')
  
//   return { props: { projects } }
// }


export default function donates({projects}) {

  const dispatch = useDispatch()

  return (
    <>
    <HeadBlock title={'NFT Marketplace'}/>
    <Layout>
      <Marketplace/>
    </Layout>
    </>
  )
}
