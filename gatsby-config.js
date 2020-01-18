module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-material-ui`
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
