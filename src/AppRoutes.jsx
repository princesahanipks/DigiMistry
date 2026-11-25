import { BrowserRouter, Route, Routes } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="font-[Jost]">
        <div className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:section/:slug" element={<CategoryPage />} />
            <Route
              path="/blog/:slug"
              element={
                <>
                  <div className="bg-gradient-to-br from-[#4f6bed] to-[#b95cf4]">
                    <Header />
                  </div>
                  <Post />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
