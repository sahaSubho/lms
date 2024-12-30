import React, { CSSProperties, SVGAttributes } from "react";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as DiIcons from "react-icons/di";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as CgIcons from "react-icons/cg";
import * as Fa6Icons from "react-icons/fa6";
import * as LiaIcons from "react-icons/lia";
import * as LuIcons from "react-icons/lu";
import * as PiIcons from "react-icons/pi";

interface IProps {
  icon: string; // Format: "library/iconName" (e.g., "ai/AiFillHome")
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback?: JSX.Element | null;
}

// Centralized map of all supported icon libraries
const ICON_LIBRARIES: Record<string, Record<string, React.ComponentType>> = {
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  di: DiIcons,
  fa: FaIcons,
  fi: FiIcons,
  gi: GiIcons,
  hi: HiIcons,
  im: ImIcons,
  io: IoIcons,
  io5: Io5Icons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  tb: TbIcons,
  ti: TiIcons,
  vsc: VscIcons,
  cg: CgIcons,
  fa6: Fa6Icons,
  lia: LiaIcons,
  lu: LuIcons,
  pi: PiIcons,
};

const DynamicIcon: React.FC<IProps> = ({
  icon,
  color,
  size,
  className,
  style,
  attr,
  fallback = <div>Icon Loading...</div>,
}) => {
  const [library, iconComponent] = icon.split("/");

  if (!library || !iconComponent) {
    return <div>Invalid Icon Format</div>;
  }

  const IconLibrary = ICON_LIBRARIES[library.toLowerCase()];
  if (!IconLibrary) {
    return <div>Library Not Supported</div>;
  }

  const Icon = IconLibrary[iconComponent];
  if (!Icon) {
    return <div>Icon Not Found</div>;
  }

  return (
    <IconContext.Provider value={{ color, size, className, style, attr }}>
      <Icon />
    </IconContext.Provider>
  );
};

export default DynamicIcon;
