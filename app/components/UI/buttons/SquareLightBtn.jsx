import React from 'react'
import styles from './square-light.module.scss'

export default function SquareBtn({disabled = false,type = 'text' ,btnId = 'toggle-modal',handler = () => {},text,width = '198',height = '48'}) {
  if(type === 'red'){
    return (
      <button disabled={disabled} id={btnId} onClick={handler} style={{maxWidth:`${width}px`,maxHeight:`${height}px`}} className={styles.btnRed}>
        {text}
     </button>
    )
  }

  return (
    <button disabled={disabled} id={btnId} onClick={handler} style={{maxWidth:`${width}px`,maxHeight:`${height}px`}} className={styles.btn}>
      {text}
    </button>
  )
}
