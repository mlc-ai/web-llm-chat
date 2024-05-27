import { useEffect } from "react";

import styles from "./settings.module.scss";

import CloseIcon from "../icons/close.svg";
import EditIcon from "../icons/edit.svg";

import { Input, List, ListItem, Modal, Select, showConfirm } from "./ui-lib";

import { IconButton } from "./button";

import Locale, { AllLangs, ALL_LANG_OPTIONS, getLang } from "../locales";
import { Path, SlotID } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const navigate = useNavigate();

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">
            {Locale.Settings.Title}
          </div>
          <div className="window-header-sub-title">
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>
      <div className={styles["settings"]}>
        <List>
          <ListItem title={Locale.Settings.SendKey}>
            <Select value={""}></Select>
          </ListItem>

          <ListItem title={Locale.Settings.Theme}>
            <Select value={""}></Select>
          </ListItem>

          <ListItem title={Locale.Settings.Lang.Name}>
            <Select value={getLang()}>
              {AllLangs.map((lang) => (
                <option value={lang} key={lang}>
                  {ALL_LANG_OPTIONS[lang]}
                </option>
              ))}
            </Select>
          </ListItem>

          <ListItem
            title={Locale.Settings.AutoGenerateTitle.Title}
            subTitle={Locale.Settings.AutoGenerateTitle.SubTitle}
          >
            <input type="checkbox"></input>
          </ListItem>

          <ListItem
            title={Locale.Settings.SendPreviewBubble.Title}
            subTitle={Locale.Settings.SendPreviewBubble.SubTitle}
          >
            <input type="checkbox"></input>
          </ListItem>
        </List>

        <List>
          <ListItem
            title={Locale.Settings.Template.Builtin.Title}
            subTitle={Locale.Settings.Template.Builtin.SubTitle}
          >
            <input type="checkbox"></input>
          </ListItem>
        </List>

        <List>
          <ListItem
            title={Locale.Settings.Prompt.Disable.Title}
            subTitle={Locale.Settings.Prompt.Disable.SubTitle}
          >
            <input type="checkbox"></input>
          </ListItem>

          <ListItem title={Locale.Settings.Prompt.List}>
            <IconButton
              icon={<EditIcon />}
              text={Locale.Settings.Prompt.Edit}
            />
          </ListItem>
        </List>

        <List id={SlotID.CustomModel}>
          <ListItem
            title={Locale.Settings.Access.CacheType.Title}
            subTitle={Locale.Settings.Access.CacheType.SubTitle}
          >
            <Select value="cache">
              <option value="cache" key="cache">
                Cache
              </option>
              <option value="index_db" key="index_db">
                Index DB
              </option>
            </Select>
          </ListItem>
          <ListItem
            title={Locale.Settings.Access.CustomModel.Title}
            subTitle={Locale.Settings.Access.CustomModel.SubTitle}
          >
            <input type="text" placeholder="model1,model2,model3"></input>
          </ListItem>
        </List>
      </div>
    </ErrorBoundary>
  );
}
