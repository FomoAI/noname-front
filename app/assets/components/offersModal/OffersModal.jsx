import { useState } from 'react'
import styles from './offers.module.scss'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

export default function OffersModal({handler}) {
    const [data,setData] = useState({quantity:'',price:''})

    const inputsHandler = (event,id) => {
        setData((prev) => {
            return {...prev,[id]:event.target.value}
        })
    }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        Become part of No name
      </div>
      <div className={styles.info}>
        <div>Buy a piece of our NFT collection to become an important part of No name.</div>
        <div>Our special offer for you:</div>
        <div>Buying 3-7 NFT - 8.3% discount</div>
        <div>Buying 7-15 NFT - 14.2% discount</div>
        <div>Buying 15-33 NFT - 16.6% discount</div>
        <div>Buying 33 or more NTF - 24.2% discount</div>
        <div>(cost of 1 NFT is 200 USDC)</div>
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputWrapper}>
            <label 
            htmlFor='quantity'
            className={styles.label}>Quantity</label>
            <BlueInput
            id='quantity'
            value={data.quantity}
            handler={inputsHandler}
            />
        </div>
        <div className={styles.inputWrapper}>
            <label 
            htmlFor='price'
            className={styles.label}>Price (USDC)</label>
            <BlueInput
            id='price'
            value={data.price}
            handler={inputsHandler}
            />
        </div>
      </div>
      <div className={styles.bottom}>
      You will gain access to your NFT after public sale
      </div>
      <div className={styles.btn}>
        <SquareBtn handler={() => handler('confirm-offers',data)} text={'Buy'} type='red' width='550'/>
      </div>
    </div>
  )
}
