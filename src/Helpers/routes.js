import App from "../components/App";
import About from "../components/About";
import Posts from "../components/Posts";

export const routes = [
  { path: "/", component: App, exact: true },
  { path: "/about", component: About, exact: true },
  {path: '/posts', component: Posts, exact: true}
];
