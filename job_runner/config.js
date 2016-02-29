module.exports = {
  jobInterval: process.env.JOB_INTERVAL || (1000 * 6),
  mongoUrl: process.env.MONGO_URL || 'localhost/cf-reactjs-jumpstart'
};


