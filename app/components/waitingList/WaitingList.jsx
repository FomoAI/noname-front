import styles from '../styles/waiting-list.module.scss'
import { useEffect , useCallback,useState,useMemo} from 'react'
import WaitingItem from '../../assets/components/waitingListItem/WaitingItem'
import { useSelector ,useDispatch} from 'react-redux'
import {openModal,closeModal} from '../../store/slices/modalsSlice'
import {setUserData} from '../../store/slices/authSlice'
import useModal from '../../hooks/useModal'
import WaitingRemove from '../../assets/components/waitingRemove/WaitingRemove'
import favourites from '../../services/favourites'
import { isMobile } from 'web3modal'

export default function WaitingList({allProjects}) {
    const user = useSelector((state) => state.auth.userData)
    const [filtered,setFiltered] = useState([])
    const [selectedNft,setSelectedNft] = useState(null)
    const dispatch = useDispatch()
    const {state,modalHandler} = useModal()
   
    const flatProjects = (projects) => {
      return projects.map((item) => item.projects).flat()
    }
    
    useEffect(() => {
      if(!user.isAuth){
        dispatch(openModal('wallet'))
      }else{
        const result = []
        user.favourites.forEach((item) => {
          const finded = flatProjects(allProjects).find((project) => project._id === item)
          if(finded){
            result.push(finded)
          }
        })
        setFiltered(result.reverse())
        dispatch(closeModal('wallet'))
      }
    },[user.isAuth])
    
    const selectNft = useCallback((event,nft) => {
      if(!state && isMobile()){
        modalHandler(null,true)
        setSelectedNft(nft)
      }
    },[selectedNft,state])

    const removeFromWaitingList = useCallback((item) => {
      if(!user.isAuth) return 
      const filteredFavourites = user.favourites.filter((id) => id !== item._id)

      setFiltered((state) => state.filter((pr) => pr._id !== item._id))

      dispatch(setUserData({...user,favourites:filteredFavourites}))

      const {success} = favourites(item._id,user.address,'remove')
    },[selectedNft,state,filtered,user])

  return (  
    <>
    <div className={styles.list}>
        <div className={styles.head}>
            <span>Project</span>
            <span>Status</span>
            <span className={styles.hide}>Funding Goal</span>
            <span className={styles.hide}>Funded</span>
            <span className={styles.hide}>Last Funding</span>
            <span className={styles.hide}>Type</span>
            <span>Rating</span>
        </div>
        {
          user.isAuth
          ?
          <div className={styles.body}>
            {
            filtered.length
            ?
            filtered.map((item,index) => {
                return <WaitingItem remove={removeFromWaitingList} nftHandler={selectNft} user={user} key={index} item={item}/>
            })
            :
            <div className={styles.message}>
              <h1>Waiting list is empty...</h1>
            </div>
            }
          </div>  
          :
          <div className={styles.message}>
            <h1>Please add wallet to use waiting list...</h1>
          </div>
        }
 
    </div>
    <div className={styles.mobileModal}>
      <WaitingRemove remove={removeFromWaitingList} state={state} nft={selectedNft} handler={modalHandler}/>  
    </div>
    </>   
  )
}
