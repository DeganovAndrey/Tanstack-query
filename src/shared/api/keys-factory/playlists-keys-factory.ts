import { SchemaGetPlaylistsRequestPayload } from "./../schema";
export const playlistsKeys = {
  all: ["playlists"],
  lists: () => [...playlistsKeys.all, "lists"],
  myLists: () => [...playlistsKeys.lists(), "my"],
  list: (filters: Partial<SchemaGetPlaylistsRequestPayload>) => [
    ...playlistsKeys.lists(),
    filters,
  ],
  details: () => [...playlistsKeys.all, "details"],
  detail: (id: string) => [...playlistsKeys.details(), id],
};
