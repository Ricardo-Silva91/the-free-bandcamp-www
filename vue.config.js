module.exports = {
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'The Free Bandcamp',
      },
    },
    css: {
      loaderOptions: {
          sass: {
            additionalData: `
              @import "@/components/crispy-ui/src/styles/_variables.scss";
              @import "@/components/crispy-ui/src/styles/_utilities.scss";
            `
          }
      }
  }
}