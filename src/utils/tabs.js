import { LuNotebookText } from "react-icons/lu";
import { MdAutoGraph } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import ShowStatComponent from "../components/main/ShowStatComponent";

const tabs = [
    {
        name: "Stats",
        Icon: MdAutoGraph,
        href: '/stats',
        component: ShowStatComponent
    },
    {
        name: "Entries",
        Icon: LuNotebookText,
        href: '/'
    },
    {
        name: "Settings",
        Icon: IoMdSettings,
        href: '/settings'
    }
];

export default tabs