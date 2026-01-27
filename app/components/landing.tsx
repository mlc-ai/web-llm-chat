import { IconButton } from "./button";
import { useMobileScreen } from "../utils";
import ReturnIcon from "../icons/return.svg";
import styles from "./chat.module.scss";
import { useNavigate } from "react-router-dom";
import { Path, SlotID } from "../constant";
import { useState, useRef } from "react";
import { Loading } from "./home";
import ChatIcon from "../icons/chat.svg";
import AgentIcon from "../icons/paw-print.svg";

import "../styles/landing.scss";
import { SettingsIcon } from "lucide-react";

export function LandingPage() {
  const isMobileScreen = useMobileScreen();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div className="window-header">
        {isMobileScreen && (
          <div className="window-actions">
            <div className={"window-action-button"}>
              <IconButton
                icon={<ReturnIcon />}
                bordered
                title="The Town"
                onClick={() => navigate(Path.Home)}
              />
            </div>
          </div>
        )}

        <div className={`window-header-title ${styles["chat-body-title"]}`}>
          <div
            className={`landing-main-title ${styles["chat-body-main-title"]}`}
            //onClickCapture={() => setShowEditPromptModal(true)} // If we want edit conversation at all, keep this, else set to false and change styling to remove underline
          >
            The Town
          </div>
          <div className="window-header-sub-title">
            An A.I. Fantasy Game World
          </div>
        </div>
      </div>
      <div>
        <p className="landing-body">
          Welcome to The Town! The Town is a self-generating story comprised
          completely of A.I. agents, running locally on your device! These
          agents are all unique in their mannerisms and personalities. View the
          agent&apos;s interactions with each other, watch them grow from the
          memories they make, and even question your own agent yourself!
        </p>
        <div className="landing-buttons">
          <div className="landing-nav-button">
            <IconButton
              icon={<AgentIcon />}
              text="My Agent"
              bordered
              onClick={() => navigate(Path.MyAgent)}
            />
          </div>
          <div className="landing-nav-button">
            <IconButton
              icon={<SettingsIcon />}
              text="Settings"
              bordered
              onClick={() => navigate(Path.Settings)}
            />
          </div>
          <div className="landing-nav-button">
            <IconButton
              icon={<ChatIcon />}
              text="Chat Room 1"
              bordered
              onClick={() => navigate(Path.Chat)}
            />
          </div>
          <div className="landing-nav-button">
            <IconButton
              icon={<ChatIcon />}
              text="Chat Room 2"
              bordered
              onClick={() => navigate(Path.Chat)}
            />
          </div>
          <div className="landing-nav-button">
            <IconButton
              icon={<ChatIcon />}
              text="Chat Room 3"
              bordered
              onClick={() => navigate(Path.Chat)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
