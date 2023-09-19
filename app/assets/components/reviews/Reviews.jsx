import itemImg from '../../icons/man.svg'
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'
import styles from './reviews.module.scss'

const reviewsInitial = {
    title:'Відгуки наших учнів',
    items:[
        {
            img:itemImg,
            date:'Nov 21, 2022',
            name:'Spooky Ooki',
            body:`Incredible investment cooperation for Battle of Guardians!
            Good Games Guild was a lead investor...`
        },
        {
            img:itemImg,
            date:'Nov 21, 2022',
            name:'Spooky Ooki',
            body:`Incredible investment cooperation for Battle of Guardians!
            Good Games Guild was a lead investor...`
        },
        {
            img:itemImg,
            date:'Nov 21, 2022',
            name:'Spooky Ooki',
            body:`Incredible investment cooperation for Battle of Guardians!
            Good Games Guild was a lead investor...`
        },
    ]
}

export default function Reviews({data}) {
  return (
    <div className={styles.body}>
        <SubTitle>
            {data.title}
        </SubTitle>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <div className={styles.head}>
                                <img src={loader(item.img)} alt={item.name}/>
                                <span>{item.date}</span>
                            </div>
                            <div className={styles.name}>
                                {item.name}
                            </div>
                            <div className={styles.itemBody}>
                                {item.body}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
