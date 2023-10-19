"use client";
import { TypeAnimation } from "react-type-animation";
import {
  Image,
  navLine,
  skillLine,
  workSamplesLine,
  workSamplesLine2,
  heroImage,
  mobileDeveloper,
  designer,
  webDeveloper,
  Btn,
  ContinueLine,
  WorkSampleCard,
  OutlineBtn,
} from "./index";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={navLine}
        width={1100}
        height={1100}
        className="absolute left-[30%] bottom-[17%] -z-50"
      />
      <section className="w-full flex flex-col md:flex-row justify-between items-center rounded-[60px] p-16 hero md:mt-16 mt-28 gap-y-12 md:gap-y-0">
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
        <div className="flex flex-col items-center justify-center gap-y-10">
          <h1 className="text-3xl font-medium">چیکار میتونم بکنم؟</h1>
          <p className="text-2xl font-extralight text-center leading-relaxed">
            همونطور که بالاتر گفتم، تخصص من برنامه نویسی هست. حالا بخوایم
            تقسیم‌بندی کنیم بخش‌ها رو، می‌تونم بگم توی سه بخش برنامه نویسی سایت،
            برنامه نویسی موبایل, طراحی سایت ( UI & UX ) و آموزش دادن برنامه
            نویسی می‌تونم فعالیت کنم
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6">
            <Image src={mobileDeveloper} className="w-72 md:w-full -mb-16" />
            <h1 className="text-3xl font-bold">برنامه نویس موبایل</h1>
            <p className="w-3/4 md:w-full text-xl font-extralight text-center leading-relaxed">
              به تازگی برنامه نویسی موبایل رو یاد گرفتم و میتونم برنامه های
              اندرویدی و IOS بسازم با بهترین UI ممکن. فعلا پروژه های کوچیک میزنم
              تا کم کم برسم به پروژه های بزرگ و فروشگاهی
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6">
            <Image src={designer} className="w-72 md:w-full -mb-16" />
            <h1 className="text-3xl font-bold">طراحی سایت ( UI & UX )</h1>
            <p className="w-3/4 md:w-full text-xl font-extralight text-center leading-relaxed">
              ببیشتر از ۲ سال هست که در زمینه طراحی سایت یا همون رابط کاربری UI
              & UX تجربه دارم و نمونه کار های زیادی هم دارم. معمولا زیاد روی
              پروژه هام وقت میزارم و از تمام خلاقیتم براشون استفاده میکنم تا
              بتونم طرح های زیبا و کاربر پسندی رو بسازم!
            </p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col items-center justify-between gap-y-6">
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

      <section className="w-full rounded-2xl md:rounded-none md:w-[119.8%] bg-[#A58A44] flex flex-col justify-between items-center mt-44 gap-y-14">
        <div className="-mt-52">
          <ContinueLine from={"#FFE57E"} to={"#fff"} />
        </div>

        <h1 className="font-medium text-3xl">آخرین نمونه کار ها</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-x-0 gap-y-8 md:gap-x-8">
          <WorkSampleCard />
        </div>
        <OutlineBtn
          href=''
          title="نمونه کار های بیشتر"
          borderColor="white"
          textColor="white"
          bgHoverColor="white"
          textHoverColor="[#A58A44]"
        />
        <div className="-mb-36">
          <ContinueLine from={"#fff"} to={"#FFE57E"} />
        </div>
      </section>

      <Image
        src={workSamplesLine2}
        width={1800}
        height={1300}
        className="absolute top-[3300px] left-0 -z-[60]"
      />

      <section className="mt-52">
        Blog
      </section>

    </div>
  );
}
