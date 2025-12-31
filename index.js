const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Events
} = require("discord.js");

const express = require("express");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Serveur web (Render aime ça)
const app = express();
app.get("/", (_, res) => res.send("🦎 Axolotl Support alive"));
app.listen(3000);

// Bot prêt
client.once(Events.ClientReady, () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// Interactions
client.on(Events.InteractionCreate, async interaction => {

  if (interaction.isChatInputCommand() && interaction.commandName === "support") {

    const menu = new StringSelectMenuBuilder()
      .setCustomId("support_menu")
      .setPlaceholder("Choisis ton type d’aide")
      .addOptions([
        { label: "🎮 Aide jeu", value: "game" },
        { label: "💬 Aide Discord", value: "discord" },
        { label: "🛠️ Support technique", value: "tech" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({
      content: "🦎 **Support Axolotl**",
      components: [row],
      ephemeral: true
    });
  }

  if (interaction.isStringSelectMenu() && interaction.customId === "support_menu") {
    await interaction.update({
      content: `✅ Catégorie choisie : **${interaction.values[0]}**`,
      components: []
    });
  }
});

client.login(process.env.TOKEN);
