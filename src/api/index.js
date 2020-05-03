const ArticleExportFunc = require("./articleApi");
const AuthorExportFunc = require("./authorApi");

module.exports = app => {
  ArticleExportFunc(app);
  AuthorExportFunc(app);
};
