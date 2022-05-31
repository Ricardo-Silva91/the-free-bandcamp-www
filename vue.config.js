module.exports = {
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'Crispy UI',
      },
    },
    css: {
      loaderOptions: {
          sass: {
            additionalData: `
                  @import "@/submodules/crispy-ui/src/assets/styles/_variables.scss";
              `
          }
      }
  }
}