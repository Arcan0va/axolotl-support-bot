// Remplace par les infos de ton bot
const DISCORD_APP_ID = "<1455877157581754453>"
const DISCORD_BOT_TOKEN = "<MTQ1NTg3NzE1NzU4MTc1NDQ1Mw.GD6ThR.dV2zwvf6Ife8tp6zYfWjzM7eTupAyFdCBOTuRw>"

fetch(`https://discord.com/api/v10/applications/${DISCORD_APP_ID}/commands`, {
  method: "POST",
  headers: {
    "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "support",
    description: "Ouvre le menu de support Axolotl",
    type: 1, // Slash command
    dm_permission: true
  })
})
.then(res => res.json())
.then(console.log)
.catch(console.error)
