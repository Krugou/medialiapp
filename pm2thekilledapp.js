module.exports = {
  apps: [{
    name: "thekilledapp",
    script: "backend-rest/thekilledapp.js",
    watch: ["backend-rest"],
    watch_delay: 1000,
    ignore_watch: ["backend-rest/node_modules", "backend-rest/uploads", "backend-rest/thumbnails"]

  }]
}
