import Link from "next/link";
import type { ProductCategory } from "@types";
import SiteMap from "@utils/sitemap";

export default function Footer({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <div className="p-8 pb-2 max-h-[300px] mt-10 bg-footer shadow-inset-top">
      <ul className="lg:max-w-3xl max-lg:max-w-[90%] mx-auto grid grid-cols-4 max-sm:grid-cols-2 max-sm:text-sm gap-4 justify-between border-b border-b-slate-400 pb-4">
        {categories.map(({ name, slug }) => {
          return (
            <li className="text-center" key={slug}>
              <Link
                className="text-nowrap text-sm hover:underline"
                href={`${SiteMap.PLP.CategoryWise.path}/${slug}`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="text-center py-2 px-2 border-b border-b-slate-400 w-fit mx-auto">
        <Link href={SiteMap.Policy.path}>Privacy</Link>
        <span className="mx-10">|</span>
        <Link href={SiteMap.Terms.path}>Terms</Link>
      </div>
      {/* <hr className="w-7/12 my-4 mx-auto max-lg:w-11/12" /> */}
      <div className="text-center mt-4">
        <p>© GridBox {new Date().getFullYear()}, Inc. or its affiliates</p>
        <p className="max-sm:mt-3">
          Designed & Developed by{" "}
          <Link
            className="hover:underline text-nowrap"
            href="https://hdxdev.in"
            target="_blank"
          >
            Harsh Dagar (hdxdev.in)
          </Link>
        </p>
      </div>
    </div>
  );
}
