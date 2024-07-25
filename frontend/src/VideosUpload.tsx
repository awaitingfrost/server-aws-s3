import { useState } from "react";
import axios from 'axios';

const VideosUpload = () =>  {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
  ];
  
  const [selectedFile, setSelectedFiles] = useState<File>();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setSelectedFiles(selectedFile);
    } else {
      alert('Invalid file type. Only images, PDFs, videos, and audio files are allowed.');
    }
  };

   const uploadFileInChunks = async () => {
    if (!selectedFile) return;

    const chunkSize = 5 * 1024 * 1024; 
    const chunks = Math.ceil(selectedFile.size / chunkSize);

    const { data: { uploadId, key } } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/start-multipart-upload`, {
      filename: selectedFile?.name
    });

    const uploadedParts = [];

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, selectedFile.size);
      const chunk = selectedFile.slice(start, end);

      

      const { data: { url, fields } } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/s3/presigned-url`,{
        params: {
          filename: selectedFile?.name,
          partNumber: i + 1,
          uploadId: uploadId
        }
      });

      const formData = new FormData();
      Object.keys(fields).forEach(key => formData.append(key, fields[key]));
      formData.append('file', chunk);

      const response = await axios.post(url, formData);

      uploadedParts.push({
        PartNumber: i + 1,
        ETag: response.headers.etag
      });
    }

    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/complete-upload`, {
      uploadId,
      key:  key,
      parts: uploadedParts
    });

    console.log('Upload completed successfully');


  };
  return (
    <div className="flex flex-col  items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
    <input
      type="file"
      hidden
      multiple
      onChange={handleFileChange}
      className="hidden"
      id="video-upload"
    />
    <label htmlFor="video-upload" className="font-semibold cursor-pointer bg-gray-600 p-8 rounded-2xl hover:bg-gray-800">
      Select Video
    </label>
    <button onClick={ uploadFileInChunks} className=" bg-gray-600 text-white rounded-2xl font-semibold px-8 py-3 mt-8 hover:bg-gray-800">Upload</button>
      <div>
        <p>Uploaded Videos:</p>
        <p className="text-black text-xl font-semibold">{selectedFile?.name}</p>
       </div>
     </div>
  )
}

export default VideosUpload