import { useId } from 'react'
import styles from './check-box.module.scss'


export default function CheckBox({isChecked,handler}) {
    const id = useId()
    const checkboxClass = isChecked ? styles.fakeCheckBox + ' ' + styles.checked : styles.fakeCheckBox

  return (
    <div className={styles.body}>
        <label 
        className={checkboxClass}
        htmlFor={id}>
        </label>
        <input 
        onClick={() => handler((state) => !state)}
        className={styles.checkBox}
        type="checkbox" />
    </div>
  )
}
