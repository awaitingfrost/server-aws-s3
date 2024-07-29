import { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import axios from 'axios'

interface VideoUrlObject {
  name: string;
  url: string;
}

const VideoPlayer = () => {

  const [allVideoList,setVideoList] = useState<VideoUrlObject[]>([]);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const[clickedVideoObject,setClickedVideoObject] = useState<VideoUrlObject>();

  const fetchingAllVideosS3 = async() => {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/list-videos`);
    if(result){
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/getvideo-urls`, { ...result});
          setVideoList(response.data)
        } catch (error) {
          console.error('Error fetching presigned URLs:', error);
          throw error;
        }
    }
  }
  const handleVideoTitleClick = (obj:VideoUrlObject) => {
    setClickedVideoObject(obj)
  }

  useEffect(()=> {
   fetchingAllVideosS3()
  },[])



  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  // const handlePause = async () => {
  //   try {
  //     await axios.post(`${import.meta.env.VITE_BASE_URL}/api/save-timestamp`, {
  //       videoId,
  //       timestamp: playedSeconds,
  //     });
  //   } catch (error) {
  //     console.error('Failed to save timestamp:', error);
  //   }
  // };
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="flex gap-8">
        <div className="w-[30%]">
          {
            allVideoList.map((each,idx) => (
              <p key={idx} className="text-white bg-black rounded-md py-3 px-2 my-4" onClick={()=>handleVideoTitleClick(each)}>
                  {each.name}
              </p>
            ))
          }
        </div>

      <div className="video-player w-full h-[60vh]">
      <h2 className="text-xl text-blue-700 font-semibold mb-2"> Now Playing : {setClickedVideoObject?.name == 'bound dispatchSetState' ? 'Nothing playing' : setClickedVideoObject?.name}</h2>
      <ReactPlayer
        ref={playerRef}
        url={clickedVideoObject?.url}
        controls
        width="100%"
        height="80%"
        onProgress={handleProgress}
        // onPause={handlePause}
        // onEnded={handlePause}
      />
       </div>

      </div>

    </div>
  )
}

export default VideoPlayer