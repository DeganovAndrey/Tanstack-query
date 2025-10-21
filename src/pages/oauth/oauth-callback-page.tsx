import { useEffect } from "react";

const OauthCallbackPage = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code && window.opener) {
      window.opener.postMessage({ code }, window.location.origin);
    }
    window.close();
  }, []);
  return (
    <>
      <h3>Oauth2 Callback Page</h3>
    </>
  );
};

export default OauthCallbackPage;
