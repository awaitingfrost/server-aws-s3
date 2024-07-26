import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'

const Spinner: React.FC = () => (
  <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></div>
);

const ImageUpload: React.FC = () => {
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
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFileWithPresignedUrl = async (file: File) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/multiple-images`, {
        params: {
          filename: file.name,
          filetype: file.type
        }
      });
    await axios.put(`${data}`, file, {
        headers: { 'Content-Type': file.type }
      });
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      throw error;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== newFiles.length) {
      toast.error('Some files were skipped due to invalid type');
    }
      
    setSelectedFiles(prev => [...prev, ...validFiles]);

    setUploading(true);

    const uploadPromises = validFiles?.map(file => 
      toast.promise(
        uploadFileWithPresignedUrl(file),
        {
          loading: `Uploading ${file.name}...`,
          success: () => {
            return `Successfully uploaded ${file.name}`;
          },
          error: (err) => `Failed to upload ${file.name}: ${err.message}`,
        }
      )
    );

    Promise.all(uploadPromises).finally(() => setUploading(false))
    }
  

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col  items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
      <Toaster position="top-right" />
      <input
        type="file"
        hidden
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="font-semibold bg-gray-600 p-8 rounded-2xl  cursor-pointer hover:bg-gray-800">
      {uploading ? <Spinner /> : null}
        {uploading ? 'Uploading...' : 'Select File'}
      </label>
      
      {selectedFiles.length > 0 && (
        <div className="mt-4 w-full">
          <h2 className="text-black font-semibold text-xl">Selected Files:</h2>
          <ul className="mt-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-800 p-2 border rounded my-1">
                <span className='text-white'>{file.name}</span>
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
}

export default ImageUpload;
