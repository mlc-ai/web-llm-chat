import { IconButton } from "./button";
import { useMobileScreen } from "../utils";
import ReturnIcon from "../icons/return.svg";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import MaxIcon from "../icons/max.svg";
import MinIcon from "../icons/min.svg";

import "../styles/landing.scss";
import { useAppConfig } from "../store/config";

export function LandingPage() {
  const isMobileScreen = useMobileScreen();
  const navigate = useNavigate();
  const config = useAppConfig();

  return (
    <>
      <div className="window-header landing-header">
        <div className="landing-header-left">
          {isMobileScreen && (
            <div className="window-actions">
              <div className="window-action-button">
                <IconButton
                  icon={<ReturnIcon />}
                  bordered
                  title="The Town"
                  onClick={() => navigate(Path.Home)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="window-header-title landing-header-title">
          <div className="window-header-main-title">The Town</div>
          <div className="window-header-sub-title">
            An A.I. Fantasy Game World
          </div>
        </div>

        <div className="landing-header-right">
          {!isMobileScreen && (
            <div className="window-actions">
              <div className="window-action-button">
                <IconButton
                  icon={config.tightBorder ? <MinIcon /> : <MaxIcon />}
                  bordered
                  onClick={() => {
                    config.update(
                      (config) => (config.tightBorder = !config.tightBorder),
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="landing-page">
        <section className="landing-section landing-town-section">
          <div className="landing-image-wrapper landing-pixel-border">
            <img
              src="/landing-town.png"
              alt="A cozy 8-bit pixel-art town with animal residents: a snake, eagle, cow, bear, and others—no humans"
              className="landing-image landing-pixel-image"
            />
          </div>
          <p className="landing-section-copy">
            A cozy village where AI agents, like raccoons, cats, eagles, snakes,
            and more, live, chat, and grow from their experiences.
          </p>
        </section>

        <section className="landing-section landing-agents-section">
          <div className="landing-image-wrapper landing-pixel-border">
            <img
              src="/landing-agents-talking.png"
              alt="Two pixel-art animal agents chatting, with emoticons in their speech bubbles"
              className="landing-image landing-pixel-image"
            />
          </div>
          <p className="landing-section-copy">
            Independent AI agents, each an animal with their own unique
            personality, talk to each other, form memories, and change over
            time.
          </p>
        </section>

        <section className="landing-body-section">
          <p className="landing-body">
            Welcome to The Town, a self-generating story full of AI agents
            running locally on your device. Every resident is an animal: a
            raccoon, a cat, an eagle, a snake, and more. Each has their own
            mannerisms and personality. Watch them interact, see how they grow
            from the memories they make, and chat with your own agent.
          </p>
        </section>
      </div>
    </>
  );
}
