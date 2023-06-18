import closeSvg from '../../icons/close.svg'
import Image from 'next/image'
import styles from './custom-alert.module.scss'

export default function CustomAlert({type = 'error',title,text,handler,isVisible}) {

    const isVisibleStyles = isVisible ? styles.visible : ''

    if(type === 'success'){
        return (
            <div className={styles.body + " " + styles.success + " " + isVisibleStyles}>
                <div className={styles.head}>
                    <div className={styles.title + " " + styles.success}>
                        {title}
                    </div>
                    <button onClick={handler}>
                        <Image src={closeSvg} alt='close'/>
                    </button>
                </div>
                <div className={styles.text + " " + styles.success}>
                        {text}
                </div>
            </div>
          )
    }

    if(type === 'error'){
        return (
            <div className={styles.body + " " + styles.error + " " + isVisibleStyles}>
                <div className={styles.head}>
                    <div className={styles.title + " " + styles.error}>
                        {title}
                    </div>
                    <button onClick={handler}>
                        <Image src={closeSvg} alt='close'/>
                    </button>
                </div>
                <div className={styles.text + " " + styles.error}>
                        {text}
                </div>
            </div>
          )
    }

}
