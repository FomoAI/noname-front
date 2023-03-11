import { useState, useEffect } from "react";
import styles from "../styles/participate.module.scss";
import ParticipateCard from "../../assets/components/participateCard/ParticipateCard";
import EndedProject from "../../assets/components/endedProject/EndedProject";
import useParticipate from "../../hooks/useParticipate";
import Modal from "../../assets/components/modal/Modal";
import CompleteModal from "../../assets/components/completeModal/CompleteModal";
import ConnectWalletModal from "../../assets/components/connectWalletModal/ConnectWalletModal";
import BuyModal from "../../assets/components/BuyModal/BuyModal";
import ConfirmModal from "../../assets/components/confirmModal/ConfirmModal";
import useDates from "../../hooks/useDates";

export default function ParticipatePage({ project, type, id }) {
  const {
    cards,
    modals,
    isActual,
    connectHandler,
    openWallet,
    selectNft,
    participate,
    claim,
    value,
    handler,
    confirmStaking,
  } = useParticipate({ type, id, project });

  const {days,hours,minutes} = useDates(project.dateEnd,project.timeEnd, true);

  return isActual ? (
    <>
      <div className={styles.body}>
        {cards.map((card, index) => {
          return (
            <ParticipateCard
              closes={{days,hours,minutes}}
              project={project}
              participate={participate}
              claim={claim}
              connectHandler={connectHandler}
              modals={modals}
              card={card}
              key={card.title}
              index={index}
              value={value}
              handler={handler}
            />
          );
        })}
      </div>
      <Modal handler={connectHandler} isVisible={modals.connect.state}>
        <ConnectWalletModal closes={{days,hours,minutes}} openWallet={openWallet} />
      </Modal>
      <Modal handler={connectHandler} isVisible={modals.complete.state}>
        <CompleteModal closes={{days,hours,minutes}} handler={connectHandler} />
      </Modal>
      <Modal handler={connectHandler} isVisible={modals.buy.state}>
        <BuyModal closes={{days,hours,minutes}} handler={selectNft} />
      </Modal>
      <Modal handler={confirmStaking} isVisible={modals.confirm.state}>
        <ConfirmModal closes={{days,hours,minutes}} confirm={confirmStaking} card={project} />
      </Modal>
    </>
  ) : (
    <div className={styles.endedProject}>
      <EndedProject project={project} />
    </div>
  );
}
