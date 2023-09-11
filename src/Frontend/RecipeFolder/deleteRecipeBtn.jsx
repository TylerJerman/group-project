export default function DeleteBtn({ onDelete }) {
    return (
      <form onSubmit={onDelete}>
        <button type="submit">Delete Recipe</button>
      </form>
    );
  }