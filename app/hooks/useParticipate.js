import { useState, useCallback, useLayoutEffect, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal,openModal } from "../store/slices/modalsSlice";
import blockScroll from '../utils/blockScroll'

const participateCards = [
    {
      title: "Staking",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: true,
      btnName: "Stake",
      nft: null,
    },
    {
      title: "Purchase",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: false,
      btnName: "Participate",
      purchase: null,
    },
    {
      title: "Claim",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: false,
      btnName: "Claim",
      claim: null,
    },
];
  

const useParticipate = ({type = '' ,id='',project}) => {
    const [stakeValue,setStakeValue] = useState('481,11')
    const [cards,setCards] = useState(participateCards)
    const [isActual,setIsActual] = useState(true)
    const modals = useSelector((state) => state.modals)
    const isAuth = useSelector((state) => state.auth.userData.isAuth);
    const isCompletedKYC = !!useSelector((state) => state.auth.userData.KYC);
    const [completedKYC,setCompletedKYC] = useState(isCompletedKYC)
    const dispatch = useDispatch()

    const modalsHandler = useCallback((action,modal) => {
      if(action === 'open'){
        dispatch(openModal(modal))
      }
      if(action === 'close'){
        dispatch(closeModal(modal))
      }
    },[modals]) 

    const stakeValueHandler = (event) => {
      setStakeValue(event.target.value)
    }

    const resetCard = () => {
      setCards([
        {
          title: "Staking",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          error:'Your NFT is not in staking',
          btnName: "Stake",
          nft: null,
        },
        {
          title: "Purchase",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          btnName: "Participate",
          purchase: null,
        },
        {
          title: "Claim",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          btnName: "Claim",
          claim: null,
        },
    ])
    }

    const participate = () => {
      if(type === 'donate' && !isAuth){
        modalsHandler('open','connect')
        blockScroll()
        return
      }
      modalsHandler('open','confirm')
    }

    const confirmStaking = (event) => {
       if(event && event.target.id === 'toggle-modal'){
        event.stopPropagation()
        modalsHandler('close','confirm')
        return
      }

      if(event && event.target.id !== 'confirm') return

      modalsHandler('close','confirm')
      setCards(cards.map((card) => {
        if(card.title === 'Staking'){
          return   {
            title: "Staking",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: false,
            btnName: "Stake",
            nft: null,
        }}
        if(card.title === 'Purchase'){
          return {
            title: "Purchase",
            start: "2022-06-09 16:00", 
            end: "2022-06-09 16:00",
            state: false,
            btnName: "Participate",
            purchase: null,
          }
        }
        if(card.title === 'Claim'){
          return {
            title: "Claim",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: true,
            btnName: "Claim",
            claim: stakeValue,
          }
        }
      }))
    }

    const claim = () => {
      setIsActual(false)
    }

    const stakingNft = () => {
      if(project.isClosed){
        resetCard()
        return
      }

      setCards(cards.map((card) => {
        if(card.title === 'Staking'){
          return {
            title: "Staking",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: false,
            btnName: "Stake",
            nft: null,
          }
        }
        if(card.title === 'Purchase'){
          return   {
            title: "Purchase",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: true,
            btnName: "Participate",
            purchase: {claimIn:'15d 20h 25m'},
          }
        }
      return card
      }))
    }

    const selectNft = () => {
      if(project.isClosed){
        resetCard()
        return
      }

      setCards(cards.map((card) => {
        if(card.title === 'Staking'){
          return   {
            title: "Staking",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: true,
            btnName: "Stake",
            nft: project,
          }
        }
        return card
      }))
      setCompletedKYC(true)
    }

    const connectHandler = useCallback((event) => {
        if(isAuth && completedKYC){
          stakingNft()
        }
        if(!isAuth){
          if(event.target.id === 'toggle-modal' && modals.connect.state){
            modalsHandler('close','connect')
            blockScroll()
          }
          if(!modals.connect.state){
            modalsHandler('open','connect')
            blockScroll()
          }
          return
        }
        if(!completedKYC){
          if(event.target.id === 'next' && modals.complete.state){
            modalsHandler('close','complete')
            modalsHandler('open','buy')
            return
          }
          if(event.target.id === 'toggle-modal' && modals.complete.state){
            modalsHandler('close','complete')
            modalsHandler('close','buy')
            blockScroll()
            return
          }
          if(event.target.id === 'toggle-modal' && modals.buy.state){
            modalsHandler('close','complete')
            modalsHandler('close','buy')
            blockScroll()
            return
          }
         
          if(!modals.complete.state && !modals.buy.state){
            modalsHandler('open','complete')
            blockScroll()
          }
        }
    },[isAuth,modals,completedKYC])

    const openWallet = useCallback(() => {
      modalsHandler('open','wallet')
      modalsHandler('close','connect')
      blockScroll()
    },[modals])

    useLayoutEffect(() => {
      if(type === 'project' && isAuth){
        completedKYC && selectNft()
      }
      if(type === 'donate'){
        stakingNft()
      }
    }, [id,isAuth]); 

    return {
      project,cards,modals,
      modalsHandler,isAuth,isActual,
      connectHandler,openWallet,
      selectNft,value:stakeValue,handler:stakeValueHandler,
      participate,claim,confirmStaking
    };
}

export default useParticipate;

