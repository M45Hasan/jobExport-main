import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
const items = [items.length];

function Items({ currentItems, datas }) {
  console.log("paginatin", datas);
  return (
    <>
      {currentItems.length != 0 &&
        currentItems.map((item) => (
          <div className="flex md:flex-row flex-col mb-[20px] md:gap-x-[30px] items-center border border-[#000000] p-[5px] md:p-[20px]">
            <div className="md:w-[20%] w-[60%]">
              <img
                className="w-full "
                src="https://i.ibb.co/vqbtXkJ/image-163.png"
                alt=""
              />
            </div>
            <div className=" w-[80%] p-[15px] md:p-[30px]">
              <h2 className="text-[20px] md:text-[40px] font-semibold">
                {item.packageName}
              </h2>
              <p className="md:text-[24px] text-[14px] my-[10px]">
                {item.packageDetail}
              </p>
              <div className="flex md:flex-row flex-col  justify-evenly items-start md:items-center">
                <div>
                  <p className="md:text-[24px] text-[14px] ">
                    পরীক্ষা শুরুঃ {item.examDate}
                  </p>
                  <p className="md:text-[24px] text-[14px] ">
                    {" "}
                    পরীক্ষার সময়ঃ {item.examTime}
                  </p>
                  <p className="md:text-[24px] text-[14px] ">
                    Total Examinee :{" "}
                    {item.packageBuyer ? (
                      <p>{item.packageBuyer.length}</p>
                    ) : (
                      "0"
                    )}
                  </p>
                </div>

                <button className="bg-primary mx-auto mt-[10px] md:mt-0 text-[#FFFFFF] flex justify-center items-center py-3 gap-2 px-16 rounded-lg">
                  {item.premium == true ? (
                    <img
                      src="https://i.ibb.co/H7wjCk9/image-56.png"
                      alt=""
                      className="w-5"
                    />
                  ) : (
                    ""
                  )}
                  Start Now
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

function Pagination({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />

      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="..."
        breakClassName="px-[14px] py-[9px] font-basic font-dm border border-[#F0F0F0] text-[#767676]"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        activeClassName="bg-primery !text-white"
        pageClassName="px-[14px] py-[9px] font-basic font-dm border border-[#F0F0F0] text-[#767676]"
        pageLinkClassName="page-link"
        previousClassName="hidden"
        previousLinkClassName="page-link"
        nextClassName="hidden"
        nextLinkClassName="page-link"
        containerClassName="flex gap-x-8"
        renderOnZeroPageCount={null}
      />
      <p className="flex font-dm  text-[#767676]">
        Products from {itemOffset} to {endOffset} of {items.length}
      </p>
    </>
  );
}

export default { Pagination, Items };
