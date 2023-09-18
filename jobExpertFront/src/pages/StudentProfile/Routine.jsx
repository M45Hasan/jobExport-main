import JobExpart from "../../components/JobExpart/JobExpart";
import PackageDropdown from "../../components/PackageDropdown/PackageDropdown";
import Slider from "../../components/Slider/Slider";
import TwelveMonthPrili from "../../components/TwelveMonthPrili/TwelveMonthPrili";

const Routine = () => {
  return (
    <>
      <div className=" flex items-center mt-16">
        <PackageDropdown />
      </div>
      <div className="mt-16 flex flex-col justify-center  gap-10 gap-y-5 md:flex-row">
        <div className="w-4/5">
          <div className="border border-b-0 bg-primary">
            <h1 className="text-xl font-semibold text-[#FFFFFF] py-3 text-center">
              বিসিএস প্রিলি২০২৩
            </h1>
          </div>
          <div className="mx-auto">
            <table className="table-auto w-full text-center">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Row 1, Cell 1</td>
                  <td className="border px-4 py-2">Row 1, Cell 2</td>
                  <td className="border px-4 py-2">Row 1, Cell 3</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Row 2, Cell 1</td>
                  <td className="border px-4 py-2">Row 2, Cell 2</td>
                  <td className="border px-4 py-2">Row 2, Cell 3</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Row 3, Cell 1</td>
                  <td className="border px-4 py-2">Row 3, Cell 2</td>
                  <td className="border px-4 py-2">Row 3, Cell 3</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Row 3, Cell 1</td>
                  <td className="border px-4 py-2">Row 3, Cell 2</td>
                  <td className="border px-4 py-2">Row 3, Cell 3</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Row 3, Cell 1</td>
                  <td className="border px-4 py-2">Row 3, Cell 2</td>
                  <td className="border px-4 py-2">Row 3, Cell 3</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Row 3, Cell 1</td>
                  <td className="border px-4 py-2">Row 3, Cell 2</td>
                  <td className="border px-4 py-2">Row 3, Cell 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-11/12 md:w-4/5">
          <div className="border border-b-0">
            <h1 className="text-xl px-5 text-center py-2 font-semibold">
              পরীক্ষা তারিখ
            </h1>
          </div>
          <div className="border border-t-0">
            <p className="text-lg bg-primary text-center text-[#FFFFFF] py-10 px-4  ">
              ১০ ঘন্টা ২৬ মিনিট ২০ সেকেন্ড
            </p>
          </div>
        </div>
      </div>
      {/* ১২ মাস বিসিএস  প্রিলি */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 gap-y-5 mt-16">
        <TwelveMonthPrili />
      </div>

      {/* slider section */}
      <div className="mt-16">
        <Slider />
      </div>
      {/* job expart logo */}
      <JobExpart />
    </>
  );
};

export default Routine;
