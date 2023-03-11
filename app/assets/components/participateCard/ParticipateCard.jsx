import styles from './participate-card.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Nft from '../nft/Nft'
import PurchaseData from '../purchaseData/PurchaseData'
import ClaimData from '../claimData/ClaimData'
import { useRouter } from 'next/router'
import getTime from '../../../utils/getTime'

export default function ParticipateCard({closes,project,claim,participate,connectHandler,card,index,value,handler}) {
    const router = useRouter()

  return (
        <>
        {
            card.state
            ?
            <div className={styles.body}>
                <div className={styles.number}>
                    {index + 1}
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {card.title}
                    </div>
                    <div className={styles.dates}>
                        <div className={styles.date}>
                            <span>Starts: </span>
                            <span>{getTime(project.dateStart)} {project.timeStart}</span>
                        </div>
                        <div className={styles.date}>
                            <span>Ends (Estimated): </span>
                            <span>{getTime(project.dateEnd)} {project.timeEnd}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.cardInfo}>
                   <Nft card={card} isVisible={card?.nft}/>
                   <PurchaseData 
                   closes={closes} 
                   value={value} 
                   valueHandler={handler} 
                   card={card} 
                   isVisible={card?.purchase}
                   />
                   <ClaimData card={card} isVisible={card?.claim}/>
                </div>
                <div>
                    {
                        card.title === 'Staking'
                        &&
                        <SquareBtn handler={connectHandler} text={card.btnName} width={'548'}/>
                    }
                    {
                        card.title === 'Purchase'
                        &&
                        <SquareBtn handler={participate} text={card.btnName} width={'548'}/>
                    }
                    {
                        card.title === 'Claim'
                        &&
                        <SquareBtn handler={claim} text={card.btnName} width={'548'}/>
                    }
                </div>
            </div>
            :
            <div className={styles.bodyDisabled}>
                <div className={styles.number + ' ' + styles.disabledNumber}>
                    {index + 1}
                </div>
                <div className={styles.info}>
                    <div className={styles.title + ' ' + styles.disabled}>
                        {card.title}
                    </div>
                    <div className={styles.dates + ' ' + styles.disabled}>
                        <div className={styles.date}>
                            <span>Starts: </span>
                            <span>{getTime(project.dateStart)} {project.timeStart}</span>
                        </div>
                        <div className={styles.date}>
                            <span>Ends (Estimated): </span>
                            <span>{getTime(project.dateEnd)} {project.timeEnd}</span>
                        </div>
                    </div>
                    {
                        card?.error
                        ?
                        <div>
                            <div className={styles.error}>{card.error}</div>
                            <SquareBtn handler={() => router.push('/portfolio')} text={card.btnName} width={'548'}/>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        }

        </>
  )
}
