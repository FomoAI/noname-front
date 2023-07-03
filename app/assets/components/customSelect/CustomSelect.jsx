import { useState } from 'react'
import Image from 'next/image'
import arrowRotateSvg from '../../icons/arrow-rotate.svg'
import styles from './custom-select.module.scss'

export default function CustomSelect({placeholder,handler,items}) {
    const [selectedItem,setSelectedItem] = useState('')
    const [isOpen,setIsOpen] = useState(false)

    const selectItem = (item) => {
        setSelectedItem(item)
        setIsOpen(false)
        handler('rank',item)
    }

  return (
    <div className={styles.body}>
        <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.btn}>
            {
                selectedItem.length
                ?
                <span className={styles.selected}>{selectedItem}</span>
                :
                <span>{placeholder}</span>
            }
            {
                isOpen
                ?
                <Image 
                className={styles.rotate}
                src={arrowRotateSvg} 
                alt='arrow rotate'/>
                :
                <Image src={arrowRotateSvg} alt='arrow rotate'/>

            }
        </button>
        <div className={isOpen ? styles.items + ' ' + styles.visible : styles.items}>
            {items.map((item) => {
                return (
                    <button 
                    onClick={() => selectItem(item)}
                    key={item}>
                        {item}
                    </button>
                )
            })}
        </div>
    </div>
  )
}
