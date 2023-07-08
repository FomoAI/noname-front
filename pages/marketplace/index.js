import { useDispatch } from 'react-redux'
import getCollections from '../../app/services/getCollections'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import Marketplace from '../../app/components/marketplace/Marketplace'

export async function getServerSideProps() {
  const {collections} = await getCollections()
  
  return { props: { collections } }
}


export default function MarketplacePage({collections}) {
  const dispatch = useDispatch()

  return (
    <>
    <HeadBlock title={'NFT Marketplace'}/>
    <Layout>
      <Marketplace collectionsData={collections}/>
    </Layout>
    </>
  )
}
