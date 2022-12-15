import { Tab } from "@headlessui/react";
import AddSkill from "./admin/AddSkill";
import DisplaySkills from "./admin/DisplaySkills";
import classNames from "classnames";
import AddUser from "./admin/AddUser";
import DisplayUsers from "./admin/DisplayUsers";

const Admin = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex justify-center space-x-1 rounded-xl  p-1">
        <Tab
          className={({ selected }) =>
            classNames(
              "border border-black w-1/3 backdrop-blur-md rounded-lg py-1 text-sm font-bold leading-5 ",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-blue-50 shadow text-blue-700"
                : "text-gray-400 hover:bg-white/[0.12] hover:text-blue-700"
            )
          }
        >
          Skills
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "border border-black w-1/3 rounded-lg py-1 backdrop-blur-md text-sm font-bold leading-5 ",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-blue-50 shadow text-blue-700"
                : "text-gray-400 hover:bg-white/[0.12] hover:text-blue-700"
            )
          }
        >
          Users
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="flex flex-row w-full justify-center content-center border p-4 space-x-3 items-left">
            <AddSkill />
            <DisplaySkills />
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="flex border flex-row w-full content-center p-4 justify-center space-x-3 items-left">
            {/* <AddUser /> */}
            <AddSkill />
            <DisplayUsers />
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Admin;
