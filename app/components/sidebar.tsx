import { useEffect, useRef, useMemo } from "react";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/gear.svg";
import GithubIcon from "../icons/github.svg";
import InternetIcon from "../icons/internet.svg";
import MlcIcon from "../icons/mlc.svg";
import AddIcon from "../icons/add.svg";
import DeleteIcon from "../icons/delete.svg";
import TemplateIcon from "../icons/chat.svg";
import DragIcon from "../icons/drag.svg";
import LightIcon from "../icons/light.svg";
import DarkIcon from "../icons/dark.svg";
import AutoIcon from "../icons/auto.svg";

import Locale from "../locales";

import {
  DEFAULT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
  WEBLLM_HOME_URL,
} from "../constant";

import { useNavigate } from "react-router-dom";
import { isIOS, useMobileScreen } from "../utils";
import { showConfirm } from "./ui-lib";

export function SideBar(props: { className?: string }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.sidebar} ${props.className} ${styles["narrow-sidebar"]}`}
    >
      <div className={styles["sidebar-header"]}>
        <div className={styles["sidebar-title"]}>{Locale.Title}</div>
        <div className={styles["sidebar-sub-title"]}>{Locale.Subtitle}</div>
        <div className={styles["sidebar-logo"] + " no-dark mlc-icon"}>
          <MlcIcon />
        </div>
      </div>

      <div className={styles["sidebar-header-bar"]}>
        <IconButton
          icon={<TemplateIcon />}
          className={styles["sidebar-bar-button"]}
          onClick={() => {
            navigate(Path.Templates, { state: { fromHome: true } });
          }}
          shadow
        />
        <IconButton
          icon={<SettingsIcon />}
          className={styles["sidebar-bar-button"]}
          onClick={() => {
            navigate(Path.Settings);
          }}
          shadow
        />
      </div>

      <div
        className={styles["sidebar-body"]}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      ></div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton icon={<DeleteIcon />} onClick={async () => {}} />
          </div>
          <div className={styles["sidebar-action"]}>
            <a href={WEBLLM_HOME_URL} target="_blank" rel="noopener noreferrer">
              <IconButton icon={<InternetIcon />} shadow />
            </a>
          </div>
          <div className={styles["sidebar-action"]}>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <IconButton icon={<GithubIcon />} shadow />
            </a>
          </div>
          <div className={styles["sidebar-action"]}>
            <IconButton icon={<DarkIcon />} shadow />
          </div>
        </div>
        <div>
          <IconButton icon={<AddIcon />} shadow />
        </div>
      </div>

      <div className={styles["sidebar-drag"]}>
        <DragIcon />
      </div>
    </div>
  );
}
