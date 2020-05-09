import { combineReducers } from "redux";
import ArticleReducer from "./articlesreducer";
import UserInfoReducer from "./userInfoReducer";
import NewOrEditArticle from "./newOrEditArticle";
import SignInReducer from "./signinReducer";
import UserReducer from "./userReducer";

export default combineReducers({
  articles: ArticleReducer,
  userInfo: UserInfoReducer,
  postarticle: NewOrEditArticle,
  signin: SignInReducer,
  user: UserReducer
});
