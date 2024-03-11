import React,{useRef,useEffect} from 'react';

const DisplayMedia =({ url })=> {

    const videoRef = useRef(null);
    useEffect(() => {
        // Ensure videoRef.current is defined before calling play()
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, []);
    
  // Function to check if the URL is an image
  const isImageURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };
  // Function to check if the URL is a video
  const isVideoURL = (url) => {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  };

  // Function to render media based on URL type
  const renderMedia = () => {
    if (isImageURL(url)) {
      return <img style={{border:'1px solid lightgrey',borderRadius:'12px', objectFit:'cover', maxHeight:'240px'}} src={url} width="100%" height='auto' alt="Image" />;
    } else if (isVideoURL(url)) {
      return (
        <video style={{border:'1px solid lightgrey',borderRadius:'12px',objectFit:'cover', maxHeight:'240px'}} ref={videoRef} autoPlay loop width="100%" height='auto' muted>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <p>Unsupported media type</p>;
    }
  };

  return (
    <div>
      {renderMedia()}
    </div>
  );
}

export default DisplayMedia;
