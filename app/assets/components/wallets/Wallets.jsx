import styles from './wallets.module.scss'
import closeSvg from '../../icons/close.svg'
import arrowSvg from '../../icons/wallets/wl-arrow.svg'
import Image from 'next/image'
import { Web3Modal } from "@web3modal/react";
import { ethereumClient } from '../../../config/provider'
import { wallets } from '../../../config/wallets'

export default function Wallets({config,isVisible,handler,connect}) {
  const bodyClass = isVisible ? styles.body + " " + styles.visible : styles.body

  return (
        <div>
          <div className={bodyClass}>
          <div className={styles.row}>
             <div className={styles.title}>
               Connect wallet
             </div>
             <div className={styles.close}>
               <button onClick={handler}><Image alt={'close-modal'} src={closeSvg}/></button>
             </div>
          </div>
          <div className={styles.wallets}>
            {wallets.map((wl,index) => {
              return (
                <button onClick={() => connect(wl.config,wl.title)} key={wl.title} className={styles.wallet}>
                  <div className={styles.wlImg}>
                    <Image src={wl.img} alt={wl.title}/>
                  </div>
                  <div className={styles.wlTitle}>
                    {wl.title}
                  </div>
                  <div className={styles.wlArrow}>
                    <Image src={arrowSvg} alt={index}/>
                  </div>
                </button>
              )
            })}
          </div>
          </div>
          {
            config?.desktop
            ?
            <Web3Modal
            mobileWallets={config.mobile}
            desktopWallets={config.desktop}
            ethereumClient={ethereumClient}
            projectId={'c3aa2dd660a1a5a1922e0dbdfc712912'}
            >
            </Web3Modal>
            :
            <Web3Modal
            ethereumClient={ethereumClient}
            projectId={'c3aa2dd660a1a5a1922e0dbdfc712912'}
            >
            </Web3Modal>
          }

        </div>
  )
}
