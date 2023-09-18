import logo from "../assets/brandLogo/logo.png";

import appstore from "../assets/brandLogo/appstore (1).png";
import googlestore from "../assets/brandLogo/appstore (2).png";


import Banner from "../components/Banner/Banner";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const paymentReq = () => {
    return (
        <>
            <Navbar />
            
            <Banner />
            <section>
                <img src={logo} alt="" className="mx-auto mt-16" />
                <h1 className="text-xl md:text-2xl text-center mt-10 mb-10 font-semibold">
                    ডাউনলোড করুন আমাদের মোবাইল অ্যাপ
                </h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5 mb-16">
                    <img src={appstore} alt="" className="w-40" />
                    <img src={googlestore} alt="" className="w-40" />
                </div>
            </section>
            < Footer/>
    </>
    )
}

export default paymentReq