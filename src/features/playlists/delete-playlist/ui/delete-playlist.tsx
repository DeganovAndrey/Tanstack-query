import useDeleteMutation from "../api/use-delete-mutation";

type Props = {
  playlistId: string;
  onDeleted: (playlistId: string) => void;
};

const DeletePlaylist = ({ playlistId, onDeleted }: Props) => {
  const { mutate } = useDeleteMutation(playlistId);

  const handleDeleteClick = () => {
    mutate(playlistId);
    onDeleted?.(playlistId);
  };

  return <button onClick={handleDeleteClick}>delete</button>;
};

export default DeletePlaylist;
