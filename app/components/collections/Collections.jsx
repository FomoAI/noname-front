import { useRef } from 'react'
import Image from 'next/image'
import pinnedSvg from '../../assets/icons/pin.svg'
import styles from '../styles/collections.module.scss'
import Collection from '../collection/Collection'

export default function Collections({collections}) {

  return (
    <div className={styles.body}>
        {
            collections.map((collection,index) => {
                return (
                    <Collection collection={collection} key={collection._id}/>
                )
            })
        }
    </div>
  )
}
