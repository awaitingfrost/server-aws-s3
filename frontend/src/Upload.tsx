import React, { useState } from 'react';
import { uploadFileToS3 } from './aws-config';

const Upload: React.FC = () => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
  ];
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [uploading, setUploading] = useState<boolean>(false);
  const [urlString, setUrlString] = useState<string[]>([]);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setSelectedFiles([...selectedFiles, selectedFile]);
      const fileUrl = await uploadFileToS3(selectedFile);

      if (typeof fileUrl == 'string') {
        setUrlString([...urlString, fileUrl]);
      }
    } else {
      alert('Invalid file type. Only images, PDFs, videos, and audio files are allowed.');
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setUrlString(urlString.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        type="file"
        hidden
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:underline">
        Click to upload files
      </label>
      {selectedFiles.length > 0 && (
        <div className="mt-4 w-full">
          <h2 className="text-lg font-medium">Selected Files:</h2>
          <ul className="mt-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-white p-2 border rounded my-1">
                <span>{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {urlString.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-medium">Uploaded Files URLs:</h2>
              <ul className="mt-2">
                {urlString.map((url, index) => (
                  <li key={index} className="bg-white p-2 border rounded my-1">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='mt-28'>
          {urlString.length && (
        <div>
          <p>Uploaded Image:</p>
          {urlString.map((each, index) => (
        <img key={index} src={each} alt='' style={{ maxWidth: '100%', height: 'auto' }} />
      ))}
        </div>
      )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
