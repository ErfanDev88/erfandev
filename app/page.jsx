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
  AOS,
  useEffect,
  TypeAnimation,
} from "./index";
import { useContext } from "react";
import { workContext } from "./Context/WorkSample";
import { blogContext } from "./Context/Blog";

export default function Home() {
  const cardData = useContext(workContext);
  const blogData = useContext(blogContext);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="container w-full flex flex-col items-center justify-center">
      <Image
        alt="navLine"
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
          <Image
            src={heroImage}
            width={600}
            height={600}
            alt="Erfandev, عرفان رضایی"
          />
        </div>
      </section>
      <Image
        alt="skillLine"
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
            <Image
              alt="برنامه نویس موبایل, Erfandev"
              src={mobileDeveloper}
              className="w-72 md:w-full -mb-16"
            />
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
            <Image
              alt="طراح ui ux سایت, Erfandev"
              src={designer}
              className="w-72 md:w-full -mb-16"
            />
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
            <Image
              alt="برنامه نویس سایت و وب , Erfandev"
              src={webDeveloper}
              className="w-72 md:w-full -mb-16"
            />
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
        alt="workSamplesLine"
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
        <main className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8">
          {cardData.slice(0, 3).map((data) => {
            return (
              <article
                data-aos="flip-down"
                className="h-[550px] md:w-[380px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-7"
                key={data.title}
              >
                <div className="w-full rounded-2xl shadow-xl overflow-hidden">
                  <img
                    alt={data.title}
                    src={data.imageSrc}
                    key={data.id}
                    className="max-h-[250px] w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold" key={data.id}>{data.title}</h1>
                <p className="text-2xl font-extralight text-center" key={data.id}>
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} key={data.id} />
              </article>
            );
          })}
        </main>
        <Link
          href={"/work-samples"}
          className={`outline-btn rounded-2xl text-white border border-white bg-transparent py-4 px-6 text-xl font-medium hover:text-[#A58A44] relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-white before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
        >
          نمونه کار های بیشتر
        </Link>
        <div className="-mb-36">
          <ContinueLine from={"#fff"} to={"#FFE57E"} />
        </div>
      </section>

      <Image
        alt="workSamplesLine2"
        src={workSamplesLine2}
        width={2000}
        height={1300}
        className="absolute top-[3000px] left-0 -z-[60]"
      />

      <section className="mt-52 w-full justify-between items-center flex flex-col gap-y-14">
        <h1 className="font-medium text-3xl">مقاله ها</h1>
        <main className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8 md:w-full md:px-10 md:justify-between">
          {blogData.slice(0, 2).map((data) => {
            return (
              <article
                data-aos="flip-down"
                className="md:w-[490px] w-[300px] flex flex-col justify-between items-center rounded-2xl workSampleCard px-4 py-8 gap-y-7"
                key={data.title}
              >
                <div className="w-[86%] rounded-2xl shadow-xl overflow-hidden">
                  <img
                    alt={data.title}
                    src={data.imageSrc}
                    className="w-full rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <p className="w-[80%] text-xl font-extralight text-center leading-relaxed">
                  {data.description}
                </p>
                <Btn title={data.btnTitle} href={data.btnHref} />
              </article>
            );
          })}
        </main>
        <Link
          href={"/blogs"}
          className={`outline-btn rounded-2xl text-[#E0C55C] border border-[#ffe57e4d] bg-transparent py-4 px-6 text-xl font-medium hover:text-[#fff] relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[#c7ad4c] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
        >
          مقاله های بیشتر
        </Link>
        <div className="-mb-36">
          <ContinueLine from={"#FFE57E"} to={"#fff"} />
        </div>
      </section>

      <Image
        alt="TrustLine1"
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
              alt="اعتماد به من , Erfandev"
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
                alt="اعتماد به من , Erfandev"
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
        alt="TrustLine2"
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
    </div>
  );
}
