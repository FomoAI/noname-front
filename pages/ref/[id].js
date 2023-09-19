import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import { Contract } from "ethers";
import Head from '../../app/components/head/Head'
import Image from 'next/image'
import SquareLightBtn from '../../app/components/UI/buttons/SquareLightBtn'
import getUserById from '../../app/services/getUserById'
import ErrorPng from '../../app/assets/img/error.png'
import Modal from '../../app/assets/components/modal/Modal'
import styles from '../../app/components/styles/ref-page.module.scss'

const RefPage = () => {
    const [loginModal,setLoginModal] = useState(false)
    const router = useRouter()
    const { id } = router.query

    const relocate = () => {
        window.location.replace('/info?login=true')
    }

    const initialContract = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);  

        if (window.ethereum.selectedAddress == null){
            relocate() 

            return
        }
        
        const address_nft_sale= '0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293';
        const abi_nft_sale = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_buyer","type":"address"}],"name":"Bought","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_media","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_public","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addressInWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"},{"internalType":"address","name":"referal","type":"address"}],"name":"buy_nft_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_Nft_count_and_owners","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_rewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"get_prise_presale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_NFTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"referals_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"reward_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"},{"internalType":"address[]","name":"_wl","type":"address[]"}],"name":"startNFTsale_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wl_presale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];  
        const contract_nft_sale = new Contract(address_nft_sale, abi_nft_sale, provider);
        
        console.log(contract_nft_sale)
    }

    const checkAuth = async () => {
        try{
            const userData = JSON.parse(window.localStorage.getItem('userData'))   
     
            if(!userData){
                relocate()
            }

            if(!userData.isAuth){
                relocate()
            }

            initialContract(userData.address)

        }catch(error){
            console.log(error)
            relocate()
        }
    }

    const getUser = async () => {
        checkAuth()
        const {success,user} = await getUserById(id)
        console.log(user)
    } 

    useEffect(() => {
        if(!id) return

        getUser()
    },[id])

    return (
      <>
      <Head title={'Referral'}/>
      <Modal
      isVisible={loginModal}
      title='Login'
      >
        <div className={styles.body}>
            <Image src={ErrorPng} alt='Create account to activate ref link'/>
            <div className={styles.text}>
                To activate the referral link you need to log in
            </div>
            <SquareLightBtn
            handler={() => router.replace('/info?login=true')}
            type='red'
            width='330'
            text={'Login'}
            />
        </div>
      </Modal>
      </>
    );
}

export default RefPage;


