module.exports = {
  apps: [{
    script: "backend-rest/thekilledapp.js",
    watch: ["backend-rest"],
    ignore_watch: ["backend-rest/uploads", "backend-rest/thumbnails"]

  }]
}
