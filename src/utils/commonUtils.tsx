import { Chess } from "chess.js";
// import { IconType } from "react-icons"; // Type for icons

export function formatCurrency(
  amount: number = 0,
  currency: string = "INR"
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatSecondsToTime(seconds: number): string {
  // Calculate minutes and remaining seconds
  let minutes: string | number = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 10) minutes = `0${minutes}`;
  // Format the seconds to always have two digits
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${minutes}:${formattedSeconds}`;
}

export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const nameParts = fullName.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";

  return firstInitial + lastInitial;
}

export function getRelativeTime(pastDate: Date | string): string {
  if (typeof pastDate == "string") {
    pastDate = new Date(pastDate);
  }
  const now = new Date();
  const diffInMilliseconds = now.getTime() - pastDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30); // Approximate months
  const diffInYears = Math.floor(diffInDays / 365); // Approximate years

  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
}

// interface IconProps {
//   size?: number;
//   className?: string;
// }

// // Function to render either a react-icon component or an imported SVG
// export const renderIcon = async (
//   icon: string | StaticImageData | React.ComponentType,
//   { size = 24, className = "" }: IconProps = {}
// ): Promise<JSX.Element | null> => {
//   if (typeof icon === "string") {
//     // Extract the library name (first camel-case string) and the icon name
//     const match = icon.match(/^[A-Z][a-z]*/);
//     const library = match ? match[0] : "";
//     const iconName = icon;

//     if (library && iconName) {
//       try {
//         // Dynamically import the icon library
//         const Icons = await import(
//           `../../node_modules/react-icons/${library.toLowerCase()}`
//         );
//         const IconComponent = (Icons as Record<string, IconType>)[iconName];

//         if (IconComponent) {
//           return <IconComponent size={size} className={className} />;
//         } else {
//           console.error(`Icon ${iconName} not found in ${library} library`);
//           return null;
//         }
//       } catch (error) {
//         console.error(`Failed to load icon library: ${library}`, error);
//         return null;
//       }
//     }
//   } else if (typeof icon === "function" || typeof icon === "object") {
//     // If icon is an SVG component or StaticImageData
//     return (
//       <Image
//         src={icon as StaticImageData}
//         alt="icon"
//         width={size}
//         height={size}
//         className={className}
//       />
//     );
//   }

//   console.error(`Invalid icon format: ${icon}`);
//   return null;
// };

export function getRandomBookUrl(index?: number) {
  const urls = [
    "https://cc-home.s3.ap-south-1.amazonaws.com/LMS/sample-book-imgs/book1-removebg-preview.png",
    "https://cc-home.s3.ap-south-1.amazonaws.com/LMS/sample-book-imgs/book2-removebg-preview.png",
    "https://cc-home.s3.ap-south-1.amazonaws.com/LMS/sample-book-imgs/book3-removebg-preview.png",
    "https://cc-home.s3.ap-south-1.amazonaws.com/LMS/sample-book-imgs/book4-removebg-preview.png",
  ];

  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[index || randomIndex];
}

export function applyMoveAndGetNewFEN(
  previousFEN: string,
  sanMove: string
): string {
  // Create a new chess instance with the given FEN
  const chess = new Chess(previousFEN);

  // Apply the move in SAN notation
  const move = chess.move(sanMove);

  if (move === null) {
    console.error("Invalid move");
    return previousFEN;
  }

  // Return the updated FEN after the move
  return chess.fen();
}


export const getColors = (key: string) => {
    switch (key) {
      case "R":
        return "red";
      case "B":
        return "blue";
      case "Y":
        return "yellow";
      case "G":
        return "green";
      default:
        return "green"; // default color
    }
  }