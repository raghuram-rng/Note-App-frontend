import React from 'react';
import axios from 'axios';

function DeleteNoteButton({ noteId, onDeleteSuccess }) {

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/notes/${noteId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log('Note deleted successfully');
        onDeleteSuccess(); // Callback to handle successful deletion, like refreshing the notes list
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Note
    </button>
  );
}

export default DeleteNoteButton;
