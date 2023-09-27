import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Icon } from "@iconify/react";
import PackageUpdate from "./Bank";
import Routine from "./Routine";
import Result from "./Result";
import ExamUpdate from "./ExamUpdate";
import Favourite from "./Favourite";
import Stroy from "./Stroy";
import Comment from "./Comment";
import Bank  from "./Bank";

const StudentTabs = () => {
  return (
    <div className="w-4/5 mx-auto">
      <Tabs>
        {/* tab list */}
        <TabList>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-12">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>রেজাল্ট</span>
            </h3>
          </Tab>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-7">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>পরীক্ষা আপডেট</span>
            </h3>
          </Tab>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-11">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>উত্তর পত্র</span>
            </h3>
          </Tab>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-11">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>Write Stroy</span>
            </h3>
          </Tab>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-11">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>Write Comment</span>
            </h3>
          </Tab>
          <Tab>
            <h3 className="flex justify-center items-center gap-2 py-2 px-11">
              {" "}
              <Icon icon="jam:refresh" width={20} />
              <span>প্রশ্ন ব্যাংক</span>
            </h3>
          </Tab>
        </TabList>

        {/* tab list items  */}

        {/* package update */}

        {/* routine update */}

        {/* Result update */}
        <TabPanel>
          <Result />
        </TabPanel>

        {/* exam update */}
        <TabPanel>
          <ExamUpdate />
        </TabPanel>

        {/* favourite  */}
        <TabPanel>
          <Favourite />
        </TabPanel>
        {/* Write Stroy  */}
        <TabPanel>
          <Stroy />
        </TabPanel>
        {/* Write Comment  */}
        <TabPanel>
          <Comment />
        </TabPanel>
        <TabPanel>
          <Bank />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default StudentTabs;
