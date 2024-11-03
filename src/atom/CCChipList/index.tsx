"use client";

import React, { useEffect, useState } from "react";
import CCText from "../CCText";

export type chipItem = {
  id: number;
  name: string | JSX.Element;
  key: string | number;
};

type CCChipListProps = {
  items: chipItem[];
  onChange?: (chipItem?: chipItem) => void;
};

function CCChipList(props: CCChipListProps) {
  const { items = [], onChange = () => {} } = props;
  const [selected, setSelected] = useState<chipItem | null>(null);

  useEffect(() => {
    if (items?.length > 0) {
      setSelected(items[0]);
    }
  }, [items]);

  const handleChipClick = (item: chipItem) => {
    setSelected(item);
    onChange?.(item);
  };

  return (
    <div className="flex gap-4">
      {items?.map((i) => (
        <button
          key={i?.id}
          className={`border-2 border-grey px-[12px] py-[6px] rounded-lg 
            ${
              selected?.key === i?.key
                ? "bg-brand-lightYellow border-brown"
                : "transition-transform transform  hover:drop-shadow bg-white"
            }
            `}
          onClick={() => handleChipClick(i)}
        >
          <CCText className="text-sm flex">{i?.name}</CCText>
        </button>
      ))}
    </div>
  );
}

export default CCChipList;
