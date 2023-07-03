import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../../app/components/layout/index'
import HeadBlock from '../../../app/components/head/Head'
import fetchProjects from '../../../app/services/fetchProjects.js'
import {setProjects} from '../../../app/store/slices/allProjects'
import CollectionNftsPage from '../../../app/components/collectionPage/CollectionPage'
import icons from '../../../app/assets/icons/socialmedia/socialmedia'

const nfts = [
  {
      rarity:80,
      share:40,
      price:56,
      _id:'aadfgdafsg5',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/143.png",
      "image":"http://209.250.240.97/nft_photo/3.png",
      "name":"Test NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Blue"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
  {
      rarity:60,
      share:70,
      price:96,
      _id:'aadfgdafsg4',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/1.png",
      "image":"http://209.250.240.97/nft_photo/143.png",
      "name":"My NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Blue"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
  {
      rarity:60,
      share:60,
      price:26,
      _id:'aadfgdafsg3',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/6.png",
      "image":"http://209.250.240.97/nft_photo/9.png",
      "name":"NoName NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Blue"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
  {
      rarity:60,
      share:30,
      price:6,
      _id:'aadfgdafsg2',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/143.png",
      "image":"http://209.250.240.97/nft_photo/8.png",
      "name":"NoName NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Blue"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
  {
      rarity:10,
      share:10,
      price:90,
      _id:'aadfgdaf2sg2',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/143.png",
      "image":"http://209.250.240.97/nft_photo/15.png",
      "name":"NoName NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Blue"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
  {
      rarity:60,
      share:20,
      price:5,
      _id:'aadf12gdaf2sg2',
      "description":"description.",
      "external_url":"http://209.250.240.97/nft_photo/143.png",
      "image":"http://209.250.240.97/nft_photo/63.png",
      "name":"NoName NFT #143",
      "attributes":
      [
          {"trait_type":"rarity","value":"Black"},
          {"trait_type":"Background","value":"blue"},
          {"trait_type":"Body","value":"Body 7"},
          {"trait_type":"Shoes","value":"Boots 2"},
          {"trait_type":"Head","value":"Cap 2"},
          {"trait_type":"Vest","value":"Blazer 1"},
          {"trait_type":"Coat","value":"Coat 1"},
          {"trait_type":"Accessory","value":"Watch 2"},
          {"trait_type":"Suitcase","value":"None"}
      ]
  },
]

const collectionInitialState = {
  rarity:60,
  price:56,
  _id:'123123',
  filter:'nonamekey',
  projectData:{},
  name:'No name key',
  nfts:nfts,
  isPinned:true
}

const data = {  
  _id:'640383195a70f9e2afb02e30', 
  id:1901,
  dateStart:'22.11.2022',
  timeStart:'24:00',
  timeEnd:'24:00',
  investments:'$100.00 (15.018%)',
  path:'donate',
  isClosed:false,
  dateEnd:'01.01.2022',
  title:'SharkRace Club',
  description:'Short description in one line...',
  field:'Field name',
  goal:'$1,8M',
  img:'/img1.jpg',
  funded:'$2.72 (25%)',
  lastFunding:'Mar 8, 2022',
  type:'Seed',
  rating:3,
  status:'Active',
  socialmedia:[
      {
          icon:icons.medium,
          alt:'Medium',
          link:'/'
      },
      {
          icon:icons.telegram,
          alt:'Telegram',
          link:'/'
      },
      {
          icon:icons.tikTok,
          alt:'tikTok',
          link:'/'
      },
      {
          icon:icons.discord,
          alt:'discord',
          link:'/'
      },
      {
          icon:icons.facebook,
          alt:'facebook',
          link:'/'
      },
      {
          icon:icons.instagram,
          alt:'instagram',
          link:'/'
      },
      {
          icon:icons.twitter,
          alt:'twitter',
          link:'/'
      },
  ],
  projectImg:'/dimg3.jpg',
  descriptionFull:
  `
  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
   officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
   est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
   Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
   officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
   est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
    officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
    est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
    consequat duis enim velit mollit.Amet minim mollit non deserunt
   ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
  `,
  investors:[
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager I',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager I',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager I',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager I',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager I',
      },
  ],
  team:[
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager T',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager T',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager T',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager T',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager T',
      },
  ],
  partners:[
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager P',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager P',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager P',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager P',
      },
      {
          img:'/img1.jpg',
          name:'Dr. Laurent El Ghaul',
          text:'Business manager P',
      },
  ],
  links:[
      {
          name:'ArcBlock Rating Review',
          link:'/'
      },
      {
          name:'ArcBlock Coin Guide',
          link:'/'
      },
  ],
  collection:collectionInitialState,
  statistics:{
      marketCap:'$1.38 M',
      supply:10000,
      listed:400,
      owners:394,
      totalVolume:1000,
      mintPrice:100,
      royaltyFee:0.5,
      revenue:15
  }
}

export default function CollectionPage() {
  return (
    <>
    <HeadBlock title={'NFT Marketplace - Collection'}/>
    <Layout>
      <CollectionNftsPage data={data}/>
    </Layout>
    </>
  )
}
