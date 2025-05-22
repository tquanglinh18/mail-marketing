import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="w-full h-full bg-gray-900 ">
      <div className="py-8 px-4 mx-auto h-full max-w-screen-xl flex flex-col justify-center items-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#0891b2] ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
            Không tìm thấy trang!
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Rất tiếc, chúng tôi không tìm thấy trang đó. Bạn sẽ tìm thấy nhiều
            thứ để khám phá trên trang chủ.
          </p>
          <Link
            to="/"
            className="inline-flex bg-primary-600 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center text-[#0891b2] my-4"
          >
            Trở về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
