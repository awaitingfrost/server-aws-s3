import { useEffect, useState } from "react";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Spinner = () => (
  <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
);

const FileUpload = () =>  {
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
  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setSelectedFiles(selectedFile);
    } else {
      alert('Invalid file type. Only images, PDFs, videos, and audio files are allowed.');
    }
  };

  const uploadFileInChunks = async () => {
    if (!selectedFile)  {
      toast.error('Please select a file first');
      return
  }
    setIsUploading(true);

    const uploadPromise = new Promise(async (resolve, reject) => {
    try{
    const chunkSize = 5 * 1024 * 1024;
    const chunks = Math.ceil(selectedFile.size / chunkSize);
    const largeFileCheck = 20 * 1024 * 1024;

    console.log(`Total file size: ${selectedFile.size} bytes`);
    console.log(`Chunk size: ${chunkSize} bytes`);
    console.log(`Total chunks: ${chunks}`);
  
    if(selectedFile.size > largeFileCheck){
    const { data: { uploadId, key } } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/start-multipart-upload`, {
      filename: selectedFile?.name,
      fileType:selectedFile?.type
    });
  
    const uploadedParts = [];
  
    for (let i = 0; i < chunks; i++) {
      console.log(`Processing chunk ${i + 1} of ${chunks}`);
  
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, selectedFile.size);
      const chunk = selectedFile.slice(start, end);
  
      console.log(`Chunk ${i + 1} size: ${chunk.size} bytes`);
  
      try {
        const presignedUrl = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/s3/presigned-url`, {
          params: {
            key: key,
            partNumber: i + 1,
            uploadId: uploadId
          }
        });
        console.log(`Uploading chunk ${i + 1}...`);

        const response = await axios.put(presignedUrl.data, chunk,{
          headers: {
            "Content-Type": selectedFile?.type,
          }});
  
        const etag = response.headers['etag'];
        console.log(`Part ${i + 1} uploaded successfully. ETag: ${etag}`);

        uploadedParts.push({
          PartNumber: i + 1,
          ETag: etag
        });
      } catch (error) {
        console.error(`Failed to upload part ${i + 1}:`, error);
        throw error;
      }
    }
  
    console.log('All parts uploaded. Uploaded parts:', uploadedParts);
  
    try {
      console.log('Sending complete upload request...');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/complete-upload`, {
        uploadId,
        key: key,
        parts: uploadedParts
      });
      if (response.status === 200) {
        resolve(`File "${selectedFile.name}" uploaded successfully`);
      } else {
        reject(`Failed to upload file "${selectedFile.name}"`);
      }
    } catch (error) {
      console.error('Error completing upload:');
    }
  }

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/generate-single-presigned`,{params:{
      filename:selectedFile?.name,
      filetype:selectedFile?.type
  }})
  const { data : {getSignedUrl} } = response;

  const uploadingSingleFileURL = await axios.put(getSignedUrl,selectedFile,{
    headers:{
      "Content-Type": selectedFile?.type
    }
  })

  if (uploadingSingleFileURL.status === 200) {
    resolve(`File "${selectedFile.name}" uploaded successfully`);
  } else {
    reject(`Failed to upload file "${selectedFile.name}"`);
  }

} catch(error){
  reject('Failed to upload File')
} finally {
    setIsUploading(false);
}})

toast.promise(
  uploadPromise,
  {
    loading: 'Uploading...',
    success: (message) => `${message}`,
    error: (message) => `${message}`,
  }
);
};

  return (
    <div className="">
    <div className="flex flex-col  items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
     <Toaster position="top-right" />
    <input
      type="file"
      hidden
      multiple
      onChange={handleFileChange}
      className="hidden"
      id="video-upload"
    />
    <label htmlFor="video-upload" className="font-semibold cursor-pointer bg-gray-600 p-8 rounded-2xl hover:bg-gray-800">
      Select File
    </label>
    <button 
        onClick={uploadFileInChunks} 
        className={`bg-gray-600 text-white rounded-2xl font-semibold px-8 py-3 mt-8 hover:bg-gray-800 transition flex items-center justify-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Spinner />
            Uploading...
          </>
        ) : (
          'Upload File'
        )}
      </button>

      <div>
        <p className="text-black text-2xl font-bold rounded-md py-2 mt-4 ">File Name:</p>
        <p className="text-black text-xl font-semibold">{selectedFile?.name}</p>
       </div>
     </div>
     </div>
  )
}

export default FileUpload