import { Link } from "react-router-dom";
import Header from "../components/Header";
import Seo from "../components/Seo";

export default function NotFound({ showHeader = true }) {
  return (
    <>
      <Seo title="Page Not Found" description="The requested DigiMistry page could not be found." path="/404" />
      {showHeader && (
        <div className="bg-gradient-to-br from-[#4f6bed] to-[#b95cf4]">
          <Header />
        </div>
      )}
      <main className="grid min-h-[60vh] place-items-center bg-[#f4f6ff] px-4 py-16 text-center">
        <div>
          <p className="text-7xl font-extrabold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Page Not Found</h1>
          <p className="mt-2 text-slate-600">Maaf, yeh page available nahi hai.</p>
          <Link to="/" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Home par wapas jao
          </Link>
        </div>
      </main>
    </>
  );
}
