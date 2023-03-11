import styles from "./nft.module.scss";
import Image from "next/image";
import Modal from "../modal/Modal";
import useModal from "../../../hooks/useModal";
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import loader from "../../../utils/loader";

export default function Nft({ card, isVisible }) {
  if (!isVisible) {
    return <></>;
  }
  const { modalHandler, state } = useModal();

  return (
    <div className={styles.nft}>
      <div className={styles.nftTitle}>Estimated Allocation</div>
      <div className={styles.nftBody}>
        <div className={styles.nftImg}>
          <Image loader={() => loader(card.nft.img)} width={'48'} height={'48'} src={card.nft.img} alt={"nft-img"} />
        </div>
        <div className={styles.nftRow}>
          <div className={styles.nftColum}>
            <span className={styles.nftValue}>3 533,13</span>
            <div className={styles.nftText}>
              <span>Total staked in this pool: </span>
              <span>10 328 708,67</span>
            </div>
          </div>
          <button
            id="toggle-modal"
            onClick={modalHandler}
            className={styles.nftBtn}
          >
            Unstake
          </button>
        </div>
      </div>
      <div className={styles.modal}>
      <Modal isVisible={state} title="Unstaking" handler={modalHandler}>
        <div className={styles.modal}>
          <div className={styles.modalBody}>
            <Image loader={() => loader(card.nft.img)} width={'32'} height={'32'}  src={card.nft.img} alt={"nft-img"} />
            <span className={styles.modalTitle}>IDIA</span>
          </div>
          <div className={styles.btns}>
            <button className={styles.unstake}>Unstake</button>
            <SquareBtn type="red" width="171" text={"Participate"} />
          </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}



