import { Pagination } from "../../../shared/api/ui/pagination/pagination";
import { useState } from "react";
import DeletePlaylist from "../../../features/playlists/delete-playlist/ui/delete-playlist";
import usePlaylistsQuery from "../api/use-playlists-query";

type Props = {
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
  onPlaylistDeleted?: (playlistId: string) => void;
  isSearchActive?: boolean;
};

const Playlists = ({
  userId,
  onPlaylistSelected,
  onPlaylistDeleted,
  isSearchActive,
}: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const query = usePlaylistsQuery(userId, { search, pageNumber });

  const handleSelectPlaylistClick = (playlistId: string) => {
    onPlaylistSelected?.(playlistId);
  };

  const handleDeletePlaylist = (playlistId: string) => {
    onPlaylistDeleted?.(playlistId);
  };

  if (query.isPending) return <span>...loading</span>;
  if (query.isError)
    return <span> Error: {JSON.stringify(query.error.message)}</span>;

  return (
    <>
      {isSearchActive && (
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>
      )}
      <Pagination
        pagesCount={query.data.meta.pagesCount}
        currentPage={pageNumber}
        onPageNumberChange={setPageNumber}
        isFetching={query.isFetching}
      />
      <ul>
        {query.data.data.map((playlist) => (
          <li key={playlist.id}>
            <span onClick={() => handleSelectPlaylistClick(playlist.id)}>
              {playlist.attributes.title}
            </span>
            <DeletePlaylist
              playlistId={playlist.id}
              onDeleted={handleDeletePlaylist}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlists;
