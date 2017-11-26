import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({ word, onChangeCurrentAudio, onDelete, editLink }) => {
  const { _id, name, definition, synonyms, imageUrl, audioSrc, category } = word;
  const categoryName = category[0] && category[0].name;
  const [audioFileName, ...rest] = audioSrc ? audioSrc.split('/').reverse() : [];

  return (
    <tr key={_id}>
      <td>
        <button className="button-clear" onClick={() => onChangeCurrentAudio(_id, audioSrc)}>&#9658;</button>
        <span>{audioFileName}</span>
      </td>
      <td>{name}</td>
      <td>{categoryName}</td>
      <td>{definition}</td>
      <td>{synonyms}</td>
      <td>
        <img height="50px" width="50px" style={{ objectFit: 'cover' }} src={imageUrl} alt={name} />
      </td>
      <td>
        <Link className="button button-clear" to={editLink}>Edit</Link>
      </td>
      <td>
        <button className="button-clear" onClick={() => onDelete(word)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
