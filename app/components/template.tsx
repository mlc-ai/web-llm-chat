import { IconButton } from "./button";
import { ErrorBoundary } from "./error";

import styles from "./template.module.scss";

import ConfirmIcon from "../icons/confirm.svg";
import DownloadIcon from "../icons/download.svg";
import UploadIcon from "../icons/upload.svg";
import EditIcon from "../icons/edit.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import DeleteIcon from "../icons/delete.svg";
import EyeIcon from "../icons/eye.svg";
import CopyIcon from "../icons/copy.svg";
import DragIcon from "../icons/drag.svg";

import {
  DEFAULT_TEMPLATE_AVATAR,
  Template,
  useTemplateStore,
} from "../store/template";
import {
  ChatMessage,
  createMessage,
  Model,
  useAppConfig,
  useChatStore,
} from "../store";
import { MultimodalContent, ROLES } from "../client/api";
import {
  Input,
  List,
  ListItem,
  Modal,
  Popover,
  Select,
  showConfirm,
} from "./ui-lib";
import { Avatar, AvatarPicker } from "./emoji";
import Locale from "../locales";
import { useNavigate } from "react-router-dom";

import chatStyle from "./chat.module.scss";
import { useState } from "react";
import {
  copyToClipboard,
  downloadAs,
  getMessageImages,
  readFromFile,
} from "../utils";
import { MessageRole, Updater } from "../typing";
import { FileName, Path } from "../constant";
import { BUILTIN_TEMPLATE_STORE } from "../templates";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { getMessageTextContent } from "../utils";

// drag and drop helper function
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function TemplateAvatar(props: { avatar: string; model?: Model }) {
  return props.avatar !== DEFAULT_TEMPLATE_AVATAR ? (
    <Avatar avatar={props.avatar} />
  ) : (
    <Avatar model={props.model} />
  );
}

