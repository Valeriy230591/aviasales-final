import React from "react";
import TransfersFilter from "../TransfersFilter";
import Tabs from "../Tabs";
import TicketsList from "../TicketsList";
import imgLogo from "./Logo.svg";
import { Offline, Online } from "react-detect-offline";
import OffLine from "../OffLine/OffLine";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Offline>
        <OffLine />
      </Offline>
      <Online>
        <div className={styles.app}>
          <div className={styles.logo}>
            <img src={imgLogo} alt="logo" />
          </div>
          <div className={styles.content}>
            <TransfersFilter />
            <div className={styles.ticketslist}>
              <Tabs />
              <TicketsList />
            </div>
          </div>
        </div>
      </Online>
    </>
  );
}

export default App;
