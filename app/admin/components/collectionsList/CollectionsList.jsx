import { useState } from 'react'
import Image from 'next/image'
import Modal from '../../../assets/components/modal/Modal'
import pinSvg from '../../../assets/icons/pin.svg'
import pinCollection from '../../services/collectionsServices/pinCollection'
import deleteCollection from '../../services/collectionsServices/deleteCollection'
import loader from '../../../utils/loader'
import NftsList from '../nftsList/NftsList'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import sliceAddress from '../../../utils/sliceAddress'
import styles from '../../styles/collections-list.module.scss'

export default function CollectionsList({collections}) {
    const [colletionsData,setCollectionsData] = useState(collections)

    const removeCollection = async (collectionToRemove) => {
        setCollectionsData((prev) => {
            return (
                prev.filter((collection) => {
                    return collectionToRemove._id !== collection._id
                })
            )
        })

        await deleteCollection(collectionToRemove._id)
    }

    const pinHandler = async (collectionToPin) => {
        await pinCollection(collectionToPin._id,!collectionToPin.isPinned)

        setCollectionsData((prev) => {
            return (
                prev.map((collection) => {
                    if(collection._id === collectionToPin._id){
                        return {...collection,isPinned:!collection.isPinned}
                    }
                    return collection
                })
            )
        })
    }
    
  return (
    <div className={styles.body}>
        {
            colletionsData?.length 
            ?
            colletionsData.map((collection) => {
                return (
                    <div key={collection._id} className={styles.collection}>
                        <button
                        onClick={() => pinHandler(collection)} 
                        className={styles.pinBtn}>
                            {
                                collection.isPinned 
                                ?
                                <Image src={pinSvg} alt='pin' />
                                :
                                <Image 
                                className={styles.notPin}
                                src={pinSvg} alt='pin' />
                            }
                        </button>
                        <div className={styles.deleteBtn}>
                            <SquareBtn 
                            handler={() => removeCollection(collection)}
                            text={'Delete collection'}/>
                        </div>
                        <div className={styles.title}>
                            Collection info
                        </div>
                        <div className={styles.collectionInfo}>
                            <div className={styles.infoRow}>
                                <div className={styles.collectionDetails}>
                                <div className={styles.infoItem}>
                                    <span className={styles.key}>
                                        Title:
                                    </span>
                                    <span className={styles.value}>
                                        {collection.title}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.key}>
                                        Type:
                                    </span>
                                    <span className={styles.value}>
                                        {collection.type}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.key}>
                                        Smart contract:
                                    </span>
                                    <span className={styles.value}>
                                        {sliceAddress(collection.smart)}
                                    </span>
                                </div>
                                </div>
                                <div className={styles.projectDetails}>
                                    <div className={styles.key}>
                                        Project:
                                    </div>
                                    <div className={styles.projectInfo}>
                                        <img 
                                        src={loader(collection.project.img)} 
                                        alt="project img"
                                        />
                                        <div className={styles.projectInfoRow}>
                                            <div className={styles.projectTitle}>
                                                {collection.project.title}
                                            </div>
                                            <div className={styles.projectType}>
                                                {collection.project.type}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.collectionsNfts}>
                                <div className={styles.title}>
                                    Nfts ({collection.nfts.length}):
                                </div>
                                <NftsList nfts={collection.nfts}/>
                            </div>
                        </div>
                    </div>
                )
            })
            :
            <></>
        }
    </div>
  )
}
