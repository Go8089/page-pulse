import React from "react";
export default function Loader() {
    return (React.createElement("div", { className: "flex justify-center py-6" },
        React.createElement("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" })));
}
