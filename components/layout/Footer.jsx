import React from "react";
import footerLaptop from "@/public/assets/footerLaptop.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container w-full md:flex-row flex flex-col justify-between items-center border-[#FFE57E] border-t mt-20 gap-y-20 md:gap-0 mb-10">
      <div
        className="flex flex-col justify-center items-center"
        data-aos="fade-left"
      >
        <Image alt="عرفان رضایی , Erfandev" src={footerLaptop} className="md:w-[450px]" />
        <h1 className="text-3xl font-medium md:-mt-7  text-center">
          برنامه نویس وب و طراح UI & UX
        </h1>
      </div>
      <div
        className="flex flex-col gap-y-8 justify-center items-center"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-semibold">لینک های مفید</h1>
        <ul className="flex flex-col justify-center items-center gap-y-4">
          <Link
            href={"/work-samples"}
            className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
          >
            نمونه کار ها
          </Link>
          <Link
            href={"/blogs"}
            className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
          >
            مقالات
          </Link>
          <Link
            href={"/about"}
            className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
          >
            درباره من
          </Link>
          <Link
            href={"/contact-us"}
            className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
          >
            ارتباط با من
          </Link>
        </ul>
      </div>
      <div data-aos="fade-right" className="flex flex-col gap-y-14 justify-center items-center ">
        <h1 className="text-3xl font-semibold">تماس با من</h1>
        <div className="flex justify-between flex-col items-end gap-y-10">
          <div className="flex justify-center items-center gap-x-2">
            <Link
              href={"tel:09393321803"}
              className="font-medium text-xl hover:text-[#ecda90] transition-all duration-200"
            >
              09393321803
            </Link>
            <svg
              width="37"
              height="38"
              viewBox="0 0 37 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.8704 28.5065C33.8704 29.0615 33.7471 29.6319 33.485 30.1869C33.2229 30.7419 32.8837 31.2661 32.4366 31.7594C31.6812 32.5919 30.8487 33.1931 29.9083 33.5786C28.9833 33.964 27.9812 34.1644 26.9021 34.1644C25.3296 34.1644 23.6491 33.7944 21.8762 33.039C20.1033 32.2836 18.3304 31.2661 16.5729 29.9865C14.8 28.6915 13.1196 27.2577 11.5162 25.6698C9.92831 24.0665 8.49456 22.3861 7.21498 20.6286C5.95081 18.8711 4.93331 17.1136 4.19331 15.3715C3.45331 13.614 3.08331 11.9336 3.08331 10.3302C3.08331 9.28189 3.26831 8.27981 3.63831 7.35481C4.00831 6.41439 4.59415 5.55105 5.41123 4.78022C6.3979 3.80897 7.47706 3.33105 8.6179 3.33105C9.04956 3.33105 9.48123 3.42355 9.86665 3.60855C10.2675 3.79355 10.6221 4.07105 10.8996 4.47189L14.4762 9.51314C14.7537 9.89856 14.9541 10.2531 15.0929 10.5923C15.2316 10.9161 15.3087 11.2398 15.3087 11.5327C15.3087 11.9027 15.2008 12.2727 14.985 12.6273C14.7846 12.9819 14.4916 13.3519 14.1216 13.7219L12.95 14.9398C12.7804 15.1094 12.7033 15.3098 12.7033 15.5565C12.7033 15.6798 12.7187 15.7877 12.7496 15.9111C12.7958 16.0344 12.8421 16.1269 12.8729 16.2194C13.1504 16.7281 13.6283 17.3911 14.3066 18.1927C15.0004 18.9944 15.7404 19.8115 16.5421 20.6286C17.3746 21.4456 18.1762 22.2011 18.9933 22.8948C19.795 23.5731 20.4579 24.0356 20.9821 24.3131C21.0591 24.344 21.1516 24.3902 21.2596 24.4365C21.3829 24.4827 21.5062 24.4981 21.645 24.4981C21.9071 24.4981 22.1075 24.4056 22.2771 24.2361L23.4487 23.0798C23.8341 22.6944 24.2041 22.4015 24.5587 22.2165C24.9133 22.0006 25.2679 21.8927 25.6533 21.8927C25.9462 21.8927 26.2546 21.9544 26.5937 22.0931C26.9329 22.2319 27.2875 22.4323 27.6729 22.6944L32.7758 26.3173C33.1766 26.5948 33.4541 26.9186 33.6237 27.304C33.7779 27.6894 33.8704 28.0748 33.8704 28.5065Z"
                stroke="url(#paint0_linear_203_66)"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_203_66"
                  x1="6.5"
                  y1="-9.25244"
                  x2="30.5"
                  y2="55.7476"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <Link
              href={"mailto:rezaiierfan672@gmail.com"}
              className="font-medium text-xl hover:text-[#ecda90] transition-all duration-200"
            >
              rezaiierfan672@gmail.com
            </Link>
            <svg
              width="37"
              height="38"
              viewBox="0 0 37 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.9166 15.6644V20.2894C33.9166 26.4561 30.8333 29.5394 24.6666 29.5394H23.8958C23.4179 29.5394 22.9554 29.7706 22.6625 30.1561L20.35 33.2394C19.3325 34.5961 17.6675 34.5961 16.65 33.2394L14.3375 30.1561C14.0908 29.8169 13.5204 29.5394 13.1041 29.5394H12.3333C6.16665 29.5394 3.08331 27.9977 3.08331 20.2894V12.5811C3.08331 6.41439 6.16665 3.33105 12.3333 3.33105H21.5833"
                stroke="url(#paint0_linear_203_75)"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.0625 11.0394C32.1911 11.0394 33.9166 9.31382 33.9166 7.18522C33.9166 5.05662 32.1911 3.33105 30.0625 3.33105C27.9339 3.33105 26.2083 5.05662 26.2083 7.18522C26.2083 9.31382 27.9339 11.0394 30.0625 11.0394Z"
                stroke="url(#paint1_linear_203_75)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.6612 17.2059H24.6751"
                stroke="url(#paint2_linear_203_75)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.493 17.2059H18.5069"
                stroke="url(#paint3_linear_203_75)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3249 17.2059H12.3387"
                stroke="url(#paint4_linear_203_75)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_203_75"
                  x1="18.5"
                  y1="3.33105"
                  x2="18.5"
                  y2="34.2569"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.213542" stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_203_75"
                  x1="30.0625"
                  y1="3.33105"
                  x2="30.0625"
                  y2="11.0394"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.213542" stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_203_75"
                  x1="24.6682"
                  y1="16.4351"
                  x2="24.6682"
                  y2="17.9767"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.213542" stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_203_75"
                  x1="18.4999"
                  y1="16.4351"
                  x2="18.4999"
                  y2="17.9767"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.213542" stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_203_75"
                  x1="12.3318"
                  y1="16.4351"
                  x2="12.3318"
                  y2="17.9767"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.213542" stopColor="white" />
                  <stop offset="1" stopColor="#FFDC55" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
