import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client";
import {
  SchemaGetPlaylistOutput,
  SchemaUpdatePlaylistRequestPayload,
} from "../../../../shared/api/schema";
import { playlistsKeys } from "../../../../shared/api/keys-factory/playlists-keys-factory";

type MutationVariables = SchemaUpdatePlaylistRequestPayload & {
  playlistId: string;
};

const usePlaylistUpdateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const queryclient = useQueryClient();

  const key = playlistsKeys.myLists();

  return useMutation({
    mutationFn: async (variables: MutationVariables) => {
      const { playlistId, ...rest } = variables;
      const response = await client.PUT("/playlists/{playlistId}", {
        params: { path: { playlistId: playlistId } },
        body: { ...rest, tagIds: [] },
      });
      return response.data;
    },

    onMutate: async (variables: MutationVariables) => {
      await queryclient.cancelQueries({ queryKey: playlistsKeys.all });

      const previousMyPlaylists = queryclient.getQueryData(key);

      queryclient.setQueryData(key, (oldData: SchemaGetPlaylistOutput) => {
        return {
          ...oldData,
          data: oldData.data.map((p) => {
            if (p.id === variables.playlistId)
              return {
                ...p,
                attributes: { ...p.attributes },
                description: variables.description,
                title: variables.title,
              };
            else return p;
          }),
        };
      });

      return { previousMyPlaylists };
    },
    onError: (_, __: MutationVariables, context) => {
      queryclient.setQueryData(key, context!.previousMyPlaylists);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onSettled: (_, __, variables: MutationVariables) => {
      queryclient.invalidateQueries({
        queryKey: playlistsKeys.lists(),
        refetchType: "all",
      });

      queryclient.invalidateQueries({
        queryKey: playlistsKeys.detail(variables.playlistId),
        refetchType: "all",
      });
    },
  });
};

export default usePlaylistUpdateMutation;
