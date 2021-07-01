const providers = ['twitter', 'google', 'facebook', 'github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:8081/${provider}/callback`
    : `https://localhost:8080/${provider}/callback`
})

 const [twitterURL, googleURL, facebookURL, githubURL] = callbacks

// exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
//   ? 'https://react-auth-twitter.netlify.com'
//   : ['https://127.0.0.1:3000', 'https://localhost:3000']

// exports.TWITTER_CONFIG = {
//   consumerKey: process.env.TWITTER_KEY,
//   consumerSecret: process.env.TWITTER_SECRET,
//   callbackURL: twitterURL,
// }

// exports.GOOGLE_CONFIG = {
//   clientID: process.env.GOOGLE_KEY,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: googleURL
// }

exports.FACEBOOK_CONFIG = {
  clientID: '485182539182533',//process.env.FACEBOOK_KEY,
  clientSecret: 'e4a63260b0a8a4776a576a03b79bc65a',//process.env.FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: 'https://localhost:8080/facebook/callback'//facebookURL
}

// exports.GITHUB_CONFIG = {
//   clientID: process.env.GITHUB_KEY,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: githubURL
// }

module.exports = {
    FRONTEND_HOST: 'http://localhost:8081',
    FACEBOOK_CLIENT_ID: '485182539182533',
    FACEBOOK_CLIENT_SECRET: 'e4a63260b0a8a4776a576a03b79bc65a',
  }