import styles from './blue-input.module.scss'

export default function BlueInput({value = '',handler,id = '',placeholder = ''}) {
  return (
    <input 
    className={styles.body} 
    placeholder={placeholder}
    value={value}
    id={id}
    onChange={(e) => handler(e,id)}
    />
  )
}
