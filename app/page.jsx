"use client";
import "aos/dist/aos.css";
import {
  Image,
  navLine,
  skillLine,
  workSamplesLine,
  workSamplesLine2,
  TrustLine1,
  TrustLine2,
  heroImage,
  mobileDeveloper,
  designer,
  webDeveloper,
  Btn,
  ContinueLine,
  WorkSampleCard,
  Link,
  WhyTrustMeIMAGE,
  SkillsBtn,
  JavascriptIcon,
  BootstrapIcon,
  CSS3Icon,
  FigmaIcon,
  GithubIcon,
  gitIcon,
  HtmlIcon,
  JqueryIcon,
  NextjsIcon,
  ReactIcon,
  ResponsiveAIcon,
  SassIcon,
  TailwindIcon,
  footerLaptop,
  AOS,
  useEffect,
  TypeAnimation,
} from "./index";
import { useContext } from "react";
import { workContext } from "./Context/WorkSample";

export default function Home() {
  const cardData = useContext(workContext);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="container mx-auto w-full flex flex-col items-center justify-center">
      <Image
        src={navLine}
        width={1100}
        height={1100}
        className="absolute left-[30%] bottom-[17%] -z-50"
      />
      <section
        data-aos="zoom-in"
        className="w-[90%] flex flex-col md:flex-row justify-between items-center rounded-[60px] md:p-16 p-10 hero md:mt-16 mt-28 gap-y-12 md:gap-y-0"
      >
        <div className="w-full md:w-[40%] flex flex-col justify-between md:items-start items-center md:gap-y-10 gap-y-8 order-1 md:order-none ">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "من <عرفان/> هستم",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "برنامه نویس تحت وب",
              1000,
              "طراح UI & UX سایت",
              1000,
              "تسلط کافی به کتابخانه ها و فریموورک ها",
              1500,
            ]}
            wrapper="h1"
            speed={50}
            style={{ fontWeight: 600, display: "inline-block" }}
            className="text-3xl md:text-5xl md:leading-normal"
            repeat={Infinity}
          />
          <article className="font-extralight text-xl text-center md:text-right">
            علاقه و تخصص من بیشتر برنامه نویسی هست و سعی می‌کنم حداقل توی تخصص
            خودم به روز باشم.
          </article>
          <Btn title={"اطلاعات بیشتر درباره من"} href={"/about"} />
        </div>
        <div className="w-full md:w-[60%] flex justify-end">
          <Image src={heroImage} width={600} height={600} alt="Erfandev" />
        </div>
      </section>
      <Image
        src={skillLine}
        width={1800}
        height={1300}
        className="absolute top-[700px] left-0 -z-[60]"
      />
      <ContinueLine from={"#fff"} to={"#FFE57E"} />

      <section className="w-full flex flex-col items-center gap-y-3 mt-10">
        <div
          data-aos="fade-up"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <h1 className="text-3xl font-medium">چیکار میتونم بکنم؟</h1>
          <p className="text-2xl font-extralight text-center leading-relaxed">
            همونطور که بالاتر گفتم، تخصص من برنامه نویسی هست. حالا بخوایم
            تقسیم‌بندی کنیم بخش‌ها رو، می‌تونم بگم توی سه بخش برنامه نویسی سایت،
            برنامه نویسی موبایل, طراحی سایت ( UI & UX ) و آموزش دادن برنامه
            نویسی می‌تونم فعالیت کنم
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
          <div
            data-aos="fade-left"
            className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6"
          >
            <Image src={mobileDeveloper} className="w-72 md:w-full -mb-16" />
            <h1 className="text-3xl font-bold">برنامه نویس موبایل</h1>
            <p className="w-3/4 md:w-full text-xl font-extralight text-center leading-relaxed">
              به تازگی برنامه نویسی موبایل رو یاد گرفتم و میتونم برنامه های
              اندرویدی و IOS بسازم با بهترین UI ممکن. فعلا پروژه های کوچیک میزنم
              تا کم کم برسم به پروژه های بزرگ و فروشگاهی
            </p>
          </div>
          <div
            data-aos="zoom-in"
            className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6"
          >
            <Image src={designer} className="w-72 md:w-full -mb-16" />
            <h1 className="text-3xl font-bold">طراحی سایت ( UI & UX )</h1>
            <p className="w-3/4 md:w-full text-xl font-extralight text-center leading-relaxed">
              ببیشتر از ۲ سال هست که در زمینه طراحی سایت یا همون رابط کاربری UI
              & UX تجربه دارم و نمونه کار های زیادی هم دارم. معمولا زیاد روی
              پروژه هام وقت میزارم و از تمام خلاقیتم براشون استفاده میکنم تا
              بتونم طرح های زیبا و کاربر پسندی رو بسازم!
            </p>
          </div>
          <div
            data-aos="fade-right"
            className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6"
          >
            <Image src={webDeveloper} className="w-72 md:w-full -mb-16" />
            <h1 className="text-3xl font-bold">برنامه نویس سایت</h1>
            <p className="w-3/4 md:w-full text-xl font-extralight text-center leading-relaxed">
              بیشتر از ۲ سال هست که توی برنامه نویسی سایت تجربه دارم. معمولا
              سرعتم توی انجام پروژه ها زیاده و معمولا بدون باگ هست. توی کمترین
              زمان و به بهترین شکل ممکن پروژه هارو انجام میدم
            </p>
          </div>
        </div>
      </section>

      <Image
        src={workSamplesLine}
        width={1800}
        height={1300}
        className="absolute top-[1800px] left-0 -z-[60]"
      />

      <section className="w-full rounded-2xl md:rounded-none md:w-[119.8%] bg-[#A58A44] flex flex-col justify-between items-center mt-44 gap-y-14 lg:w-[145%]">
        <div className="-mt-52">
          <ContinueLine from={"#FFE57E"} to={"#fff"} />
        </div>

        <h1 className="font-medium text-3xl">آخرین نمونه کار ها</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8">
          {cardData.slice(0, 3).map((data) => {
            return (
              <div
                data-aos="flip-down"
                className="h-[550px] md:w-[380px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7"
              >
                <div className="w-full rounded-2xl shadow-xl overflow-hidden">
                  <Image
                    src={data.imageSrc}
                    className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <p className="text-2xl font-extralight text-center">
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} />
              </div>
            );
          })}
        </div>
        <Link
          href={"/"}
          className={`outline-btn rounded-2xl text-white border border-white bg-transparent py-4 px-6 text-xl font-medium hover:text-[#A58A44] relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
        >
          نمونه کار های بیشتر
        </Link>
        <div className="-mb-36">
          <ContinueLine from={"#fff"} to={"#FFE57E"} />
        </div>
      </section>

      <Image
        src={workSamplesLine2}
        width={2000}
        height={1300}
        className="absolute top-[3000px] left-0 -z-[60]"
      />

      <section className="mt-52">
        <h1>blog</h1>
        <h1>blog</h1>
        <h1>blog</h1>
        <h1>blog</h1>
        <div className="-mb-36">
          <ContinueLine from={"#FFE57E"} to={"#fff"} />
        </div>
      </section>

      <Image
        src={TrustLine1}
        width={2000}
        height={1300}
        className="absolute top-[2600px] left-0 -z-[60]"
      />

      <section className="w-full flex flex-col justify-between items-center mt-64 gap-y-24">
        <h1 className="text-3xl font-medium" data-aos="flip-down">
          دلیل <span className="font-bold text-[#E0C55C]">اعتماد</span> به من
          چیه؟
        </h1>

        <main className="w-full flex flex-col justify-center items-center gap-y-10">
          <div>
            <Image
              src={WhyTrustMeIMAGE}
              width={500}
              height={500}
              className="md:hidden"
              data-aos="zoom-in"
            />
          </div>
          <div
            className="md:w-96 w-full flex flex-col justify-center items-center gap-y-6"
            data-aos="fade-down"
          >
            <h1 className="font-semibold text-4xl">کیفیت بالا</h1>
            <p className="font-extralight text-lg text-center leading-loose">
              سعی می‌کنم پروژه‌ای که انجام می‌دم به بهترین شکل و کیفیت باشه.
              پروژه حتی اگر خیلی هم کوچیک باشه، اصلاً سعی نمی‌کنم که فقط سرهمش
              کنم و تحویل مشتری بدم. یه طوری می‌نویسمش که مشتری اگر خواست تغییری
              بده و چیزی کم و زیاد کنه، سریع و بدون باگ باشه.
            </p>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-y-10">
            <div
              className="md:w-96 w-full flex flex-col justify-center items-center gap-y-6"
              data-aos="fade-left"
            >
              <h1 className="font-semibold text-4xl">پشتیبانی و پاسخ گویی</h1>
              <p className="font-extralight text-lg text-center leading-loose">
                معمولاً پروژه‌هایی که می‌نویسم باگی نداره که اصلاً نیاز به
                پشتیبانی و ... باشه. ولی خب اگر مشتری خودش بخواد، می‌تونم
                مسئولیت پشتیبانیش رو هم برعهده بگیرم. معمولاً اکثر اوقات در
                دسترس هستم و اگر مشتری نیاز ضروری داشته باشه، سعی می‌کنم کارشو
                انجام بدم براش حتماً
              </p>
            </div>
            <div>
              <Image
                src={WhyTrustMeIMAGE}
                width={500}
                height={500}
                className="hidden md:flex"
                data-aos="zoom-in"
              />
            </div>
            <div
              className="md:w-96 w-full flex flex-col justify-center items-center gap-y-6"
              data-aos="fade-right"
            >
              <h1 className="font-semibold text-4xl">اصلاحات نامحدود</h1>
              <p className="font-extralight text-lg text-center leading-loose">
                مشتری اگر خوب باشه، منم باهاش مشکلی ندارم و هر تغییر و یا
                امکاناتی که می‌خواد رو می‌تونم براش انجام بدم. همیشه توی تحلیل
                اولیه سعی می‌کنم پروژه رو بلند مدت در نظر بگیرم که اگر مشتری
                خواست چیزی بهش اضافه کنه، محدود نباشم توی انجام کار.
              </p>
            </div>
          </div>
          <div
            className="md:w-96 w-full flex flex-col justify-center items-center gap-y-6"
            data-aos="fade-up"
          >
            <h1 className="font-semibold text-4xl">تحویل به موقع</h1>
            <p className="font-extralight text-lg text-center leading-loose">
              سعی می‌کنم که همیشه سر وقت پروژه رو تحویل بدم. بدون باگ و اشکال.
              اگر تأخیری هم توی کارم پیش اومد، مسئولیتشو برعهده می‌گیرم.
            </p>
          </div>
        </main>

        <div className="-mb-36">
          <ContinueLine from={"#fff"} to={"#FFE57E"} />
        </div>
      </section>

      <Image
        src={TrustLine2}
        width={2000}
        height={1300}
        className="absolute top-[4000px] left-0 -z-[60]"
      />

      <section className="w-full flex flex-col justify-between items-center mt-64 gap-y-20">
        <h1 className="text-4xl font-medium flex flex-col justify-between items-center gap-y-8 text-center">
          روی من میتونید حساب کنید
          <span className="font-normal text-xl text-center">
            تخصص ها و دانش هایی که دارم
          </span>
        </h1>
        <div className="w-full flex items-center flex-wrap gap-x-20 gap-y-10 md:justify-end justify-center md:px-0">
          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 60px 0px rgba(241, 191, 38, 0.05)"}
              title={"JavaScript"}
              imageSrc={JavascriptIcon}
              imageShadow={"0px 4px 60px 0px rgba(241, 191, 38, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(0, 141, 211, 0.07)"}
              title={"CSS3"}
              imageSrc={CSS3Icon}
              imageShadow={"0px 4px 50px 0px rgba(0, 141, 211, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(238, 43, 123, 0.07)"}
              title={"Responsive Design"}
              imageSrc={ResponsiveAIcon}
              imageShadow={"0px 4px 50px 0px rgba(238, 43, 123, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            {" "}
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(17, 105, 174, 0.07)"}
              title={"jQuery"}
              imageSrc={JqueryIcon}
              imageShadow={"0px 4px 50px 0px rgba(17, 105, 174, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            {" "}
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(228, 77, 38, 0.07)"}
              title={"HTML5"}
              imageSrc={HtmlIcon}
              imageShadow={"0px 4px 50px 0px rgba(228, 77, 38, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(90, 58, 135, 0.07)"}
              title={"Bootstrap"}
              imageSrc={BootstrapIcon}
              imageShadow={"0px 4px 50px 0px rgba(90, 58, 135, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(0, 216, 255, 0.07)"}
              title={"ReactJS"}
              imageSrc={ReactIcon}
              imageShadow={"0px 4px 50px 0px rgba(0, 216, 255, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(0, 216, 255, 0.07)"}
              title={"React Native"}
              imageSrc={ReactIcon}
              imageShadow={"0px 4px 50px 0px rgba(0, 216, 255, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(240, 81, 51, 0.07)"}
              title={"Git"}
              imageSrc={gitIcon}
              imageShadow={"0px 4px 50px 0px rgba(240, 81, 51, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(255, 255, 255, 0.07)"}
              title={"GitHub"}
              imageSrc={GithubIcon}
              imageShadow={"0px 4px 50px 0px rgba(255, 255, 255, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(30, 171, 188, 0.07)"}
              title={"TailwindCSS"}
              imageSrc={TailwindIcon}
              imageShadow={"0px 4px 50px 0px rgba(30, 171, 188, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(205, 103, 154, 0.07)"}
              title={"Sass"}
              imageSrc={SassIcon}
              imageShadow={"0px 4px 50px 0px rgba(205, 103, 154, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(239, 79, 43, 0.07)"}
              title={"Figma"}
              imageSrc={FigmaIcon}
              imageShadow={"0px 4px 50px 0px rgba(239, 79, 43, 0.06)"}
            />
          </div>

          <div data-aos="flip-down">
            <SkillsBtn
              shadow={"0px 4px 50px 0px rgba(255, 255, 255, 0.07)"}
              title={"nextJs"}
              imageSrc={NextjsIcon}
              imageShadow={"0px 4px 50px 0px rgba(255, 255, 255, 0.06)"}
            />
          </div>
        </div>
      </section>

      <footer className="w-full md:flex-row flex flex-col justify-between items-center border-[#FFE57E] border-t mt-20 gap-y-20 md:gap-0 mb-10">
        <div
          className="flex flex-col justify-center items-center"
          data-aos="fade-left"
        >
          <Image src={footerLaptop} className="md:w-[450px]" />
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
              href={"/"}
              className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
            >
              نمونه کار ها
            </Link>
            <Link
              href={"/"}
              className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
            >
              مقالات
            </Link>
            <Link
              href={"/"}
              className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
            >
              درباره من
            </Link>
            <Link
              href={"/"}
              className="text-xl font-normal hover:text-[#ecda90] transition-all duration-200"
            >
              ارتباط با من
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-y-14 justify-center items-center ">
          <h1 className="text-3xl font-semibold">تماس با من</h1>
          <div className="flex justify-between flex-col items-end gap-y-10">
            <div className="flex justify-center items-center gap-x-2">
              <Link
                href={"/"}
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
                  stroke-width="1.5"
                  stroke-miterlimit="10"
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
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <Link
                href={"/"}
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
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.0625 11.0394C32.1911 11.0394 33.9166 9.31382 33.9166 7.18522C33.9166 5.05662 32.1911 3.33105 30.0625 3.33105C27.9339 3.33105 26.2083 5.05662 26.2083 7.18522C26.2083 9.31382 27.9339 11.0394 30.0625 11.0394Z"
                  stroke="url(#paint1_linear_203_75)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M24.6612 17.2059H24.6751"
                  stroke="url(#paint2_linear_203_75)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.493 17.2059H18.5069"
                  stroke="url(#paint3_linear_203_75)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.3249 17.2059H12.3387"
                  stroke="url(#paint4_linear_203_75)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                    <stop offset="0.213542" stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_203_75"
                    x1="30.0625"
                    y1="3.33105"
                    x2="30.0625"
                    y2="11.0394"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.213542" stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_203_75"
                    x1="24.6682"
                    y1="16.4351"
                    x2="24.6682"
                    y2="17.9767"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.213542" stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_203_75"
                    x1="18.4999"
                    y1="16.4351"
                    x2="18.4999"
                    y2="17.9767"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.213542" stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_203_75"
                    x1="12.3318"
                    y1="16.4351"
                    x2="12.3318"
                    y2="17.9767"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.213542" stop-color="white" />
                    <stop offset="1" stop-color="#FFDC55" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
