import Link from "next/link";
import { Category } from "../utils";

export default function Footer({}) {
  const categories = Object.entries(Category);
  return (
    <div className="p-8 max-h-[300px] mt-4 bg-footer shadow-inset-top">
      <ul className="max-w-[70%] w-7/12 md:max-w-screen-sm mx-auto grid grid-cols-4 gap-4 justify-between">
        {categories.map(([key, value]) => {
          if (key === "ALL" || typeof value === "object") return null;
          return (
            <li key={key}>
              <Link
                href={`/category/${value}`}
                className="text-nowrap text-sm hover:underline"
              >
                {key}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr className="w-7/12 my-4 mx-auto" />
      <div className="text-center">
        <p>© 2023-2024, Gadget/Grid, Inc. or its affiliates</p>
        <p>
          Designed & Developed by{" "}
          <Link
            href="https://hdxdev.in"
            target="_blank"
            className="hover:underline"
          >
            Harsh Dagar (hdxdev.in)
          </Link>
        </p>
      </div>
    </div>
  );
}
