module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should: 
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
      // 'gatsby-plugin-styled-components',
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'BarbellCalculator',
        short_name: 'Barbell',
        start_url: '/',
        background_color: '#3949ab',
        theme_color: '#3949ab',
        // Enables 'Add to Homescreen' prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'static/icon.png' // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`
  ]
}
