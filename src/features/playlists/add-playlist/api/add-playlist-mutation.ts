import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client";
import { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema";
import { playlistsKeys } from "../../../../shared/api/keys-factory/playlists-keys-factory";

const useAddPlaylistMutation = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
      const response = await client.POST("/playlists", {
        body: data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: playlistsKeys.lists(),
        refetchType: "all",
      });
    },
  });
};
export default useAddPlaylistMutation;
