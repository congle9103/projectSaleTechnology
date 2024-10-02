import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Slider";
import Main from "./Main";

const LayoutSale = () => {
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="flex justify-center pb-[100px] pt-[142px]">
        <div className="grid">
          <Slider />
          <Main />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutSale;
