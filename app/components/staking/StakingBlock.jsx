import React from 'react'
import Info from '../../assets/components/info/Info'
import styles from '../styles/staking.module.scss'
import StakeCard from '../../assets/components/stakeCard/StakeCard'
import RewardsCard from '../../assets/components/rewardsCard/RewardsCard'
import StakingTable from '../stakingTable/StakingTable'

const stakingItems = [
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:false,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim','Recd'],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
]

export default function StakingBlock() {

  return (
    <div className={styles.body}>
      <Info text={'Stake your Noname NFT so as to be ready to invest'} title={'Staking'}/>
        <div className={styles.cards}>
            <StakeCard value={'0.00'}/>
            <RewardsCard estimated={'0.00'} available={'0.00'}/>
        </div>
        <div className={styles.table}>
          <StakingTable items={stakingItems}/>
        </div>
    </div>
  )
}
