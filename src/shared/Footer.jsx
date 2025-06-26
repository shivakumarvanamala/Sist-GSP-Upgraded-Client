import foot_logo from "../assets/sist_logo_login.png";
import { AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

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
          <div className="flex py-1 cursor-pointer">
            <a
              href="mailto:guideselection.cse@sathyabama.ac.in"
              className="cursor-pointer"
            >
              <AiOutlineMail />
            </a>
            &nbsp;
            <p
              className="cursor-pointer"
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
                );
              }}
            >
              {" "}
              Mail
            </p>
          </div>
          <a className="flex py-1 cursor-pointer" href="https://www.linkedin.com/company/sathyabama-school-of-computing/">
            <FaLinkedin />
            &nbsp;
            <p> Linkedin</p>
          </a>
          <a className="flex py-1 cursor-pointer" href="https://www.instagram.com/sathyabama_cse?igsh=aTlkeDN0aHJjOTN5">
            <FaInstagram />
            &nbsp;
            <p> Instagram</p>
          </a>
        </div>
      </div>
      <hr className="mx-20" />
      <div className="container mx-auto py-2 px-8 text-center text-sm">
        &copy; 2025 Sathyabama University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
