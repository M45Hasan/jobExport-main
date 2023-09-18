import { Icon } from "@iconify/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import frame from "../../assets/brandLogo/Frame.png";

const ExamZonePreparation = () => {
  return (
    <div className="border rounded-lg w-11/12 md:w-3/4 mx-auto">
      <div className="border-b text-center">
        <h2 className="py-2">৪০তম বিসিএস পরীক্ষায় অংশগ্রহন </h2>
      </div>
      <Tabs>
        <TabList className="text-center space-x-20 border-b">
          <Tab>
            <div className="flex items-center gap-2 px-10">
              <Icon icon="jam:refresh" width={20} />
              <h3>সাপ্তাহিক</h3>
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2 px-10">
              <Icon icon="jam:refresh" width={20} />
              <h3>মাসিক</h3>
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2 px-10">
              <Icon icon="jam:refresh" width={20} />
              <h3>বাৎসরিক</h3>
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col md:flex-row justify-center items-center gap-y-5">
            <div className="text-center md:text-left p-3 md:p-16">
              <h2 className="text-2xl font-bold">
                <span className="text-[#ef8b27] text-center">
                  ভর্তি প্রস্তুতি{" "}
                </span>{" "}
                <br />
                ঘরে বসেই হোক{" "}
              </h2>
              <ul className="space-y-3 mt-5">
                <li className="flex gap-2 ">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  প্রকৃত প্রতিযোগিদের সাথে একই সময়ে LIVE মডেল টেস্ট।
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  পুরোপুরি বিজ্ঞাপনমুক্ত (Ad Free)
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  চূড়ান্ত পরীক্ষা সম্পন্ন হওয়ার পূর্ব পর্যন্ত নিয়মিত মডেল টেস্ট।
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  সহজে ব্যবহার উপযোগি অ্যাপ এবং ওয়েবসাইট
                </li>
              </ul>

              <button className="text-[#FFFFFF] bg-primary py-2 px-16 rounded-lg mt-10">
                প্যাকেজ কিনুন
              </button>
            </div>
            <div className="py-5">
              <img src={frame} alt="" className="w-1/2 md:w-3/4 mx-auto" />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col md:flex-row justify-center items-center gap-y-5">
            <div className="text-center md:text-left p-3 md:p-16">
              <h2 className="text-2xl font-bold">
                <span className="text-[#ef8b27] text-center">
                  ভর্তি প্রস্তুতি{" "}
                </span>{" "}
                <br />
                ঘরে বসেই হোক{" "}
              </h2>
              <ul className="space-y-3 mt-5">
                <li className="flex gap-2 ">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  প্রকৃত প্রতিযোগিদের সাথে একই সময়ে LIVE মডেল টেস্ট।
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  পুরোপুরি বিজ্ঞাপনমুক্ত (Ad Free)
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  চূড়ান্ত পরীক্ষা সম্পন্ন হওয়ার পূর্ব পর্যন্ত নিয়মিত মডেল টেস্ট।
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  সহজে ব্যবহার উপযোগি অ্যাপ এবং ওয়েবসাইট
                </li>
              </ul>

              <button className="text-[#FFFFFF] bg-primary py-2 px-16 rounded-lg mt-10">
                প্যাকেজ কিনুন
              </button>
            </div>
            <div className="py-5">
              <img src={frame} alt="" className="w-1/2 md:w-3/4 mx-auto" />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col md:flex-row justify-center items-center gap-y-5">
            <div className="text-center md:text-left p-3 md:p-16">
              <h2 className="text-2xl font-bold">
                <span className="text-[#ef8b27] text-center">
                  ভর্তি প্রস্তুতি{" "}
                </span>{" "}
                <br />
                ঘরে বসেই হোক{" "}
              </h2>
              <ul className="space-y-3 mt-5">
                <li className="flex gap-2 ">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  প্রকৃত প্রতিযোগিদের সাথে একই সময়ে LIVE মডেল টেস্ট।
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  পুরোপুরি বিজ্ঞাপনমুক্ত (Ad Free)
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  চূড়ান্ত পরীক্ষা সম্পন্ন হওয়ার পূর্ব পর্যন্ত নিয়মিত মডেল টেস্ট।
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="material-symbols:check-circle-outline"
                    width={20}
                  />
                  সহজে ব্যবহার উপযোগি অ্যাপ এবং ওয়েবসাইট
                </li>
              </ul>

              <button className="text-[#FFFFFF] bg-primary py-2 px-16 rounded-lg mt-10">
                প্যাকেজ কিনুন
              </button>
            </div>
            <div className="py-5">
              <img src={frame} alt="" className="w-1/2 md:w-3/4 mx-auto" />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ExamZonePreparation;
