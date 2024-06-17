import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

// if you are adding a new translation, please use PartialLocaleType instead of LocaleType

const sk: PartialLocaleType = {
  WIP: "Už čoskoro...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} správ`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} správ`,
    EditMessage: {
      Title: "Upraviť všetky správy",
      Topic: {
        Title: "Téma",
        SubTitle: "Zmeniť aktuálnu tému",
      },
    },
    Actions: {
      ChatList: "Prejsť na zoznam chatov",
      CompressedHistory: "Komprimovaná história výziev",
      Export: "Exportovať všetky správy ako Markdown",
      Copy: "Kopírovať",
      Stop: "Zastaviť",
      Retry: "Skúsiť znova",
      Delete: "Vymazať",
      Edit: "Upraviť",
    },
    Commands: {
      new: "Začať nový chat",
      newt: "Začať nový chat s maskou",
      next: "Ďalší Chat",
      prev: "Predchádzajúci Chat",
      clear: "Vymazať kontext",
      del: "Vymazať Chat",
    },
    InputActions: {
      Stop: "Zastaviť",
      ToBottom: "Na najnovšie",
      Theme: {
        auto: "Automaticky",
        light: "Svetlý motív",
        dark: "Tmavý motív",
      },
      Clear: "Vymazať kontext",
      Settings: "Nastavenia",
    },
    Rename: "Premenovať Chat",
    Typing: "Písanie…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} na odoslanie`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter na zalomenie";
      }
      return inputHints + ", / na vyhľadávanie výziev, : na použitie príkazov";
    },
    Send: "Odoslať",
    Config: {
      Reset: "Resetovať na predvolené",
      SaveAs: "Uložiť ako masku",
    },
    IsContext: "Kontextová výzva",
  },
  Export: {
    Title: "Export správ",
    Copy: "Kopírovať všetko",
    Download: "Stiahnuť",
    MessageFromYou: "Správa od vás",
    MessageFromWebLLM: "Správa od WebLLM",
    Share: "Zdieľať",
    Format: {
      Title: "Formát exportu",
      SubTitle: "Markdown alebo PNG obrázok",
    },
    IncludeContext: {
      Title: "Vrátane kontextu",
      SubTitle: "Exportovať kontextové výzvy v maske alebo nie",
    },
    Steps: {
      Select: "Vybrať",
      Preview: "Náhľad",
    },
    Image: {
      Toast: "Snímanie obrázka...",
      Modal:
        "Dlhým stlačením alebo kliknutím pravým tlačidlom myši uložte obrázok",
    },
  },
  Select: {
    Search: "Hľadať",
    All: "Vybrať všetko",
    Latest: "Vybrať najnovšie",
    Clear: "Vymazať",
  },
  Memory: {
    Title: "Výzva pamäti",
    EmptyContent: "Zatiaľ nič.",
    Send: "Odoslať pamäť",
    Copy: "Kopírovať pamäť",
    Reset: "Resetovať reláciu",
    ResetConfirm:
      "Resetovaním sa vymaže aktuálna história konverzácie a historická pamäť. Ste si istí, že chcete resetovať?",
  },
  Home: {
    NewChat: "Nový Chat",
    DeleteChat: "Potvrdiť vymazanie vybranej konverzácie?",
    DeleteToast: "Chat vymazaný",
    Revert: "Vrátiť späť",
  },
  Settings: {
    Title: "Nastavenia",
    SubTitle: "Všetky nastavenia",
    Danger: {
      Reset: {
        Title: "Resetovať všetky nastavenia",
        SubTitle: "Resetovať všetky položky nastavení na predvolené",
        Action: "Resetovať",
        Confirm: "Potvrdiť resetovanie všetkých nastavení na predvolené?",
      },
      Clear: {
        Title: "Vymazať všetky údaje",
        SubTitle: "Vymazať všetky správy a nastavenia",
        Action: "Vymazať",
        Confirm: "Potvrdiť vymazanie všetkých správ a nastavení?",
      },
    },
    Lang: {
      Name: "Jazyk", // POZOR: ak pridávate nový preklad, prosím neprekladajte túto hodnotu, nechajte ju ako "Jazyk"
      All: "Všetky jazyky",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Veľkosť písma",
      SubTitle: "Nastaviť veľkosť písma obsahu chatu",
    },
    InjectSystemPrompts: {
      Title: "Vložiť systémové výzvy",
      SubTitle: "Vložiť globálnu systémovú výzvu pre každú požiadavku",
    },
    InputTemplate: {
      Title: "Šablóna vstupu",
      SubTitle: "Najnovšia správa bude vyplnená do tejto šablóny",
    },

    Update: {
      Version: (x: string) => `Verzia: ${x}`,
      IsLatest: "Najnovšia verzia",
      CheckUpdate: "Skontrolovať aktualizácie",
      IsChecking: "Kontrola aktualizácií...",
      FoundUpdate: (x: string) => `Nájdená nová verzia: ${x}`,
      GoToUpdate: "Aktualizovať",
    },
    SendKey: "Odoslať kľúč",
    Theme: "Motív",
    TightBorder: "Tesný okraj",
    SendPreviewBubble: {
      Title: "Bublina náhľadu odoslania",
      SubTitle: "Náhľad markdownu v bubline",
    },
    AutoGenerateTitle: {
      Title: "Automaticky generovať názov",
      SubTitle: "Generovať vhodný názov na základe obsahu konverzácie",
    },
    Template: {
      Builtin: {
        Title: "Skryť vstavané šablóny",
        SubTitle: "Skryť vstavané šablóny v zozname masiek",
      },
    },
    Prompt: {
      Disable: {
        Title: "Zakázať automatické dopĺňanie",
        SubTitle: "Zadajte / na spustenie automatického dopĺňania",
      },
      List: "Zoznam výziev",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} vstavaných, ${custom} užívateľsky definovaných`,
      Edit: "Upraviť",
      Modal: {
        Title: "Zoznam výziev",
        Add: "Pridať jednu",
        Search: "Hľadať výzvy",
      },
      EditModal: {
        Title: "Upraviť výzvu",
      },
    },
    HistoryCount: {
      Title: "Počet pripojených správ",
      SubTitle: "Počet odoslaných správ pripojených na požiadavku",
    },
    CompressThreshold: {
      Title: "Práh kompresie histórie",
      SubTitle:
        "Bude komprimované, ak dĺžka nekomprimovaných správ presiahne túto hodnotu",
    },

    Usage: {
      Title: "Stav účtu",
      SubTitle(used: any, total: any) {
        return `Tento mesiac použité ${used}, predplatné ${total}`;
      },
      IsChecking: "Kontroluje sa...",
      Check: "Skontrolovať",
      NoAccess: "Zadajte API kľúč na skontrolovanie zostatku",
    },

    Model: "Model",
    Temperature: {
      Title: "Teplota",
      SubTitle: "Vyššia hodnota robí výstup náhodnejším",
    },
    TopP: {
      Title: "Top P",
      SubTitle: "Neupravujte túto hodnotu spolu s teplotou",
    },
    MaxTokens: {
      Title: "Maximálny počet tokenov",
      SubTitle: "Maximálna dĺžka vstupných tokenov a generovaných tokenov",
    },
    PresencePenalty: {
      Title: "Penalizácia za prítomnosť",
      SubTitle:
        "Vyššia hodnota zvyšuje pravdepodobnosť hovorenia o nových témach",
    },
    FrequencyPenalty: {
      Title: "Penalizácia za frekvenciu",
      SubTitle:
        "Vyššia hodnota znižuje pravdepodobnosť opakovania rovnakej línie",
    },
  },
  Store: {
    DefaultTopic: "Nová konverzácia",
    BotHello: "Ahoj! Ako vám dnes môžem pomôcť?",
    Error: "Niečo sa pokazilo, skúste to prosím neskôr znova.",
    Prompt: {
      History: (content: string) =>
        "Toto je zhrnutie histórie chatu ako rekapitulácia: " + content,
      Topic:
        "Prosím, vygenerujte štvor- až päťslovný titul, ktorý zhrnie našu konverzáciu bez akéhokoľvek úvodu, interpunkcie, úvodzoviek, bodiek, symbolov, tučného textu alebo ďalšieho textu. Odstráňte uzatváracie úvodzovky.",
      Summarize:
        "Stručne zhrňte diskusiu na menej ako 200 slov, aby ste ju mohli použiť ako výzvu pre budúci kontext.",
    },
  },
  Copy: {
    Success: "Skopírované do schránky",
    Failed:
      "Kopírovanie zlyhalo, prosím udeľte povolenie na prístup k schránke",
  },
  Download: {
    Success: "Obsah stiahnutý do vášho adresára.",
    Failed: "Stiahnutie zlyhalo.",
  },
  Context: {
    Toast: (x: any) => `S ${x} kontextovými výzvami`,
    Edit: "Aktuálne nastavenia chatu",
    Add: "Pridať výzvu",
    Clear: "Kontext vyčistený",
    Revert: "Vrátiť späť",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Ste asistent, ktorý",
  },
  Template: {
    Item: {
      Info: (count: number) => `${count} výziev`,
      Chat: "Chat",
      View: "Zobraziť",
      Edit: "Upraviť",
      Delete: "Vymazať",
      DeleteConfirm: "Potvrdiť vymazanie?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Upraviť šablónu výziev ${readonly ? "(iba na čítanie)" : ""}`,
      Download: "Stiahnuť",
      Clone: "Klonovať",
    },
    Config: {
      Avatar: "Avatar robota",
      Name: "Meno robota",
      HideContext: {
        Title: "Skryť kontextové výzvy",
        SubTitle: "Nezobrazovať kontextové výzvy v chate",
      },
      Share: {
        Title: "Zdieľať túto masku",
        SubTitle: "Vygenerovať odkaz na túto masku",
        Action: "Kopírovať odkaz",
      },
    },
  },
  NewChat: {
    Return: "Vrátiť sa",
    Skip: "Len začať",
    Title: "Vybrať masku",
    SubTitle: "Chatovať s dušou za maskou",
    More: "Nájsť viac",
    NotShow: "Už nezobrazovať",
    ConfirmNoShow:
      "Potvrdiť deaktiváciu? Môžete ju neskôr znova povoliť v nastaveniach.",
  },

  UI: {
    Confirm: "Potvrdiť",
    Cancel: "Zrušiť",
    Close: "Zavrieť",
    Create: "Vytvoriť",
    Edit: "Upraviť",
    Export: "Exportovať",
    Import: "Importovať",
    Sync: "Synchronizovať",
    Config: "Konfigurácia",
  },
  Exporter: {
    Description: {
      Title: "Zobrazia sa len správy po vyčistení kontextu",
    },
    Model: "Model",
    Messages: "Správy",
    Topic: "Téma",
    Time: "Čas",
  },

  URLCommand: {
    Code: "Zistený prístupový kód z URL, potvrdiť na aplikovanie?",
    Settings: "Zistené nastavenia z URL, potvrdiť na aplikovanie?",
  },
};

export default sk;
