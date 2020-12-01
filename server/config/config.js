const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "supersecretpassword",
    DATABASE: "mongodb://localhost:27017/thebookstore"
  },
}

exports.get = function get(env) {
  return config[env] || config.default
}