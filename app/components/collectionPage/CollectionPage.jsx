import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch,useSelector } from 'react-redux'
import { openModal } from '../../store/slices/modalsSlice'
import CollectionInfo from '../../assets/components/collectionInfo/CollectionInfo'
import NftSearchBar from '../../assets/components/nftSearchBar/NftSearchBar'
import NftFilter from '../../assets/components/nftFilter/NftFilter'
import SmartCopy from '../../assets/components/smartContractCopy/SmartCopy'
import Nft from '../../components/nft/Nft'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import styles from '../styles/collection-page.module.scss'



export default function CollectionNftsPage({data,isNftPage}) {
    const [nftsValue,setNftsValue] = useState(16)
    const [isMaxNfts,setIsMaxNfts] = useState(data?.nfts.length < 16)
    const [searchValue,setSearchValue] = useState('')
    const [filters,setFilters] = useState({
        rarity:{
            min:0,
            max:100
        },
        price:{
            min:0,
            max:150
        },
        share:{
            min:0,
            max:100
        },
        rank:''
    })    
    const isAuth = useSelector((state) => state.auth.userData.isAuth)
    const router = useRouter()
    const dispatch = useDispatch()

    const filterHandler = (name,value) => {
        setFilters((prev) => {
            return {...prev,[name]:value}
        })
    }

    const searchHandler = (value) => {
        setSearchValue(value)
    }
   
    const filterNfts = (nfts,filters) => {
        const filterResult = nfts.filter((nft) => {
            const isValid = [];
          
            isValid.push(nft.rarity >= filters.rarity.min && nft.rarity <= filters.rarity.max) 
            
            isValid.push(nft.price >= filters.price.min && nft.price <= filters.price.max) 

            isValid.push(nft.share >= filters.share.min && nft.share <= filters.share.max)

            if(filters.rank){
                for (let i = 0; i < nft.attributes.length; i++) {
                    const attribute = nft.attributes[i]
                    if(attribute.trait_type === 'rarity'){
                        isValid.push(attribute.value.toLowerCase() === filters.rank.toLowerCase()) 
                    }
                }
            }

            return isValid.every((value) => value)
        })
        return filterResult
    }

    const showMoreNfts = () => {
        setIsMaxNfts((nftsValue + 16) >= data?.nfts.length)
        setNftsValue((prev) => prev += 16)
    }

    const filteredAndFindedNfts = useMemo(() => {
        const findedNfts = data.nfts.filter((nft) => {
            return nft.name.toLowerCase().includes(searchValue.toLowerCase())
        })
 
        const filteredNfts = filterNfts(findedNfts,filters)

        return filteredNfts.slice(0,nftsValue)
    },[filters,searchValue,nftsValue])

  return (
    <div className={styles.body}>
        <CollectionInfo 
        nftId={data.nftId}
        isNftPage={isNftPage}
        collectionData={data}
        />
        <div className={styles.actionsRow}>
                <div className={styles.filterAndSort}>
                    <NftFilter
                    handler={filterHandler}
                    />
                    <NftSearchBar
                    value={searchValue}
                    handler={searchHandler}
                    />
                </div>
                <div className={styles.smartAndOrder}>
                    <SmartCopy address={data.smart}/>
                </div>
        </div>
        <div className={styles.nfts}>
            {
                filteredAndFindedNfts.length
                ?
                filteredAndFindedNfts.map((nft) => {
                    return (
                        <Nft 
                        key={nft._id} 
                        nft={nft}
                        />
                    )
                })
                :
                <div className={styles.notFounded}>
                    Nothing found...
                </div>
            }
        </div>
        {
            isMaxNfts
            ?
            <>
            </>
            :
            <div className={styles.moreBtnWrapper}>
                <button onClick={showMoreNfts} className={styles.moreBtn}>
                    More {'>'}
                </button>
            </div>
        }

    </div>
  )
}
