import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { playlistsKeys } from "../../../shared/api/keys-factory/playlists-keys-factory";
import { SchemaGetPlaylistsRequestPayload } from "../../../shared/api/schema";
import { client } from "../../../shared/api/client";

const usePlaylistsQuery = (
  userId: string | undefined,
  filters: Partial<SchemaGetPlaylistsRequestPayload>
) => {
  const key = userId ? playlistsKeys.lists() : playlistsKeys.list(filters);

  const queryParams = userId ? { userId } : filters;

  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: key,
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: queryParams,
        },
        signal,
      });
      if (response.error) {
        throw (response as unknown as { error: Error }).error;
      }
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  return query;
};

export default usePlaylistsQuery;
