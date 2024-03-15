import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContextApi, AdminContext } from "../components.js/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

import Footer from "../components.js/Footer";
import Browse from "./Browse";
import Voyager from "./Voyager";
import ContextAdmin from "../components.js/ContestAdmin";

import sparkleImg from "../images/sparkle.svg";

import "../cssFiles.js/section1.css";
import "../cssFiles.js/marquee.css";
import "../cssFiles.js/section2.css";

export default function Home() {
  const a = useContext(ContextApi);
  const b = useContext(AdminContext);

  let navigate = useNavigate();
  const [interactions, setinteractions] = useState([]);

  const miniguides = useRef(null);
  const newsletter = useRef(null);
  const browse = useRef(null);

  const getminiguidesview = () => {
    if (miniguides.current) {
      miniguides.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const getnewsletterview = () => {
    if (newsletter.current) {
      newsletter.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const getbrowseview = () => {
    if (browse.current) {
      browse.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getInteraction = async () => {
    const response = await fetch(
      "https://aiverse-backend.vercel.app/api/getInteraction",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      const itc = json.data;
      itc.reverse();
      setinteractions(itc);
      localStorage.setItem("interactions", JSON.stringify(itc));
      console.log(interactions);
    }

    if (!json.success) {
      toast.error("Error in getting Admin data");
    }
  };

  useEffect(() => {
    setinteractions(a?.interactions);
    getInteraction();
  }, []);
  const addcontext = (admin) => {
    return <ContextAdmin Admin={admin} />;
  };
  const [Admin, setAdmin] = useState(b?.admin);
  const getData = async () => {
    const response = await fetch(
      "https://aiverse-backend.vercel.app/api/getAdmin",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      console.log(json);
      addcontext(json.data);
      localStorage.setItem("admin", JSON.stringify(json.data));
      setAdmin(json.data);
    }

    if (!json.success) {
      toast.error("Error in getting Admin data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="grad"></div>
      <Helmet>
        <title>AIverse for Designers</title>
        <meta
          name="description"
          content="Upskilling as a designer to design for AI and augment with AI. The future is near, the journey through the AI universe has begun, don't miss out!"
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:title" content="AIverse for Designers" />
        <meta
          property="og:description"
          content="Upskilling as a designer to design for AI and augment with AI. The future is near, the journey through the AI universe has begun, don't miss out!"
        />
        <meta
          property="og:image"
          content="https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png"
        />
        {/* <!-- Twitter --> */}
        <meta name="twitter:title" content="AIverse for Designers" />
        <meta
          name="twitter:description"
          content="Upskilling as a designer to design for AI and augment with AI. The future is near, the journey through the AI universe has begun, don't miss out!"
        />
        <meta
          name="twitter:image"
          content="https://d3wqbogi93pb3.cloudfront.net/images/homepage_metaData.png"
        />
      </Helmet>
      {/* <iframe src="https://embeds.beehiiv.com/a3e9c954-5128-4d3d-9b41-ac9567390374?slim=true" data-test-id="beehiiv-embed" width="90%" height="52" frameBorder="0"  style={{zIndex:10, margin: '0px', borderRadius: '0px', backgroundColor: "transparent"}}></iframe> */}
      <div className="container" style={{ height: "100vh" }}>
        <Toaster toastOptions={{ duration: 2000 }} />
        <div className="row">
          <div className="col-12 mt-5 mb-5 topheading">
            Are you future ready? Welcome to the AI universe!
          </div>
          <div className="col-12 mt-2 flexpart flexq" style={{position:'relative'}}>
            <div className=" m-3 uweekly"> <img
                      
                      width={16}
                      height={"auto"}
                      src={sparkleImg}
                      alt="."
                    /> UPDATED WEEKLY!</div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <h1 className="lLlibrary">
                <span>
                  <strong>Largest library of</strong>
                </span>
                <span>
                  <strong>
                    <br />
                  </strong>
                </span>
                <span>
                  <strong style={{ color: "#A884DB" }}>
                    AI-UX Interactions
                  </strong>
                </span>
              </h1>
            </div>
            <div className="mt-1">
              <h1 className="part2">
                <span>
                  <strong>Are you wondering how companies are</strong>
                </span>
                <span>
                  <strong>
                    <br />
                  </strong>
                </span>
                <span>
                  <strong>
                    designing for AI? What's the latest AI feature?
                  </strong>
                </span>
              </h1>
            </div>
            <div className="outterpart">
              <div className="mt-4 browseb" onClick={getbrowseview}>
                Browse
              </div>
              <div className="mt-4 outerb" onClick={getminiguidesview}>
                <div className="AIxDesignerb">Become a AIxDesigner</div>
                <div className="bonus">
                  <span>BONUS</span>
                </div>
              </div>
            </div>
            <div style={{position:'absolute', bottom:'0px'}}>
              <div className="mt-5" style={{ color: "rgb(156, 156, 156)" }}>
                <h2 className="curious">
                  <span>some curious minds following us are from</span>
                </h2>
              </div>
              <div className="logos xxx">
                <div className="logos-slide">
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024"
                      alt="."
                    />
                  </span>
                </div>
                <div className="logos-slide">
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/c5JtGZyQtPE6LJ2fzel0nwnDXr8.png?scale-down-to=2048"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/IV77MhrItS3CPdUHUvJpVoW8Zx0.png?scale-down-to=2048"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/jlxVQ8fBIZaMlGVT68N3sA4jk.png?scale-down-to=1024"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/OajRFQhOaWAsElVarIfrW6qWdjo.png?scale-down-to=512"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/buZs8ZPFXFkLepJ3YBzk4NQAw0.png"
                      alt="."
                    />
                  </span>
                  <span className="m-3">
                    <img
                      style={{ filter: "grayscale(100%)" }}
                      width={95}
                      height={"auto"}
                      src="https://framerusercontent.com/images/t8G7CNhQoMsBPqmbs6zyFMyyd54.png?scale-down-to=1024"
                      alt="."
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="browse"
        ref={browse}
        className="container-fluid"
        style={{ width: "95vw" }}
      >
        <div className="row">
          {/* <div className="col-12"> */}
          <div className="containerx">
            {!Admin ? (
              <div className="text-center browsecomp">
                <span>
                  <Bars
                    height="100"
                    width="100"
                    color="#A884DB"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </span>
              </div>
            ) : (
              <div style={{ maxHeight: "1200px" }}>
                <Browse
                  industry={Admin.industry}
                  pattern={Admin.pattern}
                  appName={Admin.appName}
                />
              </div>
            )}
          </div>
          <div style={{ width: "100%" }}>
            <div className="flexp">
              <div
                className="mt-2"
                onClick={() => {
                  navigate("../Browse", { state: Admin });
                  window.scrollTo(0, 0);
                }}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 1px 20px -6px #a884db)",
                  backgroundColor: "#a884db",
                  color: "white",
                  padding: "6px 28px",
                  fontWeight: 700,
                  fontSize: "18px",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Browse All {">"}
              </div>
              <a
                className="mt-2"
                href="https://twitter.com/intent/user?screen_name=aiversedesign"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 1px 20px -6px #f6f0ff)",
                  backgroundColor: "#f6f0ff",
                  padding: "6px 28px",
                  position: "relative",
                  marginLeft: "10px",
                }}
              >
                <div className="stayupd">
                  Stay updated @aiversedesign on 𝕏 {">"}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{backgroundColor:'black'}}> */}
      <div
        id="miniguides"
        className="container-fluid mt-5"
        style={{ backgroundColor: "black" }}
      >
        <div className="row">
          <div className="col-12 mb-3 quete">
            <h3>
              <span>“We’re transitioning from</span>
              <span>
                <strong>
                  {" "}
                  designing pixels to designing patterns, from digital
                  interfaces to experiences”{" "}
                </strong>
              </span>
            </h3>
            <div className="writerX">- Noah Levin, VP at Figma</div>
          </div>
          <div className="col-12" ref={miniguides}>
            <div className="flexp">
              <div className="bonus1 mt-4">Bonus</div>
            </div>
          </div>
          <div className="col-12">
            <div>
              <h1 className="minig">
                <span>
                  <strong>Mini guides to</strong>
                </span>
                <span>
                  <strong>
                    <br />
                    become an
                  </strong>
                </span>
                <span>
                  <strong style={{ color: "#A884DB" }}> AIxDesigner</strong>
                </span>
              </h1>
            </div>
            <div className="mt-3" style={{ color: "rgb(156, 156, 156)" }}>
              <h2 className="last">
                <span>
                  <strong>
                    a series of mini guides to 100x designers and design teams
                  </strong>
                </span>
              </h2>
            </div>
          </div>
          <div className="col-12">
            <div className="flexp2">
              <div
                className="p-4"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("../SpeakTheLanguage");
                  window.scrollTo(0, 0);
                }}
              >
                <div
                  className="cont"
                  style={{ borderRadius: "20px", backgroundColor: "#262626" }}
                ></div>
                <div className="mt-3 cardbox">
                  <span className="linex">
                    <strong>Speak the language</strong>
                  </span>
                  <br />
                  <span
                    style={{ color: "rgb(176, 176, 176)", fontWeight: 400 }}
                  >
                    A visual guide to understand AI. To better collaborate with
                    the product team and developers.
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="subcard">
                  <p
                    style={{
                      color: "rgb(79, 79, 79)",
                      fontSize: "15px",
                      padding: "20px",
                    }}
                  >
                    Releasing soon.Subscribe below to get notified.
                  </p>
                </div>
                <div className="mt-3 cardbox">
                  <span className="liney">
                    <strong>Second principles</strong>
                  </span>
                  <br />
                  <span className="subliney">
                    A visual guide to understand AI. To better collaborate with
                    the product team and developers.
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="subcard">
                  <p
                    style={{
                      color: "rgb(79, 79, 79)",
                      fontSize: "15px",
                      padding: "20px",
                    }}
                  >
                    Releasing soon.Subscribe below to get notified.
                  </p>
                </div>
                <div className="mt-3 cardbox">
                  <span className="liney">
                    <strong>Designing a Chatbot </strong>Enterprise Edition
                  </span>
                  <br />
                  <span className="subliney">
                    All AI-UX patterns summarized.
                  </span>
                </div>
              </div>
            </div>
            <div className="m-4">
              <span className="subscrib" onClick={getnewsletterview}>
                <span>Subscribe </span>
                <span>
                  to stay up to date and keep levelling up as a{" "}
                  <strong>AIxDesigner</strong>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div id="newsletter" ref={newsletter} className="cantainer-fluid">
        <Voyager />
      </div>
      <Footer />
    </>
  );
}
