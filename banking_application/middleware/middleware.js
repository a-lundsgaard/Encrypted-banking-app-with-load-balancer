module.exports = () => (req, res, next) => {
    if (!req.client.authorized) {
      console.log('Certificate was self signed')
      //return res.status(401).send('Invalid client certificate authentication.');
    }
    return next();
  };
  