import { LanguageContext } from "@/context/language";
import ic_logo from "@/image/ic_logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./style.module.scss";

export default function WelcomeContainer() {
  const { currentLocale } = React.useContext(LanguageContext);
  const router = useRouter();

  return (
    <div className={styles.bodyOverview}>
      <div className={styles.overviewRoom}>
        <div>
          <Image src={ic_logo} alt="logo" />
        </div>
        <div className={styles.buttonSignLogin}>
          <div
            className={styles.textSign}
            onClick={() => {
              router.push("/register"), { locale: currentLocale };
            }}
          >
            <span>Sign up</span>
          </div>
          <div
            className={styles.textLogin}
            onClick={() => {
              router.push("/login"), { locale: currentLocale };
            }}
          >
            <span>Log in</span>
          </div>
        </div>
      </div>
      <div className={`row ${styles.welcomeImage}`}>
        <div className={`col-6 ${styles.welcomeTitle}`}>
          <div className={styles.textWelcome}>
            <span>Welcome to</span>
          </div>
          <div className={styles.textRoom}>
            <span>LANGUAGE ROOM</span>
          </div>
        </div>
      </div>
      <div className={styles.lastFooter}>
        <div className={styles.learnEng}>
          <div>Learning a foreign language is more interesting </div>
          <p>than today</p>
        </div>
        <div className={styles.textFooter}>
          <div>
            <span>You can join a school club, a playgroup or a large community</span>
          </div>
        </div>
      </div>
    </div>
  );
}
