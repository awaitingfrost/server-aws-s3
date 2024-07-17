import React, { useState } from 'react';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

const Upload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>()

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    // Add more supported types as needed
  ];

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const selectedFile = event.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {

      if (selectedFile) {
        setSelectedFiles([...selectedFiles, selectedFile]);

        setUploading(true)
        const S3_BUCKET = "your_bucket_name";
        const REGION = "your_region";

        AWS.config.update({
          accessKeyId: "your_accesskeyID",
          secretAccessKey: "your_secretAccessKey",
        });

        const s3 = new S3({
          params: { Bucket: S3_BUCKET },
          region: REGION,
        });

        const params = {
          Bucket: S3_BUCKET,
          Key: selectedFile.name,
          Body: selectedFile,
        };

        try {
          const upload = await s3.putObject(params).promise();
          console.log(upload);
          setUploading(false)
          alert("File uploaded successfully.");

        } catch (error) {
          console.error(error);
          setUploading(false)
          alert("Error uploading file: " + error.message); // Inform user about the error
        }
      }

    } else {
      alert('Invalid file type. Only images and PDFs are allowed.');
    }


  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
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
        </div>
      )}
    </div>
  );
};

export default Upload;
