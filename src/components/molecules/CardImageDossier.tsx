import React from 'react';
import { BASE_URL } from '../../api/endpoint';
import { FileType } from '../../types/file';
import './cardImageDossier.css';

interface Props {
  file: FileType;
}

export default function CardImageDossier({ file }: Props) {
  return (
    <a
      href={`${BASE_URL}${file.link}?download=true`}
      download
      target="_blank"
      rel="noreferrer"
      className="cardImageDossier-container">
      <div className="cardImageDossier-info">
        <label title={file.name}>
          <p>{file.name}</p>
        </label>
      </div>
      <div className="cardImageDossier-type">
        <p>{file.name.split('.').reverse()[0]}</p>
      </div>
    </a>
  );
}
