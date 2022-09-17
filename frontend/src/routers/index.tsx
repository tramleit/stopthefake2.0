import AccountPage from "containers/AccountPage/AccountPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import Dashboard from "containers/Dashboard/Dashboard";
import FAQ from "containers/FAQ/FAQ";
import LegitCheck from "containers/LegitCheck/LegitCheck";
import NftDetailPage from "containers/NftDetailPage/NftDetailPage";
import Page404 from "containers/Page404/Page404";
import PageAbout from "containers/PageAbout/PageAbout";
import PageCollection from "containers/PageCollection";

import PageContact from "containers/PageContact/PageContact";
import PageHome from "containers/PageHome/PageHome";
import PageHome2 from "containers/PageHome/PageHome2";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSearch from "containers/PageSearch";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import PageUpdateItem from "containers/PageUpdateItem";
import PageUploadItem from "containers/PageUploadItem";
import PrivacyPolicy from "containers/PrivacyPolicy/PrivacyPolicy";
import RealVsFakePage from "containers/RealVsFakePage/BlogPage";
import TermsAndConditions from "containers/TermsConditions/TermsAndConditions";
import Users from "containers/Users/Users";
import { useAuth } from "contexts/AuthContext";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Page } from "./types";
import Historical from "../containers/Historical/Historical";
import PageForgotPassword from "containers/PageForgotPassword/PageForgotPassword";
import PageResetPassword from "containers/PageResetPassword/PageResetPassword";
import MyRequests from "containers/MyRequests/MyRequests";
import EditProfile from "containers/EditProfile/EditProfile";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/home2", exact: true, component: PageHome2 },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  { path: "/nft-detailt", component: NftDetailPage },
  { path: "/page-collection", component: PageCollection },
  { path: "/page-search", component: PageSearch },
  { path: "/page-author", component: AuthorPage, isProtected: true },
  { path: "/account", component: AccountPage },
  { path: "/page-upload-item", component: PageUploadItem, isProtected: true },

  //
  { path: "/real-vs-fake", component: RealVsFakePage },
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/forgot-password", component: PageForgotPassword },
  { path: "/reset-password", component: PageResetPassword },
  { path: "/subscription", component: PageSubcription, isProtected: true },
  { path: "/faqs", component: FAQ },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/terms-and-conditions", component: TermsAndConditions },
  //
  { path: "/dashboard", component: Dashboard, isProtected: true },
  { path: "/my-legit-checks", component: LegitCheck, isProtected: true },
  { path: "/users", component: Users, isProtected: true },
  { path: "/update-item", component: PageUpdateItem, isProtected: true },
  { path: "/historical", component: Historical, isProtected: true },
  { path: "/my-requests", component: MyRequests, isProtected: true },
  { path: "/edit-profile", component: EditProfile, isProtected: true },
];

const PrivateRoute = ({ component: Component, props }: any) => {
  const { loggedIn } = useAuth();
  return (
    <Route
      render={(props: any) => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
      {...props}
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter basename="/ciscryp">
      <ScrollToTop />
      {/* <SiteHeader /> */}
      {/* <HeaderLogged /> */}
      <Switch>
        {pages.map(({ component, path, exact, isProtected }) => {
          return isProtected ? (
            <PrivateRoute
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          ) : (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Routes;
