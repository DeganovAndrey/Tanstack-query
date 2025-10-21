import LoginButton from "./login-button";
import UseMeQuery from "../api/use-me-query";
import CurrentUser from "./current-user/current-user";

const AccountBar = () => {
  const query = UseMeQuery();

  if (query.isPending) return <span></span>;

  return (
    <div>
      {!query.data && <LoginButton />}
      {query.data && <CurrentUser />}
    </div>
  );
};

export default AccountBar;
