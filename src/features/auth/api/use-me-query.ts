import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
import { authKeys } from "../../../shared/api/keys-factory/auth-keys-factory";

const UseMeQuery = () =>
  useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const clientResponse = await client.GET("/auth/me");
      console.log("auth me:", clientResponse);
      console.log("data:", clientResponse.data);
      console.log("userId:", clientResponse.data?.userId);

      return clientResponse.data;
    },

    retry: false,
  });

export default UseMeQuery;
