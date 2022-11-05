import React, { useState, useEffect } from "react";
import Nav from "../../Components/NavBar1/Nav";

export default function Wishlist() {
  const userId = localStorage.getItem("userId");

  const [data, setData] = useState();

  useEffect(() => {
    try {
      fetch(`http://localhost:3211/getWishlist/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.data);
          setData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `http://localhost:3211/deleteFromWishlist/${id}`,
        requestOptions
      );

      if (resp.status === 200) {
        window.location.reload();
      } else {
        alert("error");
        console.log("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };
  if (data) {
    return (
      <>
        <Nav />
        <div className=" py-12">
          {/* Desktop Responsive Start */}
          <div className="hidden sm:flex flex-col justify-start items-start">
            <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
              <h1 className="text-4xl font-semibold leading-9 text-gray-800">
                Wishlist
              </h1>
              <p className="text-base leading-4 text-gray-600 pb-1"></p>
            </div>
            <table className="w-full mt-16 whitespace-nowrap">
              <thead
                aria-label="table heading"
                className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b "
              >
                <tr>
                  <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">
                    Camp Ground
                  </th>
                  <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                    Name
                  </th>
                  <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                    PRICE
                  </th>
                  <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                    Location
                  </th>
                  <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
                </tr>
              </thead>
              <tbody className="w-full text-left">
                {data &&
                  data.map((d) => (
                    <tr className="border-gray-200 border-b  ">
                      <th>
                        <img
                          className="my-10 pl-4 lg:pl-10 2xl:pl-20"
                          src={`http://localhost:3211/uploads/${d.imgId}`}
                          alt="camp"
                        />
                      </th>
                      <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                        <p className=" text-base leading-4 text-gray-800">
                          {d.name}
                        </p>
                      </th>
                      <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                        <p className>Rs. {d.price}</p>
                      </th>
                      <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                        <p>{d.location}</p>
                      </th>
                      <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                        <button
                          onClick={() => handleRemove(d._id)}
                          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800"
                        >
                          <p>Remove Item</p>
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Desktop Responsive End */}
          {/* Mobile Responsive Start */}
          <div className=" flex justify-center items-center">
            <div className="sm:hidden flex flex-col justify-start items-start ">
              <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
                <p className="text-4xl font-semibold leading-9 text-gray-800">
                  Wishlist
                </p>
                <p className="text-base leading-4 text-gray-600 pb-1"></p>
              </div>

              {data &&
                data.map((d) => (
                  <div className="border-gray-200 border-b pb-10">
                    <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                      <div>
                        <img
                          src={`http://localhost:3211/uploads/${d.imageId}`}
                          alt="shoe"
                        />
                      </div>
                    </div>
                    <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                      <div>
                        <p className="w-36 text-base leading-6 text-gray-800">
                          {d.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Rs. {d.price}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                      <div>
                        <p>{d.location}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemove(d._id)}
                          className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800"
                        >
                          <p>Remove Item</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Mobile Responsive End */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <h1>Wishlist Empty</h1>
      </>
    );
  }
}
