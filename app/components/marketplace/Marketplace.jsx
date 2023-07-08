import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import Image from 'next/image'
import Info from '../../assets/components/info/Info'
import CollectionsFilter from '../../assets/components/collectionsFilter/CollectionsFilter'
import Collections from '../collections/Collections'
import ListForSale from '../../assets/components/ListForSale/ListForSale'
import listForSaleSvg from '../../assets/icons/listForSale.svg'
import styles from '../styles/marketplace.module.scss'

const nfts = [
    {
        eth_price:1.8,
        price:100,
        _id:'aadfgdafsg5',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
        eth_price:1.8,
        price:100,
        _id:'aadfgdafsg4',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
        eth_price:1.8,
        price:100,
        _id:'aadfgdafsg3',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
        eth_price:1.8,
        price:100,
        _id:'aadfgdafsg2',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
        eth_price:1.8,
        price:100,
        _id:'aadfgdaf2sg2',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
        eth_price:1.8,
        price:100,
        _id:'aadf12gdaf2sg2',
        "description":"description.",
        "external_url":"http://209.250.240.97/nft_photo/143.png",
        "image":"http://209.250.240.97/nft_photo/143.png",
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
]

// const collectionsInitialState = [
//     {
//         _id:'123123',
//         filter:'nonamekey',
//         projectData:{},
//         name:'No name key',
//         nfts:nfts,
//         isPinned:true
//     },
//     {
//         _id:'dfg',
//         filter:'crypto',
//         projectData:{},
//         name:'No name key 2',
//         nfts:nfts,
//         isPinned:true
//     },
//     {
//         _id:'gg1',
//         filter:'business',
//         projectData:{},
//         name:'No name key 3',
//         nfts:nfts,
//         isPinned:true
//     },
//     {
//         _id:'765643',
//         filter:'zksync',
//         projectData:{},
//         name:'No name key 4',
//         nfts:nfts,
//         isPinned:false
//     },
//     {
//         _id:'6346',
//         filter:'crypto',
//         projectData:{},
//         name:'No name key 5',
//         nfts:nfts,
//         isPinned:false
//     },
// ]

export default function Marketplace({collectionsData}) {
    const [collections,setCollection] = useState(collectionsData)
    const listForSaleVisible = useSelector((state) => state.modals.listForSale.state)
    const dispatch = useDispatch() 

    const filterCollections = (filterValue) => {
        if(filterValue === 'all'){
            setCollection(collectionsData)

            return
        }

        const filteredCollections = collectionsData.filter((collection) => {
            return collection.type === filterValue
        })

        setCollection(filteredCollections)
    }

    const modalHandler = (event) => {
        if(event.target.id === 'toggle-modal'){
            dispatch(toggleModal('listForSale'))
        }
    }

  return (
    <>
    <div className={styles.body}>
        <Info
        title={'NFT Market'}
        />
        <div className={styles.subTitle}>
        NFTs marketplace for zkSync projects where you can buy/sell your NFT.
        </div>
        <div className={styles.description}>
        No name has developed its own NFT Marketplace so you can easily trade your NFTs. 
        You no longer have  to look for other places to trade. No name has everything 
        you need for comfortable investing and dealing with your assets. 
        </div>
        <div className={styles.collectionsWrapper}>
            <div className={styles.head}>
                <CollectionsFilter
                handleFilterChange={filterCollections}
                />
                <button 
                onClick={() => dispatch(toggleModal('listForSale'))} 
                className={styles.listBtn}>
                    <span>List for sale</span>
                    <Image src={listForSaleSvg} alt='list for sale'/>
                </button>
            </div>
            <div className={styles.collections}>
                {
                    collections.length 
                    ?
                    <Collections collections={collections}/>
                    :
                    <div className={styles.notFound}>
                    Not found collections with current filter...
                    </div>
                }
            </div>
        </div>
    </div>
    <ListForSale 
    isVisible={listForSaleVisible} 
    handler={modalHandler}
    />
    </>
  )
}
