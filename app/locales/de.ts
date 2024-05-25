import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const de: PartialLocaleType = {
  WIP: "In Bearbeitung...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} Nachrichten`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} Nachrichten mit ChatGPT`,
    Actions: {
      ChatList: "Zur Chat-Liste gehen",
      CompressedHistory: "Komprimierter Gedächtnis-Prompt",
      Export: "Alle Nachrichten als Markdown exportieren",
      Copy: "Kopieren",
      Stop: "Stop",
      Retry: "Wiederholen",
      Delete: "Delete",
    },
    Rename: "Chat umbenennen",
    Typing: "Tippen...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} um zu Senden`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Umschalt + Eingabe für Zeilenumbruch";
      }
      return inputHints + ", / zum Durchsuchen von Prompts";
    },
    Send: "Senden",
    Config: {
      Reset: "Reset to Default",
    },
  },
  Export: {
    Title: "Alle Nachrichten",
    Copy: "Alles kopieren",
    Download: "Herunterladen",
    MessageFromYou: "Deine Nachricht",
    MessageFromWebLLM: "Nachricht von WebLLM",
  },
  Memory: {
    Title: "Gedächtnis-Prompt",
    EmptyContent: "Noch nichts.",
    Send: "Gedächtnis senden",
    Copy: "Gedächtnis kopieren",
    Reset: "Sitzung zurücksetzen",
    ResetConfirm:
      "Das Zurücksetzen löscht den aktuellen Gesprächsverlauf und das Langzeit-Gedächtnis. Möchten Sie wirklich zurücksetzen?",
  },
  Home: {
    NewChat: "Neuer Chat",
    DeleteChat: "Bestätigen Sie, um das ausgewählte Gespräch zu löschen?",
    DeleteToast: "Chat gelöscht",
    Revert: "Zurücksetzen",
  },
  Settings: {
    Title: "Einstellungen",
    SubTitle: "Alle Einstellungen",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Alle Sprachen",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Schriftgröße",
      SubTitle: "Schriftgröße des Chat-Inhalts anpassen",
    },
    InjectSystemPrompts: {
      Title: "System-Prompts einfügen",
      SubTitle:
        "Erzwingt das Hinzufügen eines simulierten systemweiten Prompts von ChatGPT am Anfang der Nachrichtenliste bei jeder Anfrage",
    },
    Update: {
      Version: (x: string) => `Version: ${x}`,
      IsLatest: "Neueste Version",
      CheckUpdate: "Update prüfen",
      IsChecking: "Update wird geprüft...",
      FoundUpdate: (x: string) => `Neue Version gefunden: ${x}`,
      GoToUpdate: "Aktualisieren",
    },
    SendKey: "Senden-Taste",
    Theme: "Erscheinungsbild",
    TightBorder: "Enger Rahmen",
    SendPreviewBubble: {
      Title: "Vorschau-Bubble senden",
      SubTitle: "Preview markdown in bubble",
    },
    Prompt: {
      Disable: {
        Title: "Autovervollständigung deaktivieren",
        SubTitle: "Autovervollständigung mit / starten",
      },
      List: "Prompt-Liste",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} integriert, ${custom} benutzerdefiniert`,
      Edit: "Bearbeiten",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Anzahl der angehängten Nachrichten",
      SubTitle: "Anzahl der pro Anfrage angehängten gesendeten Nachrichten",
    },
    CompressThreshold: {
      Title: "Schwellenwert für Verlaufskomprimierung",
      SubTitle:
        "Komprimierung, wenn die Länge der unkomprimierten Nachrichten den Wert überschreitet",
    },

    Usage: {
      Title: "Kontostand",
      SubTitle(used: any, total: any) {
        return `Diesen Monat ausgegeben $${used}, Abonnement $${total}`;
      },
      IsChecking: "Wird überprüft...",
      Check: "Erneut prüfen",
      NoAccess: "API-Schlüssel eingeben, um den Kontostand zu überprüfen",
    },
    Model: "Modell",
    Temperature: {
      Title: "Temperature", //Temperatur
      SubTitle: "Ein größerer Wert führt zu zufälligeren Antworten",
    },
    MaxTokens: {
      Title: "Max Tokens", //Maximale Token
      SubTitle: "Maximale Anzahl der Anfrage- plus Antwort-Token",
    },
    PresencePenalty: {
      Title: "Presence Penalty", //Anwesenheitsstrafe
      SubTitle:
        "Ein größerer Wert erhöht die Wahrscheinlichkeit, dass über neue Themen gesprochen wird",
    },
    FrequencyPenalty: {
      Title: "Frequency Penalty", // HäufigkeitStrafe
      SubTitle:
        "Ein größerer Wert, der die Wahrscheinlichkeit verringert, dass dieselbe Zeile wiederholt wird",
    },
  },
  Store: {
    DefaultTopic: "Neues Gespräch",
    BotHello: "Hallo! Wie kann ich Ihnen heute helfen?",
    Error:
      "Etwas ist schief gelaufen, bitte versuchen Sie es später noch einmal.",
    Prompt: {
      History: (content: string) =>
        "Dies ist eine Zusammenfassung des Chatverlaufs zwischen dem KI und dem Benutzer als Rückblick: " +
        content,
      Topic:
        "Bitte erstellen Sie einen vier- bis fünfwörtigen Titel, der unser Gespräch zusammenfasst, ohne Einleitung, Zeichensetzung, Anführungszeichen, Punkte, Symbole oder zusätzlichen Text. Entfernen Sie Anführungszeichen.",
      Summarize:
        "Fassen Sie unsere Diskussion kurz in 200 Wörtern oder weniger zusammen, um sie als Pronpt für zukünftige Gespräche zu verwenden.",
    },
  },
  Copy: {
    Success: "In die Zwischenablage kopiert",
    Failed:
      "Kopieren fehlgeschlagen, bitte geben Sie die Berechtigung zum Zugriff auf die Zwischenablage frei",
  },
  Context: {
    Toast: (x: any) => `Mit ${x} Kontext-Prompts`,
    Edit: "Kontext- und Gedächtnis-Prompts",
    Add: "Hinzufügen",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Du bist ein Assistent, der",
  },
  NewChat: {
    Return: "Zurückkehren",
    Skip: "Fang einfach an",
    Title: "Wählen Sie eine Vorlage",
    SubTitle: "Starten Sie den Chat mit einer Vorlage",
    More: "Finde mehr",
    NotShow: "Nie wieder zeigen",
    ConfirmNoShow:
      "Zum Deaktivieren bestätigen? Sie können es später in den Einstellungen aktivieren.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
  },
  Exporter: {
    Model: "Modell",
    Messages: "Nachrichten",
    Topic: "Thema",
    Time: "Zeit",
  },
};

export default de;
