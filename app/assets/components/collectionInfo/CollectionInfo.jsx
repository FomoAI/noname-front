import { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { toggleModal,openModal } from '../../../store/slices/modalsSlice'
import { setUserData } from '../../../store/slices/authSlice'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import favourites from '../../../services/favourites'
import loader from '../../../utils/loader'
import arrowSvg from '../../icons/arrow-rotate.svg'
import heartSvg from '../../icons/heart.svg'
import heartFillSvg from '../../icons/heartFill.svg'
import styles from './collection-info.module.scss'

const timeFilters = [
    '24H',
    '7D',
    '1M',
    '3M',
    '1Y'
]

export default function CollectionInfo({projectData}) {
  const [selectedFilter,setSelectedFilter] = useState('7D')
  const [isTimeFilter,setIsTimeFilter] = useState(false)
  const user = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const router = useRouter()
  
  const isFavourite = user?.favourites?.includes(projectData._id)
  
  const changeFilter = (filter) => {
    setSelectedFilter(filter)
    setIsTimeFilter(false)
  }

  const addToFavourites = async () => {
    if(!user.isAuth){
        dispatch(toggleModal('wallet'))
        return
    }
    
    let changedFavourites;

    if(isFavourite){
        changedFavourites = user.favourites.filter((projectId) => {
            return projectId !== projectData._id
        })
    }else{
        changedFavourites = [...user.favourites,projectData._id]
    }

    dispatch(setUserData({...user,favourites:changedFavourites}))

    const {success} = 
    await favourites(projectData._id,user.address,isFavourite ? 'remove' : 'create')
  }

  const makeOrderHandler = () => {
    if(!user.isAuth){
        dispatch(openModal('wallet'))
        return
    }
    router.push(`/nft/123`)
  }

  return (
    <div className={styles.body}>
        <div className={styles.columns}>
            <div className={styles.column}>
            <div className={styles.mainInfo}>
                <img
                className={styles.projectImg}
                src={loader(projectData.img)}
                alt='project image'/>
                <div className={styles.infoWrapper}>
                    <h1 className={styles.title}>
                    {projectData.title}
                    </h1>
                    <div className={styles.descriptionWrapper}>
                        <div className={styles.decription}>
                            {projectData.type}
                        </div>
                        <div className={styles.socialmedia}>
                            {
                                projectData.socialmedia.map((item) =>{
                                    return (
                                        <a key={item.alt} href={item.link}>
                                            <Image src={item.icon} alt={item.alt}/>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <button 
                onClick={addToFavourites} 
                className={styles.favouriteBtnMobile}>
                    {
                        isFavourite
                        ?
                        <Image src={heartFillSvg} alt='heart'/>
                        :
                        <Image src={heartSvg} alt='heart'/>
                    }
                </button>   
            </div>
            <div className={styles.priceInfo}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    NFT price
                    </div>
                    <div className={styles.value + ' ' + styles.priceInfoValue}>
                        {projectData.floorPrice || '$0'}
                        <span className={styles.growth}>{projectData.growth || '0%'}</span>
                    </div>
                </div>
                <div className={styles.priceRange}>
                    <div className={styles.priceRangeHead}>
                        <div className={styles.key}>
                        NFT price range:
                        </div>
                        <div className={styles.timeFilterWrapper}>
                                <button 
                                onClick={() => setIsTimeFilter((prev) => !prev)}
                                className={styles.timeFilterBtn}>
                                    {
                                        isTimeFilter
                                        ?
                                        <Image
                                        className={styles.rotate} 
                                        src={arrowSvg} 
                                        alt='rotate arrow'/>
                                        :
                                        <Image src={arrowSvg} alt='rotate arrow'/>
                                    }
                                    <span>{selectedFilter}</span>
                                </button>
                                <div 
                                className={
                                    isTimeFilter
                                    ?
                                    styles.timeFilterList + ' ' + styles.visible
                                    :
                                    styles.timeFilterList
                                }>
                                    {timeFilters.map((filter) => {
                                        return (
                                            <button
                                            onClick={() => changeFilter(filter)} 
                                            key={filter} 
                                            className={styles.filterItemBtn}>
                                            {filter}
                                            </button>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>
                    <div className={styles.range}>
                        <div className={styles.progress}>
                        </div>
                    </div>
                    <div className={styles.priceRangeBottom}>
                        <div className={styles.priceRangeItem}>
                            <span className={styles.key}>Low:</span>
                            <span className={styles.value}>{projectData.lowPrice || '-'}</span>
                        </div>
                        <div className={styles.priceRangeItem}>
                            <span className={styles.key}>High:</span>
                            <span className={styles.value}>{projectData.highPrice || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.column}>
            <div className={styles.details}>
                <div className={styles.infoDetailsItems}>
                    <div className={styles.infoItem}>
                        <div className={styles.value}>
                            {projectData.goal}
                        </div>
                        <div className={styles.key}>
                        Total Raised
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.value}>
                            {projectData.lastFunding}
                        </div>
                        <div className={styles.key}>
                        Last Funding
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.value}>
                            {projectData.type}
                        </div>
                        <div className={styles.key}>
                            Type
                        </div>
                    </div>
                </div>
                <button 
                onClick={addToFavourites} 
                className={styles.favouriteBtn}>
                    {
                        isFavourite
                        ?
                        <Image src={heartFillSvg} alt='heart'/>
                        :
                        <Image src={heartSvg} alt='heart'/>
                    }
                </button>
            </div>   
            <div className={styles.bio}>
                <span>Bio: </span> {projectData.description}
            </div>   
            <div className={styles.makeOrderBtn}>
                <SquareBtn
                width='180' 
                height='44'
                fontSize='17px'
                text={'+ Make order'}
                handler={makeOrderHandler}
                />
            </div>           
            </div>
        </div>
        <div className={styles.statistics}>
            <hr className={styles.line}/>
            <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                        Market Cap
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.marketCap}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Supply
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.supply}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Listed
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.listed}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Owners
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.owners}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Total Volume
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.totalVolume}$
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Mint price
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.mintPrice}$
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Royalty Fee
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.royaltyFee} %
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Revenue
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.revenue} %
                    </div>
                </div>
            </div>
            <div className={styles.infoItemsMobile}>
                <div className={styles.infoItemsColumn}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                        Market Cap
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.marketCap}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Supply
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.supply}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Listed
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.listed}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Owners
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.owners}
                    </div>
                </div>
                </div>
                <div className={styles.infoItemsColumn}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Total Volume
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.totalVolume}$
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Mint price
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.mintPrice}$
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Royalty Fee
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.royaltyFee} %
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Revenue
                    </div>
                    <div className={styles.statisticValue}>
                        {projectData.statistics.revenue} %
                    </div>
                </div>
                </div>
            </div>
            <hr className={styles.line}/>
        </div>
    </div>
  )
}
