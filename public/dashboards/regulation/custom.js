window.EquinoxRegulationDashboard = {
  schema_version: 1,
  kind: "regulation-dashboard",
  algorithm: "custom",
  title: "Test",
  translations: {
    fr: {
      "sections.main.title": "Synthèse",
      "items.note": "Dashboard custom chargé."
    },
    en: {
      "sections.main.title": "Summary",
      "items.note": "Custom dashboard loaded."
    }
  },
  sections: [
    {
      id: "main",
      title_key: "sections.main.title",
      icon: "mdi:view-dashboard-outline",
      items: [
        {
          type: "section_note",
          text_key: "items.note",
          tone: "info"
        },
        {
          type: "value",
          label: "Entity",
          source: "config",
          path: "entity"
        }
      ]
    }
  ]
};