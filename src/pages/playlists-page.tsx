import Playlists from "../widgets/playlists/ui/playlists";

type Props = {
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
  onPlaylistDeleted?: (playlistId: string) => void;
};

const PlaylistsPage = ({
  userId,
  onPlaylistSelected,
  onPlaylistDeleted,
}: Props) => {
  return (
    <>
      <Playlists
        userId={userId}
        isSearchActive={true}
        onPlaylistSelected={onPlaylistSelected}
        onPlaylistDeleted={onPlaylistDeleted}
      />
    </>
  );
};

export default PlaylistsPage;
