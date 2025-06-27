import { useState } from 'react';
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";
import {
  FiMail,
  FiLock,
  FiUsers,
  FiUser,
  FiCheckCircle,
  FiAlertTriangle,
  FiBookOpen,
  FiZap,
  FiArrowRight,
  FiEye,
  FiMessageCircle
} from 'react-icons/fi';

const Home = () => {
  const [activeSection, setActiveSection] = useState(null);

  const registrationSteps = [
    {
      icon: FiMail,
      text: (
        <>
          Register using the placement cell mail ID and the default password{" "}
          <span className="font-semibold text-blue-600">studentcse</span>.
        </>
      ),
      color: "blue"
    },
    {
      icon: FiCheckCircle,
      text: "You will receive an OTP via email. Enter and submit it.",
      color: "green"
    },
    {
      icon: FiLock,
      text: "Reset with your new password, confirm it, and submit.",
      color: "purple"
    },
    {
      icon: FiUsers,
      text: "Select your team size 1 or 2 and confirm.",
      color: "indigo"
    },
    {
      icon: FiUser,
      text: "Choose a guide with available vacancies.",
      color: "teal"
    }
  ];

  const teamSizeOneSteps = [
    {
      icon: FiBookOpen,
      text: "Enter your project details then hit submit!",
      color: "orange"
    },
    {
      icon: FiMail,
      text: "Confirmation mail is sent to your email.",
      color: "green"
    }
  ];

  const teamSizeTwoSteps = [
    {
      icon: FiCheckCircle,
      text: "Enter your team member's placement email ID and verify via OTP sent to their mail.",
      color: "cyan"
    },
    {
      icon: FiBookOpen,
      text: "Enter your project details then hit submit!",
      color: "orange"
    },
    {
      icon: FiMail,
      text: "Confirmation mail is sent to your email.",
      color: "green"
    }
  ];

  const loginSteps = [
    {
      icon: FiLock,
      text: "Use the password you set during the registration process.",
      color: "emerald"
    },
    {
      icon: FiArrowRight,
      text: "You will be redirected to your dashboard after a successful login.",
      color: "blue"
    },
    {
      icon: FiEye,
      text: "If your team size is 2, use either member's email ID or the team ID sent to your mail, along with the common password.",
      color: "violet"
    }
  ];

  const StepCard = ({ step, index, delay = 0 }) => (
    <div
      className={`group relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setActiveSection(`step-${index}`)}
      onMouseLeave={() => setActiveSection(null)}
    >
      <div className="flex items-start space-x-4">
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <step.icon className={`w-6 h-6 text-${step.color}-600`} />
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
            {step.text}
          </p>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${step.color}-400 to-${step.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}></div>
    </div>
  );

  return (
    <>
      <LoginNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <FiBookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">Guide Selection for Students- Dept. of CSE</h1>
          </div>

          {/* Registration Section */}
          <section className="mb-20">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-3">
                <FiZap className="w-8 h-8 text-purple-600 animate-bounce" />
                <h2 className="text-3xl font-bold text-gray-900 text-center">Registration Process</h2>
                <FiZap className="w-8 h-8 text-purple-600 animate-bounce" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {registrationSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} delay={index * 100} />
              ))}
            </div>

            {/* Conditional Steps based on Team Size */}
            <div className="mt-12">
              <div className="flex items-center justify-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800">Next Steps Based on Team Size</h3>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Team Size 1 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold text-sm">1</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-800">If Team Size is 1</h4>
                  </div>
                  <div className="space-y-4">
                    {teamSizeOneSteps.map((step, index) => (
                      <StepCard key={index} step={step} index={index + 5} delay={(index + 5) * 100} />
                    ))}
                  </div>
                </div>

                {/* Team Size 2 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-700 font-bold text-sm">2</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-800">If Team Size is 2</h4>
                  </div>
                  <div className="space-y-4">
                    {teamSizeTwoSteps.map((step, index) => (
                      <StepCard key={index} step={step} index={index + 7} delay={(index + 7) * 100} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Cards */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <FiAlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Registration Alert</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Registration will not be processed if your team size is 2 and the second member's email is already registered.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FiAlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Important Warning</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      Duplicate registrations detected on any device will terminate both registrations. You must restart the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Login Section */}
          <section className="mb-20 relative">
            {/* Decorative separator */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 rounded-full"></div>

            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-3">
                <FiZap className="w-8 h-8 text-purple-600 animate-bounce" />
                <h2 className="text-3xl font-bold text-gray-900">Login Process</h2>
                <FiZap className="w-8 h-8 text-purple-600 animate-bounce" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {loginSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} delay={index * 150} />
              ))}
            </div>
          </section>

          <section className="mb-16 relative">
            {/* Decorative separator */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-full"></div>

            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-500 group">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-teal-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiMessageCircle className="w-8 h-8 text-white" />
                  </div>

                  {/* Text Content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      Need Help or Have Questions?
                    </h3>
                    <p className="text-gray-700 mb-4 md:mb-4">
                      For any queries, reach us out via:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                      <button
                        onClick={() => {
                          window.open(
                            "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
                          );
                        }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group/email"
                      >
                        <FiMail className="w-5 h-5 group-hover/email:rotate-12 transition-transform duration-300" />
                        <span className="break-all">Mail</span>
                      </button>
                      <a
                        href="https://shorturl.at/DzIZ5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group/form"
                      >
                        <FiBookOpen className="w-5 h-5 group-hover/form:rotate-12 transition-transform duration-300" />
                        <span>Forms</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-300/20 to-cyan-300/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;