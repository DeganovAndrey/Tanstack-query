import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client";
import { SchemaGetPlaylistsOutput } from "../../../../shared/api/schema";
import { playlistsKeys } from "../../../../shared/api/keys-factory/playlists-keys-factory";

const useDeleteMutation = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await client.DELETE("/playlists/{playlistId}", {
        params: { path: { playlistId } },
      });
      return response.data;
    },
    onSuccess: (_, playlistId: string) => {
      queryClient.setQueriesData(
        { queryKey: playlistsKeys.lists() },
        (oldData: SchemaGetPlaylistsOutput) => {
          return {
            ...oldData,
            data: oldData.data.filter((p) => p.id !== playlistId),
          };
        }
      );

      queryClient.removeQueries({
        queryKey: playlistsKeys.detail(playlistId),
        exact: true,
      });
    },
  });
};

export default useDeleteMutation;
