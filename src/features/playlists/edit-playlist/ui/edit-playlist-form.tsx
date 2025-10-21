import { useForm } from "react-hook-form";
import { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema";
import { useEffect } from "react";
import usePlaylistQuery from "../api/use-playlist-query";
import usePlaylistUpdateMutation from "../api/use-playlist-update-mutation";

type Props = {
  playlistId: string | null;
  onCancelEditing: () => void;
};

const EditPlaylistForm = ({ playlistId, onCancelEditing }: Props) => {
  const { register, handleSubmit, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  useEffect(() => {
    reset();
  }, [playlistId]);

  const { data, isPending, isError } = usePlaylistQuery(playlistId);

  const { mutate } = usePlaylistUpdateMutation({
    onSuccess: () => {
      onCancelEditing();
    },
  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate({ ...data, playlistId: playlistId! });
  };

  const handleCancelEditingClick = () => {
    onCancelEditing();
  };

  if (playlistId) return <></>;

  if (isPending) return <p>...loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit new Playlist</h2>
      <p>
        <input
          {...register("title")}
          placeholder="write name..."
          defaultValue={data!.data.attributes.title}
        />
      </p>
      <p>
        <textarea
          {...register("description")}
          placeholder="write description"
          defaultValue={data!.data.attributes.description!}
        ></textarea>
      </p>
      <button type={"submit"}>save</button>
      <button type={"reset"} onClick={handleCancelEditingClick}>
        cancel
      </button>
    </form>
  );
};

export default EditPlaylistForm;
