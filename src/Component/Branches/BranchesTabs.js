import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BranchesDetails from "./BranchesDetails";
import BranchesEmployees from "./BranchesEmployees";

const BranchesTabs = props => {
  const id = props.match.params.id;

  return (
    <Tabs>
      <TabList style={{ fontSize: "20px" }}>
        <Tab>تفاصيل الفرع</Tab>
        <Tab>الموظفين</Tab>
      </TabList>

      <TabPanel style={{ margin: "auto" }}>
        <BranchesDetails branchId={id} />
      </TabPanel>
      <TabPanel>
        <BranchesEmployees branchId={id} />
      </TabPanel>
    </Tabs>
  );
};
export default BranchesTabs;
