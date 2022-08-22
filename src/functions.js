//-------------------------------------
//          Funkcje                   -
//-------------------------------------


const textPermissions = function (permission) {
    const { Permissions: { FLAGS } } = require("discord.js")
    const flagsReverse = new Map()
    const flagsNames = Object.keys(FLAGS)
    const flagsNumbers = Object.values(FLAGS)
    flagsNames.forEach((f, i) => {
        flagsReverse.set(flagsNumbers[i], f)
    })
    const permissionsText = {
    CREATE_INSTANT_INVITE: "tworzenie zaproszenia",
    KICK_MEMBERS: "wyrzucanie członków",
    BAN_MEMBERS: "banowanie członków",
    ADMINISTRATOR: "administrator",
    MANAGE_CHANNELS: "zarządzanie kanałami",
    MANAGE_GUILD: "zarządzanie serwerem",
    ADD_REACTIONS: "dodawanie rekacji",
    VIEW_AUDIT_LOG: "wyświetlanie dziennika zdarzeń",
    PRIORITY_SPEAKER: "priorytetowy rozmówca",
    STREAM: "wideo",
    VIEW_CHANNEL: "wyświetlanie kanału",
    SEND_MESSAGES: "wysyłanie wiadomości",
    SEND_TTS_MESSAGES: "wysyłanie wiadomości tts",
    MANAGE_MESSAGES: "zarządzanie wiadomościami",
    EMBED_LINKS: "zamieszczanie linków",
    ATTACH_FILES: "załączanie plików",
    READ_MESSAGE_HISTORY: "czytanie historii czatu",
    MENTION_EVERYONE: "zamieszczanie wzmianki @everyone, @here oraz wszystkie role.",
    USE_EXTERNAL_EMOJIS: "używanie zewnętrznych emoji",
    VIEW_GUILD_INSIGHTS: "wyświetlanie statystyk serwera",
    CONNECT: "łączenie",
    SPEAK: "mówienie",
    MUTE_MEMBERS: "wyciszanie członków",
    DEAFEN_MEMBERS: "wyłączanie dźwięku członkom",
    MOVE_MEMBERS: "przenoszenie członków",
    USE_VAD: "używanie aktywności głosowej",
    CHANGE_NICKNAME: "zmiana pseudonimu",
    MANAGE_NICKNAMES: "zarządzanie pseudonimami",
    MANAGE_ROLES: "zarządzanie rolami",
    MANAGE_WEBHOOKS: "zarządzanie webhookami",
    MANAGE_EMOJIS: "zarządzanie emoji"
  }
  if (Array.isArray(permission)) {
      const permissions = []
      permission.forEach(e => permissions.push(permissionsText[flagsReverse.get(e)]))
      return betterjoin(permissions.map(p => "**" + p.toUpperCase() + "**"))
  }
  return "**" + permissionsText[flagsReverse.get(permission[0])].toUpperCase() + "**"
}

//-------------------------------------
//          Eksportowanie             -
//-------------------------------------
module.exports = {
textPermissions,
}