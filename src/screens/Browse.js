// navigate(`../Browse/${item.urlSlug}-${item._id}`, {state: item})
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ContextApi } from "../components.js/ContextApi";
import DisplayMedia from "../components.js/DisplayMedia";
import Searchbox from "../components.js/Searchbox";
import filtericon from "../images/filter.png";
import Modal from "react-modal";
import trash from "../images/trash.png";
import cancelIcon from "../images/cancel.svg";
import { Bars } from "react-loader-spinner";
import { Helmet } from 'react-helmet';

import "../cssFiles.js/browse.css"
import "../cssFiles.js/swiper.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Browse(props) {

  const isMobile = window.innerWidth <= 700;
  const [uploadDate, setuploadDate] = useState("");
  const [morePattern, setmorePattern] = useState([]);
  const [moreAppname, setmoreAppname] = useState([]);
  const [video, setvideo] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [videoIndex, setvideoIndex] = useState(null);

  useEffect(() => {
    console.log(video);
    var dateObj = new Date(video?.uploadDate);
    var options = { year: "numeric", month: "short", day: "numeric" };
    var formattedDate = dateObj.toLocaleDateString("en-US", options);
    setuploadDate(formattedDate);
  }, [video]);

  useEffect(() => {
    const updatedPattern = interactions?.filter(
      (item) => item?.pattern == video?.pattern && item?.name !== video?.name
    );
    const updatedapp = interactions?.filter(
      (item) => item?.appName == video?.appName && item?.name !== video?.name
    );
    setmorePattern(updatedPattern);
    setmoreAppname(updatedapp);
  }, [video]);

  const opentab = (index) => {
    setvideoIndex(index);
    openModal(index);
  };

  useEffect(() => {
    if (videoIndex != null) {
      window.history.replaceState(
        null,
        "Browse",
        `/Browse/${interactions[videoIndex]?.appName}-${interactions[videoIndex]?._id}`
      );
      console.log(videoIndex);
      setvideo(interactions[videoIndex]);
    }
  }, [videoIndex]);

  // useEffect(() => {

  // }, [video])

  const location = useLocation();
  const admin = location.state;

  const cdnURL = "https://d3wqbogi93pb3.cloudfront.net/";
  let navigate = useNavigate();
  const a = useContext(ContextApi);
  const [interactions, setinteractions] = useState(a.interactions);
  const [spinner, setspinner] = useState(true);

  useEffect(() => {
    setspinner(false);
  }, [a]);

  const [pattern, setpattern] = useState(props?.pattern || admin?.pattern);
  const [industry, setindustry] = useState(props?.industry || admin?.industry);
  const [appName, setappName] = useState(props?.appName || admin?.appName);

  const [selectedpattern, setselectedpattern] = useState([]);
  const [selectedindustry, setselectedindustry] = useState([]);
  const [selectedappName, setselectedappName] = useState([]);
  const [BackgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    if (
      selectedappName.length ||
      selectedindustry.length ||
      selectedpattern.length
    ) {
      console.log(true);
      console.log(selectedappName);

      const updatedInteraction = a.interactions.filter((item) => {
        let a = true;
        let b = true;
        let c = true;

        if (selectedappName.length) {
          // Check if selectedappName matches the item's appName
          a = selectedappName.some((x) => x === item.appName);
        }

        if (selectedindustry.length) {
          // Check if selectedindustry matches the item's industry
          b = selectedindustry.some((x) => x === item.industry);
        }

        if (selectedpattern.length) {
          // Check if selectedpattern matches the item's pattern
          c = selectedpattern.some((x) => x === item.pattern);
        }

        // Return true only if all conditions are matched
        return a && b && c;
      });

      setinteractions(updatedInteraction);
    } else {
      setinteractions(a.interactions);
    }
  }, [selectedappName, selectedindustry, selectedpattern]);

  function openModal(index) {
    if (typeof props.changeBackgroundColor === "function") {
      props?.handleScrollOff();
    }
    window.history.pushState(
      null,
      "unused",
      `/Browse/${interactions[index]?.appName}-${interactions[index]?._id}`
    );
    setIsOpen(true);
  }
  function closeModal() {
    if (typeof props.changeBackgroundColor === "function") {
      props?.handleScrollOff();
    }
    window.history.back();
    setIsOpen(false);
  }
  // Function to handle checkbox change event
  const handleappname = (event, item) => {
    const isChecked = event.target.checked;

    // Update the checkedItems array based on the checkbox state
    if (isChecked) {
      setselectedappName([...selectedappName, item]); // Push the item to the checkedItems array
    } else {
      setselectedappName(
        selectedappName.filter((checkedItem) => checkedItem !== item)
      ); // Remove the item from the checkedItems array
    }
  };

  const handlepattern = (event, item) => {
    const isChecked = event.target.checked;

    // Update the checkedItems array based on the checkbox state
    if (isChecked) {
      setselectedpattern([...selectedpattern, item]); // Push the item to the checkedItems array
    } else {
      setselectedpattern(
        selectedpattern.filter((checkedItem) => checkedItem !== item)
      ); // Remove the item from the checkedItems array
    }
  };

  const handleindustry = (event, item) => {
    const isChecked = event.target.checked;

    // Update the checkedItems array based on the checkbox state
    if (isChecked) {
      setselectedindustry([...selectedindustry, item]); // Push the item to the checkedItems array
    } else {
      setselectedindustry(
        selectedindustry.filter((checkedItem) => checkedItem !== item)
      ); // Remove the item from the checkedItems array
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (modalIsOpen && videoIndex >= 1) {
          setvideoIndex((prevIndex) => prevIndex - 1); // Use functional update to ensure correct previous state
        }
      } else if (event.key === "ArrowRight") {
        if (modalIsOpen && videoIndex < interactions.length - 1) {
          setvideoIndex((prevIndex) => prevIndex + 1); // Use functional update to ensure correct previous state
        }
      } else if (modalIsOpen && event.keyCode === 27) {
        // Check if the pressed key is Escape (key code 27)
        window.history.back(); // Navigate to the previous page
      }
    };
    // Add event listener for keydown event
    document.addEventListener("keydown", handleKeyDown);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoIndex, modalIsOpen]);

  const customStyles = {
    content: {
      padding: "0px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "97%",
      height: "94%",
      overflow: "auto",
      borderRadius: "12px",
      zIndex: 30,
    },
  };

  const DisplayVideo = ({ url }) => {
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
        return (
          <img
            style={{ objectFit: "contain", maxHeight: "700px" }}
            src={url}
            width="100%"
            height="90%"
            alt="Image"
          />
        );
      } else if (isVideoURL(url)) {
        return (
          <video
            style={{ objectFit: "contain", maxHeight: "700px" }}
            controls
            autoPlay
            loop
            width="100%"
            height="90%"
            onContextMenu={handleContextMenu}
            controlsList="nodownload"
            muted
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        return <p>Unsupported media type</p>;
      }
    };

    return <div>{renderMedia()}</div>;
  };

  const findvideo = (item) => {
    const getIndex = interactions.findIndex((x) => x._id === item?._id);
    console.log(getIndex);
    if (getIndex != -1) {
      setvideoIndex(getIndex);
    }
  };
  const [newstatus, setnewstatus] = useState(false)


    
  useEffect(() => {
    if(video?.images[0]){
      setdefaultImageUrl('https://d3wqbogi93pb3.cloudfront.net/'+video.images[0])
    }else{
      setdefaultImageUrl('https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png')
    }
    setmodalurl(true)
    function isUploadDate() {
      const uploadDateObj = new Date(video?.uploadDate);
      const currentDate = new Date();
      const differenceInMs = currentDate - uploadDateObj;
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
      if(differenceInDays <= 7){
        console.log(true)
        setnewstatus(true)
      }
    }
    isUploadDate()
  }, [video])


  function isUploadDate(uploadDate) {
    const uploadDateObj = new Date(uploadDate);
    const currentDate = new Date();
    const differenceInMs = currentDate - uploadDateObj;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    return differenceInDays <= 7
    // https://main.dx9c8yaevt53o.amplifyapp.com/
  }

  const [modalurl, setmodalurl] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [isBrowse, setisBrowse] = useState(false)
  useEffect(() => {
    if(window.location.href=="http://localhost:3000/Browse" || window.location.href=="https://main.dx9c8yaevt53o.amplifyapp.com/Browse"){
      setisBrowse(true)
    }

  }, [currentUrl])


  useEffect(() => {
    const handleUrlChange = () => {
      console.log(window.location.href)
      const url = window.location.href;
      if(url=="http://localhost:3000/" || url=="https://main.dx9c8yaevt53o.amplifyapp.com/"){
        setmodalurl(false)
        setIsOpen(false)
      }
      if(url=="http://localhost:3000/Browse" || url=="https://main.dx9c8yaevt53o.amplifyapp.com/Browse"){
        setmodalurl(false)
        setIsOpen(false)
      }
      
      setCurrentUrl(window.location.href);
    };

    // Add event listener for URL changes
    window.addEventListener('popstate', handleUrlChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentUrl]);

  const [defaultImageUrl, setdefaultImageUrl] = useState('https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png')



  return (
    <div className="container-fluid containerxyz" style={{ minHeight: 300 }}>
      {isBrowse&&<Helmet>
        <title>AIverse Library - Browse AI-UX Interactions</title>
        <meta name="description" content="The largest library of the latest AI-UX Interactions and Patterns! What are the big companies like Microsoft doing in AI and Design? What do I need to become an AI Designer? What is AI-UX? What is UX of AI? Get all your questions answered."/>
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:title" content="AIverse Library - Browse AI-UX Interactions"/>
        <meta property="og:description" content="The largest library of the latest AI-UX Interactions and Patterns! What are the big companies like Microsoft doing in AI and Design? What do I need to become an AI Designer? What is AI-UX? What is UX of AI? Get all your questions answered."/>
        <meta property="og:image" content="https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png"/>
        {/* <!-- Twitter --> */}
        <meta name="twitter:title" content="AIverse Library - Browse AI-UX Interactions"/>
        <meta name="twitter:description" content="The largest library of the latest AI-UX Interactions and Patterns! What are the big companies like Microsoft doing in AI and Design? What do I need to become an AI Designer? What is AI-UX? What is UX of AI? Get all your questions answered."/>
        <meta name="twitter:image" content="https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png"/>
      </Helmet>}

      {modalurl && video && <Helmet>
        <title>{video?.name} - {video?.pattern} AI-UX Interaction</title>
        <meta name="description" content={video?.content}/>
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:title" content={`${video?.name} - ${video?.pattern} AI-UX Interaction`}/>
        <meta property="og:description" content={video.content}/>
        <meta property="og:image" content={defaultImageUrl}/>
        {/* <!-- Twitter --> */}
        <meta name="twitter:title" content={`${video.name} - ${video.pattern} AI-UX Interaction`}/>
        <meta name="twitter:description" content={video.content}/>
        <meta name="twitter:image" content={defaultImageUrl}/>

      </Helmet>}
      {/* <div style={{height:'100vh', position:'absolute',backgroundColor:BackgroundColor}}></div> */}
      {!interactions ? (
        <Bars
          height="100"
          width="100"
          color="#A884DB"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="row" style={{ backgroundColor: BackgroundColor }}>
          <div className="col-12 mt-5" style={{ textAlign: "left" }}>
            <span style={{ fontWeight: 700, fontSize: "28px" }}>
              Browse &nbsp;
            </span>{" "}
            <span style={{ color: "rgb(156, 156, 156)", fontSize: "18px" }}>
              {" "}
              {a.interactions.length} AI-UX Interactions
            </span>
          </div>
          {!modalIsOpen && (
            <div
              className="col-12 mt-2 sticky-div">
              <div className="filterx"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "0 20px 10px 0px",
                }}
              >
                {/* <div style={{ margin: "0 10px 0 0" }}>
                  <img src={filtericon} width={24} height={28} />
                </div> */}
                {pattern && (
                  <div className="dropdown ddd" style={{ margin: "0 10px 0 0" }}>
                    <button
                      style={{
                        minWidth: "100px",
                        border: "1px solid lightgrey",
                        backgroundColor: "white",
                      }}
                      className="btn btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      AI-UX Pattern
                      <small> {selectedpattern[0]}</small>
                      {selectedpattern?.length > 1 && (
                        <small style={{ fontWeight: 700, color: "grey" }}>
                          {" +"}
                          {selectedpattern?.length - 1}
                          {" more"}
                        </small>
                      )}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{cursor: "pointer", maxHeight: "200px", overflow: "auto" }}
                    >
                      <span
                        style={{ cursor: "pointer", minWidth: "100px" }}
                        className="dropdown-item"
                        onClick={() => {
                          setselectedpattern("");
                        }}
                      >
                        clear select
                      </span>
                      {pattern.map((item) => {
                        return (
                          <div
                            className="hhh"
                            style={{
                              display: "block",
                              fontSize:'14px',
                              marginLeft:'5px',
                              cursor:"pointer"
                            }}
                          >
                            <input
                              className="m-1"
                              checked={selectedpattern.includes(item)}
                              onChange={(event) => handlepattern(event, item)}
                              type="checkbox"
                              id={item}
                              name={item}
                              style={{ cursor: "pointer" }}
                              value={item}
                            />

                            <label style={{ cursor: "pointer" }} htmlFor={item}>{item}</label>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {appName && (
                  <div
                    className="dropdown ddd"
                    style={{ margin: "0 10px 0 0", cursor: "pointer", zIndex:10}}
                  >
                    <button
                      style={{
                        minWidth: "100px",
                        border: "1px solid lightgrey",
                        backgroundColor: "white",
                      }}
                      className="btn btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Company
                      <small> {selectedappName[0]}</small>
                      {selectedappName?.length > 1 && (
                        <small style={{ fontWeight: 700, color: "grey" }}>
                          {" +"}
                          {selectedappName?.length - 1}
                          {" more"}
                        </small>
                      )}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        maxHeight: "200px",
                        overflow: "auto",
                      }}
                    >
                      <span
                        style={{zIndex:20, cursor: "pointer", minWidth: "100px" }}
                        className="dropdown-item"
                        onClick={() => {
                          setselectedappName([]);
                        }}
                      >
                        clear select
                      </span>
                      {appName.map((item) => {
                        return (
                          <div
                            className=" hhh"
                            style={{
                              display: "block",
                              fontSize:'14px',
                              marginLeft:'5px',
                              cursor: "pointer",
                            }}
                          >
                            <input
                              className="m-1"
                              checked={selectedappName.includes(item)}
                              onChange={(event) => handleappname(event, item)}
                              type="checkbox"
                              id={item}
                              name={item}
                              value={item}
                              style={{ cursor: "pointer" }}
                            />
                            <label style={{ cursor: "pointer" }} htmlFor={item}>
                              {item}
                            </label>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {industry && (
                  <div className="dropdown ddd" style={{ margin: "0 10px 0 0", }}>
                    <button
                      style={{
                        minWidth: "100px",
                        border: "1px solid lightgrey",
                        backgroundColor: "white",
                      }}
                      className="btn btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Domain
                      <small> {selectedindustry[0]}</small>
                      {selectedindustry?.length > 1 && (
                        <small style={{ fontWeight: 700, color: "grey" }}>
                          {" +"}
                          {selectedindustry?.length - 1}
                          {" more"}
                        </small>
                      )}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{ maxHeight: "200px", overflow: "auto", position:'absolute' }}
                    >
                      <span
                        style={{ cursor: "pointer", minWidth: "100px" }}
                        className="dropdown-item"
                        onClick={() => {
                          setselectedindustry("");
                        }}
                      >
                        clear select
                      </span>
                      {industry.map((item) => {
                        return (
                          <div
                            className="hhh"
                            style={{
                              display: "block",
                              fontSize:'14px',
                              marginLeft:'5px',
                              cursor:"pointer"
                            }}
                          >
                            <input
                              className="m-1"
                              checked={selectedindustry.includes(item)}
                              onChange={(event) => handleindustry(event, item)}
                              type="checkbox"
                              id={item}
                              name={item}
                              style={{ cursor: "pointer" }}
                              value={item}
                            />

                            <label style={{ cursor: "pointer" }} htmlFor={item}>{item}</label>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <span className="searc">
                <Searchbox />
              </span>
            </div>
          )}
          <div className="col-12">
            <div className="container-fluid mt-2 ">
              <div className="row">
                {/* <div className=''> */}
                {/* <div style={{display:'flex', flexWrap:'wrap',justifyContent:'space-evenly'}}> */}
                {interactions?.map((item, index) => {
                  const status=isUploadDate(item?.uploadDate)
                  return (
                    <div
                      className={`col-12 col-sm-6 g-0 col-xxl-3 col-lg-4 ${isMobile? 'pt-4':'p-3'} shover`}
                      onClick={() => {
                        opentab(index);
                      }}
                      style={{ cursor: "pointer", paddingLeft:'0px', paddingRight:'0px' }}
                      key={index}
                    >
                      <div className="mt-1">
                      {status? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'12%', right:'5%'}}>NEW</small>:item.status=="updated"? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'12%', right:'5%'}}>UPDATED</small>:''}

                        <DisplayMedia url={`${cdnURL}${item.gifUrl}`} />
                      </div>
                      <div
                        style={{
                          fontWeight: 550,
                          fontSize: "13px",
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "4px 10px",
                        }}
                      >
                        <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                          <span><img src={`${cdnURL}${item.iconUrl}`} style={{margin:'2px',marginRight:'7px'}} width={15} height={15}/></span>
                          <span style={{ color: "rgb(99, 99, 99)" }}>
                            {item.name}
                          </span>
                        </div>
                        <span style={{ color: "rgb(166, 166, 166)" }}>
                          {item.pattern}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        overlayClassName="Overlay"
        // className='myDiv'
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {video && (
          <div className="container-fluid" style={{ textAlign: "left" }}>
            <div className="row g-0">
              <div
                className="col-12 g-0 pt-3 text-center"
                style={{
                  paddingLeft:'0px',
                  paddingRight:'0px',
                  backgroundColor: "#faf6ff",
                  borderBottom: "1px solid lightgrey",
                  borderRadius: "0px",
                }}
              >
                
                <div className="headContainer" style={{ fontWeight: 545, }}>
                
                  <img
                    className="scale "
                    style={{ float: "left", cursor: "pointer", marginLeft:'12px' }}
                    onClick={closeModal}
                    src={cancelIcon}
                    width={24}
                    height={24}
                  />
                
                <div className="InteractionHeader">
                  <span >
                    {video.pattern} AI-UX Interaction &nbsp;
                    <span style={{ color: "grey" }}>from&nbsp;</span>{" "}
                  </span>

                  <div style={{display: "flex", alignItems: 'center'}}><img src={`${cdnURL}${video.iconUrl}`} style={{borderRadius:'8px',marginRight:'7px'}} width={25} height={25}/>
                  <span style={{ fontWeight: 700, fontSize: "18px" }}>
                    {video.appName}
                  </span>
                  </div>
                  {newstatus? <small className="head3" style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', top:'2%'}}>NEW</small>:video.status=="updated"? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', top:'2%'}}>UPDATED</small>:''}
                  </div>
                  <span
                    style={{ color: "grey", fontSize: "14px", float: "right", marginRight:'12px' }}
                  >
                    Captured on {uploadDate}
                  </span>
                  
                </div>
                <hr />


                <div className="head2" style={{ fontWeight: 545, textAlign:'left', margin:'0px 40px' }}>
                  <div style={{fontSize:'12px'}}>
                    {video.pattern} AI-UX Interaction &nbsp;
                    <span style={{ color: "grey" }}>from&nbsp;</span>{" "}
                  </div>

                  <div style={{fontSize:'14px'}}>
                    <img src={`${cdnURL}${video.iconUrl}`} style={{borderRadius:'8px',marginRight:'7px'}} width={25} height={25}/>
                    <span style={{ fontWeight: 700, }}>
                      {video.appName}
                    </span>
                  {/* {newstatus? <small className="head3" style={{marginLeft:'5px',borderRadius:'20px', padding:'3px 3px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'5px'}}>NEW</small>:video.status=="updated"? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'2%'}}>UPDATED</small>:''} */}
                  </div>

                  <div
                    style={{ color: "grey", fontSize: "10px" }}
                  >
                    Captured on {uploadDate}
                  </div>
                  <hr />
                </div>



                <div></div>
                <Swiper
                  cssMode={true}
                  slidesPerView={isMobile? 1:1.3}
                  spaceBetween={30}
                  centeredSlides={true}
                  navigation={isMobile? false:true}
                  // pagination={true}
                  mousewheel={true}
                  // keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper swip"
                >
                  <SwiperSlide>
                    <div style={{ maxHeight: "" }}>
                      <DisplayVideo url={`${cdnURL}${video.videoUrl}`} />
                    </div>
                  </SwiperSlide>
                  {video?.images?.map((item) => {
                    return (
                      <SwiperSlide>
                        <img
                          src={`${cdnURL}${item}`}
                          width="100%"
                          height="80%"
                          alt="Image"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <hr />
                <div 
                  className="p-2 g-0 head1"
                  style={{ fontWeight: 545, textAlign: "left" }}
                >
                  {video.name}
                  <span>&nbsp;- {video.content}</span>
                  <br />
                  <small style={{ color: "grey", fontWeight: "bolder" }}>
                    Media source: {video.mediaSource}
                  </small>
                </div>
                <div
                  className="p-2 head2"
                  style={{ fontWeight: 545, textAlign: "left",fontSize:'12px' }}
                >
                  {video.name}
                  <span>&nbsp;- {video.content}</span>
                  <br />
                  <small style={{ color: "grey", fontWeight: "bolder" }}>
                    Media source: {video.mediaSource}
                  </small>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  {moreAppname && (
                    <div className="col-12 mt-5">
                      <h3 className="fonts">
                        More{" "}
                        <span style={{ fontWeight: 700 }}>
                          {video.appName}{" "}
                        </span>{" "}
                        pattern
                      </h3>
                    </div>
                  )}
                  {moreAppname &&
                    moreAppname.map((item, index) => {
                      return (
                        <div
                          className="col-12 col-sm-6 col-xxl-3 col-lg-4 p-3 shover"
                          onClick={() => {
                            findvideo(item);
                          }}
                          style={{ cursor: "pointer" }}
                          key={index}
                        >
                          <div className="mt-1">
                            <DisplayMedia url={`${cdnURL}${item.gifUrl}`} />
                          </div>
                          <div
                            style={{
                              fontWeight: 550,
                              fontSize: "13px",
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "4px 10px",
                            }}
                          >
                            <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                          <span><img src={`${cdnURL}${item.iconUrl}`} style={{margin:'2px',marginRight:'7px'}} width={15} height={15}/></span>
                          <span style={{ color: "rgb(99, 99, 99)" }}>
                            {item.name}
                          </span>
                          </div>
                            <span style={{ color: "rgb(166, 166, 166)" }}>
                              {item.pattern}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  {morePattern && (
                    <div className="col-12 mt-5 fonts">
                      <h3 className="fonts">
                        More{" "}
                        <span style={{ fontWeight: 700 }}>
                          {video.pattern}{" "}
                        </span>
                        AI-UX Interactions
                      </h3>
                    </div>
                  )}
                  {morePattern &&
                    morePattern.map((item, index) => {
                      return (
                        <div
                          className="col-12 col-sm-6 col-xxl-3 col-lg-4 p-3 shover"
                          onClick={() => {
                            findvideo(item);
                          }}
                          style={{ cursor: "pointer" }}
                          key={index}
                        >
                          <div className="mt-1">
                            <DisplayMedia url={`${cdnURL}${item.gifUrl}`} />
                          </div>
                          <div
                            style={{
                              fontWeight: 550,
                              fontSize: "13px",
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "4px 10px",
                            }}
                          >
                              <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                          <span><img src={`${cdnURL}${item.iconUrl}`} style={{margin:'2px',marginRight:'7px'}} width={15} height={15}/></span>
                          <span style={{ color: "rgb(99, 99, 99)" }}>
                            {item.name}
                          </span>
                          </div>
                            <span style={{ color: "rgb(166, 166, 166)" }}>
                              {item.pattern}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
