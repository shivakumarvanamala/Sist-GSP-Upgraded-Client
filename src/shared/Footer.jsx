import React from "react";

import foot_logo from "../assets/sist_logo_login.png";
import Email from "../assets/email.png";
import Linkedin from "../assets/linkedin.png";
import Insta from "../assets/instagram.png";

const Footer = () => {
  return (
    <footer className="bg-[#9e1c3f] text-gray-200">
      <div className="container mx-auto py-4 px-8 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={foot_logo}
            alt="University Logo"
            className="object-scale-down h-40 w-80 mr-2"
          />
        </div>
        <div>
          <div>
            <p className="text-lg font-semibold pb-3.5">Visit us at:</p>
          </div>
          <div className="flex py-1">
            <div className="cursor-pointer" onClick={()=>{
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in');
            }}>
            <img src={Email} alt="Email" />
            </div> &nbsp;
            <p className="cursor-pointer" onClick={()=>{
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in');
            }}> Mail</p>
          </div>
          <div className="flex py-1">
            <img
              src={Linkedin}
              alt="Linkedin
            "
            />
            &nbsp;
            <p> Linkedin</p>
          </div>
          <div className="flex py-1">
            <img src={Insta} alt="Instagram" /> &nbsp;
            <p> Instagram</p>
          </div>
        </div>
      </div>
      <hr className="mx-20" />
      <div className="container mx-auto py-2 px-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
