import { useParams } from "react-router-dom";
import logo from "../assets/brandLogo/logo.png";
import appstore from "../assets/brandLogo/appstore (1).png";
import googlestore from "../assets/brandLogo/appstore (2).png";
import { useNavigate } from "react-router-dom"
const PaymentFail = () => {
    const { tran_id } = useParams();
    const navigate = useNavigate()
    return (
        <>
            
            <h1 className="text-xl md:text-2xl text-center mt-10 mb-10 font-semibold">Payment Failed Id: {tran_id}</h1>
            <div onClick={() => navigate("/jobexpart/premiumZone")} className="w-[100px] absolute right-[45%] cursor-pointer text-sm md:text-2xl text-[#blue]  mt-10 mb-10  font-semibold " >
                Back
            </div>
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
    </>
    )
}
export default PaymentFail