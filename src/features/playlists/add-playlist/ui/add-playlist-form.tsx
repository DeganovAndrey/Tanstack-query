import { Path, useForm } from "react-hook-form";
import { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema";
import useAddPlaylistMutation from "../api/add-playlist-mutation";

const AddPlaylistForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaCreatePlaylistRequestPayload>();

  const { mutateAsync } = useAddPlaylistMutation();

  const onSubmit = async (data: SchemaCreatePlaylistRequestPayload) => {
    try {
      await mutateAsync(data);
      reset();
    } catch {
      if (isJsonApiErrorDocument(error)) {
        const { fieldErrors, globalErrors } = parseJsonApiErrors(error);
        for (const [field, message] of Object.entries(fieldErrors)) {
          setError(field as Path<SchemaCreatePlaylistRequestPayload>, {
            type: "server",
            message,
          });
          if (globalErrors.length > 0) {
            setError?.("root.server", {
              type: "server",
              message: globalErrors.join("\n"),
            });
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add new Playlist</h2>
      <p>
        <input {...register("title")} placeholder="write name..." />
      </p>
      {errors.title && <p>{errors.title.message}</p>}
      <p>
        <textarea
          {...register("description")}
          placeholder="write description"
        ></textarea>
      </p>
      {errors.description && <p>{errors.description.message}</p>}

      <button type={"submit"}>create</button>
      {errors.root?.server && <p>{errors.root?.server.message}</p>}
    </form>
  );
};

export default AddPlaylistForm;
