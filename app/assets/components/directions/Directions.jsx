import { useState } from 'react'
import DirectionMore from './more/DirectionMore'
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'
import blockScroll from '../../../utils/blockScroll'
import styles from './direction.module.scss'

const programmsInitialState = [
    {
        name:'Crypto Lite',
        start:'22.11.2023',
        format:'Online',
        duration:'2 months',
        description:`Explore and earn money in 11 vectors of new finance: from gambling and redirection to participation and investment, from ICO/IDO/IEO/Launchpad to P2E, NFT, AirDrop, Testnet, Nodes`,
        moreTitle:'Програма  курсу Crypto Lite',
        moreBottomText:'List for saleList for saleList for saleList for saleList for sale saleList for sale',
        moreDescription:`We have created educational programs for mastering modern professions. Each of them provides an opportunity to acquire a skill in the real market We have created educational programs for mastering modern professions. Each of them provides`,
        moreBlocks:[
            {
                title:'Занурення в крипту',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
            {
                title:'NFT',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'Smart Money',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'ICO',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
        ],
    },
    {
        name:'Crypto Lite 2',
        start:'22.11.2023',
        format:'Online',
        duration:'2 months',
        description:`Explore and earn money in 11 vectors of new finance: from gambling and redirection to participation and investment, from ICO/IDO/IEO/Launchpad to P2E, NFT, AirDrop, Testnet, Nodes`,
        moreTitle:'Програма  курсу Crypto Lite 2',
        moreBottomText:'List for saleList for saleList for saleList for saleList for sale saleList for sale',
        moreDescription:`We have created educational programs for mastering modern professions. Each of them provides an opportunity to acquire a skill in the real market We have created educational programs for mastering modern professions. Each of them provides`,
        moreBlocks:[
            {
                title:'Занурення в крипту',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
            {
                title:'NFT',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'Smart Money',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'ICO',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
        ],
    },
    {
        name:'Crypto Lite',
        start:'22.11.2023',
        format:'Online',
        duration:'2 months',
        description:`Explore and earn money in 11 vectors of new finance: from gambling and redirection to participation and investment, from ICO/IDO/IEO/Launchpad to P2E, NFT, AirDrop, Testnet, Nodes`,
        moreTitle:'Програма  курсу Crypto Lite',
        moreBottomText:'List for saleList for saleList for saleList for saleList for sale saleList for sale',
        moreDescription:`We have created educational programs for mastering modern professions. Each of them provides an opportunity to acquire a skill in the real market We have created educational programs for mastering modern professions. Each of them provides`,
        moreBlocks:[
            {
                title:'Занурення в крипту',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
            {
                title:'NFT',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'Smart Money',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                ],
            },
            {
                title:'ICO',
                items:[
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                    'Термінологія',
                    'Знайомство з курсом',
                ],
            },
        ],
    },
]

export default function Directions({data}) {
    const [selectedProgramm,setSelectedProgramm] = useState() 
    const [isMore,setIsMore] = useState()

    const openMoreInfo = (item) => {
        setIsMore(true)
        setSelectedProgramm(item)
        blockScroll('add')
    }

    const modalHandler = (e) => {
        if(e.target.id === 'toggle-modal'){
            setIsMore(false)
            blockScroll('remove')
        }
    }

  return (
    <>
    <div className={styles.body}>
        <SubTitle>
            {data.title}
        </SubTitle>
        <div className={styles.text}>
            {
                data.description
            }
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <section className={styles.item} key={index}>
                            <button 
                            onClick={() => openMoreInfo(item)}
                            className={styles.itemBtn}>More {'>'}</button>
                            <div className={styles.itemHead}>
                                <img src={loader('/img1.jpg')} alt={item.name} />
                                <div className={styles.itemInfo}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Start: </span>
                                            <span className={styles.value}>{item.start}</span>
                                        </div>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Format: </span>
                                            <span className={styles.value}>{item.format}</span>
                                        </div>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Duration: </span>
                                            <span className={styles.value}>{item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <div className={styles.itemDescription}>
                                    {item.description}
                                </div>           
                        </section>
                    )
                })
            }
        </div>
    </div>
    {
        <DirectionMore 
        handler={modalHandler}
        onClose={() => {
            setIsMore(false)
            blockScroll('remove')
        }}
        isVisible={isMore}
        moreInfo={selectedProgramm}/>
    }
    </>
  )
}
