import {
  useEffect,
  useState,
} from "react";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentService";

function Comments() {
  const [comments, setComments] =
    useState([]);

  const [comment, setComment] =
    useState("");

  const [taskId, setTaskId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loadComments =
    async () => {
      try {
        setLoading(true);

        const response =
          await getComments();

        setComments(
          response.data.comments ||
            []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadComments();
  }, []);

  const handleCreate =
    async () => {
      if (
        !comment ||
        !taskId
      )
        return;

      try {
        setLoading(true);

        await createComment({
          task: taskId,
          comment,
        });

        setComment("");
        setTaskId("");

        await loadComments();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        setLoading(true);

        await deleteComment(
          id
        );

        await loadComments();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>Comments</h2>

      <input
        placeholder="Task ID"
        value={taskId}
        onChange={(e) =>
          setTaskId(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Comment"
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleCreate
        }
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : "Add Comment"}
      </button>

      <hr />

      {loading && (
        <h3>Loading...</h3>
      )}

      {comments.map(
        (item) => (
          <div
            key={item._id}
          >
            <p>
              {
                item.comment
              }
            </p>

            <button
              disabled={
                loading
              }
              onClick={() =>
                handleDelete(
                  item._id
                )
              }
            >
              Delete
            </button>

            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default Comments;