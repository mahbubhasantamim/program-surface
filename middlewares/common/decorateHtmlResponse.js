//page titel respone
const decorateHtmlResponse = (page_title) => {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${page_title} | ${process.env.APP_NAME}`;
    res.locals.loggedInUser = {};
    res.locals.error = {};
    next();
  };
};
module.exports = decorateHtmlResponse;
