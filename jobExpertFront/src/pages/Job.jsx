import React, { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import apy from "../components/urlBackend";
import { useSelector } from "react-redux";

const Job = () => {
    const [jobShow, setJobShow] = useState([]);
    const seletor = useSelector((state) => state);

    const rmail = seletor.userData.userInfo.email;
    useEffect(() => {
        const getApplication = async () => {
            const how = await axios.get(`${apy}/jobExpert/api/v1/submitJobCircular`);
            if (how.data.length > 0) {
                setJobShow(how.data);
            }
        };
        getApplication();
    }, []);


    const categorizedJobShow = jobShow.reduce((acc, job) => {
        if (!acc[job.jobType]) {
            acc[job.jobType] = [];
        }
        acc[job.jobType].push(job);
        return acc;
    }, {});

    // delete job
    const handleJobDelet = async (id) => {
        try {
            const response = await axios.delete(`${apy}/jobExpert/api/v1/submitJobCircular/${id}`);



            if (response.status === 200) {

                alert("Job circular deleted successfully.");
                setJobShow((prevJobShow) => prevJobShow.filter((job) => job._id !== id));

            } else {

                alert("Failed to delete job circular.");

            }
        } catch (error) {

            alert('Error deleting job circular:', error);

        }
    }

    return (


        <div>
            <Banner />
            <div className="container mx-auto p-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 bg-gray-300 rounded-md p-2">Hot</h2>
                    <div className=" flex gap-4 flex-wrap items-center justify-center ">
                        {categorizedJobShow["Hot"] &&
                            categorizedJobShow["Hot"].map((job) => (
                                <div
                                    key={job._id}
                                    className="bg-white p-4 rounded-lg border-primary border shadow-md w-60 h-[350px]"
                                >
                                    <h3 className="text-lg font-bold">{job.title}</h3>
                                    <p className="text-gray-900 font-semibold">{job.institute}</p>
                                    <p className="text-gray-900 font-semibold">
                                        Apply Date:{" "}
                                        {new Date(job.start).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-900 font-semibold">
                                        End Date: {new Date(job.end).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-900 font-semibold">Fee: {job.fee} taka</p>
                                    <p className="font-semibold">{job.info}</p>
                                    <a
                                        href={`${apy}/uploads/${job.pdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline block mt-2"
                                    >
                                        View PDF
                                    </a>
                                    <div className="w-[220px] h-[200px] relative">
                                        <img
                                            src={`${apy}/uploads/${job.img}`}
                                            alt="Job Circular Image"
                                            className="w-[60%]  rounded-sm mt-2"
                                        />

                                        {rmail === "aminr1384@gmail.com" || rmail === "eftehstu999@gmail.com" || rmail === "mmhasan045@gmail.com" &&
                                            <p onClick={() => handleJobDelet(job._id)} className="text-[16px] absolute cursor-pointer  right-4 top-[60%] font-bold text-red-600 ">
                                                X
                                            </p>}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {Object.keys(categorizedJobShow).map((jobType) => {
                    if (jobType !== "Hot") {
                        return (
                            <div key={jobType} className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 bg-gray-300 rounded-md p-2">{jobType}</h2>
                                <div className="flex gap-4 flex-wrap items-center justify-center">
                                    {categorizedJobShow[jobType].map((job) => (
                                        <div
                                            key={job._id}
                                            className="bg-white p-4 rounded-lg border-primary border shadow-md w-60 h-[350px]"
                                        >
                                            <h3 className="text-lg font-bold">{job.title}</h3>
                                            <p className="text-gray-900 font-semibold">{job.institute}</p>
                                            <p className="text-gray-900 font-semibold">
                                                Apply Date:{" "}
                                                {new Date(job.start).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-900 font-semibold">
                                                End Date: {new Date(job.end).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-900 font-semibold">Fee: {job.fee} taka</p>
                                            <p className="font-semibold">{job.info}</p>
                                            <a
                                                href={`${apy}/uploads/${job.pdf}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline block mt-2"
                                            >
                                                View PDF
                                            </a>
                                            <div className="w-[220px] h-[200px] relative">
                                                <img
                                                    src={`${apy}/uploads/${job.img}`}
                                                    alt="Job Circular Image"
                                                    className="w-[60%]  rounded-sm mt-2"
                                                />
                                                {rmail === "aminr1384@gmail.com" || rmail === "eftehstu999@gmail.com" || rmail === "mmhasan045@gmail.com" &&
                                                    <p onClick={() => handleJobDelet(job._id)} className="text-[16px] absolute cursor-pointer  right-4 top-[60%] font-bold text-red-600 ">
                                                        X
                                                    </p>}
                                            </div>

                                        </div>

                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>


    );
};

export default Job;
