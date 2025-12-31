addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const body = await request.json().catch(() => ({}))

  // Discord PING
  if (body.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      headers: { "Content-Type": "application/json" }
    })
  }

  // Slash command
  if (body.type === 2) {
    return new Response(JSON.stringify({
      type: 4, // RESPONSE_CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "🦎 Support Axolotl — choisis une catégorie :",
        components: [
          {
            type: 1,
            components: [
              {
                type: 3,
                custom_id: "support_menu",
                placeholder: "Choisis une catégorie",
                min_values: 1,
                max_values: 1,
                options: [
                  { label: "🎮 Aide jeu", value: "game" },
                  { label: "💬 Aide Discord", value: "discord" },
                  { label: "🛠️ Support technique", value: "tech" }
                ]
              }
            ]
          }
        ]
      }
    }), { headers: { "Content-Type": "application/json" } })
  }

  return new Response("Ok")
}
