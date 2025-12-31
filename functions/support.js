export default {
  async fetch(request, env) {
    try {
      const body = await request.json();

      // Vérifie si c'est une interaction Discord
      if (body.type === 1) { // Ping
        return new Response(JSON.stringify({ type: 1 }), { 
          headers: { "Content-Type": "application/json" }
        });
      }

      if (body.type === 2) { // Slash command
        // On envoie le menu
        return new Response(JSON.stringify({
          type: 4, // Channel message with source
          data: {
            content: "Bienvenue sur le support Axolotl ! Choisis une option :",
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 3,
                    custom_id: "support_menu",
                    options: [
                      { label: "Aide jeu", value: "jeu" },
                      { label: "Aide Discord", value: "discord" },
                      { label: "Support technique", value: "technique" }
                    ],
                    placeholder: "Sélectionne une option",
                    min_values: 1,
                    max_values: 1
                  }
                ]
              }
            ]
          }
        }), { headers: { "Content-Type": "application/json" } });
      }

      if (body.type === 3) { // Interaction component (menu)
        const choice = body.data.values[0];
        let reply = "";

        switch(choice) {
          case "jeu":
            reply = "Voici l'aide pour le jeu : ...";
            break;
          case "discord":
            reply = "Voici l'aide pour Discord : ...";
            break;
          case "technique":
            reply = "Voici le support technique : ...";
            break;
        }

        return new Response(JSON.stringify({
          type: 4,
          data: { content: reply }
        }), { headers: { "Content-Type": "application/json" }});
      }

      return new Response("Not handled", { status: 404 });

    } catch(e) {
      return new Response("Error: " + e.message, { status: 500 });
    }
  }
}
