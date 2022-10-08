import React, { useEffect, useState } from "react";

type TabProps = {
  activeTab: string;
  label: string;
  onClick: (value: string) => void;
};

function Tab({ label, onClick, activeTab }: TabProps) {
  const [classname, setClassName] = useState("tab-bordered");

  const onClickHandler = () => {
    onClick(label);
  };

  useEffect(() => {
    if (activeTab === label) {
      setClassName("tab-bordered tab-active");
    } else {
      setClassName("tab-bordered");
    }
  }, [activeTab, label]);

  return (
    <li className={classname} onClick={onClickHandler}>
      <span>{label}</span>
    </li>
  );
}

export default Tab;
