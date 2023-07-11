import { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../store/slices/modalsSlice'
import Modal from '../modal/Modal'
import CustomCalendar from '../calendar/Calendar'
import CustomAlert from '../CustomAlert/CustomAlert'
import ApproveCollection from './ApproveCollection'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import CheckBox from '../../../components/UI/inputs/CheckBox'
import TimeInput from '../timeInput/TimeInput'
import arrowSvg from '../../../assets/icons/arrow-rotate.svg'
import styles from './list-for-sale.module.scss'

const currencyList = [
    'ETH',
    'USDC'
]

const timeList = [
    '24H',
    '7D',
    '1M',
    '3M',
    '1Y'
]

export default function ListForSale({isVisible,handler}) {
    const [date,setDate] = useState(new Date().toLocaleDateString())
    const [time,setTime] = useState('')
    const [duration,setDuration] = useState('7D')
    const [currency,setCurrency] = useState('ETH')
    const [floorPrice,setFloorPrice] = useState(false)

    const [isCurrencyList,setIsCurrencyList] = useState(false)
    const [isSuccessApprove,setIsSuccessApprove] = useState(false)
    const [isDurationList,setIsDurationList] = useState(false)
    const [isApproveCollection,setIsApproveCollection] = useState(false)
    const [isCustomAlert,setIsCustomAlert] = useState(false)

    const dispatch = useDispatch()

    const changeCurrency = (value) => {
        setCurrency(value)
        setIsCurrencyList(false)
    }

    const changeDuration = (value) => {
        setDuration(value)
        setIsDurationList(false)
    }

    const completeListing = () => {
        setIsApproveCollection(true)
    }

    const approveCollectionHandler = () => {
        dispatch(closeModal('listForSale'))
        setIsSuccessApprove(true)
        setIsCustomAlert(true)
        
        setTimeout(() => {
            setIsApproveCollection(false)
        },[1000])
    }
   
  return (
    <>
    <Modal 
    overflowY='auto'
    width={
        isApproveCollection
        ?
        '440'
        :
        '362'
    }
    title={isApproveCollection ? 'Approve collection' : 'List for sale'}
    isVisible={isVisible} 
    handler={handler}> 
    {
        isApproveCollection
        ?
        <ApproveCollection/>
        :
        <div className={styles.body}>
        <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
                <label 
                className={styles.label}
                htmlFor='collection-name'>
                Collection name
                </label>
                <input 
                className={styles.input}
                placeholder='Name your collection'
                id='collection-name'/>
            </div>
            <div className={styles.inputWrapper}>
                <label 
                className={styles.label}
                htmlFor='collection-name'>
                NFTs name
                </label>
                <input 
                className={styles.input}
                placeholder='Name your NFTs'
                id='collection-name'/>
            </div>
        </div>
        <div className={styles.selectedNft}>
            <div className={styles.selectedNftTitle}>
            + Secret NFT Key #2
            </div> 
            <div className={styles.selectedNftName}>
            No name key
            </div>
        </div>
        <div className={styles.price}>
            <div className={styles.key}>
                Set a price
            </div>
            <div className={styles.floorPrice}>
                <div className={styles.floorPriceLabel}>
                Floor price: 0,0016 ETH
                </div>
            <CheckBox
            id='none'
            handler={() => setFloorPrice((prev) => !prev)}
            isChecked={floorPrice}
            />
            </div>
        </div>
        <div className={styles.yourPrice}>
            <div className={styles.inputWrapper}>
                <label 
                className={styles.label}
                htmlFor='collection-name'>
                Your price
                </label>
                <input 
                className={styles.input}
                placeholder='0.0'
                id='collection-name'/>
            </div>
            <div className={styles.currencyWrapper}>
                <button 
                onClick={() => setIsCurrencyList((prev) => !prev)}
                className={styles.selectedCurrency}>
                    {currency}
                    {
                        isCurrencyList
                        ?
                        <Image 
                        className={styles.rotate}
                        src={arrowSvg} alt='arrow'/>
                        :
                        <Image src={arrowSvg} alt='arrow'/>
                    }
                </button>
                <div className={
                    isCurrencyList
                    ?
                    styles.currencyList + ' ' + styles.visible
                    :
                    styles.currencyList
                    }>
                    {
                        currencyList.map((currency) => {
                            return (
                            <button 
                            onClick={() => changeCurrency(currency)}
                            className={styles.currencyBtn}
                            key={currency}>
                                {currency}
                            </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className={styles.duration}>
            <div className={styles.key}>
            Duration
            </div>
            <div className={
                isDurationList
                ?
                styles.durationInputs + ' ' + styles.visible
                :
                styles.durationInputs
            }>
                <CustomCalendar
                range={false}
                dates={date}
                name={'date'}
                stateHandler={(name,date) => setDate(date)}
                />
                <TimeInput
                handler={(value) => setTime(value)}
                />
                <div className={styles.durationWrapper}>
                    <button 
                    onClick={() => setIsDurationList((prev) => !prev)}
                    className={styles.selectedCurrency + ' ' + styles.timeBtn}>
                        {
                            isDurationList
                            ?
                            <Image 
                            className={styles.rotate}
                            src={arrowSvg} alt='arrow'/>
                            :
                            <Image src={arrowSvg} alt='arrow'/>
                        }
                        {duration}
                    </button> 
                    <div className={
                        isDurationList
                        ?
                        styles.durationList + ' ' + styles.visible
                        :
                        styles.durationList
                    }>
                        {
                            timeList.map((item) => {
                                return (
                                    <button 
                                    key={item}
                                    onClick={() => changeDuration(item)}
                                    className={styles.currencyBtn}>
                                        {item}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
        <div className={styles.results}>
            <div>
                Listing price:     0,0016 ETH
            </div>
            <div>
                Royalty fee:   0%
            </div>
            <div>
                Total potential earnings: 0,0016 ETH
            </div>
        </div>
        </div>
    }
    <SquareBtn 
    handler={
        isApproveCollection
        ?
        approveCollectionHandler
        :
        completeListing
        }
    btnId='none' 
    type='red' 
    width={
        isApproveCollection
        ?
        '440'
        :
        '362'
    }
    text={
        isApproveCollection
        ?
        'Continue'
        :
        'Complete Listing'
    }
    />
    </Modal>
    <CustomAlert
    handler={() => setIsCustomAlert(false)}
    type={
        isSuccessApprove
        ?
        'success'
        :
        'error'
    }
    title={
        isSuccessApprove
        ?
        'Success!'
        :
        'Opps!'
    }
    text={
        isSuccessApprove
        ?
        'You have successfully placed a listing NFTs'
        :
        'You have failed to place a bid (try again)!'
    }
    isVisible={isCustomAlert}
    />
    </>
  )
}


// <input 
// className={styles.input + ' ' + styles.date}
// placeholder='08.08.2023'
// id='calendar'/>   