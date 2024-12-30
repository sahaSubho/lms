import React, {
  CSSProperties,
  SVGAttributes,
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
import { IconContext } from "react-icons";

interface IProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback: JSX.Element | null;
}

const DynamicIcon: React.FC<IProps> = ({
  icon,
  color,
  size,
  className,
  style,
  attr,
  fallback,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is only rendered on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Return null during SSR

  const [library, iconComponent] = icon.split("/");

  if (!library || !iconComponent) {
    return <div>Could Not Find Icon</div>;
  }

  // Use a switch case to handle different libraries from `react-icons`
  let Icon;
  switch (library.toLowerCase()) {
    case "ai":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/ai`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "bi":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/bi`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "bs":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/bs`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "di":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/di`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "fa":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/fa`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "fi":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/fi`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "gi":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/gi`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "hi":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/hi`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "im":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/im`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "io":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/io`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "io5":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/io5`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "md":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/md`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "ri":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/ri`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "si":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/si`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "tb":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/tb`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "ti":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/ti`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "vsc":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/vsc`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "cg":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/cg`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "fa6":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/fa6`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "lia":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/lia`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "lu":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/lu`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    case "pi":
      Icon = lazy(() =>
        // @ts-ignore
        import(`react-icons/pi`).then((module) => ({
          default: module[iconComponent],
        }))
      );
      break;
    default:
      return <div>Library Not Supported</div>;
  }

  const value = {
    color,
    size,
    className,
    style,
    attr,
  };

  return (
    <Suspense fallback={fallback}>
      <IconContext.Provider value={value}>
        <Icon />
      </IconContext.Provider>
    </Suspense>
  );
};

export default DynamicIcon;
