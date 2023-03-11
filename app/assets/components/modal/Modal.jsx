import styles from './modal.module.scss'
import { Transition } from 'react-transition-group'
import { useRef , useEffect} from 'react'
import closeSvg from '../../icons/close.svg'
import Image from 'next/image'

export default function Modal({bodyClass = 'none',handler,isVisible,title = '',width = '',padding ='16',children}) {
    const nodeRef = useRef(null)
    const transitionStyles = {
        entering: { opacity: 1 ,visibility:'visible'},
        entered:  { opacity: 1 ,visibility:'visible'},
        exiting:  { opacity: 0 ,visibility:'hidden'},
        exited:  { opacity: 0 ,visibility:'hidden'},
    };
    
  return (
        <Transition in={isVisible} timeout={1000} nodeRef={nodeRef}>
                {
                    (state) => (
                        <div id={'toggle-modal'} onClick={handler}  ref={nodeRef} style={{...transitionStyles[state]}} className={styles.modal}>
                        <div style={{maxWidth:`${width}px`,padding:`${padding}px`}} className={styles.body + ' ' + styles[bodyClass]}>
                            <div className={styles.head}>
                                <span>{title}</span>
                                <button className={styles.closeBtn} id={'toggle-modal'} type={'button'}>
                                    <Image id={'toggle-modal'} src={closeSvg} alt={'close-modal'}/>
                                </button>
                            </div>
                            <div>
                                {children}
                            </div>
                        </div>
                        </div>
                    )
                }
        </Transition>
  )
}
