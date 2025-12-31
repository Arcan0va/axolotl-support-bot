export default {
  async fetch(request) {
    const body = await request.json().catch(() => ({}))

    if (body.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: { "Content-Type": "application/json" }
      })
    }

    if (body.type === 2) {
      return new Response(JSON.stringify({
        type: 4,
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
}
