import styles from './loader.module.scss'
import { ColorRing } from  'react-loader-spinner'


const LoaderCustom = () => {
    return (
        <div className={styles.modal}>
            <ColorRing
              visible={true}
              height="150"
              width="150"
              wrapperClass="blocks-wrapper"
              colors={['#FF507D', '#FF507D', '#FF507D', '#FF507D', '#FF507D']}
            />
        </div>
    );
}

export default LoaderCustom;
