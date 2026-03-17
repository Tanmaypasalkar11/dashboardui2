import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GroupCardGrid from "@/components/GroupCard";

export default function GroupPage() {
  return (
    <DashboardLayout>
      <div className="pt-6">
        <div className="px-6 lg:px-10">
          <h1 className="h-[18px] w-[174px] text-[18px] font-semibold leading-[19.002px] text-[rgba(0,0,0,0.75)]">
            Group Details
          </h1>
        </div>
        <div className="ml-[34px] mt-[24px] w-[1328.5px] border-t border-[#ececec]" />
        <div className="pl-[43px]">
          <GroupCardGrid />
        </div>
      </div>
    </DashboardLayout>
  );
}
