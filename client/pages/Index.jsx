import { useCallback, useEffect, useState, useRef } from "react";
import DeviceCard from "@/components/DeviceCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";
import { devices, filterTabs } from "@/data/dashboard";

export default function Index() {
  const [filter, setFilter] = useState("all");
  const tabRefs = useRef({});
  const [activeTabStyle, setActiveTabStyle] = useState({
    width: 0,
    left: 0,
    visible: false,
  });

  const updateActiveTabStyle = useCallback(() => {
    const activeTab = tabRefs.current[filter];

    if (!activeTab) {
      return;
    }

    setActiveTabStyle({
      width: activeTab.offsetWidth,
      left: activeTab.offsetLeft,
      visible: true,
    });
  }, [filter]);

  useEffect(() => {
    updateActiveTabStyle();
  }, [updateActiveTabStyle]);

  useEffect(() => {
    window.addEventListener("resize", updateActiveTabStyle);

    return () => {
      window.removeEventListener("resize", updateActiveTabStyle);
    };
  }, [updateActiveTabStyle]);

  const filteredDevices = devices.filter((device) => {
    if (filter === "available") {
      return device.status === "online";
    }

    if (filter === "unavailable") {
      return device.status === "offline";
    }

    return true;
  });

  const toolbar = (
    <div className="flex w-full min-w-0 flex-col items-center gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative mx-auto inline-flex h-[57px] w-full max-w-[500px] min-w-0 items-center rounded-[79.177px] border border-[#f0f0f0] bg-white p-[6px] shadow-[0_3.167px_12.668px_rgba(0,0,0,0.05)] xl:mx-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[6px] top-[6px] rounded-[21.774px] bg-[#2970ff] shadow-[0_3.167px_3.167px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out"
          style={{
            width: activeTabStyle.width,
            transform: `translateX(${activeTabStyle.left}px)`,
            opacity: activeTabStyle.visible ? 1 : 0,
          }}
        />
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            ref={(element) => {
              tabRefs.current[tab.id] = element;
            }}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "relative z-[1] flex h-[44px] items-center justify-center rounded-[21.774px] text-[18px] font-semibold leading-[19.002px] transition-colors duration-300 ease-out",
              tab.id === "all" && "w-[147.193px]",
              tab.id === "available" && "w-[152px]",
              tab.id === "unavailable" && "w-[170px]",
              filter === tab.id && "text-white",
              filter !== tab.id && "text-[rgba(0,0,0,0.75)]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-3 xl:w-auto xl:shrink-0 xl:justify-end">
        <button
          type="button"
          className="flex h-[56px] w-[234px] items-center justify-between rounded-[10px] border border-[#ececec] bg-white px-[30px] text-[16px] font-semibold leading-[19.002px] text-[rgba(0,0,0,0.75)]"
        >
          <span>Group</span>
          <img
            src="/chevron-down.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0 object-contain"
          />
        </button>

        <button
          type="button"
          className="flex h-[56px] w-[148px] items-center justify-start gap-2 rounded-[28px] bg-[linear-gradient(118deg,#2970FF_9.79%,#193D9E_97.55%)] pl-4 pr-[14px] text-[16px] font-semibold leading-[19.002px] text-white shadow-[0_14px_28px_rgba(45,97,244,0.2)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <img
            src="/plus.svg"
            alt=""
            className="h-[21px] w-[21px] shrink-0 object-contain"
            aria-hidden="true"
          />
          Add Device
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout toolbar={toolbar}>
      <div className="shrink-0 pb-[28px] pl-[43px] pr-[42px] pt-[28px]">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,315px),315px))] justify-center gap-x-[15px] gap-y-[15px] lg:justify-start">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