export function TemplateConfig(props: {
  template: Template;
  updateTemplate: Updater<Template>;
  extraListItems?: JSX.Element;
  readonly?: boolean;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const config = useAppConfig();

  return (
    <>
      <ContextPrompts
        context={props.template.context}
        updateContext={(updater) => {
          const context = props.template.context.slice();
          updater(context);
          props.updateTemplate((template) => (template.context = context));
        }}
      />

      <List>
        <ListItem title={Locale.Template.Config.Avatar}>
          <Popover
            content={
              <AvatarPicker
                onEmojiClick={(emoji) => {
                  props.updateTemplate((template) => (template.avatar = emoji));
                  setShowPicker(false);
                }}
              ></AvatarPicker>
            }
            open={!props.readonly && showPicker}
            onClose={() => setShowPicker(false)}
          >
            <div
              onClick={() => setShowPicker(true)}
              style={{ cursor: "pointer" }}
            >
              <TemplateAvatar
                avatar={props.template.avatar}
                model={config.modelConfig.model}
              />
            </div>
          </Popover>
        </ListItem>
        <ListItem title={Locale.Template.Config.Name}>
          <input
            type="text"
            value={props.template.name}
            onInput={(e) =>
              props.updateTemplate((template) => {
                template.name = e.currentTarget.value;
              })
            }
            disabled={props.readonly}
          ></input>
        </ListItem>
        <ListItem
          title={Locale.Template.Config.HideContext.Title}
          subTitle={Locale.Template.Config.HideContext.SubTitle}
        >
          <input
            type="checkbox"
            checked={props.template.hideContext}
            onChange={(e) => {
              props.updateTemplate((template) => {
                template.hideContext = e.currentTarget.checked;
              });
            }}
          ></input>
        </ListItem>
      </List>
    </>
  );
}

function ContextPromptItem(props: {
  index: number;
  prompt: ChatMessage;
  roles: MessageRole[];
  update: (prompt: ChatMessage) => void;
  remove: () => void;
}) {
  const [focusingInput, setFocusingInput] = useState(false);

  return (
    <div className={chatStyle["context-prompt-row"]}>
      {!focusingInput && (
        <>
          <div className={chatStyle["context-drag"]}>
            <DragIcon />
          </div>
          <Select
            value={props.prompt.role}
            className={chatStyle["context-role"]}
            onChange={(e) =>
              props.update({
                ...props.prompt,
                role: e.target.value as any,
              })
            }
          >
            {props.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </>
      )}
      <Input
        value={getMessageTextContent(props.prompt)}
        type="text"
        className={chatStyle["context-content"]}
        rows={focusingInput ? 5 : 1}
        onFocus={() => setFocusingInput(true)}
        onBlur={() => {
          setFocusingInput(false);
          // If the selection is not removed when the user loses focus, some
          // extensions like "Translate" will always display a floating bar
          window?.getSelection()?.removeAllRanges();
        }}
        onInput={(e) =>
          props.update({
            ...props.prompt,
            content: e.currentTarget.value as any,
          })
        }
      />
      {!focusingInput && (
        <IconButton
          icon={<DeleteIcon />}
          className={chatStyle["context-delete-button"]}
          onClick={() => props.remove()}
          bordered
        />
      )}
    </div>
  );
}

export function ContextPrompts(props: {
  context: ChatMessage[];
  updateContext: (updater: (context: ChatMessage[]) => void) => void;
}) {
  const context = props.context;

  const addContextPrompt = (prompt: ChatMessage, i: number) => {
    props.updateContext((context) => context.splice(i, 0, prompt));
  };

  const removeContextPrompt = (i: number) => {
    props.updateContext((context) => context.splice(i, 1));
  };

  const updateContextPrompt = (i: number, prompt: ChatMessage) => {
    props.updateContext((context) => {
      const images = getMessageImages(context[i]);
      context[i] = prompt;
      if (images.length > 0) {
        const text = getMessageTextContent(context[i]);
        const newContext: MultimodalContent[] = [{ type: "text", text }];
        for (const img of images) {
          newContext.push({ type: "image_url", image_url: { url: img.url } });
        }
        context[i].content = newContext;
      }
    });
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }
    const newContext = reorder(
      context,
      result.source.index,
      result.destination.index,
    );
    newContext.forEach((c, i) => {
      if (i > 0 && c.role === "system") {
        c.role = "assistant";
      }
    });
    props.updateContext((context) => {
      context.splice(0, context.length, ...newContext);
    });
  };

  return (
    <>
      <div className={chatStyle["context-prompt"]} style={{ marginBottom: 20 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="context-prompt-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {context.map((c, i) => (
                  <Draggable
                    draggableId={c.id || i.toString()}
                    index={i}
                    key={c.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ContextPromptItem
                          index={i}
                          prompt={c}
                          roles={ROLES.filter((r) =>
                            i > 0 ? r !== "system" : true,
                          )}
                          update={(prompt) => updateContextPrompt(i, prompt)}
                          remove={() => removeContextPrompt(i)}
                        />
                        <div
                          className={chatStyle["context-prompt-insert"]}
                          onClick={() => {
                            addContextPrompt(
                              createMessage({
                                role: "user",
                                content: "",
                                date: new Date().toLocaleString(),
                              }),
                              i + 1,
                            );
                          }}
                        >
                          <AddIcon />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {props.context.length === 0 && (
          <div className={chatStyle["context-prompt-row"]}>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Context.Add}
              bordered
              className={chatStyle["context-prompt-button"]}
              onClick={() =>
                addContextPrompt(
                  createMessage({
                    role: "user",
                    content: "",
                    date: "",
                  }),
                  props.context.length,
                )
              }
            />
          </div>
        )}
      </div>
    </>
  );
}

export function TemplatePage() {
  const navigate = useNavigate();

  const templateStore = useTemplateStore();
  const chatStore = useChatStore();

  const allTemplates = templateStore.getAll();

  const [searchTemplates, setSearchTemplates] = useState<Template[]>([]);
  const [searchText, setSearchText] = useState("");
  const templates = searchText.length > 0 ? searchTemplates : allTemplates;

  // refactored already, now it accurate
  const onSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const result = allTemplates.filter((m) =>
        m.name.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchTemplates(result);
    } else {
      setSearchTemplates(allTemplates);
    }
  };

  const [editingTemplateId, setEditingTemplateId] = useState<
    string | undefined
  >();
  const editingTemplate =
    templateStore.get(editingTemplateId) ??
    BUILTIN_TEMPLATE_STORE.get(editingTemplateId);
  const closeTemplateModal = () => setEditingTemplateId(undefined);

  const downloadAll = () => {
    downloadAs(
      JSON.stringify(templates.filter((v) => !v.builtin)),
      FileName.Templates,
    );
  };

  const importFromFile = () => {
    readFromFile().then((content) => {
      try {
        const importTemplates = JSON.parse(content);
        if (Array.isArray(importTemplates)) {
          for (const template of importTemplates) {
            if (template.name) {
              templateStore.create(template);
            }
          }
          return;
        }
        //if the content is a single template.
        if (importTemplates.name) {
          templateStore.create(importTemplates);
        }
      } catch {}
    });
  };

  return (
    <ErrorBoundary>
      <div className={styles["template-page"]}>
        <div className="window-header">
          <div className="window-header-title">
            <div className="window-header-main-title">
              {Locale.Template.Page.Title}
            </div>
            <div className="window-header-submai-title">
              {Locale.Template.Page.SubTitle}
            </div>
          </div>

          <div className="window-actions">
            <div className="window-action-button">
              <IconButton
                icon={<DownloadIcon />}
                bordered
                onClick={downloadAll}
                text={Locale.UI.Export}
              />
            </div>
            <div className="window-action-button">
              <IconButton
                icon={<UploadIcon />}
                text={Locale.UI.Import}
                bordered
                onClick={() => importFromFile()}
              />
            </div>
            <div className="window-action-button">
              <IconButton
                icon={<CloseIcon />}
                bordered
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
        </div>

        <div className={styles["template-page-body"]}>
          <div className={styles["template-filter"]}>
            <input
              type="text"
              className={styles["search-bar"]}
              placeholder={Locale.Template.Page.Search}
              autoFocus
              onInput={(e) => onSearch(e.currentTarget.value)}
            />

            <IconButton
              className={styles["template-create"]}
              icon={<AddIcon />}
              text={Locale.Template.Page.Create}
              bordered
              onClick={() => {
                const createdTemplate = templateStore.create();
                setEditingTemplateId(createdTemplate.id);
              }}
            />
          </div>

          <div className={styles["template-item-container"]}>
            {templates.map((m) => (
              <div className={styles["template-item"]} key={m.id}>
                <div className={styles["template-header"]}>
                  <div className={styles["template-icon"]}>
                    <TemplateAvatar
                      avatar={m.avatar || DEFAULT_TEMPLATE_AVATAR}
                    />
                  </div>
                  <div className={styles["template-title"]}>
                    <div className={styles["template-name"]}>{m.name}</div>
                    <div className={styles["template-info"] + " one-line"}>
                      {Locale.Template.Item.Info(m.context.length)}
                    </div>
                  </div>
                </div>
                <div className={styles["template-actions"]}>
                  <IconButton
                    icon={<AddIcon />}
                    text={Locale.Template.Item.Chat}
                    onClick={() => {
                      chatStore.newSession(m);
                      navigate(Path.Chat);
                    }}
                  />
                  {m.builtin ? (
                    <IconButton
                      icon={<EyeIcon />}
                      text={Locale.Template.Item.View}
                      onClick={() => setEditingTemplateId(m.id)}
                    />
                  ) : (
                    <IconButton
                      icon={<EditIcon />}
                      text={Locale.Template.Item.Edit}
                      onClick={() => setEditingTemplateId(m.id)}
                    />
                  )}
                  {!m.builtin && (
                    <IconButton
                      icon={<DeleteIcon />}
                      text={Locale.Template.Item.Delete}
                      onClick={async () => {
                        if (
                          await showConfirm(Locale.Template.Item.DeleteConfirm)
                        ) {
                          templateStore.delete(m.id);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingTemplate && (
        <div className="screen-model-container">
          <Modal
            title={Locale.Template.EditModal.Title(editingTemplate?.builtin)}
            onClose={closeTemplateModal}
            actions={[
              <IconButton
                icon={<ConfirmIcon />}
                text={Locale.Template.EditModal.Save}
                key="save"
                bordered
                onClick={closeTemplateModal}
              />,
              <IconButton
                icon={<DownloadIcon />}
                text={Locale.Template.EditModal.Download}
                key="export"
                bordered
                onClick={() =>
                  downloadAs(
                    JSON.stringify(editingTemplate),
                    `${editingTemplate.name}.json`,
                  )
                }
              />,
              <IconButton
                key="copy"
                icon={<CopyIcon />}
                bordered
                text={Locale.Template.EditModal.Clone}
                onClick={() => {
                  navigate(Path.Templates);
                  templateStore.create(editingTemplate);
                  setEditingTemplateId(undefined);
                }}
              />,
            ]}
          >
            <TemplateConfig
              template={editingTemplate}
              updateTemplate={(updater) =>
                templateStore.updateTemplate(editingTemplateId!, updater)
              }
              readonly={editingTemplate.builtin}
            />
          </Modal>
        </div>
      )}
    </ErrorBoundary>
  );
}
