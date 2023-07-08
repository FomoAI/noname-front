import styles from './check-box.module.scss'


export default function CheckBox({isChecked,handler}) {
    const checkboxClass = isChecked ? styles.fakeCheckBox + ' ' + styles.checked : styles.fakeCheckBox

  return (
    <div id='toggle-modal' className={styles.body}>
        <label 
        className={checkboxClass}
        htmlFor={'toggle-modal'}>
        </label>
        <input 
        id='toggle-modal'
        onClick={() => handler((state) => !state)}
        className={styles.checkBox}
        type="checkbox" />
    </div>
  )
}
