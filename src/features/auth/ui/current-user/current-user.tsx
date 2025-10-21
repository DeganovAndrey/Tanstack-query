import { Link } from "@tanstack/react-router";
import styles from "./current-user.module.css";
import UseMeQuery from "../../api/use-me-query";
import LogoutButton from "../logout-button";

const CurrentUser = () => {
  const query = UseMeQuery();

  if (!query.data) return <span>...</span>;

  return (
    <div className={styles.meInfoContainer}>
      <Link to="/my-playlists" activeOptions={{ exact: true }}>
        {query.data!.login} <LogoutButton />
      </Link>
    </div>
  );
};

export default CurrentUser;
