// navigate(`../Browse/${item.urlSlug}-${item._id}`, {state: item})
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ContextApi } from "../components.js/ContextApi";
import DisplayMedia from "../components.js/DisplayMedia";
import Searchbox from "../components.js/Searchbox";
import filtericon from "../images/filter.png";
import Modal from "react-modal";
import trash from "../images/trash.png";
import cancelIcon from "../images/cancel.png";
import { Bars } from "react-loader-spinner";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Browse(props, { changeBackgroundColor }) {
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
      width: "95%",
      height: "95%",
      overflow: "auto",
      borderRadius: "20px",
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
    
  }
  



  return (
    <div className="container-fluid containerxyz" style={{ minHeight: 300 }}>
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
          <div className="col-12" style={{ textAlign: "left" }}>
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
              className="col-12 mt-2 sticky-div"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: "0 20px 0 0",
                }}
              >
                <div style={{ margin: "0 10px 0 0" }}>
                  <img src={filtericon} width={24} height={28} />
                </div>
                {appName && (
                  <div
                    className="dropdown"
                    style={{ margin: "0 10px 0 0", cursor: "pointer" }}
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
                      <strong>AppName </strong>
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
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{ cursor: "pointer", minWidth: "100px" }}
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
                            className="p-2"
                            style={{
                              display: "inline",
                              justifyContent: "center",
                              alignItems: "center",
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
                {pattern && (
                  <div className="dropdown" style={{ margin: "0 10px 0 0" }}>
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
                      <strong>Pattern </strong>
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
                            className="p-2"
                            style={{
                              display: "inline",
                              justifyContent: "center",
                              cursor: "pointer",
                              alignItems: "center",
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
                {industry && (
                  <div className="dropdown" style={{ margin: "0 10px 0 0" }}>
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
                      <strong>Industry </strong>
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
                      style={{ maxHeight: "200px", overflow: "auto" }}
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
                            className="p-2"
                            style={{
                              display: "inline",
                              cursor: "pointer",
                              justifyContent: "center",
                              alignItems: "center",
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
              <span>
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
                      className="col-4 p-3 shover"
                      onClick={() => {
                        opentab(index);
                      }}
                      style={{ cursor: "pointer" }}
                      key={index}
                    >
                      <div className="mt-1">
                      {status? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'9%', right:'5%'}}>NEW</small>:item.status=="updated"? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'10%', right:'5%'}}>UPDATED</small>:''}

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
            <div className="row">
              <div
                className="col-12 p-3 text-center"
                style={{
                  backgroundColor: "#faf6ff",
                  border: "1px solid lightgrey",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <img
                    className="scale"
                    style={{ float: "left", cursor: "pointer" }}
                    onClick={closeModal}
                    src={cancelIcon}
                    width={24}
                    height={24}
                  />
                </div>
                <div style={{ fontWeight: 545, }}>
                  {video.pattern} AI-UX Interaction &nbsp;
                  <span style={{ color: "grey" }}>from&nbsp;</span>{" "}

                  <span><img src={`${cdnURL}${video.iconUrl}`} style={{borderRadius:'8px',marginRight:'7px'}} width={25} height={25}/></span>
                  <span style={{ fontWeight: 700, fontSize: "18px" }}>
                    {video.appName}
                  </span>
                  {newstatus? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'2%'}}>NEW</small>:video.status=="updated"? <small style={{marginLeft:'5px',borderRadius:'20px', padding:'4px 6px', backgroundColor:'#7FBC7B', color:'white',fontWeight:'bold', fontSize:'8px', position:'absolute', top:'2%'}}>UPDATED</small>:''}

                  <span
                    style={{ color: "grey", fontSize: "14px", float: "right" }}
                  >
                    Captured on {uploadDate}
                  </span>
                  <hr />
                </div>
                <div></div>
                <Swiper
                  cssMode={true}
                  slidesPerView={1.3}
                  spaceBetween={30}
                  centeredSlides={true}
                  // navigation={true}
                  // pagination={true}
                  mousewheel={true}
                  // keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
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
                <div
                  className="p-2"
                  style={{ fontWeight: 545, textAlign: "left" }}
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
                      <h3>
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
                          className="col-4 p-3 shover"
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
                    <div className="col-12 mt-5">
                      <h3>
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
                          className="col-4 p-3 shover"
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
