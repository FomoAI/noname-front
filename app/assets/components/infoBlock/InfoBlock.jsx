import SubTitle from '../subTitle/SubTitle'
import styles from './info.module.scss'

const infoInitial = {
    title:'Why Noname academy?',
    description:'Learn from others, share your work, and extend your tool set with a diverse group',
    items:[
        {
            title:'Not only money',
            description:`Alongside with funding No name offers a capable team of professionals, including lawyers, accountants, business consultants, advertising specialists who are willing to help you anyway they can`,
        },
        {
            title:'24/7',
            description:`Our support is not limited by time. Once you have started - we are always here with you and for you. Step by step we help to move on, we help to overcome, we help to be successful. Our strategy is simple: Your success is our success`,
        },
        {
            title:'Easy and fast ',
            description:`Start your own business within minutes with No name and support that we provide`,
        },
        {
            title:'24/7',
            description:`Our support is not limited by time. Once you have started - we are always here with you and for you. Step by step we help to move on, we help to overcome, we help to be successful. Our strategy is simple: Your success is our success`,
        },        
    ]
}

export default function InfoBlock({data}) {
  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <SubTitle>
                {data.title}
            </SubTitle>
            <div className={styles.description}>
                {data.description}
            </div>
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div className={styles.item} key={item.title + index}>
                            <div className={styles.itemTitle}>
                                {item.title}
                            </div>
                            <div className={styles.itemDescription}>
                                {item.description}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
