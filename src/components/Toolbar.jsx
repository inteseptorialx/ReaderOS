import { CircleHelp } from "lucide-react";
import { Bell } from "lucide-react";
import { UserRound } from "lucide-react";
import { Search } from "lucide-react";
import { Library } from "lucide-react";

function Toolbar() {
  return (
    <div className="fixed bottom-5 left-5 right-5 bg-slate-700/30 backdrop-filter backdrop-blur-lg border-slate-300/30 border-[3px] inset-x-5 h-[40px] rounded-full flex items-center justify-between select-none">
      <div className="ml-[15px] text-white">
        <CircleHelp />
      </div>
      <div className="flex gap-10 justify-center">
        <div className="text-white">
          <UserRound />
        </div>
        <div className="text-white">
          <Search />
        </div>
        <div className="text-white">
          <Library />
        </div>
      </div>
      <div className="mr-[15px] text-white">
        <Bell />
      </div>
    </div>
  );
}

export default Toolbar;
