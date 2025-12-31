export default {
  async fetch(request, env) {
    const DISCORD_APP_ID = env.DISCORD_APP_ID;
    const DISCORD_BOT_TOKEN = env.DISCORD_BOT_TOKEN;

    try {
      const response = await fetch(`https://discord.com/api/v10/applications/${DISCORD_APP_ID}/commands`, {
        method: "POST",
        headers: {
          "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "support",
          description: "Ouvre le menu de support Axolotl",
          type: 1,
          dm_permission: true
        })
      });

      const data = await response.json();
      return new Response("Commande /support enregistrée !\n" + JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response("Erreur : " + err.message, { status: 500 });
    }
  }
}
