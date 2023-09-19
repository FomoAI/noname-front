import Lottie from 'lottie-react'
import CartLottie from '../../lotties-animations/cart.json'
import playLottie from '../../lotties-animations/NN Play Blue.json'
import styles from './courses.module.scss'

export default function Courses({data}) {
  return (
    <div className={styles.body}>
      {
        data.items.map((card,index) => {
          return (
            <div className={styles.card} key={index}>
                <div className={styles.title}>
                  <div className={styles.playWrapper}>
                  <Lottie animationData={playLottie}/>
                  </div>
                  <span>{card.title}</span>
                </div>    
                <div className={styles.features}>
                  {
                    card.features.map((feature,index) => {
                      return (
                          <div className={styles.feature} key={index}>
                              {feature}
                          </div>
                      )
                    })
                  }
                </div>
                <div className={styles.bottom}>
                  <div className={styles.price}>
                      {card.price}$
                  </div>
                  <button className={styles.button}>
                    <div className={styles.cartWrapper}>
                      <Lottie animationData={CartLottie}/>
                    </div>
                    <span>{card.status}</span>
                  </button>
                </div>
            </div>
          )
        })
      } 
    </div>
  )
}
