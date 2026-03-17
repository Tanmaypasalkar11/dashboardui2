import { useEffect, useRef, useState } from "react";

function DeviceGlyph({ statusColor }) {
  return (
    <div className="relative flex h-[33px] w-[33px] items-center justify-center rounded-[7px] bg-[#f4f7fe]">
      <span
        className="absolute left-0 top-1/2 h-[27.364px] w-[4.5px] -translate-y-1/2 rounded-[4px]"
        style={{ backgroundColor: statusColor }}
      />
      <img
        src="/respberry.png"
        alt=""
        className="h-[18px] w-[14px] shrink-0 aspect-[7/9] object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

function MarkerPinIcon() {
  return (
    <img
      src="/marker-pin-01.svg"
      alt=""
      className="h-[18px] w-[18px] shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function ClockIcon() {
  return (
    <img
      src="/Time_duotone.svg"
      alt=""
      className="h-6 w-6 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function ContextMenu({ onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const items = [
    { icon: "/edit-03.svg", label: "Edit" },
    { icon: "/eye-off.svg", label: "Disable" },
    { icon: "/trash-01.svg", label: "Delete" },
    { icon: "/share-06.svg", label: "New Share" },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute left-1/2 top-full z-50 mt-2 w-[184px] -translate-x-1/2 rounded-[8px] border border-[rgba(234,236,240,0.5)] bg-white py-1 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_12px_20px_rgba(7,6,18,0.25)]"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-[14px] font-medium text-[#101728] transition-colors hover:bg-[#f8f9fc]"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <img
              src={item.icon}
              alt=""
              className="h-4 w-4 object-contain"
              aria-hidden="true"
            />
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function DeviceCard({
  name,
  group,
  description,
  location,
  date,
  status,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const statusColor = status === "online" ? "#60FAC4" : "#FF7373";

  return (
    <article className="flex h-[223px] w-[315px] shrink-0 items-center justify-center rounded-[15px] border border-[#e5e7eb] bg-white p-[28px_20px_12px_17px] transition-all duration-300 ease-out hover:scale-105 hover:border-[#d1d5db] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.10)]">
      <div className="flex h-[183px] w-[278px] flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 items-start gap-[12px]">
            <DeviceGlyph statusColor={statusColor} />

            <div className="min-w-0">
              <div className="flex h-[39.884px] flex-col justify-center self-stretch">
                <h3 className="truncate font-['DM_Sans'] text-[22px] font-bold leading-[42px] tracking-[-0.44px] text-[#1f2937]">
                  {name}
                </h3>
              </div>
              <p className="h-[21.936px] text-[14px] font-medium leading-6 tracking-[-0.28px] text-[#6b7280]">
                {group}
              </p>
              <p className="h-[21.936px] truncate text-[14px] font-medium leading-6 tracking-[-0.28px] text-[#9ca3af]">
                {description}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-[27.364px] w-[26.984px] items-center justify-center transition-opacity hover:opacity-70"
              aria-label="Device actions"
            >
              <span
                className="flex h-[17.989px] w-[4.5px] flex-col items-center justify-between"
                aria-hidden="true"
              >
                <span className="h-[4.5px] w-[4.5px] rounded-full bg-[#3a3a3e] transition-colors" />
                <span className="h-[4.5px] w-[4.5px] rounded-full bg-[#3a3a3e] transition-colors" />
                <span className="h-[4.5px] w-[4.5px] rounded-full bg-[#3a3a3e] transition-colors" />
              </span>
            </button>
            {menuOpen ? (
              <ContextMenu onClose={() => setMenuOpen(false)} />
            ) : null}
          </div>
        </div>

        <div className="flex h-[58px] items-start gap-[10px] self-stretch rounded-[8px] bg-gradient-to-r from-[#f0f4f8] to-[#f9fafb] pb-[13px] pl-[15px] pr-[14px] pt-[12px] border border-[#e5e7eb]">
          <div className="flex h-[32px] w-[150px] items-center gap-[10px]">
            <MarkerPinIcon />
            <span className="truncate text-[14px] font-medium text-[#1f2937]">
              {location}
            </span>
          </div>

          <div className="h-[28px] w-px bg-[#d1d5db]" />

          <div className="flex h-[32px] w-[117px] items-center gap-[10px]">
            <ClockIcon />
            <span className="truncate text-[14px] font-medium text-[#1f2937]">
              {date}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
