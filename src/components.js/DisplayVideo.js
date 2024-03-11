import React,{useRef,useEffect, useState} from 'react';

export default function DisplayVideo({url}) {


  // Function to check if the URL is an image
  const isImageURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };
  // Function to check if the URL is a video
  const isVideoURL = (url) => {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  };
  
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu behavior
  };

  // Function to render media based on URL type
  const renderMedia = () => {
    if (isImageURL(url)) {
      return <img style={{objectFit:'cover',}} src={url} width="100%" height='90%' alt="Image" />;
    } else if (isVideoURL(url)) {
      return (
        <video style={{objectFit:'cover'}} controls autoPlay loop width="100%" height='90%' onContextMenu={handleContextMenu} controlsList='nodownload' muted>
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
  )
}
