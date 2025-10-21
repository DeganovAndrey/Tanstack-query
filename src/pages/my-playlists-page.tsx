import { Navigate } from "@tanstack/react-router";
import UseMeQuery from "../features/auth/api/use-me-query";
import Playlists from "./playlists-page";
import AddPlaylistForm from "../features/playlists/add-playlist/ui/add-playlist-form";
import EditPlaylistForm from "../features/playlists/edit-playlist/ui/edit-playlist-form";
import { useState } from "react";

const MyPlaylistsPage = () => {
  const { data, isPending } = UseMeQuery();
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(
    null
  );

  const handlePlaylistDelete = (playlistId: string) => {
    if (playlistId === editingPlaylistId) {
      setEditingPlaylistId(null);
    }
  };

  if (isPending && !data) return <div>loading...</div>;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h3>My Playlists</h3>
      <hr />
      <AddPlaylistForm />
      <hr />
      <Playlists
        userId={data.userId}
        onPlaylistSelected={(playlistId: string) =>
          setEditingPlaylistId(playlistId)
        }
        onPlaylistDeleted={handlePlaylistDelete}
      />
      <hr />
      <EditPlaylistForm
        playlistId={editingPlaylistId}
        onCancelEditing={() => setEditingPlaylistId(null)}
      />
    </>
  );
};

export default MyPlaylistsPage;
