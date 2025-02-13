"use client";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import localforage from "localforage";
import axios from "axios";
import "moment/locale/fa";
import moment from "moment-jalaali";

function BlogDetail({
  title,
  secondTitle,
  thirdTitle,
  forthTitle,
  fifthTitle,
  sixthTitle,
  seventhTitle,
  eightthTitle,
  nineThTitle,
  tenthTitle,
  eleventhTitle,
  firstImageSrc,
  firstImageAlt,
  firstBody,
  secondBody,
  thirdBody,
  forthBody,
  fifthBody,
  sixthBody,
  seventhBody,
  eighthBody,
  ninethBody,
  tenthBody,
  date,
  author,
  secondImage,
  thirdImage,
}) {

  const deviceId = "unique-device-id"; // شناسه دستگاه
  const viewCountKey = 'viewCount';
  const likeCountKey = `likeCount_${deviceId}`;
  const likedKey = `liked_${deviceId}`;

  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getViewCount = async () => {
      try {
        const value = await localforage.getItem(viewCountKey);
        setViewCount(parseInt(value) || 0);
      } catch (error) {
        console.error('Error retrieving view count:', error);
      }
    };

    getViewCount();
  }, []);

  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        await localforage.setItem(viewCountKey, viewCount + 1);
      } catch (error) {
        console.error('Error saving view count:', error);
      }
    };

    incrementViewCount();
  }, [viewCount]);

  useEffect(() => {
    const getLikeCount = async () => {
      try {
        const value = await localforage.getItem(likeCountKey);
        setLikeCount(parseInt(value) || 0);
      } catch (error) {
        console.error('Error retrieving like count:', error);
      }
    };

    const getLikedStatus = async () => {
      try {
        const value = await localforage.getItem(likedKey);
        setLiked(Boolean(value));
      } catch (error) {
        console.error('Error retrieving liked status:', error);
      }
    };

    getLikeCount();
    getLikedStatus();
  }, [deviceId]);

  const likeHandler = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);

      localforage.setItem(likeCountKey, likeCount + 1)
        .catch((error) => {
          console.error('Error saving like count:', error);
        });

      localforage.setItem(likedKey, true)
        .catch((error) => {
          console.error('Error saving liked status:', error);
        });
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);

      localforage.setItem(likeCountKey, likeCount - 1)
        .catch((error) => {
          console.error('Error saving like count:', error);
        });

      localforage.removeItem(likedKey)
        .catch((error) => {
          console.error('Error removing liked status:', error);
        });
    }
  };

  const initialValues = {
    name: "",
    description: "",
    username: "",
  };


      //Comments

      const [comments, setComments] = useState([]);
      const [addedDate, setAddedDate] = useState('')
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_COMMENT_API}`
            );
            setComments(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);
    
      const onSubmit = async (values) => {
        event.preventDefault();
        const now = moment();
        const persianDateTime = now.format('jYYYY/jMM/jDD HH:mm');
        setAddedDate(persianDateTime);
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const username = formData.get("username");
        const description = formData.get("description");
        // setComments([...comments, { id: Date.now(), name, description }]);
        const maxId = comments.length > 0 ? Math.max(...comments.map(comment => comment.id)) : 0;
        const newId = maxId + 1; 
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_COMMENT_API}`,
            {
              id: newId,
              name,
              username,
              description,
              addedDate
            }
          );
          console.log("Success", response.data);
          setComments([...comments, response.data]); // Add the new todo to the state
        } catch (error) {
          console.log(error);
        }
      };
    
  const [isCommentAndUsernameCorrect, setIsCommentAndUsernameCorrect] = useState(false)
  const username = useRef(null)

  const handleDelete =  (id) => {
    
    const commentToDelete = comments.find(item => item.id === id);
    if (!commentToDelete) {
      console.error("کامنت یافت نشد");
      return;
    }
  
    if (commentToDelete.username !== username.current.value) {
      alert("شما اجازه حذف این کامنت را ندارید!");
      return;
    }

    const deleteComment = async ()=>{
      if(comments.length < 2){
        alert('آخرین کامنت نمیتواند حذف شود!')
      } else{
       try {
        await axios.delete(`https://retoolapi.dev/SbEQdd/data/${id}`); // Make DELETE request
        const newComment = comments.filter((item) => item.id !== id); // Update local state
        setComments(newComment);
      } catch (error) {
        console.error(
          "Error deleting comment:",
          error.response ? error.response.data : error.message
        );
        }
      }
    }
    deleteComment();

    // const commentToDelete = comments.find(item => item.id === id);
    // console.log('Comment to delete:', commentToDelete);
    // console.log('Entered username:', username.current.value.trim());
  
    // if (commentToDelete && commentToDelete.username === username.current.value.trim()) {
    //   deleteComment();
    //   setIsCommentAndUsernameCorrect(true);
    // } else {
    //   setIsCommentAndUsernameCorrect(false);
    //   alert("شما اجازه حذف این کامنت را ندارید!");
    // } 
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "نام خود را بنویسید";
    }
    if (!values.description) {
      errors.description = "توضیحات خود را بنویسید";
    }
    comments.forEach(item => {
      if (values.username == item.username) {
        errors.username = "نام کاربری تکراری است";
      }
    });
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const { values, errors, handleSubmit, handleChange, handleBlur } = formik;



  return (
    <div className="container w-full flex flex-col items-center mt-40">
      <h1
        data-aos="fade-left"
        className="w-full text-center text-2xl md:text-start md:text-5xl font-black text-[#e9d06c] "
      >
        {title}
      </h1>
      <div className="w-full flex justify-between items-center mt-5">
        <div className="flex gap-x-5" data-aos="fade-left">
          <span className="text-normal text-[#cfcfcf]">
            تاریخ انتشار : {date}
          </span>
          <span className="text-normal text-[#cfcfcf]">نویسنده : {author}</span>
        </div>
        <div
          className="flex justify-center items-center gap-x-10"
          data-aos="fade-right"
        >
          <span className="flex justify-center items-center gap-x-1">
            <button onClick={likeHandler}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4709 4.0535C14.1978 4.22856 12.9226 4.8312 12 5.80891C11.0774 4.8312 9.8022 4.22856 8.52915 4.0535C6.91335 3.83131 5.1499 4.28425 4.05884 5.73088C2.64706 7.60276 2.64705 10.254 4.05884 12.1258L8.75286 18.3496C10.4125 20.5501 13.5875 20.5501 15.2471 18.3496L19.9412 12.1258C21.3529 10.254 21.3529 7.60276 19.9412 5.73088C18.8501 4.28425 17.0867 3.83131 15.4709 4.0535Z"
                  fill={liked ? "#E44C2B" : "white"}
                />
              </svg>
            </button>
            <span className="text-normal font-bold text-white">
              {likeCount}
            </span>
          </span>
          <span className="text-lg">{viewCount} بازدید </span>
        </div>
      </div>
      <Image
        data-aos="zoom-in"
        className="rounded-xl w-full mt-5"
        src={firstImageSrc}
        alt={firstImageAlt}
      />
      <p
        className="text-lg font-extralight mt-10 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {firstBody}
      </p>
      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-10"
        data-aos="zoom-in"
      >
        {secondTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-10 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {secondBody}
      </p>
      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-10"
        data-aos="zoom-in"
      >
        {thirdTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-10 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {thirdBody}
      </p>
      <Image
        data-aos="zoom-in"
        className="rounded-xl  mt-5"
        src={secondImage}
        alt={firstImageAlt}
      />
      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-16"
        data-aos="zoom-in"
      >
        {forthTitle}
      </h1>
      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-xl font-black text-[#e9d06c] mt-10"
        data-aos="zoom-in"
      >
        {fifthTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-5 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {forthBody}
      </p>

      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-xl font-black text-[#e9d06c] mt-10"
        data-aos="zoom-in"
      >
        {sixthTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-5 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {fifthBody}
      </p>

      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-xl font-black text-[#e9d06c] mt-10"
        data-aos="zoom-in"
      >
        {seventhTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-5 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {sixthBody}
      </p>

      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-normal font-black text-[#e9d06c] mt-10"
        data-aos="zoom-in"
      >
        {eightthTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-5 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {seventhBody}
      </p>

      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-10"
        data-aos="zoom-in"
      >
        {nineThTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-10 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {eighthBody}
      </p>

      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-10"
        data-aos="zoom-in"
      >
        {tenthTitle}
      </h1>
      <p
        className="text-lg font-extralight mt-10 leading-loose text-center md:text-start"
        data-aos="zoom-in"
      >
        {ninethBody}
      </p>
      <Image
        data-aos="zoom-in"
        className="rounded-xl  mt-5"
        src={thirdImage}
        alt={firstImageAlt}
      />
      <h1
        className="w-full text-center leading-relaxed md:leading-normal md:text-start text-3xl font-black text-white mt-10"
        data-aos="zoom-in"
      >
        {eleventhTitle}
      </h1>
      <div className="w-full flex justify-start">
        <p
          className="text-lg font-extralight mt-10 leading-loose w-10 text-center md:text-start"
          data-aos="zoom-in"
        >
          {tenthBody}
        </p>
      </div>

      <section
        data-aos="fade-up"
        className="w-full flex flex-col items-center text-center leading-loose mt-32 gap-y-12"
      >
        <h1 className="text-4xl text-white font-black">
          نظرت درمورد این مقاله چیه!؟
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <form
            action="#"
            onSubmit={handleSubmit}
            className="md:w-1/2 w-full flex flex-col items-center gap-y-7"
          >
            <div className="flex flex-col justify-between items-start gap-y-3">
              <label htmlFor="" className="text-base text-white font-medium">
                نام خود را وارد کنید
              </label>
              <div className="flex justify-start items-center rounded-xl pr-5 bg-[#42424225] border border-white/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.30225 6.5004L10.0825 10.63C11.2295 11.4496 12.7705 11.4496 13.9175 10.63L19.6977 6.5004M2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875C3.55805 6.13984 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84876C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43055 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="text"
                  className="bg-transparent p-3 placeholder:text-xs placeholder:font-light focus:outline-none text-sm placeholder:text-gray-300 text-gray-300 flex justify-center items-center"
                  placeholder="مثال : کوروش ساسانی"
                  onBlur={handleBlur}
                  onChange={(event) =>
                    formik.setFieldValue("name", event.target.value)
                  }
                  value={values.name}
                  name="name"
                />
              </div>
              {errors.name && formik.touched.name && (
                <span className="text-xs text-red-400">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col justify-between items-start gap-y-3">
              <label htmlFor="" className="text-base text-white font-medium">
              نام کاربری خود را بنویسید
              </label>
              <div className="flex justify-start items-center rounded-xl pr-5 bg-[#42424225] border border-white/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.30225 6.5004L10.0825 10.63C11.2295 11.4496 12.7705 11.4496 13.9175 10.63L19.6977 6.5004M2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875C3.55805 6.13984 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84876C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43055 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="text"
                  className="bg-transparent p-3 placeholder:text-xs placeholder:font-light focus:outline-none text-sm placeholder:text-gray-300 text-gray-300 flex justify-center items-center"
                  placeholder="مثال : Erfan_rz"
                  onBlur={handleBlur}
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                  value={values.username}
                  name="username"
                  ref={username}
                />
              </div>
              {errors.username && formik.touched.username && (
                <span className="text-xs text-red-400">{errors.username}</span>
              )}
            </div>

            <div className="flex flex-col justify-between items-start gap-y-3">
              <label htmlFor="" className="text-base text-white font-medium">
                توضیحات خود را بنویسید
              </label>
              <textarea
                className="bg-[#42424225] border border-white/20 rounded-xl p-3 placeholder:text-xs placeholder:font-light focus:outline-none text-sm placeholder:text-gray-300 text-gray-300 flex justify-center items-center"
                placeholder="نظر من در مورد وبسایت شما..."
                cols="30"
                rows="10"
                onBlur={handleBlur}
                onChange={(event) =>
                  formik.setFieldValue("description", event.target.value)
                }
                value={values.description}
                name="description"
              ></textarea>
              {errors.description && formik.touched.description && (
                <span className="text-xs text-red-400">
                  {errors.description}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn rounded-2xl py-2 px-5 text-lg font-medium hover:scale-110 hover:rotate-2 transition-all duration-300 text-center"
            >
              ارسال نظر
            </button>
          </form>
          <div className="w-1/2 md:flex hidden">
            <svg
              width="500"
              height="500"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M250 480.83C377.263 480.83 480.43 421.275 480.43 347.81C480.43 274.345 377.263 214.79 250 214.79C122.737 214.79 19.5699 274.345 19.5699 347.81C19.5699 421.275 122.737 480.83 250 480.83Z"
                fill="#313131"
              />
              <path
                d="M423.78 338.12C444.916 338.12 462.05 328.23 462.05 316.03C462.05 303.83 444.916 293.94 423.78 293.94C402.644 293.94 385.51 303.83 385.51 316.03C385.51 328.23 402.644 338.12 423.78 338.12Z"
                fill="#E0E0E0"
              />
              <path
                d="M175.85 424.83C169.85 427.9 185.06 438.64 192.6 434.5L324.72 357.14L340.58 340.4C340.742 340.232 340.843 340.015 340.867 339.784C340.892 339.552 340.839 339.318 340.716 339.12C340.594 338.922 340.409 338.77 340.19 338.689C339.972 338.607 339.733 338.601 339.51 338.67L308.91 348L175.85 424.83Z"
                fill="#E0E0E0"
              />
              <path
                d="M87.9101 421.57L48.44 398.78C48.1859 398.693 47.9654 398.528 47.8093 398.31C47.6531 398.091 47.5692 397.829 47.5692 397.56C47.5692 397.292 47.6531 397.029 47.8093 396.811C47.9654 396.592 48.1859 396.428 48.44 396.34L334.24 231.34C334.896 231.005 335.623 230.83 336.36 230.83C337.097 230.83 337.824 231.005 338.48 231.34L378 254.12C378.254 254.208 378.475 254.372 378.631 254.591C378.787 254.809 378.871 255.072 378.871 255.34C378.871 255.609 378.787 255.871 378.631 256.09C378.475 256.308 378.254 256.473 378 256.56L92.1901 421.56C91.5298 421.905 90.7962 422.086 90.0513 422.088C89.3063 422.09 88.5719 421.912 87.9101 421.57Z"
                fill="#E0E0E0"
              />
              <path
                d="M105.1 412.21L112.79 416.65C113.446 416.981 114.17 417.153 114.905 417.153C115.64 417.153 116.364 416.981 117.02 416.65L359 277C359.255 276.91 359.476 276.742 359.633 276.521C359.789 276.3 359.873 276.036 359.873 275.765C359.873 275.494 359.789 275.23 359.633 275.009C359.476 274.788 359.255 274.62 359 274.53L351.42 270C350.768 269.663 350.044 269.486 349.31 269.486C348.576 269.486 347.852 269.663 347.2 270L105.1 409.76C104.842 409.845 104.618 410.009 104.459 410.229C104.3 410.449 104.214 410.714 104.214 410.985C104.214 411.256 104.3 411.521 104.459 411.741C104.618 411.961 104.842 412.125 105.1 412.21Z"
                fill="#E0E0E0"
              />
              <path
                d="M80 378.27C80 378.27 80.28 363.77 74.64 351.74C69 339.71 60.17 331.49 51.15 329.56C42.13 327.63 33.67 335.03 42.65 342.08C51.63 349.13 68.17 357.31 73.28 379.89L80 378.27Z"
                fill="#E5C34E"
              />
              <g opacity="0.15">
                <path
                  d="M80 378.27C80 378.27 80.28 363.77 74.64 351.74C69 339.71 60.17 331.49 51.15 329.56C42.13 327.63 33.67 335.03 42.65 342.08C51.63 349.13 68.17 357.31 73.28 379.89L80 378.27Z"
                  fill="black"
                />
              </g>
              <path
                d="M77.82 374.2H77.92C78.0466 374.167 78.1551 374.086 78.2224 373.973C78.2897 373.861 78.3104 373.727 78.28 373.6C71.81 348.65 54.82 336.33 46.74 333.3C46.618 333.255 46.4831 333.26 46.3649 333.314C46.2468 333.369 46.1551 333.468 46.11 333.59C46.0649 333.712 46.0701 333.847 46.1245 333.965C46.1789 334.083 46.278 334.175 46.4 334.22C54.31 337.22 70.96 349.28 77.33 373.85C77.356 373.957 77.4198 374.052 77.5098 374.116C77.5998 374.181 77.7099 374.21 77.82 374.2Z"
                fill="white"
              />
              <path
                d="M33.4099 363.82C33.9399 365.68 35.7199 366.87 37.4099 367.82C39.0999 368.77 40.8999 369.82 41.6299 371.63C43.0799 375.25 39.2299 379.5 40.8399 383.06C41.229 383.788 41.7621 384.43 42.4068 384.945C43.0514 385.461 43.7942 385.84 44.5899 386.06C45.9056 386.442 47.2409 386.752 48.5899 386.99C49.23 387.073 49.8746 387.116 50.5199 387.12C52.4384 386.974 54.3522 387.459 55.9699 388.5C58.4199 390.38 58.7499 393.86 59.9699 396.68C60.7499 398.35 61.8822 399.832 63.2891 401.023C64.6959 402.214 66.344 403.086 68.1199 403.58C71.1199 404.41 75.6999 404.39 76.6699 403.16C77.4099 402.23 76.0799 398.92 76.2099 397.74C76.5498 394.715 76.6001 391.665 76.3599 388.63C76.1905 387.252 76.1905 385.858 76.3599 384.48C76.5866 382.94 76.8066 381.4 77.0199 379.86C77.2499 378.19 77.8299 376.94 77.4699 375.17C77.0438 373.496 76.3696 371.895 75.4699 370.42C74.6699 368.927 73.8466 367.453 72.9999 366C72.074 364.229 70.932 362.58 69.5999 361.09C68.3855 359.85 66.9308 358.871 65.3248 358.212C63.7188 357.554 61.9954 357.23 60.2599 357.26C57.3899 357.32 54.4199 358.5 51.5499 357.96C48.6799 357.42 46.1099 356.27 43.2099 356.06C41.6848 355.885 40.1397 356.058 38.6914 356.567C37.2431 357.077 35.9295 357.909 34.8499 359C34.2353 359.625 33.7829 360.391 33.5319 361.231C33.2809 362.071 33.2391 362.96 33.4099 363.82Z"
                fill="#E5C34E"
              />
              <path
                d="M75.24 395.31C75.3552 395.295 75.4598 395.235 75.531 395.143C75.6021 395.051 75.6341 394.935 75.62 394.82C72.4 367.62 45.34 359.82 38.81 359.4C38.6938 359.394 38.58 359.434 38.4924 359.51C38.4048 359.587 38.3502 359.694 38.34 359.81C38.3345 359.925 38.3743 360.038 38.451 360.124C38.5277 360.21 38.635 360.262 38.75 360.27C45.13 360.72 71.6 368.27 74.75 394.93C74.7561 394.988 74.7738 395.043 74.802 395.094C74.8302 395.144 74.8683 395.189 74.9141 395.224C74.9598 395.26 75.0123 395.286 75.0683 395.3C75.1243 395.315 75.1827 395.318 75.24 395.31Z"
                fill="white"
              />
              <path
                d="M46.4799 377.63C46.566 377.62 46.6483 377.589 46.7199 377.54C49.5916 375.706 52.8324 374.527 56.2115 374.088C59.5906 373.649 63.0249 373.96 66.2699 375C66.3812 375.028 66.4992 375.013 66.5996 374.957C66.6999 374.902 66.7752 374.81 66.8099 374.7C66.8268 374.646 66.8327 374.588 66.8272 374.532C66.8218 374.475 66.805 374.42 66.778 374.369C66.7511 374.319 66.7143 374.275 66.67 374.239C66.6257 374.203 66.5747 374.176 66.5199 374.16C63.1409 373.09 59.5673 372.78 56.0546 373.252C52.5419 373.724 49.1768 374.966 46.1999 376.89C46.1533 376.924 46.1139 376.966 46.0841 377.015C46.0542 377.065 46.0345 377.119 46.0261 377.176C46.0177 377.233 46.0208 377.291 46.0352 377.347C46.0496 377.402 46.075 377.454 46.1099 377.5C46.1582 377.548 46.2164 377.584 46.2804 377.606C46.3444 377.629 46.4125 377.637 46.4799 377.63Z"
                fill="white"
              />
              <path
                d="M170.53 90.4798L163 95.1098C163.025 94.807 163.025 94.5026 163 94.1998L162.83 92.1998C162.53 88.6798 159.55 87.4898 156.18 89.5598C154.765 90.4578 153.558 91.6477 152.64 93.0498C151.69 88.6698 147.53 87.3598 142.86 90.2098C137.86 93.2998 134.08 100.08 134.53 105.36L134.79 108.36C134.854 109.557 135.233 110.717 135.89 111.72L129.61 115.56C128.666 116.163 127.889 116.994 127.349 117.976C126.809 118.958 126.524 120.059 126.52 121.18C126.69 123.13 128.34 123.79 130.21 122.65L171.21 97.5998C172.137 96.9885 172.898 96.157 173.425 95.1798C173.952 94.2026 174.228 93.11 174.23 91.9998C174.06 89.9998 172.41 89.3398 170.53 90.4798Z"
                fill="#EBEBEB"
              />
              <path
                d="M133.78 66.8199L122 73.9999C122.03 73.5271 122.03 73.0528 122 72.5799L121.74 69.4999C121.27 64.0199 116.64 62.1799 111.39 65.3899C109.195 66.7893 107.323 68.6404 105.9 70.8199C104.42 63.9999 98.0001 61.9999 90.7001 66.4199C82.8501 71.2199 77.0501 81.7599 77.7001 89.9599L78.0901 94.5699C78.2006 96.4328 78.7933 98.2351 79.8101 99.7999L70.0401 105.8C67.1301 107.58 64.9801 111.49 65.2401 114.53C65.5001 117.57 68.0701 118.59 70.9801 116.81L134.67 77.8599C137.58 76.0799 139.73 72.1799 139.47 69.1399C139.21 66.0999 136.69 64.9999 133.78 66.8199Z"
                fill="#EBEBEB"
              />
              <path
                d="M363.26 32.6402C361.57 31.7502 359.4 31.8702 357.03 33.2402L94.38 184.83C91.5369 186.661 89.2315 189.215 87.7 192.23L78.13 186.71C80.23 182.71 83.19 181.37 85.78 179.87L348.41 28.2802C350.89 26.8502 353.15 26.7802 354.86 27.8202L363.26 32.6402Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.15"
                d="M363.26 32.6402C361.57 31.7502 359.4 31.8702 357.03 33.2402L94.38 184.83C91.5369 186.661 89.2315 189.215 87.7 192.23L78.13 186.71C80.23 182.71 83.19 181.37 85.78 179.87L348.41 28.2802C350.89 26.8502 353.15 26.7802 354.86 27.8202L363.26 32.6402Z"
                fill="black"
              />
              <path
                d="M79.44 407.11C77.34 405.93 76.01 403.11 76.01 399.21V198.51C76.01 194.02 76.33 190.01 78.13 186.71L87.7 192.23C87.4533 192.69 87.2133 193.16 86.98 193.64C86.8 194.03 86.63 194.42 86.48 194.8L86.41 194.98C86.22 195.42 86.05 195.88 85.9 196.34C85.75 196.8 85.59 197.29 85.46 197.76C85.33 198.23 85.27 198.48 85.2 198.83C84.8308 200.35 84.6395 201.907 84.63 203.47V404.16C84.63 408.16 85.99 410.95 88.11 412.11L79.44 407.11Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.5"
                d="M79.44 407.11C77.34 405.93 76.01 403.11 76.01 399.21V198.51C76.01 194.02 76.33 190.01 78.13 186.71L87.7 192.23C87.4533 192.69 87.2133 193.16 86.98 193.64C86.8 194.03 86.63 194.42 86.48 194.8L86.41 194.98C86.22 195.42 86.05 195.88 85.9 196.34C85.75 196.8 85.59 197.29 85.46 197.76C85.33 198.23 85.27 198.48 85.2 198.83C84.8308 200.35 84.6395 201.907 84.63 203.47V404.16C84.63 408.16 85.99 410.95 88.11 412.11L79.44 407.11Z"
                fill="black"
              />
              <path
                d="M357 33.2501L92.24 185.87C86.85 188.99 84.63 194.33 84.63 201.52V404.17C84.63 411.35 89 414.66 94.39 411.55L357 260C362.39 256.89 366.76 248.54 366.76 241.36V40.6301C366.78 33.4401 362.41 30.1401 357 33.2501Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.3"
                d="M357 33.2501L92.24 185.87C86.85 188.99 84.63 194.33 84.63 201.52V404.17C84.63 411.35 89 414.66 94.39 411.55L357 260C362.39 256.89 366.76 248.54 366.76 241.36V40.6301C366.78 33.4401 362.41 30.1401 357 33.2501Z"
                fill="black"
              />
              <path
                d="M343.94 258.16L107.47 394.64C104.67 396.26 102.41 394.54 102.41 390.82V196.28C102.41 192.56 104.67 188.23 107.47 186.62L343.94 50.1404C346.74 48.5304 349 50.2404 349 53.9604V248.5C349 252.22 346.74 256.55 343.94 258.16Z"
                fill="#37474F"
              />
              <path
                d="M102.41 196.28V390.82C102.41 390.97 102.41 391.11 102.41 391.25L337.41 255.63C340.21 254.02 342.47 249.69 342.47 245.97V51.43C342.47 51.28 342.47 51.14 342.47 51L107.47 186.62C104.67 188.23 102.41 192.56 102.41 196.28Z"
                fill="#455A64"
              />
              <path
                d="M96.06 304.78C96.0461 305.733 95.8091 306.669 95.3679 307.513C94.9268 308.357 94.2939 309.085 93.52 309.641C92.11 310.451 90.97 309.59 90.97 307.72C90.985 306.767 91.2236 305.831 91.6665 304.987C92.1094 304.143 92.7442 303.414 93.52 302.86C94.92 302.05 96.06 302.91 96.06 304.78Z"
                fill="#263238"
              />
              <path
                d="M93.52 272.2C92.9138 272.629 92.4169 273.195 92.0695 273.852C91.7221 274.508 91.5339 275.237 91.52 275.98V293.3C91.52 294.76 92.41 295.42 93.52 294.79C94.1249 294.362 94.621 293.798 94.9683 293.143C95.3156 292.488 95.5046 291.761 95.52 291.02V273.7C95.5 272.24 94.61 271.57 93.52 272.2Z"
                fill="#263238"
              />
              <path
                d="M113.78 225.86C113.068 225.377 112.48 224.733 112.063 223.981C111.646 223.229 111.412 222.389 111.38 221.53V201.63C111.429 200.744 111.685 199.883 112.128 199.115C112.571 198.347 113.188 197.695 113.93 197.21L349.82 60.9396C350.557 60.474 351.406 60.2187 352.278 60.2012C353.149 60.1836 354.008 60.4046 354.763 60.8401C355.518 61.2756 356.139 61.9092 356.56 62.6723C356.98 63.4353 357.185 64.2989 357.15 65.1696V85.0796C357.106 85.9632 356.853 86.8237 356.411 87.5904C355.969 88.357 355.352 89.0079 354.61 89.4896L118.72 225.77C117.961 226.17 117.119 226.387 116.261 226.403C115.403 226.419 114.553 226.232 113.78 225.86Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.4"
                d="M357.13 64.7498C356.95 63.4398 355.88 62.9498 354.61 63.6898L118.72 200C117.97 200.48 117.349 201.135 116.91 201.91L112.13 199.14C112.562 198.366 113.181 197.713 113.93 197.24L349.82 60.9398C350.525 60.4915 351.335 60.2366 352.17 60.2007C353.004 60.1648 353.834 60.3491 354.575 60.7352C355.315 61.1213 355.941 61.6955 356.39 62.4002C356.839 63.1049 357.094 63.9152 357.13 64.7498Z"
                fill="white"
              />
              <path
                d="M118.72 412.12C118.115 412.487 117.427 412.696 116.72 412.73C115.714 412.861 114.692 412.683 113.79 412.22C113.079 411.737 112.492 411.093 112.077 410.341C111.661 409.588 111.43 408.749 111.4 407.89V231.83L116.19 234.59V410.65C116.19 411.81 116.77 412.47 117.61 412.47C118.003 412.445 118.384 412.325 118.72 412.12Z"
                fill="#F0F0F0"
              />
              <path
                opacity="0.1"
                d="M116.91 201.88C116.452 202.639 116.197 203.504 116.17 204.39V234.59L111.38 231.83V201.63C111.38 201.52 111.38 201.43 111.38 201.32C111.401 201.108 111.435 200.898 111.48 200.69C111.615 200.135 111.83 199.602 112.12 199.11L116.91 201.88Z"
                fill="black"
              />
              <path
                d="M357.15 65.1698V78.7898L195.26 172.35C193.86 173.16 192.71 172.5 192.71 170.88V165.72C192.71 164.09 191.57 163.43 190.16 164.25L128.29 200C127.547 200.484 126.929 201.136 126.486 201.904C126.042 202.672 125.787 203.534 125.74 204.42V209.57C125.692 210.455 125.435 211.316 124.992 212.084C124.549 212.852 123.932 213.505 123.19 213.99L116.19 217.99V204.39C116.237 203.504 116.492 202.642 116.936 201.874C117.379 201.106 117.997 200.454 118.74 199.97L354.61 63.6898C356 62.8798 357.15 63.5398 357.15 65.1698Z"
                fill="#E5C34E"
              />
              <path
                d="M117.58 411.87C116.85 411.87 116.77 411.02 116.77 410.65V218.36L123.49 214.48C124.32 214 124.98 211.88 126.31 207.15C127.01 204.67 128.06 200.91 128.6 200.48L189.35 165.41C189.83 165.65 190.98 167.68 191.68 168.91C193.17 171.52 194.06 173 195.07 173C195.242 172.999 195.411 172.954 195.56 172.87L356.56 79.8696V271.43C356.513 272.209 356.287 272.966 355.898 273.643C355.51 274.319 354.969 274.897 354.32 275.33L118.42 411.6C118.168 411.762 117.879 411.855 117.58 411.87Z"
                fill="#FAFAFA"
              />
              <path
                d="M356 80.88V271.43C355.954 272.105 355.754 272.76 355.416 273.346C355.078 273.932 354.611 274.432 354.05 274.81L118.11 411.08C117.953 411.188 117.77 411.254 117.58 411.27C117.38 411.27 117.38 410.66 117.38 410.65V218.71L123.8 215C124.8 214.41 125.46 212.42 126.89 207.31C127.52 205.05 128.48 201.65 128.99 200.96L189.25 166.16C189.952 167.115 190.587 168.117 191.15 169.16C192.8 172.06 193.72 173.57 195.07 173.57C195.348 173.568 195.621 173.492 195.86 173.35L356 80.88ZM357.15 78.79L195.26 172.35C195.204 172.386 195.137 172.404 195.07 172.4C193.64 172.4 190.75 164.79 189.31 164.79C189.242 164.791 189.176 164.812 189.12 164.85L128.29 200C126.88 200.81 124.59 213.18 123.19 214L116.19 218V410.65C116.19 411.8 116.77 412.47 117.6 412.47C118.004 412.456 118.398 412.335 118.74 412.12L354.61 275.85C355.352 275.366 355.969 274.713 356.41 273.945C356.851 273.176 357.105 272.315 357.15 271.43V78.79Z"
                fill="#E0E0E0"
              />
              <path
                d="M345.2 73.7097C346.97 72.7097 348.4 73.5197 348.4 75.5597C348.342 76.673 348.022 77.7568 347.466 78.7229C346.91 79.6891 346.133 80.5103 345.2 81.1197C343.42 82.1197 341.99 81.3197 341.99 79.2697C342.049 78.1556 342.371 77.0712 342.929 76.105C343.486 75.1387 344.265 74.318 345.2 73.7097Z"
                fill="white"
              />
              <path
                d="M333.64 80.3696C335.42 79.3696 336.85 80.1796 336.85 82.2296C336.791 83.3424 336.469 84.4254 335.911 85.39C335.353 86.3546 334.575 87.1735 333.64 87.7796C331.87 88.7796 330.43 87.9796 330.43 85.9296C330.491 84.816 330.814 83.7325 331.372 82.7667C331.929 81.8008 332.706 80.9797 333.64 80.3696Z"
                fill="white"
              />
              <path
                d="M322.09 87C323.86 86 325.3 86.81 325.3 88.86C325.239 89.9722 324.916 91.0543 324.358 92.0186C323.8 92.9828 323.023 93.8021 322.09 94.41C320.32 95.41 318.88 94.61 318.88 92.56C318.941 91.4464 319.264 90.3629 319.822 89.3971C320.379 88.4312 321.156 87.6101 322.09 87Z"
                fill="white"
              />
              <path
                d="M357.15 78.79V95.38L116.15 234.59V218L121.39 215C122.8 214.18 123.27 213 123.94 210.58L125.72 204.41C126.28 202.26 126.86 200.8 128.27 199.99L189.1 164.87C190.52 164.05 191.62 163.96 192.69 165.74L194.88 169.74C195.68 171.12 196.08 171.93 197.48 171.12L357.15 78.79Z"
                fill="#E6E6E6"
              />
              <path
                d="M116.17 218.01V234.59L111.38 231.83V215.26L116.17 218.01Z"
                fill="#E0E0E0"
              />
              <path
                opacity="0.5"
                d="M127.87 219.21L123.87 221.52L125.39 218.58C125.453 218.472 125.487 218.35 125.487 218.225C125.487 218.1 125.453 217.977 125.39 217.87C125.28 217.73 125.07 217.87 124.94 218.08L122.77 222.26L122.71 222.42C122.705 222.493 122.705 222.567 122.71 222.64C122.704 222.7 122.704 222.76 122.71 222.82C122.728 222.851 122.748 222.881 122.77 222.91L124.94 224.57C124.97 224.593 125.007 224.606 125.045 224.606C125.083 224.606 125.12 224.593 125.15 224.57C125.259 224.497 125.343 224.392 125.39 224.27C125.51 223.99 125.5 223.69 125.39 223.58L123.87 222.41L127.87 220.1C127.972 220.019 128.055 219.916 128.11 219.798C128.166 219.68 128.193 219.55 128.19 219.42C128.19 219.24 128.05 219.1 127.87 219.21Z"
                fill="#455A64"
              />
              <path
                opacity="0.5"
                d="M131.21 217.28L135.21 214.97L133.68 213.79C133.55 213.69 133.53 213.38 133.68 213.11C133.83 212.84 134 212.7 134.13 212.8L136.3 214.47C136.325 214.497 136.345 214.527 136.36 214.56C136.366 214.62 136.366 214.68 136.36 214.74C136.365 214.813 136.365 214.887 136.36 214.96C136.355 214.976 136.355 214.994 136.36 215.01L136.3 215.16L134.13 219.33C134.087 219.433 134.014 219.52 133.92 219.58C133.888 219.612 133.845 219.629 133.8 219.629C133.755 219.629 133.712 219.612 133.68 219.58C133.619 219.47 133.587 219.346 133.587 219.22C133.587 219.094 133.619 218.97 133.68 218.86L135.21 215.93L131.21 218.24C131.03 218.34 130.89 218.24 130.89 217.93C130.891 217.804 130.92 217.681 130.975 217.568C131.031 217.456 131.111 217.357 131.21 217.28Z"
                fill="#455A64"
              />
              <path
                opacity="0.5"
                d="M144.34 205.75C144.34 205.51 144.11 205.54 144 205.8L143.45 207.14C142.52 207.04 141.39 207.95 140.62 209.57C139.62 211.67 139.62 214.15 140.62 215.11C140.861 215.334 141.172 215.467 141.5 215.487C141.829 215.507 142.154 215.413 142.42 215.22C143.219 214.679 143.844 213.918 144.22 213.03C144.28 212.923 144.312 212.802 144.312 212.68C144.312 212.557 144.28 212.436 144.22 212.33C144.09 212.21 143.89 212.33 143.76 212.6C143.02 214.16 141.82 214.86 141.08 214.15C140.34 213.44 140.34 211.58 141.08 210.01C141.6 208.9 142.36 208.24 143.02 208.2L142.61 209.2C142.5 209.46 142.61 209.7 142.77 209.59L144.4 208.53C144.464 208.475 144.514 208.405 144.546 208.327C144.577 208.248 144.589 208.164 144.58 208.08L144.34 205.75Z"
                fill="#455A64"
              />
              <path
                opacity="0.5"
                d="M187.37 172.41L188.83 169.32C188.918 169.168 188.964 168.995 188.964 168.82C188.964 168.644 188.918 168.472 188.83 168.32C188.65 168.16 188.38 168.32 188.2 168.68L186.74 171.77L185.28 170.37C185.11 170.2 184.83 170.37 184.66 170.73C184.572 170.882 184.526 171.054 184.526 171.23C184.526 171.405 184.572 171.578 184.66 171.73L186.12 173.14L184.66 176.22C184.572 176.372 184.526 176.544 184.526 176.72C184.526 176.895 184.572 177.068 184.66 177.22C184.703 177.256 184.758 177.277 184.815 177.277C184.872 177.277 184.927 177.256 184.97 177.22C185.112 177.135 185.222 177.005 185.28 176.85L186.74 173.76L188.2 175.16C188.246 175.194 188.302 175.212 188.36 175.212C188.418 175.212 188.474 175.194 188.52 175.16C188.718 175.006 188.857 174.789 188.913 174.545C188.969 174.301 188.94 174.045 188.83 173.82L187.37 172.41Z"
                fill="#455A64"
              />
              <path
                d="M149.66 209.55V204.39C149.707 203.504 149.962 202.642 150.406 201.874C150.849 201.106 151.467 200.454 152.21 199.97L340.21 91.3798C341.62 90.5598 342.76 91.2198 342.76 92.8498V97.9998C342.711 98.8847 342.454 99.7457 342.011 100.513C341.568 101.281 340.951 101.934 340.21 102.42L152.21 211C150.8 211.83 149.66 211.17 149.66 209.55Z"
                fill="#FAFAFA"
              />
              <path
                d="M338.77 94.0999L339.44 95.5299C339.447 95.5498 339.459 95.5678 339.474 95.5829C339.489 95.5979 339.507 95.6096 339.527 95.6172C339.547 95.6248 339.568 95.628 339.589 95.6268C339.61 95.6255 339.631 95.6198 339.65 95.6099L341.15 95.0399C341.39 94.9499 341.48 95.2799 341.31 95.5999L340.23 97.5999C340.162 97.7178 340.134 97.8547 340.15 97.9899L340.4 99.8299C340.4 100.12 340.19 100.51 339.98 100.48L338.64 100.31C338.585 100.313 338.532 100.329 338.485 100.357C338.438 100.385 338.399 100.423 338.37 100.47L337 102.22C336.79 102.49 336.54 102.4 336.58 102.06L336.84 99.9199C336.85 99.8679 336.847 99.8142 336.832 99.7635C336.816 99.7129 336.788 99.667 336.75 99.6299L335.67 98.8399C335.5 98.7199 335.59 98.2799 335.83 98.0899L337.33 96.9399C337.43 96.8462 337.505 96.7295 337.55 96.5999L338.22 94.3999C338.35 94.0499 338.66 93.8799 338.77 94.0999Z"
                stroke="#E0E0E0"
                strokeWidth="0.903078"
                strokeMiterlimit="10"
              />
              <g opacity="0.5">
                <path
                  d="M345.81 90.7498C345.614 90.753 345.422 90.6904 345.265 90.572C345.109 90.4537 344.996 90.2864 344.945 90.0967C344.895 89.907 344.909 89.7058 344.986 89.5252C345.063 89.3445 345.198 89.1948 345.37 89.0998L352.54 84.9998C352.64 84.9407 352.751 84.9021 352.867 84.8862C352.982 84.8703 353.099 84.8774 353.212 84.9072C353.324 84.9369 353.43 84.9887 353.522 85.0596C353.615 85.1304 353.692 85.2188 353.75 85.3198C353.867 85.523 353.898 85.764 353.839 85.9906C353.779 86.2171 353.632 86.4109 353.43 86.5298L346.25 90.6698C346.113 90.7339 345.961 90.7615 345.81 90.7498Z"
                  fill="#455A64"
                />
                <path
                  d="M345.81 94.89C345.614 94.8932 345.422 94.8306 345.265 94.7123C345.109 94.5939 344.996 94.4266 344.945 94.2369C344.895 94.0472 344.909 93.846 344.986 93.6654C345.063 93.4848 345.198 93.335 345.37 93.24L352.54 89.1C352.641 89.0262 352.756 88.9744 352.878 88.948C353 88.9215 353.126 88.921 353.248 88.9465C353.37 88.972 353.486 89.0228 353.587 89.0959C353.688 89.1689 353.773 89.2623 353.836 89.3702C353.898 89.4781 353.938 89.598 353.951 89.7221C353.965 89.8462 353.952 89.9717 353.913 90.0905C353.875 90.2093 353.812 90.3187 353.729 90.4117C353.646 90.5046 353.544 90.579 353.43 90.63L346.25 94.77C346.116 94.848 345.965 94.8894 345.81 94.89Z"
                  fill="#455A64"
                />
                <path
                  d="M345.81 98.9997C345.614 99.0029 345.422 98.9403 345.265 98.8219C345.109 98.7036 344.996 98.5362 344.945 98.3465C344.895 98.1569 344.909 97.9557 344.986 97.7751C345.063 97.5944 345.198 97.4447 345.37 97.3497L352.54 93.1997C352.744 93.0838 352.986 93.0535 353.213 93.1153C353.44 93.1772 353.633 93.3261 353.75 93.5297C353.866 93.7314 353.898 93.9709 353.838 94.1958C353.778 94.4207 353.631 94.6127 353.43 94.7297L346.25 98.8797C346.116 98.9577 345.965 98.9991 345.81 98.9997Z"
                  fill="#455A64"
                />
              </g>
              <path
                d="M116.17 234.59L116.16 251.16L357.12 111.97L357.15 95.3799L116.17 234.59Z"
                fill="#455A64"
              />
              <path
                d="M111.38 248.39L116.17 251.16V234.59L111.38 231.83V248.39Z"
                fill="#37474F"
              />
              <path
                d="M146.05 224V227.21C146.05 227.86 146.51 228.13 147.05 227.8L187.12 204.65V199.1L147.05 222.25C146.76 222.445 146.52 222.705 146.346 223.008C146.173 223.312 146.071 223.651 146.05 224Z"
                fill="#FAFAFA"
              />
              <path
                d="M192.56 196C193.13 195.67 193.56 195.94 193.56 196.6V199.8C193.545 200.155 193.446 200.503 193.273 200.813C193.099 201.124 192.855 201.39 192.56 201.59L187.15 204.71V199.1L192.56 196Z"
                fill="#E5C34E"
              />
              <path
                d="M192.16 200.36L191.56 200.17C191.623 199.918 191.656 199.66 191.66 199.4C191.687 199.155 191.649 198.907 191.551 198.681C191.453 198.455 191.297 198.258 191.1 198.11C190.967 198.03 190.815 197.987 190.66 197.987C190.505 197.987 190.353 198.03 190.22 198.11C189.838 198.405 189.53 198.786 189.322 199.222C189.113 199.658 189.01 200.137 189.02 200.62C188.992 200.864 189.028 201.112 189.125 201.338C189.221 201.564 189.375 201.761 189.57 201.91C189.686 201.977 189.817 202.011 189.95 202.01C190.126 202.008 190.299 201.96 190.45 201.87C190.922 201.559 191.274 201.097 191.45 200.56L192.06 200.75H192.13C192.178 200.75 192.224 200.734 192.262 200.705C192.3 200.676 192.327 200.636 192.34 200.59C192.341 200.537 192.324 200.485 192.291 200.443C192.258 200.401 192.212 200.372 192.16 200.36ZM190.22 201.52C190.156 201.561 190.081 201.583 190.005 201.583C189.929 201.583 189.854 201.561 189.79 201.52C189.666 201.409 189.571 201.268 189.516 201.111C189.46 200.954 189.444 200.785 189.47 200.62C189.465 200.214 189.553 199.812 189.726 199.445C189.899 199.078 190.154 198.755 190.47 198.5C190.55 198.446 190.644 198.415 190.74 198.41C190.793 198.4 190.847 198.4 190.9 198.41C191.022 198.526 191.115 198.668 191.173 198.826C191.23 198.984 191.25 199.153 191.23 199.32C191.246 199.74 191.163 200.158 190.988 200.541C190.812 200.923 190.549 201.258 190.22 201.52Z"
                fill="#FAFAFA"
              />
              <path
                d="M139.06 226.9L136.32 228.48C136.026 228.673 135.782 228.933 135.608 229.239C135.434 229.545 135.335 229.888 135.32 230.24V233.41C135.32 234.06 135.77 234.33 136.32 234L139.06 232.42C139.353 232.226 139.596 231.965 139.77 231.659C139.944 231.354 140.043 231.011 140.06 230.66V227.49C140.08 226.84 139.62 226.57 139.06 226.9Z"
                fill="#FAFAFA"
              />
              <path
                d="M208.29 185.5C207.226 186.195 206.341 187.131 205.706 188.233C205.072 189.335 204.707 190.57 204.64 191.84C204.64 194.17 206.27 195.11 208.29 193.95C209.356 193.255 210.242 192.319 210.878 191.217C211.514 190.116 211.881 188.88 211.95 187.61C211.94 185.28 210.31 184.34 208.29 185.5Z"
                fill="#E5C34E"
              />
              <path
                d="M207.86 189.22C207.749 189.218 207.639 189.191 207.54 189.14C207.421 189.062 207.325 188.952 207.263 188.824C207.201 188.695 207.176 188.552 207.19 188.41C207.209 188.071 207.31 187.742 207.484 187.451C207.658 187.16 207.9 186.916 208.19 186.74C208.307 186.658 208.444 186.61 208.587 186.599C208.729 186.589 208.872 186.617 209 186.68C209.12 186.758 209.215 186.867 209.277 186.996C209.339 187.125 209.364 187.268 209.35 187.41C209.329 187.748 209.227 188.076 209.053 188.366C208.879 188.657 208.638 188.902 208.35 189.08C208.202 189.168 208.033 189.216 207.86 189.22Z"
                fill="white"
              />
              <path
                d="M209.73 189.46C209.527 189.361 209.301 189.318 209.076 189.336C208.851 189.353 208.635 189.431 208.45 189.56L207.92 189.87C207.438 190.178 207.036 190.598 206.749 191.094C206.462 191.59 206.298 192.147 206.27 192.72V193.09C206.592 193.234 206.947 193.291 207.298 193.254C207.65 193.217 207.985 193.088 208.27 192.88C209.106 192.358 209.794 191.632 210.27 190.77V190.68C210.293 190.447 210.256 190.212 210.161 189.998C210.067 189.784 209.918 189.599 209.73 189.46Z"
                fill="white"
              />
              <path
                d="M216.65 182.67L241.65 168.22C242.65 167.63 243.48 168.07 243.48 169.22C243.44 169.846 243.254 170.453 242.936 170.993C242.618 171.533 242.177 171.991 241.65 172.33L216.65 186.78C215.65 187.37 214.82 186.92 214.82 185.78C214.86 185.155 215.047 184.547 215.364 184.007C215.682 183.467 216.123 183.009 216.65 182.67Z"
                fill="#E0E0E0"
              />
              <path
                d="M254.86 160.64L270.39 151.64C271.39 151.05 272.23 151.5 272.23 152.64C272.189 153.266 272.001 153.874 271.681 154.415C271.362 154.955 270.919 155.412 270.39 155.75L254.86 164.81C253.86 165.39 253.03 164.95 253.03 163.81C253.061 163.174 253.243 162.555 253.561 162.003C253.879 161.452 254.325 160.985 254.86 160.64Z"
                fill="#E0E0E0"
              />
              <path
                d="M283.6 144.13L294.31 137.91C295.31 137.32 296.15 137.77 296.15 138.91C296.109 139.536 295.921 140.144 295.601 140.685C295.282 141.225 294.839 141.682 294.31 142.02L283.6 148.24C282.6 148.83 281.76 148.39 281.76 147.24C281.801 146.614 281.989 146.006 282.309 145.465C282.628 144.925 283.071 144.468 283.6 144.13Z"
                fill="#E0E0E0"
              />
              <path
                d="M248.31 169.72C248.192 169.72 248.079 169.674 247.995 169.592C247.911 169.509 247.863 169.397 247.86 169.28V163.75C247.876 163.643 247.93 163.546 248.011 163.476C248.093 163.405 248.197 163.367 248.305 163.367C248.413 163.367 248.517 163.405 248.599 163.476C248.68 163.546 248.734 163.643 248.75 163.75V169.28C248.75 169.396 248.704 169.508 248.621 169.591C248.539 169.673 248.427 169.72 248.31 169.72Z"
                fill="#263238"
              />
              <path
                d="M277 153.15C276.882 153.147 276.771 153.099 276.688 153.014C276.606 152.93 276.56 152.817 276.56 152.7V147.18C276.56 147.063 276.606 146.951 276.689 146.869C276.771 146.786 276.883 146.74 277 146.74C277.117 146.74 277.229 146.786 277.311 146.869C277.394 146.951 277.44 147.063 277.44 147.18V152.7C277.44 152.817 277.394 152.93 277.312 153.014C277.23 153.099 277.118 153.147 277 153.15Z"
                fill="#263238"
              />
              <path
                d="M300.93 139.34C300.812 139.337 300.7 139.289 300.618 139.204C300.536 139.12 300.49 139.007 300.49 138.89V133.37C300.49 133.253 300.536 133.141 300.619 133.059C300.701 132.976 300.813 132.93 300.93 132.93C301.047 132.93 301.159 132.976 301.241 133.059C301.324 133.141 301.37 133.253 301.37 133.37V138.89C301.37 139.007 301.324 139.12 301.242 139.204C301.16 139.289 301.048 139.337 300.93 139.34Z"
                fill="#263238"
              />
              <path
                d="M310.13 130.82V129.82C310.13 128.66 309.43 128.13 308.56 128.63C308.082 128.972 307.691 129.422 307.418 129.943C307.145 130.464 306.999 131.042 306.99 131.63V132.54C306.971 133.166 306.788 133.776 306.46 134.31C306.379 134.453 306.334 134.615 306.33 134.78C306.33 135.07 306.51 135.2 306.73 135.08L310.41 132.95C310.53 132.865 310.628 132.753 310.696 132.622C310.764 132.492 310.8 132.347 310.8 132.2C310.807 132.143 310.8 132.085 310.781 132.032C310.762 131.978 310.731 131.929 310.69 131.89C310.502 131.786 310.348 131.63 310.248 131.439C310.149 131.249 310.107 131.033 310.13 130.82Z"
                fill="#E5C34E"
              />
              <path
                d="M309.32 133.88C309.316 134.164 309.245 134.444 309.113 134.696C308.981 134.948 308.792 135.165 308.56 135.33C308.14 135.57 307.8 135.33 307.8 134.76L309.32 133.88Z"
                fill="#E5C34E"
              />
              <path
                d="M316.86 126.36C316.731 126.361 316.604 126.33 316.49 126.27C316.354 126.181 316.245 126.057 316.174 125.911C316.104 125.764 316.075 125.602 316.09 125.44C316.109 125.062 316.217 124.695 316.407 124.368C316.596 124.041 316.861 123.764 317.18 123.56C317.312 123.469 317.466 123.415 317.626 123.403C317.785 123.39 317.946 123.42 318.09 123.49C318.224 123.58 318.332 123.705 318.403 123.851C318.473 123.996 318.503 124.158 318.49 124.32C318.471 124.698 318.363 125.065 318.173 125.392C317.984 125.719 317.718 125.996 317.4 126.2C317.239 126.304 317.052 126.359 316.86 126.36Z"
                fill="#E5C34E"
              />
              <path
                d="M319 126.64C318.771 126.524 318.515 126.472 318.26 126.492C318.004 126.511 317.758 126.6 317.55 126.75L316.95 127.09C316.407 127.441 315.955 127.916 315.632 128.476C315.308 129.035 315.123 129.664 315.09 130.31V130.74C315.459 130.9 315.863 130.962 316.263 130.918C316.663 130.874 317.045 130.726 317.37 130.49C318.316 129.899 319.1 129.081 319.65 128.11V128C319.67 127.736 319.621 127.472 319.507 127.233C319.393 126.994 319.218 126.79 319 126.64Z"
                fill="#E5C34E"
              />
              <path
                d="M319.77 123.64C319.643 123.643 319.518 123.608 319.41 123.54C319.276 123.452 319.167 123.329 319.097 123.185C319.026 123.041 318.996 122.88 319.01 122.72C319.028 122.342 319.136 121.974 319.326 121.647C319.515 121.32 319.781 121.043 320.1 120.84C320.232 120.749 320.387 120.695 320.547 120.685C320.707 120.674 320.867 120.707 321.01 120.78C321.145 120.867 321.254 120.99 321.325 121.134C321.395 121.279 321.425 121.44 321.41 121.6C321.392 121.978 321.284 122.346 321.094 122.673C320.905 123 320.639 123.277 320.32 123.48C320.154 123.581 319.964 123.636 319.77 123.64Z"
                fill="#E5C34E"
              />
              <path
                d="M321.89 123.91C321.659 123.796 321.402 123.746 321.145 123.765C320.888 123.785 320.641 123.872 320.43 124.02L319.84 124.37C319.158 124.792 318.627 125.419 318.32 126.16C318.517 126.054 318.737 125.998 318.96 125.998C319.183 125.998 319.403 126.054 319.6 126.16C319.823 126.307 320.001 126.513 320.115 126.754C320.23 126.996 320.276 127.264 320.25 127.53V127.78C321.206 127.201 321.995 126.385 322.54 125.41V125.3C322.566 125.031 322.519 124.76 322.405 124.516C322.29 124.272 322.113 124.062 321.89 123.91Z"
                fill="#E5C34E"
              />
              <path
                d="M329.16 116.38C328.286 116.949 327.559 117.717 327.038 118.621C326.516 119.524 326.216 120.538 326.16 121.58C326.135 121.907 326.182 122.236 326.298 122.544C326.413 122.851 326.595 123.13 326.83 123.36L326.45 125.14C326.45 125.36 326.55 125.46 326.7 125.29L328.05 123.71C328.438 123.656 328.812 123.527 329.15 123.33C330.023 122.757 330.749 121.987 331.27 121.082C331.791 120.177 332.093 119.162 332.15 118.12C332.16 116.2 330.81 115.42 329.16 116.38Z"
                fill="#E5C34E"
              />
              <path
                d="M343.56 108C343.788 107.86 344.044 107.772 344.31 107.74C344.517 107.713 344.726 107.751 344.91 107.85C345.095 107.961 345.239 108.13 345.32 108.33C345.421 108.584 345.468 108.856 345.46 109.13C345.464 109.379 345.437 109.627 345.38 109.87C345.32 110.09 345.25 110.31 345.17 110.52C345.083 110.721 344.987 110.918 344.88 111.11L344.58 111.66C344.48 111.84 344.4 112.01 344.32 112.19C344.245 112.359 344.192 112.537 344.16 112.72C344.151 112.805 344.131 112.889 344.1 112.97C344.073 113.032 344.028 113.084 343.97 113.12L343.12 113.62C343.06 113.62 343.02 113.62 342.98 113.62C342.959 113.597 342.942 113.57 342.932 113.541C342.921 113.512 342.917 113.481 342.92 113.45C342.923 113.213 342.957 112.978 343.02 112.75C343.082 112.528 343.158 112.311 343.25 112.1C343.35 111.89 343.45 111.69 343.56 111.5L343.87 110.95C343.957 110.788 344.034 110.621 344.1 110.45C344.165 110.305 344.199 110.148 344.2 109.99C344.2 109.78 344.15 109.65 344.04 109.59C343.93 109.53 343.78 109.59 343.56 109.69C343.377 109.786 343.223 109.927 343.11 110.1C343.025 110.234 342.958 110.378 342.91 110.53L342.8 110.91C342.79 110.962 342.768 111.011 342.737 111.054C342.706 111.097 342.666 111.133 342.62 111.16L341.76 111.66C341.743 111.669 341.724 111.674 341.705 111.674C341.686 111.674 341.667 111.669 341.65 111.66C341.631 111.611 341.631 111.558 341.65 111.51C341.658 111.212 341.705 110.916 341.79 110.63C341.885 110.285 342.013 109.951 342.17 109.63C342.339 109.299 342.544 108.987 342.78 108.7C342.997 108.422 343.261 108.185 343.56 108ZM344.18 115C344.179 115.083 344.159 115.166 344.12 115.24C344.093 115.307 344.048 115.366 343.99 115.41L343.1 115.92C343.082 115.935 343.059 115.944 343.035 115.944C343.011 115.944 342.988 115.935 342.97 115.92C342.929 115.873 342.907 115.812 342.91 115.75V114.65C342.911 114.566 342.931 114.484 342.97 114.41C342.994 114.343 343.04 114.287 343.1 114.25L343.99 113.74C343.998 113.731 344.008 113.724 344.02 113.719C344.031 113.714 344.043 113.712 344.055 113.712C344.067 113.712 344.079 113.714 344.09 113.719C344.101 113.724 344.112 113.731 344.12 113.74C344.142 113.762 344.159 113.789 344.169 113.818C344.18 113.847 344.183 113.879 344.18 113.91V115Z"
                fill="#E5C34E"
              />
              <path
                d="M135.59 262.78L147.87 255.78C148.46 255.44 148.93 255.68 148.93 256.31C148.904 256.666 148.795 257.011 148.611 257.316C148.426 257.622 148.173 257.88 147.87 258.07L135.59 265.13C135 265.47 134.53 265.23 134.53 264.59C134.548 264.225 134.654 263.87 134.838 263.555C135.023 263.24 135.281 262.974 135.59 262.78Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 264C131.93 263.21 133.04 263.85 133.04 265.44C132.994 266.302 132.744 267.141 132.311 267.889C131.879 268.636 131.275 269.271 130.55 269.74C129.18 270.53 128.07 269.89 128.07 268.31C128.117 267.447 128.365 266.608 128.796 265.859C129.227 265.111 129.828 264.474 130.55 264Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.1"
                d="M130.55 264C131.93 263.21 133.04 263.85 133.04 265.44C132.994 266.302 132.744 267.141 132.311 267.889C131.879 268.636 131.275 269.271 130.55 269.74C129.18 270.53 128.07 269.89 128.07 268.31C128.117 267.447 128.365 266.608 128.796 265.859C129.227 265.111 129.828 264.474 130.55 264Z"
                fill="black"
              />
              <path
                d="M135.59 272L147.87 264.95C148.46 264.61 148.93 264.85 148.93 265.48C148.904 265.836 148.795 266.181 148.611 266.486C148.426 266.792 148.173 267.05 147.87 267.24L135.59 274.3C135 274.63 134.53 274.4 134.53 273.76C134.556 273.404 134.665 273.059 134.85 272.753C135.034 272.447 135.287 272.189 135.59 272Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 273.14C131.93 272.35 133.04 272.99 133.04 274.58C132.994 275.442 132.744 276.282 132.311 277.029C131.879 277.776 131.275 278.411 130.55 278.88C129.18 279.67 128.07 279.03 128.07 277.45C128.117 276.587 128.365 275.748 128.796 274.999C129.227 274.251 129.828 273.614 130.55 273.14Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.15"
                d="M130.55 273.14C131.93 272.35 133.04 272.99 133.04 274.58C132.994 275.442 132.744 276.282 132.311 277.029C131.879 277.776 131.275 278.411 130.55 278.88C129.18 279.67 128.07 279.03 128.07 277.45C128.117 276.587 128.365 275.748 128.796 274.999C129.227 274.251 129.828 273.614 130.55 273.14Z"
                fill="black"
              />
              <path
                d="M135.59 281.12L147.87 274.07C148.46 273.73 148.93 273.97 148.93 274.6C148.904 274.956 148.795 275.301 148.611 275.606C148.426 275.912 148.173 276.17 147.87 276.36L135.59 283.41C135 283.75 134.53 283.52 134.53 282.88C134.556 282.524 134.665 282.179 134.85 281.873C135.034 281.567 135.287 281.309 135.59 281.12Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 282.31C131.93 281.52 133.04 282.16 133.04 283.75C132.994 284.612 132.744 285.452 132.311 286.199C131.879 286.946 131.275 287.581 130.55 288.05C129.18 288.84 128.07 288.2 128.07 286.61C128.117 285.749 128.365 284.911 128.796 284.164C129.227 283.417 129.828 282.781 130.55 282.31Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.2"
                d="M130.55 282.31C131.93 281.52 133.04 282.16 133.04 283.75C132.994 284.612 132.744 285.452 132.311 286.199C131.879 286.946 131.275 287.581 130.55 288.05C129.18 288.84 128.07 288.2 128.07 286.61C128.117 285.749 128.365 284.911 128.796 284.164C129.227 283.417 129.828 282.781 130.55 282.31Z"
                fill="black"
              />
              <path
                d="M135.59 290.29L147.87 283.23C148.46 282.9 148.93 283.13 148.93 283.77C148.904 284.126 148.795 284.471 148.611 284.777C148.426 285.083 148.173 285.341 147.87 285.53L135.59 292.58C135 292.92 134.53 292.68 134.53 292.05C134.556 291.694 134.665 291.349 134.85 291.043C135.034 290.737 135.287 290.479 135.59 290.29Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 291.48C131.93 290.69 133.04 291.33 133.04 292.92C132.992 293.782 132.742 294.62 132.309 295.368C131.877 296.115 131.274 296.749 130.55 297.22C129.18 298.01 128.07 297.37 128.07 295.78C128.117 294.919 128.365 294.081 128.796 293.334C129.227 292.586 129.828 291.951 130.55 291.48Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.25"
                d="M130.55 291.48C131.93 290.69 133.04 291.33 133.04 292.92C132.992 293.782 132.742 294.62 132.309 295.368C131.877 296.115 131.274 296.749 130.55 297.22C129.18 298.01 128.07 297.37 128.07 295.78C128.117 294.919 128.365 294.081 128.796 293.334C129.227 292.586 129.828 291.951 130.55 291.48Z"
                fill="black"
              />
              <path
                d="M135.59 299.46L147.87 292.4C148.46 292.06 148.93 292.3 148.93 292.94C148.904 293.296 148.795 293.641 148.611 293.947C148.426 294.253 148.173 294.511 147.87 294.7L135.59 301.75C135 302.09 134.53 301.85 134.53 301.22C134.556 300.864 134.665 300.519 134.85 300.213C135.034 299.907 135.287 299.649 135.59 299.46Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 300.65C131.93 299.86 133.04 300.5 133.04 302.08C132.994 302.944 132.744 303.784 132.312 304.533C131.879 305.282 131.275 305.919 130.55 306.39C129.18 307.18 128.07 306.54 128.07 304.95C128.117 304.089 128.365 303.251 128.796 302.504C129.227 301.757 129.828 301.122 130.55 300.65Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.3"
                d="M130.55 300.65C131.93 299.86 133.04 300.5 133.04 302.08C132.994 302.944 132.744 303.784 132.312 304.533C131.879 305.282 131.275 305.919 130.55 306.39C129.18 307.18 128.07 306.54 128.07 304.95C128.117 304.089 128.365 303.251 128.796 302.504C129.227 301.757 129.828 301.122 130.55 300.65Z"
                fill="black"
              />
              <path
                d="M135.59 249L153.33 238.75C153.92 238.42 154.39 238.65 154.39 239.29C154.364 239.646 154.255 239.991 154.071 240.297C153.886 240.603 153.633 240.861 153.33 241.05L135.59 251.29C135 251.63 134.53 251.39 134.53 250.76C134.553 250.403 134.662 250.058 134.846 249.751C135.031 249.445 135.286 249.188 135.59 249Z"
                fill="#E0E0E0"
              />
              <path
                d="M130.55 250.22C131.93 249.43 133.04 250.07 133.04 251.65C132.995 252.512 132.745 253.352 132.313 254.099C131.88 254.847 131.276 255.481 130.55 255.95C129.18 256.74 128.07 256.1 128.07 254.52C128.117 253.659 128.365 252.821 128.796 252.074C129.227 251.326 129.828 250.691 130.55 250.22Z"
                fill="#E5C34E"
              />
              <path
                d="M131.25 251.51C131.239 251.762 131.167 252.007 131.042 252.227C130.917 252.446 130.741 252.632 130.53 252.77C130.13 253 129.81 252.77 129.81 252.34C129.822 252.086 129.893 251.839 130.018 251.618C130.143 251.398 130.318 251.21 130.53 251.07C130.93 250.84 131.25 251 131.25 251.51Z"
                fill="white"
              />
              <path
                d="M131.87 253.9C131.547 254.471 131.087 254.952 130.53 255.3C130.339 255.438 130.115 255.525 129.88 255.551C129.645 255.577 129.407 255.542 129.19 255.45C129.214 254.98 129.347 254.523 129.58 254.115C129.813 253.707 130.138 253.359 130.53 253.1C131.27 252.68 131.87 253 131.87 253.9Z"
                fill="white"
              />
              <path
                d="M158.37 379.73C158.306 379.731 158.243 379.72 158.183 379.696C158.124 379.673 158.07 379.638 158.024 379.593C157.978 379.548 157.942 379.495 157.917 379.436C157.893 379.377 157.88 379.314 157.88 379.25V232.44C157.879 232.375 157.89 232.311 157.915 232.251C157.939 232.191 157.975 232.136 158.02 232.09C158.066 232.045 158.121 232.008 158.181 231.984C158.241 231.96 158.305 231.948 158.37 231.95C158.434 231.95 158.497 231.963 158.556 231.987C158.615 232.012 158.668 232.048 158.713 232.094C158.758 232.14 158.793 232.194 158.816 232.253C158.84 232.312 158.851 232.376 158.85 232.44V379.25C158.851 379.313 158.84 379.376 158.816 379.435C158.793 379.494 158.757 379.547 158.712 379.592C158.668 379.637 158.614 379.672 158.555 379.696C158.496 379.72 158.433 379.731 158.37 379.73Z"
                fill="#E0E0E0"
              />
              <path
                d="M168.43 231.21L343 130.43C344.17 129.76 345.11 130.3 345.11 131.66V168.06C345.072 168.794 344.861 169.507 344.495 170.144C344.128 170.78 343.616 171.32 343 171.72L168.43 272.5C167.26 273.18 166.31 272.63 166.31 271.28V234.88C166.351 234.145 166.564 233.43 166.932 232.792C167.3 232.154 167.813 231.613 168.43 231.21Z"
                fill="#F0F0F0"
              />
              <path
                d="M177.81 261.17C177.78 261.386 177.669 261.583 177.5 261.72C177.537 261.802 177.554 261.891 177.55 261.98C177.536 262.11 177.492 262.235 177.42 262.344C177.349 262.454 177.253 262.545 177.14 262.61L175.32 263.67V261.29C175.32 261.24 175.82 260.14 175.86 259.98C175.885 259.694 175.885 259.406 175.86 259.12C175.909 259.038 175.982 258.973 176.071 258.935C176.159 258.897 176.257 258.888 176.35 258.91C176.401 258.935 176.44 258.978 176.46 259.03C176.516 259.15 176.553 259.279 176.57 259.41C176.609 259.635 176.609 259.865 176.57 260.09L177.67 259.45C177.77 259.4 177.84 259.39 177.89 259.45C177.927 259.477 177.957 259.514 177.976 259.556C177.996 259.598 178.004 259.644 178 259.69C177.995 259.861 177.935 260.026 177.83 260.16C177.83 260.16 178.05 260.1 178.05 260.39C178.045 260.494 178.018 260.596 177.972 260.689C177.925 260.782 177.86 260.864 177.78 260.93C177.78 260.93 177.81 261 177.81 261.17Z"
                fill="#37474F"
              />
              <path
                d="M175.06 263.52V264.02C175.058 264.057 175.047 264.093 175.028 264.124C175.009 264.156 174.982 264.182 174.95 264.2L174.36 264.54C174.327 264.55 174.293 264.55 174.26 264.54V261.8L174.74 261.52L175.02 261.36C175.029 261.393 175.029 261.428 175.02 261.46L175.06 263.52Z"
                fill="#37474F"
              />
              <path
                d="M181.2 257.2L193.48 250.2C194.07 249.86 194.54 250.1 194.54 250.73C194.514 251.086 194.405 251.431 194.221 251.737C194.036 252.043 193.783 252.301 193.48 252.49L181.2 259.5C180.61 259.84 180.14 259.6 180.14 258.96C180.168 258.605 180.279 258.261 180.463 257.955C180.647 257.65 180.899 257.391 181.2 257.2Z"
                fill="#37474F"
              />
              <path
                d="M243.88 220.74L256.16 213.69C256.74 213.35 257.22 213.59 257.22 214.22C257.193 214.576 257.084 214.921 256.9 215.226C256.715 215.532 256.462 215.79 256.16 215.98L243.88 223C243.29 223.34 242.81 223.1 242.81 222.47C242.842 222.119 242.956 221.78 243.141 221.479C243.327 221.179 243.58 220.926 243.88 220.74Z"
                fill="#37474F"
              />
              <path
                d="M239.46 223C239.46 222.59 239.18 222.43 238.83 222.63L235 224.88C234.815 225.001 234.662 225.163 234.552 225.354C234.443 225.546 234.38 225.76 234.37 225.98V228.63C234.37 229.03 234.65 229.2 235.01 229L236.08 228.39V229.3C236.08 229.36 236.16 229.39 236.19 229.3L237.77 227.4L238.91 226.75C239.095 226.633 239.249 226.472 239.359 226.283C239.469 226.093 239.531 225.879 239.54 225.66L239.46 223Z"
                fill="#37474F"
              />
              <path
                d="M319.91 177L332.19 169.94C332.77 169.6 333.25 169.84 333.25 170.47C333.224 170.826 333.115 171.171 332.931 171.477C332.746 171.783 332.493 172.041 332.19 172.23L319.91 179.29C319.32 179.63 318.85 179.39 318.85 178.76C318.874 178.404 318.982 178.058 319.166 177.752C319.351 177.445 319.606 177.188 319.91 177Z"
                fill="#37474F"
              />
              <path
                d="M316 180.4L313 179.48V181.06C311.818 181.564 310.797 182.384 310.05 183.43C308.41 185.89 309.6 187.28 310.15 187.43C310.15 187.43 309.28 186.83 310.24 185.07C310.905 184.093 311.876 183.365 313 183V184.8L316 180.4Z"
                fill="#37474F"
              />
              <path
                d="M192 234C191.811 238.453 190.338 242.755 187.76 246.39C187.5 246.77 187.24 247.14 186.96 247.5C186.046 248.715 185.01 249.834 183.87 250.84C183.027 251.598 182.109 252.268 181.13 252.84C180.15 253.424 179.088 253.858 177.98 254.13C177.298 254.287 176.598 254.347 175.9 254.31C175.137 254.28 174.39 254.086 173.71 253.74C171.59 252.68 170.26 250.18 170.26 246.57C170.26 239.64 175.13 231.2 181.13 227.74C187.13 224.28 192 227.07 192 234Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.4"
                d="M192 234C191.811 238.453 190.338 242.755 187.76 246.39C187.5 246.77 187.24 247.14 186.96 247.5C186.046 248.715 185.01 249.834 183.87 250.84C183.027 251.598 182.109 252.268 181.13 252.84C180.15 253.424 179.088 253.858 177.98 254.13C177.298 254.287 176.598 254.347 175.9 254.31C175.137 254.28 174.39 254.086 173.71 253.74C171.59 252.68 170.26 250.18 170.26 246.57C170.26 239.64 175.13 231.2 181.13 227.74C187.13 224.28 192 227.07 192 234Z"
                fill="black"
              />
              <path
                d="M184.48 247.21C184.189 248.234 183.685 249.185 183 250C182.346 250.723 181.554 251.308 180.67 251.72C179.742 252.122 178.722 252.264 177.72 252.13C176.84 252.082 175.988 251.803 175.25 251.32C174.882 251.075 174.573 250.751 174.345 250.373C174.117 249.994 173.975 249.57 173.93 249.13C173.917 248.68 174 248.233 174.172 247.818C174.345 247.403 174.603 247.029 174.93 246.72C174.423 246.43 174.035 245.969 173.835 245.42C173.636 244.87 173.637 244.268 173.84 243.72C174.183 243.079 174.633 242.501 175.17 242.01C176.005 241.053 176.488 239.839 176.54 238.57C176.606 237.613 176.753 236.663 176.98 235.73C177.115 235.252 177.321 234.797 177.59 234.38C177.949 233.85 178.38 233.372 178.87 232.96C179.444 232.482 180.068 232.066 180.73 231.72C181.94 231.01 183.328 230.663 184.73 230.72C185.216 230.746 185.691 230.877 186.121 231.105C186.551 231.333 186.926 231.652 187.22 232.04C187.503 232.433 187.656 232.905 187.656 233.39C187.656 233.875 187.503 234.347 187.22 234.74C187.47 234.785 187.702 234.897 187.892 235.064C188.083 235.232 188.224 235.448 188.3 235.69C188.435 236.181 188.435 236.699 188.3 237.19C188.087 238.316 187.556 239.357 186.77 240.19C186.31 240.599 185.895 241.055 185.53 241.55C185.171 242.288 184.993 243.1 185.01 243.92C184.972 245.035 184.794 246.14 184.48 247.21Z"
                fill="#263238"
              />
              <path
                d="M177.12 235.56L175.41 234.73C175.563 234.545 175.777 234.42 176.014 234.38C176.251 234.34 176.494 234.386 176.7 234.51C176.803 234.543 176.898 234.598 176.977 234.671C177.057 234.745 177.119 234.835 177.159 234.936C177.199 235.036 177.217 235.144 177.21 235.252C177.203 235.36 177.172 235.466 177.12 235.56Z"
                fill="#263238"
              />
              <path
                d="M177.18 235.26L176.29 233.58C176.522 233.521 176.768 233.546 176.983 233.653C177.198 233.759 177.367 233.939 177.46 234.16C177.523 234.248 177.567 234.349 177.587 234.455C177.607 234.561 177.604 234.671 177.577 234.776C177.55 234.881 177.501 234.978 177.432 235.062C177.364 235.146 177.278 235.213 177.18 235.26Z"
                fill="#263238"
              />
              <path
                d="M187.72 246.4C187.46 246.78 187.2 247.15 186.92 247.51C186.006 248.725 184.971 249.845 183.83 250.85C183.65 250.35 183.5 249.91 183.37 249.5C183.24 249.09 183.21 248.93 183.15 248.67C182.984 248.22 182.94 247.733 183.025 247.26C183.109 246.787 183.318 246.346 183.63 245.98C183.76 245.831 183.9 245.69 184.05 245.56C184.338 245.446 184.636 245.359 184.94 245.3C185.46 245.153 186.014 245.181 186.516 245.38C187.019 245.578 187.442 245.937 187.72 246.4Z"
                fill="#B16668"
              />
              <path
                d="M186.92 247.51C186.006 248.725 184.971 249.844 183.83 250.85C182.987 251.607 182.069 252.278 181.09 252.85C180.11 253.433 179.048 253.868 177.94 254.14C177.258 254.296 176.558 254.357 175.86 254.32C175.736 253.448 175.79 252.56 176.02 251.71C176.07 251.523 176.13 251.34 176.2 251.16C176.625 249.798 177.304 248.529 178.2 247.42L179.53 246.94L179.7 246.87L183.32 245.78L183.86 245.61H184.02C184.303 245.581 184.589 245.637 184.84 245.77C185.664 246.174 186.377 246.771 186.92 247.51Z"
                fill="#E5C34E"
              />
              <path
                d="M185.57 233.33C186.2 233.59 186.99 235.2 186.93 239.06C186.87 242.33 185.93 243.38 185.51 243.74C184.827 244.09 184.068 244.269 183.3 244.26V245.77C183.3 245.77 184.75 246.77 184.68 247.67C184.61 248.57 183.53 248.91 181.68 248.48C180.984 248.322 180.344 247.976 179.83 247.48C179.704 247.344 179.59 247.197 179.49 247.04V242.88C179.411 242.981 179.31 243.065 179.196 243.124C179.082 243.184 178.957 243.219 178.828 243.226C178.7 243.234 178.571 243.214 178.451 243.168C178.33 243.122 178.221 243.051 178.13 242.96C177.767 242.675 177.524 242.265 177.448 241.81C177.372 241.354 177.469 240.887 177.72 240.5C178.27 239.7 179.29 239.6 179.72 240.41C180.927 240.007 182.021 239.321 182.91 238.41C184.376 237.09 185.32 235.287 185.57 233.33Z"
                fill="#B16668"
              />
              <path
                d="M183.67 238.93C183.678 239.042 183.651 239.154 183.591 239.249C183.532 239.344 183.444 239.418 183.34 239.46C183.14 239.53 182.98 239.39 182.97 239.16C182.962 239.049 182.989 238.937 183.049 238.842C183.108 238.746 183.196 238.672 183.3 238.63C183.5 238.56 183.66 238.7 183.67 238.93Z"
                fill="#263238"
              />
              <path
                d="M183.41 241.51L184.71 241.63C184.68 241.835 184.58 242.022 184.427 242.161C184.273 242.3 184.077 242.381 183.87 242.39C183.51 242.36 183.31 242 183.41 241.51Z"
                fill="#9A4A4D"
              />
              <path
                d="M186.36 237.07L185.58 236.85C185.65 236.56 185.89 236.37 186.1 236.43C186.217 236.483 186.31 236.579 186.358 236.698C186.407 236.817 186.407 236.95 186.36 237.07Z"
                fill="#263238"
              />
              <path
                d="M186.35 238.06C186.36 238.172 186.333 238.285 186.273 238.38C186.214 238.476 186.125 238.55 186.02 238.59C185.83 238.66 185.66 238.52 185.65 238.29C185.645 238.179 185.674 238.069 185.733 237.974C185.791 237.879 185.878 237.805 185.98 237.76C186.18 237.69 186.34 237.83 186.35 238.06Z"
                fill="#263238"
              />
              <path
                d="M184.72 238.06L184.71 240.73L185.83 240.02L184.72 238.06Z"
                fill="#9A4A4D"
              />
              <path
                d="M183.3 244.26C182.4 244.37 180.53 244.26 180.24 243.49C180.343 243.861 180.573 244.183 180.89 244.4C181.664 244.711 182.486 244.887 183.32 244.92L183.3 244.26Z"
                fill="#9A4A4D"
              />
              <path
                d="M178.62 252.12C178.458 252.807 178.23 253.477 177.94 254.12C177.258 254.277 176.558 254.337 175.86 254.3C175.098 254.27 174.35 254.076 173.67 253.73C173.93 252.707 174.264 251.705 174.67 250.73C175.043 249.729 175.662 248.839 176.47 248.14C176.991 247.769 177.584 247.51 178.21 247.38C178.52 247.5 178.8 248.21 178.87 248.66C178.996 249.819 178.912 250.992 178.62 252.12Z"
                fill="#B16668"
              />
              <path
                d="M331.11 141.87L204.2 215.15C203.578 215.554 203.06 216.098 202.688 216.739C202.317 217.38 202.101 218.1 202.06 218.84V227.55C201.765 229.192 201.052 230.731 199.991 232.018C198.93 233.305 197.556 234.298 196 234.9C195.948 234.916 195.903 234.947 195.87 234.99C195.838 235.034 195.82 235.086 195.82 235.14C195.82 235.194 195.838 235.247 195.87 235.29C195.903 235.334 195.948 235.365 196 235.38C198.035 235.776 200.143 235.491 202 234.57V236.85C202 238.21 203 238.77 204.14 238.08L330.98 164.85C331.603 164.446 332.122 163.9 332.494 163.257C332.866 162.614 333.08 161.892 333.12 161.15L333.17 143.15C333.25 141.74 332.29 141.19 331.11 141.87Z"
                fill="#E5C34E"
              />
              <path
                d="M207.11 218.06L224.85 207.82C225.43 207.48 225.91 207.72 225.91 208.35C225.882 208.706 225.771 209.05 225.587 209.355C225.404 209.661 225.151 209.919 224.85 210.11L207.11 220.35C206.52 220.69 206.04 220.45 206.04 219.82C206.068 219.463 206.179 219.118 206.365 218.812C206.551 218.507 206.806 218.249 207.11 218.06Z"
                fill="#455A64"
              />
              <path
                d="M211.08 221.31L325.24 155.4C325.83 155.07 326.3 155.3 326.3 155.94C326.274 156.296 326.165 156.641 325.981 156.947C325.796 157.253 325.543 157.511 325.24 157.7L211.08 223.61C210.49 223.95 210.02 223.71 210.02 223.07C210.046 222.714 210.155 222.369 210.339 222.064C210.524 221.758 210.777 221.5 211.08 221.31Z"
                fill="#455A64"
              />
              <path
                d="M211.08 226.9L289.76 181.46C290.35 181.12 290.83 181.36 290.83 181.99C290.804 182.349 290.693 182.696 290.507 183.004C290.321 183.311 290.065 183.57 289.76 183.76L211.08 229.19C210.49 229.53 210.02 229.29 210.02 228.66C210.046 228.304 210.155 227.959 210.339 227.654C210.524 227.348 210.777 227.09 211.08 226.9Z"
                fill="#455A64"
              />
              <path
                d="M168.43 332.12L343 231.34C344.17 230.66 345.11 231.21 345.11 232.56V269C345.072 269.735 344.861 270.45 344.495 271.088C344.128 271.726 343.616 272.268 343 272.67L168.43 373.41C167.26 374.09 166.31 373.54 166.31 372.19V335.79C166.351 335.055 166.564 334.34 166.932 333.702C167.3 333.064 167.813 332.522 168.43 332.12Z"
                fill="#E0E0E0"
              />
              <path
                d="M168.43 332.12L343 231.34C344.17 230.66 345.11 231.21 345.11 232.56V269C345.072 269.735 344.861 270.45 344.495 271.088C344.128 271.726 343.616 272.268 343 272.67L168.43 373.41C167.26 374.09 166.31 373.54 166.31 372.19V335.79C166.351 335.055 166.564 334.34 166.932 333.702C167.3 333.064 167.813 332.522 168.43 332.12Z"
                fill="#F0F0F0"
              />
              <path
                d="M177.81 362.07C177.782 362.287 177.671 362.484 177.5 362.62C177.536 362.705 177.553 362.798 177.55 362.89C177.535 363.02 177.491 363.144 177.419 363.253C177.348 363.363 177.253 363.454 177.14 363.52L175.32 364.58V362.19C175.32 362.19 175.82 361.05 175.86 360.89C175.885 360.604 175.885 360.316 175.86 360.03C175.906 359.945 175.98 359.878 176.069 359.84C176.158 359.802 176.257 359.795 176.35 359.82C176.401 359.845 176.44 359.887 176.46 359.94C176.518 360.06 176.555 360.188 176.57 360.32C176.608 360.542 176.608 360.768 176.57 360.99L177.67 360.36C177.77 360.3 177.84 360.3 177.89 360.36C177.928 360.387 177.958 360.423 177.978 360.465C177.997 360.507 178.005 360.554 178 360.6C177.995 360.771 177.935 360.936 177.83 361.07C177.83 361.07 178.05 361.01 178.05 361.3C178.044 361.404 178.017 361.505 177.971 361.598C177.925 361.691 177.86 361.773 177.78 361.84C177.78 361.84 177.81 361.87 177.81 362.07Z"
                fill="#37474F"
              />
              <path
                d="M175.06 364.42V364.93C175.057 364.967 175.046 365.002 175.027 365.033C175.008 365.065 174.981 365.091 174.95 365.11L174.36 365.45H174.26V362.72L174.74 362.44L175.02 362.27C175.029 362.306 175.029 362.344 175.02 362.38L175.06 364.42Z"
                fill="#37474F"
              />
              <path
                d="M181.2 358.11L193.48 351.05C194.07 350.72 194.54 350.95 194.54 351.59C194.514 351.946 194.405 352.291 194.221 352.597C194.036 352.903 193.783 353.161 193.48 353.35L181.2 360.35C180.61 360.69 180.14 360.45 180.14 359.82C180.176 359.474 180.289 359.14 180.473 358.843C180.657 358.547 180.905 358.296 181.2 358.11Z"
                fill="#37474F"
              />
              <path
                d="M243.88 321.65L256.16 314.65C256.74 314.31 257.22 314.55 257.22 315.18C257.192 315.536 257.081 315.88 256.897 316.185C256.714 316.491 256.461 316.749 256.16 316.94L243.88 324C243.29 324.34 242.81 324.1 242.81 323.46C242.83 323.095 242.938 322.74 243.124 322.425C243.31 322.11 243.57 321.844 243.88 321.65Z"
                fill="#37474F"
              />
              <path
                d="M239.46 323.92C239.46 323.52 239.18 323.35 238.83 323.56L235 325.79C234.815 325.911 234.662 326.073 234.552 326.264C234.443 326.455 234.38 326.67 234.37 326.89V329.53C234.37 329.94 234.65 330.1 235.01 329.9L236.08 329.29V330.21C236.08 330.27 236.16 330.3 236.19 330.21L237.77 328.31L238.91 327.66C239.097 327.542 239.251 327.38 239.361 327.188C239.471 326.996 239.532 326.781 239.54 326.56L239.46 323.92Z"
                fill="#37474F"
              />
              <path
                d="M319.91 277.88L332.19 270.83C332.77 270.49 333.25 270.73 333.25 271.36C333.222 271.715 333.111 272.059 332.928 272.365C332.744 272.67 332.491 272.929 332.19 273.12L319.91 280.18C319.32 280.52 318.85 280.28 318.85 279.64C318.876 279.284 318.985 278.939 319.17 278.633C319.354 278.327 319.607 278.069 319.91 277.88Z"
                fill="#37474F"
              />
              <path
                d="M316 281.31L313 280.38V282C311.818 282.504 310.797 283.324 310.05 284.37C308.41 286.82 309.6 288.22 310.15 288.37C310.15 288.37 309.28 287.78 310.24 286.02C310.907 285.047 311.877 284.322 313 283.96V285.76L316 281.31Z"
                fill="#37474F"
              />
              <path
                d="M192 334.91C192 339.28 190.07 344.25 187.13 348.19C187.11 348.219 187.086 348.246 187.06 348.27C186.71 348.75 186.34 349.21 185.94 349.66C185.318 350.37 184.65 351.038 183.94 351.66C183.57 351.99 183.19 352.3 182.81 352.58C182.276 352.986 181.719 353.36 181.14 353.7C179.753 354.551 178.183 355.058 176.56 355.18H176.34C176.036 355.186 175.731 355.166 175.43 355.12C174.183 354.97 173.032 354.373 172.19 353.44L172.1 353.35C170.795 351.659 170.145 349.553 170.27 347.42C170.27 340.49 175.14 332.06 181.14 328.59C187.14 325.12 192 328 192 334.91Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.4"
                d="M192 334.91C192 339.28 190.07 344.25 187.13 348.19C187.11 348.219 187.086 348.246 187.06 348.27C186.71 348.75 186.34 349.21 185.94 349.66C185.318 350.37 184.65 351.038 183.94 351.66C183.57 351.99 183.19 352.3 182.81 352.58C182.276 352.986 181.719 353.36 181.14 353.7C179.753 354.551 178.183 355.058 176.56 355.18H176.34C176.036 355.186 175.731 355.166 175.43 355.12C174.183 354.97 173.032 354.373 172.19 353.44L172.1 353.35C170.795 351.659 170.145 349.553 170.27 347.42C170.27 340.49 175.14 332.06 181.14 328.59C187.14 325.12 192 328 192 334.91Z"
                fill="black"
              />
              <path
                d="M182.91 347.36H182.83L182.71 347.47C181.71 348.47 181.64 349.39 182.11 350.86C182.297 351.448 182.514 352.025 182.76 352.59C183.14 352.31 183.52 352 183.89 351.67C184.6 351.048 185.268 350.38 185.89 349.67C186.29 349.22 186.66 348.76 187.01 348.28C186.2 347.21 184.93 347 182.91 347.36Z"
                fill="#FFA8A7"
              />
              <path
                d="M187.09 348.19C187.07 348.219 187.046 348.246 187.02 348.27C186.67 348.75 186.3 349.21 185.9 349.66C185.278 350.37 184.61 351.038 183.9 351.66L183.53 350.17L182.94 347.73L182.85 347.35H182.92C183.8 347.113 184.722 347.072 185.62 347.23C186.209 347.364 186.73 347.705 187.09 348.19Z"
                fill="#455A64"
              />
              <path
                d="M178 346.53C177.19 346.53 174.42 344.21 174.42 340.62C174.422 339.946 174.503 339.275 174.66 338.62C174.831 337.919 175.1 337.245 175.46 336.62C175.836 335.92 176.326 335.288 176.91 334.75C178.047 333.777 179.304 332.953 180.65 332.3C181.363 331.909 182.132 331.633 182.93 331.48C183.738 331.34 184.568 331.516 185.25 331.97C185.651 332.273 185.937 332.703 186.06 333.19C186.175 333.599 186.175 334.031 186.06 334.44C186.25 334.39 186.66 334.7 186.79 334.85C186.975 335.085 187.095 335.364 187.14 335.66C187.147 335.984 187.088 336.306 186.968 336.606C186.848 336.907 186.668 337.18 186.44 337.41C186.653 337.864 186.73 338.371 186.661 338.868C186.592 339.365 186.379 339.831 186.05 340.21C185.3 341.04 184.05 341.3 183.3 342.09C182.723 342.808 182.288 343.629 182.02 344.51C181.72 345.21 181.2 346.17 180.35 346.32C179.9 346.39 179.35 346.38 178.94 346.44L178 346.53Z"
                fill="#263238"
              />
              <path
                d="M185.9 349.66C185.278 350.37 184.61 351.038 183.9 351.66C183.53 351.99 183.15 352.3 182.77 352.58C182.236 352.986 181.679 353.36 181.1 353.7C179.713 354.551 178.143 355.058 176.52 355.18H176.3C175.996 355.186 175.691 355.166 175.39 355.12C175.9 353.55 176.18 351.36 174.68 349.74C175.13 349.39 178.96 347.98 178.96 347.98L182.64 347.36C182.706 347.349 182.774 347.349 182.84 347.36C183.46 347.43 184.63 348.18 185.9 349.66Z"
                fill="#E5C34E"
              />
              <path
                d="M184.24 334.52C184.9 334.79 185.7 336.52 185.62 340.52C185.56 343.91 184.62 344.99 184.13 345.36C183.427 345.728 182.643 345.914 181.85 345.9V347.47C181.85 347.47 183.08 348.79 183.01 349.74C182.94 350.69 181.23 351.36 180.07 350.74C179.221 350.201 178.498 349.484 177.95 348.64V344.43C177.867 344.535 177.762 344.62 177.644 344.681C177.525 344.742 177.394 344.777 177.261 344.784C177.127 344.79 176.994 344.769 176.87 344.72C176.746 344.671 176.633 344.596 176.54 344.5C176.163 344.205 175.911 343.778 175.835 343.305C175.759 342.833 175.864 342.349 176.13 341.95C176.7 341.13 177.76 341.02 178.13 341.87C178.622 340.614 179.52 339.558 180.68 338.87C181.53 338.414 182.282 337.796 182.893 337.049C183.504 336.303 183.962 335.443 184.24 334.52Z"
                fill="#FFA8A7"
              />
              <path
                d="M182.36 340.5C182.366 340.617 182.337 340.733 182.277 340.833C182.216 340.932 182.127 341.012 182.02 341.06C181.972 341.075 181.921 341.078 181.872 341.069C181.823 341.06 181.777 341.038 181.738 341.006C181.699 340.974 181.669 340.933 181.65 340.887C181.631 340.84 181.624 340.79 181.63 340.74C181.622 340.623 181.652 340.506 181.715 340.407C181.778 340.309 181.871 340.232 181.98 340.19C182.18 340.12 182.35 340.26 182.36 340.5Z"
                fill="#263238"
              />
              <path
                d="M182.21 343.15L183.59 343.29C183.549 343.505 183.439 343.7 183.277 343.847C183.114 343.993 182.908 344.082 182.69 344.1C182.31 344.06 182.09 343.64 182.21 343.15Z"
                fill="#B16668"
              />
              <path
                d="M185.37 338.39L184.63 338C184.77 337.72 185.04 337.58 185.25 337.69C185.353 337.771 185.423 337.888 185.445 338.017C185.467 338.146 185.44 338.279 185.37 338.39Z"
                fill="#263238"
              />
              <path
                d="M181.29 339.8L182 339C181.86 338.79 181.59 338.8 181.38 339C181.283 339.107 181.222 339.242 181.206 339.385C181.19 339.529 181.219 339.674 181.29 339.8Z"
                fill="#263238"
              />
              <path
                d="M185.2 339.44C185.206 339.555 185.176 339.67 185.116 339.768C185.055 339.866 184.966 339.944 184.86 339.99C184.812 340.005 184.761 340.009 184.712 339.999C184.663 339.99 184.617 339.968 184.578 339.936C184.539 339.905 184.509 339.864 184.49 339.817C184.471 339.77 184.464 339.72 184.47 339.67C184.465 339.554 184.496 339.438 184.559 339.34C184.621 339.242 184.712 339.165 184.82 339.12C185 339.05 185.19 339.19 185.2 339.44Z"
                fill="#263238"
              />
              <path
                d="M183.47 339.66L183.53 342.19L184.69 341.47L183.47 339.66Z"
                fill="#F28F8F"
              />
              <path
                d="M181.85 345.86C180.91 345.97 178.98 345.86 178.68 345.04C178.785 345.425 179.027 345.759 179.36 345.98C180.152 346.307 180.994 346.494 181.85 346.53V345.86Z"
                fill="#F28F8F"
              />
              <path
                d="M176.29 355.22C175.986 355.226 175.681 355.206 175.38 355.16C174.133 355.01 172.982 354.413 172.14 353.48C172.62 352.048 173.485 350.775 174.64 349.8C175.86 349.93 176.23 351.55 176.36 352.49C176.476 353.399 176.452 354.319 176.29 355.22Z"
                fill="#FFA8A7"
              />
              <path
                d="M176.51 355.22H176.29C175.986 355.226 175.681 355.206 175.38 355.16C174.133 355.01 172.982 354.413 172.14 353.48L172.05 353.39C172.087 353.287 172.131 353.187 172.18 353.09C172.614 351.751 173.479 350.594 174.64 349.8C174.769 349.732 174.902 349.676 175.04 349.63C176.94 350.56 176.86 353.34 176.51 355.22Z"
                fill="#455A64"
              />
              <path
                d="M182.69 344.1C182.8 344.093 182.907 344.058 183 344C182.983 343.835 182.905 343.682 182.781 343.571C182.657 343.46 182.496 343.399 182.33 343.4H182.15C182.139 343.481 182.144 343.564 182.165 343.644C182.186 343.723 182.223 343.798 182.273 343.863C182.324 343.928 182.386 343.983 182.458 344.023C182.529 344.064 182.608 344.09 182.69 344.1Z"
                fill="#F28F8F"
              />
              <path
                d="M331.11 243L204.21 316.12C203.588 316.526 203.07 317.072 202.698 317.715C202.327 318.357 202.111 319.079 202.07 319.82V328.68C201.769 330.318 201.053 331.851 199.99 333.132C198.927 334.414 197.554 335.401 196 336C195.948 336.015 195.903 336.047 195.87 336.09C195.838 336.133 195.82 336.186 195.82 336.24C195.82 336.294 195.838 336.347 195.87 336.39C195.903 336.433 195.948 336.465 196 336.48C198.035 336.881 200.145 336.596 202 335.67V337.79C202 339.16 203 339.71 204.14 339.03L330.98 265.95C331.602 265.547 332.12 265.002 332.492 264.361C332.864 263.72 333.079 263 333.12 262.26L333.17 244.21C333.25 242.84 332.29 242.29 331.11 243Z"
                fill="#E5C34E"
              />
              <path
                d="M207.11 319.11L224.85 308.87C225.43 308.53 225.91 308.77 225.91 309.4C225.883 309.756 225.774 310.1 225.59 310.406C225.405 310.712 225.152 310.97 224.85 311.16L207.11 321.4C206.52 321.74 206.04 321.5 206.04 320.87C206.068 320.513 206.179 320.168 206.365 319.862C206.551 319.557 206.806 319.299 207.11 319.11Z"
                fill="#455A64"
              />
              <path
                d="M211.08 322.37L325.24 256.46C325.83 256.12 326.3 256.36 326.3 256.99C326.274 257.346 326.165 257.691 325.981 257.997C325.796 258.303 325.543 258.561 325.24 258.75L211.08 324.66C210.49 325 210.02 324.76 210.02 324.13C210.043 323.774 210.152 323.428 210.336 323.122C210.521 322.815 210.776 322.558 211.08 322.37Z"
                fill="#455A64"
              />
              <path
                d="M211.08 328L310 270.83C310.59 270.49 311.06 270.73 311.06 271.36C311.034 271.716 310.925 272.061 310.741 272.367C310.556 272.673 310.303 272.931 310 273.12L211.09 330.24C210.5 330.58 210.03 330.35 210.03 329.71C210.062 329.364 210.174 329.029 210.356 328.733C210.538 328.436 210.786 328.185 211.08 328Z"
                fill="#455A64"
              />
              <path
                d="M310.12 336.23L338.27 330.72C338.449 330.685 338.634 330.707 338.799 330.782C338.965 330.857 339.103 330.983 339.193 331.141C339.284 331.299 339.322 331.481 339.304 331.662C339.285 331.843 339.211 332.014 339.09 332.15L320 353.78L310.12 336.23Z"
                fill="#FFA8A7"
              />
              <path
                d="M339.09 332.15C339.211 332.014 339.285 331.843 339.304 331.662C339.322 331.481 339.284 331.299 339.193 331.141C339.103 330.983 338.965 330.857 338.799 330.782C338.634 330.707 338.449 330.685 338.27 330.72L332.78 331.8C333.535 332.267 334.147 332.933 334.547 333.725C334.948 334.518 335.122 335.405 335.05 336.29V336.78L339.09 332.15Z"
                fill="#263238"
              />
              <path
                d="M215 414L217.3 412.68L220.08 411.1L320 353.78C320.923 350.682 320.641 347.349 319.21 344.45C317.21 339.98 313.34 336.45 310.13 336.25L210.32 393.5L205 396.55C208.55 394.76 218.57 412.14 215 414Z"
                fill="#E5C34E"
              />
              <path
                d="M223.82 409L228.96 406C230.47 405.2 229.6 401.47 227.83 397.61C225.48 392.49 220.83 387.53 218.83 388.61L215.04 390.79L213.7 391.59C215.7 390.52 220.33 395.48 222.7 400.59C224.4 404.28 225.26 407.88 223.97 408.86C223.936 408.921 223.883 408.97 223.82 409Z"
                fill="#EBEBEB"
              />
              <path
                d="M225.1 408.22C228.62 406.35 218.52 388.96 214.99 390.83L209.84 393.77C213.37 391.9 223.47 409.3 219.94 411.17L225.1 408.22Z"
                fill="#E5C34E"
              />
              <path
                d="M215 414L220.08 411.1C223.56 409.29 213.95 392.42 210.28 393.53C210.206 393.543 210.134 393.57 210.07 393.61L204.97 396.61C208.55 394.76 218.57 412.14 215 414Z"
                fill="#EBEBEB"
              />
              <path
                opacity="0.15"
                d="M339.22 331.21L338.22 330.72L317.8 341.89L212.19 402.49C211.99 402.17 211.83 402.15 211.69 402.37C214.69 407.05 216.96 412.94 214.99 413.97L217.29 412.65L220.07 411.07L320 353.78L339.09 332.15C339.205 332.026 339.279 331.869 339.303 331.701C339.326 331.533 339.297 331.361 339.22 331.21Z"
                fill="black"
              />
              <path
                d="M193.46 426.32L215 414C216.51 413.22 215.67 409.53 213.93 405.69C211.6 400.56 206.99 395.55 204.93 396.58L183.34 409C179.04 411.48 182.99 420.82 187.78 425C189.57 426.51 191.56 427.21 193.46 426.32Z"
                fill="#F28F8F"
              />
              <path
                opacity="0.1"
                d="M194.75 419.63C193.51 414.76 189.57 409.99 185.95 408.97C185.416 408.779 184.844 408.719 184.281 408.796C183.719 408.873 183.184 409.083 182.72 409.41C179.47 412.41 183.25 420.99 187.79 424.94C189.53 426.48 191.49 427.17 193.35 426.36C195 425.41 195.59 422.92 194.75 419.63Z"
                fill="black"
              />
              <path
                d="M418.32 169.68L399.65 170.22C398.96 169.63 395.31 165.98 395.31 165.98C395.31 165.98 384.56 164.61 384.5 164.98C384.44 165.35 393.99 176.98 395.05 178.13C396.039 179.1 397.31 179.73 398.68 179.93C401.46 180.1 416.73 180.24 416.73 180.24L418.32 169.68Z"
                fill="#B16668"
              />
              <path
                d="M419.25 169.68C417.75 169.27 399.99 169.97 399.99 169.97L395.43 165.67C395.43 165.67 392.85 165.2 388.95 164.83C385.05 164.46 383.78 164.83 383.78 164.83C383.78 164.83 392.43 175.63 393.78 177.41C395.13 179.19 395.96 180.26 398.94 180.41C402.71 180.57 417.47 180.65 417.47 180.65L419.25 169.68Z"
                fill="#E5C34E"
              />
              <path
                d="M444.25 314.89C443.229 315.435 442.095 315.737 440.938 315.772C439.781 315.806 438.632 315.573 437.58 315.09L436 302L444.43 300.06L444.25 314.89Z"
                fill="#FFA8A7"
              />
              <path
                d="M419.47 307.77C417.87 311.52 415.53 310.3 411.98 308.03L411.74 295.1L420.93 294.47L419.47 307.77Z"
                fill="#FFA8A7"
              />
              <path
                d="M430 327C429.812 327.739 429.857 328.518 430.13 329.23C430.717 329.811 431.416 330.266 432.184 330.569C432.953 330.871 433.775 331.015 434.6 330.99C436.835 331.216 439.086 330.752 441.05 329.66C441.706 329.296 442.262 328.775 442.667 328.143C443.072 327.511 443.313 326.789 443.37 326.04C443.47 324.55 443.26 323.12 443.93 321.95C444.6 320.78 445.4 319.81 445.61 319.23C445.873 318.183 445.907 317.092 445.71 316.03L430 327Z"
                fill="#263238"
              />
              <path
                d="M436.62 314.54C436.603 315.103 436.512 315.661 436.35 316.2C435.774 317.96 434.916 319.615 433.81 321.1C433.04 322.1 432.08 322.87 431.27 323.79C430.404 324.671 429.868 325.822 429.75 327.05C429.7 329.11 431.95 329.74 433.67 329.99C435.533 330.261 437.433 330.111 439.23 329.55C440.175 329.273 441.021 328.729 441.667 327.985C442.312 327.24 442.73 326.326 442.87 325.35C442.94 324.77 442.87 324.19 442.94 323.62C443.133 322.304 443.644 321.054 444.43 319.98C444.889 319.357 445.281 318.686 445.6 317.98C446.09 316.7 445.6 315.28 445.24 314.03C444.91 312.94 444.66 311.64 444.24 311.75C444.24 311.97 444.24 312.45 444.24 312.45C444.13 312.7 443.85 312.86 443.78 313.14C443.709 313.435 443.612 313.723 443.49 314C443.306 314.416 442.999 314.766 442.61 315L442.46 312.68C442.48 312.559 442.472 312.435 442.437 312.318C442.402 312.2 442.341 312.092 442.258 312.001C442.176 311.911 442.073 311.84 441.959 311.795C441.845 311.75 441.722 311.731 441.6 311.74C440.154 311.437 438.67 311.356 437.2 311.5C436.977 311.514 436.769 311.615 436.62 311.78C436.538 311.944 436.51 312.13 436.54 312.31C436.608 313.052 436.635 313.796 436.62 314.54Z"
                fill="#455A64"
              />
              <path
                d="M434.59 320C435.33 319.4 437.04 319.34 437.98 319.41C438.934 319.47 439.858 319.765 440.67 320.27C440.789 320.351 440.934 320.387 441.077 320.37C441.22 320.354 441.353 320.286 441.45 320.18C441.509 320.121 441.554 320.05 441.582 319.971C441.61 319.893 441.621 319.809 441.613 319.726C441.605 319.643 441.58 319.563 441.538 319.491C441.496 319.419 441.438 319.357 441.37 319.31C440.481 318.707 439.443 318.361 438.37 318.31C436.06 318.22 435.37 318.64 435.37 318.64C435.37 318.64 434.34 319.29 434.59 320Z"
                fill="#F5F5F5"
              />
              <path
                d="M432.89 322.12C434.082 321.627 435.381 321.455 436.66 321.62C437.598 321.687 438.502 322.001 439.28 322.53C439.399 322.611 439.544 322.647 439.687 322.63C439.83 322.614 439.962 322.546 440.06 322.44C440.118 322.38 440.162 322.308 440.19 322.23C440.217 322.151 440.227 322.067 440.218 321.984C440.21 321.901 440.183 321.821 440.14 321.749C440.097 321.678 440.039 321.617 439.97 321.57C439.062 320.923 437.992 320.543 436.88 320.47C434.57 320.37 433.99 320.86 433.99 320.86C433.724 320.975 433.488 321.147 433.297 321.365C433.107 321.583 432.968 321.841 432.89 322.12Z"
                fill="#F5F5F5"
              />
              <path
                d="M439.19 316C438.218 315.862 437.226 315.975 436.31 316.33C435.91 316.57 435.66 317.22 435.92 317.33C436.726 316.981 437.605 316.837 438.48 316.91C439.346 316.968 440.195 317.174 440.99 317.52C441.19 317.6 441.43 317.71 441.64 317.82C441.706 317.854 441.778 317.874 441.852 317.879C441.926 317.884 442 317.874 442.071 317.85C442.141 317.826 442.205 317.787 442.26 317.738C442.315 317.688 442.359 317.627 442.39 317.56C442.439 317.443 442.443 317.313 442.403 317.194C442.362 317.074 442.279 316.973 442.17 316.91C441.251 316.402 440.236 316.092 439.19 316Z"
                fill="#F5F5F5"
              />
              <path
                d="M397.93 316.37C397.746 316.975 397.803 317.627 398.09 318.19C398.36 318.72 401.19 320.19 404.95 319.84C407.735 319.566 410.395 318.547 412.65 316.89C414.079 316 415.726 315.523 417.41 315.51C419.27 315.35 421.69 314.35 422.07 313.46C422.263 312.675 422.218 311.85 421.94 311.09L397.93 316.37Z"
                fill="#263238"
              />
              <path
                d="M412.8 304.83L411.8 304.5C411.623 304.432 411.427 304.432 411.25 304.5C411.01 304.59 410.92 304.88 410.87 305.13C410.799 305.691 410.675 306.243 410.5 306.78C410.24 307.219 409.901 307.606 409.5 307.92C408.589 308.689 407.601 309.359 406.55 309.92C405.34 310.62 404.15 311.17 402.89 311.78C401.63 312.39 399.89 312.78 398.89 313.52C398.532 313.78 398.244 314.124 398.049 314.52C397.855 314.917 397.76 315.356 397.774 315.797C397.788 316.239 397.91 316.671 398.129 317.055C398.347 317.439 398.657 317.763 399.03 318C401.985 319.238 405.286 319.369 408.33 318.37C410.49 317.68 412.85 315.28 415.71 314.97C417.52 314.77 420.95 314.16 422.08 312.74C422.5 312.11 421.86 310.19 421.34 308.52C420.82 306.85 420.47 303.77 419.87 303.95C419.77 304.95 419.34 305 419.03 305.52C418.79 305.998 418.586 306.493 418.42 307C418.25 307.508 417.933 307.953 417.51 308.28C417.298 308.444 417.038 308.533 416.77 308.533C416.502 308.533 416.242 308.444 416.03 308.28C415.48 307.74 415.77 306.76 415.36 306.11C415.028 305.7 414.566 305.414 414.05 305.3L412.8 304.83Z"
                fill="#455A64"
              />
              <path
                d="M408.21 308.87C408.333 308.615 408.518 308.395 408.749 308.231C408.98 308.066 409.249 307.963 409.53 307.93C410.708 307.901 411.857 308.295 412.77 309.04C412.859 309.108 412.93 309.197 412.977 309.298C413.024 309.4 413.045 309.512 413.038 309.624C413.031 309.736 412.996 309.844 412.937 309.939C412.878 310.035 412.797 310.114 412.7 310.17C412.579 310.24 412.439 310.271 412.299 310.259C412.159 310.246 412.027 310.191 411.92 310.1C410.89 309.224 409.559 308.783 408.21 308.87Z"
                fill="#F5F5F5"
              />
              <path
                d="M405.68 310.38C405.853 310.121 406.086 309.907 406.359 309.757C406.633 309.607 406.938 309.526 407.25 309.52C408.528 309.533 409.768 309.953 410.79 310.72C410.876 310.785 410.945 310.869 410.991 310.966C411.037 311.064 411.058 311.171 411.053 311.278C411.048 311.386 411.017 311.49 410.963 311.583C410.908 311.676 410.832 311.754 410.74 311.81C410.624 311.879 410.49 311.91 410.355 311.9C410.221 311.889 410.093 311.837 409.99 311.75C409.419 311.215 408.736 310.814 407.99 310.577C407.244 310.34 406.455 310.273 405.68 310.38Z"
                fill="#F5F5F5"
              />
              <path
                d="M402.88 311.77C403.081 311.528 403.331 311.331 403.614 311.193C403.896 311.055 404.205 310.979 404.52 310.97C405.752 311.011 406.939 311.442 407.91 312.2C407.996 312.266 408.064 312.351 408.109 312.449C408.154 312.546 408.174 312.654 408.169 312.761C408.163 312.869 408.13 312.973 408.075 313.065C408.019 313.157 407.942 313.235 407.85 313.29C407.733 313.358 407.598 313.387 407.464 313.375C407.329 313.362 407.202 313.308 407.1 313.22C406.557 312.668 405.893 312.25 405.161 311.998C404.428 311.747 403.648 311.669 402.88 311.77Z"
                fill="#F5F5F5"
              />
              <path
                d="M441.17 213.86C442.07 228.21 443.52 264.13 443.52 264.13C443.73 265.91 444.39 271.18 444.71 277.61C445.19 286.94 444.45 307.54 444.45 307.54C443.231 308.187 441.891 308.576 440.515 308.685C439.139 308.793 437.756 308.618 436.45 308.17C436.45 308.17 431.14 277.82 429.45 268.65C427.95 260.65 425.05 241.19 425.05 241.19L423.69 265.06C423.944 269.338 423.837 273.63 423.37 277.89C422.84 282.14 420.37 300.62 420.37 300.62C417.519 301.374 414.517 301.347 411.68 300.54C411.68 300.54 410.41 269.54 410.22 265.64C410 261.17 409.07 210.97 409.07 210.97L441.17 213.86Z"
                fill="#37474F"
              />
              <path
                d="M425.08 241.19L422.6 229.48C422.6 229.48 416.7 229.14 413.34 225.95C413.34 225.95 414.02 229.15 421.48 230.86L424 242.71L424.25 253.71L425.08 241.19Z"
                fill="#263238"
              />
              <path
                d="M438.46 171.14C441.28 171.65 441.46 173.04 442.08 175.84C442.667 178.084 442.91 180.403 442.8 182.72L440.7 199.26L441.42 218.31C436.88 223.25 418.73 224.83 408.81 217.59C408.81 217.59 408.92 186.3 409.38 181.27C410.18 172.5 414.16 169.38 419.99 169.4L429.99 170.25L438.46 171.14Z"
                fill="#455A64"
              />
              <path
                d="M427.9 149C427.896 150.755 427.371 152.47 426.393 153.927C425.414 155.383 424.025 156.517 422.401 157.184C420.778 157.851 418.993 158.022 417.273 157.674C415.552 157.326 413.974 156.476 412.737 155.231C411.5 153.985 410.66 152.401 410.324 150.678C409.988 148.956 410.171 147.172 410.849 145.553C411.527 143.934 412.67 142.553 414.133 141.584C415.597 140.615 417.315 140.102 419.07 140.11C420.234 140.114 421.385 140.347 422.458 140.796C423.532 141.245 424.506 141.901 425.326 142.726C426.146 143.552 426.795 144.531 427.237 145.607C427.679 146.684 427.904 147.836 427.9 149Z"
                fill="#263238"
              />
              <path
                d="M430.68 150.69L432.57 145.61C433.074 145.556 433.584 145.617 434.061 145.791C434.538 145.964 434.969 146.244 435.32 146.61C436.5 147.82 435.83 151.61 434.32 155.31C434.32 155.31 432.86 162.05 432.32 163.16C431.939 163.847 431.303 164.357 430.55 164.58L430.68 150.69Z"
                fill="#263238"
              />
              <path
                d="M430.82 155.59C431.36 155.92 432.14 154.88 432.82 154.18C433.083 153.879 433.419 153.651 433.795 153.516C434.172 153.381 434.576 153.344 434.971 153.409C435.365 153.474 435.737 153.639 436.05 153.888C436.363 154.136 436.607 154.461 436.76 154.83C437.87 157.17 435.76 160.26 434.06 160.83C431.06 161.75 430.66 159.83 430.66 159.83L430.39 170.52C429.731 171.952 428.728 173.198 427.47 174.147C426.211 175.097 424.738 175.72 423.18 175.96C417.92 176.65 419.02 172.32 420.75 170.21V166.95C419.427 167.158 418.086 167.221 416.75 167.14C414.57 166.8 413.21 165.07 412.56 162.71C411.51 158.92 411.11 155.86 412.04 148.41C413.04 140.24 422.56 140.19 427.68 143.41C432.8 146.63 430.82 155.59 430.82 155.59Z"
                fill="#FFA8A7"
              />
              <path
                d="M430.77 156.31C431.62 156.06 432.25 154.69 432.77 154.18C433.71 153.33 432.53 145.61 432.53 145.61C432.779 144.944 432.827 144.22 432.669 143.527C432.511 142.834 432.153 142.202 431.64 141.71C430.36 140.29 428.22 140.13 424.57 139.54C422.76 139.25 420.63 139.11 418.84 138.78C416.993 138.49 415.202 137.916 413.53 137.08C413.234 136.886 412.884 136.791 412.53 136.81C412.391 136.848 412.261 136.917 412.151 137.01C412.04 137.103 411.951 137.219 411.89 137.35C411.775 137.614 411.724 137.902 411.74 138.19C411.748 138.493 411.802 138.793 411.9 139.08C411.95 139.25 412.3 139.77 412.23 139.92C412.04 140.3 410.64 139.67 410.36 139.59C410.292 139.566 410.218 139.566 410.15 139.59C410.124 139.603 410.1 139.621 410.081 139.643C410.062 139.666 410.048 139.692 410.04 139.72C409.834 140.199 409.742 140.718 409.769 141.239C409.797 141.759 409.945 142.266 410.2 142.72C411.336 144.67 413.098 146.178 415.2 147C417.367 147.913 419.732 148.258 422.07 148C423.066 147.884 424.045 147.656 424.99 147.32C425.179 147.671 425.396 148.005 425.64 148.32C425.912 148.64 426.228 148.92 426.58 149.15C426.928 149.388 427.313 149.567 427.72 149.68C428.14 149.79 428.54 149.74 428.77 150.19C428.896 150.487 428.954 150.808 428.94 151.13C428.94 152.13 429 153.02 429.02 153.97C429.011 154.451 429.078 154.93 429.22 155.39C429.294 155.625 429.423 155.838 429.597 156.012C429.772 156.187 429.985 156.316 430.22 156.39C430.407 156.419 430.599 156.391 430.77 156.31Z"
                fill="#263238"
              />
              <path
                d="M420.76 166.93C423.003 166.514 425.202 165.891 427.33 165.07C428.334 164.554 429.157 163.745 429.69 162.75C429.432 163.744 428.976 164.676 428.35 165.49C427.1 167.08 420.76 168.23 420.76 168.23V166.93Z"
                fill="#F28F8F"
              />
              <path
                d="M421.48 154.12C421.48 154.318 421.539 154.511 421.648 154.676C421.758 154.84 421.915 154.968 422.097 155.044C422.28 155.12 422.481 155.139 422.675 155.101C422.869 155.062 423.047 154.967 423.187 154.827C423.327 154.687 423.422 154.509 423.461 154.315C423.499 154.121 423.48 153.92 423.404 153.737C423.328 153.555 423.2 153.399 423.036 153.289C422.871 153.179 422.678 153.12 422.48 153.12C422.215 153.12 421.96 153.225 421.773 153.413C421.585 153.601 421.48 153.855 421.48 154.12Z"
                fill="#263238"
              />
              <path
                d="M422.64 151.11L424.8 152.51C424.983 152.215 425.045 151.861 424.973 151.521C424.9 151.182 424.698 150.884 424.41 150.69C424.267 150.598 424.107 150.535 423.94 150.507C423.772 150.478 423.601 150.483 423.435 150.522C423.27 150.562 423.114 150.634 422.978 150.735C422.841 150.836 422.726 150.963 422.64 151.11Z"
                fill="#263238"
              />
              <path
                d="M423.11 160.05L419.67 161.51C419.767 161.743 419.91 161.955 420.09 162.132C420.27 162.31 420.484 162.449 420.719 162.542C420.954 162.636 421.205 162.681 421.458 162.675C421.71 162.67 421.959 162.613 422.19 162.51C422.416 162.414 422.621 162.273 422.791 162.095C422.961 161.918 423.093 161.708 423.179 161.477C423.265 161.247 423.303 161.002 423.291 160.757C423.279 160.511 423.218 160.271 423.11 160.05Z"
                fill="#B16668"
              />
              <path
                d="M422.19 162.51C422.472 162.397 422.719 162.212 422.907 161.973C423.095 161.735 423.217 161.451 423.26 161.15C423.064 161.066 422.853 161.022 422.64 161.02C422.211 161.022 421.8 161.192 421.494 161.493C421.187 161.793 421.01 162.201 421 162.63C421.4 162.712 421.815 162.67 422.19 162.51Z"
                fill="#F28F8F"
              />
              <path
                d="M412.8 151.71L414.86 150.46C414.784 150.323 414.682 150.203 414.558 150.106C414.435 150.01 414.293 149.939 414.142 149.899C413.99 149.859 413.832 149.85 413.677 149.872C413.523 149.895 413.374 149.949 413.24 150.03C412.965 150.2 412.766 150.47 412.684 150.782C412.602 151.095 412.644 151.427 412.8 151.71Z"
                fill="#263238"
              />
              <path
                d="M413.59 153.71C413.59 153.908 413.649 154.101 413.759 154.266C413.868 154.43 414.025 154.558 414.207 154.634C414.39 154.71 414.591 154.729 414.785 154.691C414.979 154.652 415.157 154.557 415.297 154.417C415.437 154.277 415.532 154.099 415.571 153.905C415.609 153.711 415.59 153.51 415.514 153.327C415.438 153.145 415.31 152.988 415.146 152.878C414.981 152.769 414.788 152.71 414.59 152.71C414.325 152.71 414.07 152.815 413.883 153.003C413.695 153.19 413.59 153.445 413.59 153.71Z"
                fill="#263238"
              />
              <path
                d="M418.47 153.15L418.32 159.43L415.01 158.41L418.47 153.15Z"
                fill="#F28F8F"
              />
              <path
                d="M395.39 155.46C395.415 155.201 395.373 154.94 395.268 154.701C395.163 154.463 394.998 154.256 394.79 154.1L390.68 151.72C390.437 151.609 390.17 151.565 389.905 151.591C389.64 151.618 389.386 151.714 389.17 151.87L214.62 252.65C214.003 253.049 213.489 253.589 213.121 254.225C212.752 254.862 212.54 255.576 212.5 256.31V292.71C212.477 292.964 212.517 293.221 212.617 293.456C212.716 293.691 212.872 293.899 213.07 294.06C213.46 294.31 216.83 296.23 217.22 296.46C217.461 296.57 217.727 296.615 217.99 296.589C218.254 296.562 218.506 296.466 218.72 296.31L393.27 195.53C393.887 195.127 394.4 194.586 394.768 193.948C395.137 193.31 395.35 192.595 395.39 191.86V155.46Z"
                fill="#E0E0E0"
              />
              <path
                d="M218.72 255L393.27 154.24C394.44 153.56 395.39 154.11 395.39 155.46V191.86C395.35 192.595 395.136 193.311 394.768 193.948C394.4 194.586 393.887 195.128 393.27 195.53L218.72 296.31C217.55 296.98 216.6 296.44 216.6 295.09V258.69C216.635 257.951 216.845 257.231 217.214 256.589C217.583 255.947 218.099 255.403 218.72 255Z"
                fill="#F0F0F0"
              />
              <path
                d="M228.09 285C228.062 285.214 227.955 285.41 227.79 285.55C227.805 285.636 227.805 285.724 227.79 285.81C227.777 285.94 227.734 286.066 227.665 286.177C227.596 286.288 227.502 286.381 227.39 286.45L225.56 287.5V285.12C225.56 285.12 226.06 283.98 226.11 283.81C226.135 283.527 226.135 283.243 226.11 282.96C226.154 282.875 226.225 282.807 226.312 282.768C226.399 282.728 226.497 282.718 226.59 282.74C226.636 282.768 226.671 282.81 226.69 282.86C226.75 282.979 226.787 283.108 226.8 283.24C226.839 283.465 226.839 283.695 226.8 283.92L227.9 283.28C227.932 283.262 227.968 283.252 228.005 283.252C228.042 283.252 228.078 283.262 228.11 283.28C228.148 283.304 228.18 283.339 228.201 283.379C228.222 283.419 228.232 283.465 228.23 283.51C228.222 283.685 228.159 283.853 228.05 283.99C228.05 283.99 228.27 283.92 228.27 284.22C228.264 284.324 228.237 284.425 228.191 284.518C228.145 284.611 228.08 284.693 228 284.76C228 284.76 228.09 284.76 228.09 285Z"
                fill="#37474F"
              />
              <path
                d="M225.34 287.32V287.83C225.332 287.901 225.296 287.965 225.24 288.01L224.65 288.35H224.54V285.61L225.03 285.34L225.31 285.17C225.319 285.206 225.319 285.244 225.31 285.28L225.34 287.32Z"
                fill="#37474F"
              />
              <path
                d="M231.49 281L243.77 274C244.35 273.66 244.83 273.9 244.83 274.53C244.803 274.887 244.694 275.233 244.51 275.54C244.326 275.848 244.072 276.108 243.77 276.3L231.49 283.35C230.9 283.69 230.42 283.45 230.42 282.82C230.438 282.453 230.544 282.095 230.731 281.778C230.917 281.461 231.178 281.194 231.49 281Z"
                fill="#37474F"
              />
              <path
                d="M294.16 244.55L306.44 237.49C307.03 237.16 307.5 237.39 307.5 238.03C307.474 238.386 307.365 238.731 307.18 239.037C306.996 239.342 306.743 239.6 306.44 239.79L294.16 246.84C293.58 247.18 293.1 246.94 293.1 246.31C293.128 245.954 293.239 245.61 293.423 245.305C293.606 244.999 293.859 244.741 294.16 244.55Z"
                fill="#37474F"
              />
              <path
                d="M289.75 246.82C289.75 246.41 289.46 246.25 289.11 246.45L285.25 248.68C285.066 248.802 284.912 248.964 284.801 249.155C284.69 249.346 284.625 249.56 284.61 249.78V252.43C284.61 252.84 284.9 253 285.25 252.8L286.32 252.19V253.11C286.325 253.121 286.332 253.13 286.342 253.136C286.352 253.143 286.363 253.146 286.375 253.146C286.387 253.146 286.398 253.143 286.408 253.136C286.418 253.13 286.425 253.121 286.43 253.11L288.01 251.21L289.14 250.56C289.328 250.442 289.484 250.281 289.595 250.089C289.707 249.897 289.77 249.682 289.78 249.46L289.75 246.82Z"
                fill="#37474F"
              />
              <path
                d="M370.19 200.78L382.47 193.73C383.06 193.39 383.54 193.62 383.54 194.26C383.512 194.617 383.401 194.962 383.215 195.268C383.029 195.573 382.774 195.831 382.47 196.02L370.19 203.02C369.61 203.36 369.13 203.13 369.13 202.49C369.166 202.143 369.279 201.809 369.463 201.513C369.647 201.217 369.895 200.966 370.19 200.78Z"
                fill="#37474F"
              />
              <path
                d="M366.26 204.21L363.26 203.28V204.87C362.078 205.369 361.059 206.19 360.32 207.24C358.68 209.69 359.87 211.09 360.42 211.19C360.42 211.19 359.55 210.59 360.51 208.84C361.169 207.861 362.137 207.133 363.26 206.77V208.58L366.26 204.21Z"
                fill="#37474F"
              />
              <path
                d="M242.25 257.81C242.065 262.215 240.617 266.474 238.08 270.08L237.88 270.39C237.66 270.69 237.45 270.99 237.22 271.28C236.554 272.17 235.822 273.01 235.03 273.79C234.78 274.04 234.52 274.29 234.26 274.51C233.373 275.318 232.405 276.032 231.37 276.64C230.145 277.378 228.785 277.864 227.37 278.07H227.01C226.259 278.134 225.502 278.056 224.78 277.84C224.162 277.653 223.586 277.351 223.08 276.95L222.98 276.87C221.44 275.59 220.51 273.35 220.51 270.33C220.51 263.4 225.38 254.97 231.38 251.5C237.38 248.03 242.25 250.88 242.25 257.81Z"
                fill="#E5C34E"
              />
              <path
                opacity="0.4"
                d="M242.25 257.81C242.065 262.215 240.617 266.474 238.08 270.08L237.88 270.39C237.66 270.69 237.45 270.99 237.22 271.28C236.554 272.17 235.822 273.01 235.03 273.79C234.78 274.04 234.52 274.29 234.26 274.51C233.373 275.318 232.405 276.032 231.37 276.64C230.145 277.378 228.785 277.864 227.37 278.07H227.01C226.259 278.134 225.502 278.056 224.78 277.84C224.162 277.653 223.586 277.351 223.08 276.95L222.98 276.87C221.44 275.59 220.51 273.35 220.51 270.33C220.51 263.4 225.38 254.97 231.38 251.5C237.38 248.03 242.25 250.88 242.25 257.81Z"
                fill="black"
              />
              <path
                d="M237.88 270.39C237.66 270.69 237.45 270.99 237.22 271.28C236.554 272.171 235.822 273.01 235.03 273.79C234.766 272.407 234.959 270.975 235.58 269.71C235.99 269.627 236.414 269.646 236.815 269.764C237.215 269.883 237.581 270.098 237.88 270.39Z"
                fill="#FFA8A7"
              />
              <path
                d="M235.69 269.06C235.011 269.058 234.336 269.163 233.69 269.37L232.96 269.6L232.58 269.74L233.2 271.45L234.29 274.5C234.55 274.28 234.81 274.03 235.06 273.78C235.852 273 236.584 272.161 237.25 271.27C237.48 270.98 237.69 270.68 237.91 270.38L238.11 270.07C237.798 269.743 237.423 269.485 237.006 269.311C236.589 269.137 236.141 269.052 235.69 269.06Z"
                fill="#E5C34E"
              />
              <path
                d="M237.22 271.28C236.554 272.171 235.822 273.01 235.03 273.79C234.78 274.04 234.52 274.29 234.26 274.51C233.373 275.318 232.404 276.032 231.37 276.64C230.145 277.378 228.785 277.864 227.37 278.07H227.01C226.259 278.134 225.502 278.056 224.78 277.84C224.777 276.899 224.912 275.962 225.18 275.06C225.385 274.408 225.75 273.817 226.24 273.34L226.53 273.08L227.04 272.75L228.68 271.69L229.04 271.45L231.57 270.03C231.987 269.784 232.439 269.602 232.91 269.49C233.148 269.423 233.393 269.382 233.64 269.37C234.292 269.316 234.947 269.433 235.54 269.71C236.254 270.039 236.844 270.59 237.22 271.28Z"
                fill="#455A64"
              />
              <path
                d="M229 260.38C229 263.07 230.89 264.75 233.22 264.12C234.459 263.68 235.531 262.867 236.288 261.792C237.046 260.718 237.452 259.435 237.45 258.12C237.45 255.43 235.45 255.43 233.1 256.05C230.75 256.67 229 257.68 229 260.38Z"
                fill="#263238"
              />
              <path
                d="M227.06 264.38C227.285 265.628 227.576 266.863 227.93 268.08C228.009 268.219 228.12 268.337 228.254 268.424C228.388 268.511 228.541 268.565 228.7 268.58V266.22L227.06 264.38Z"
                fill="#263238"
              />
              <path
                d="M227.84 259.33C227.596 259.372 227.364 259.465 227.159 259.603C226.954 259.74 226.781 259.92 226.65 260.13C226.13 260.88 226.42 262.69 227.06 264.38L228.23 264.22L227.84 259.33Z"
                fill="#263238"
              />
              <path
                d="M228.58 264.13C228.35 264.35 228.01 263.92 227.72 263.65C227.43 263.38 226.48 263.15 226.01 264.42C225.901 264.671 225.844 264.942 225.844 265.216C225.844 265.489 225.9 265.76 226.009 266.012C226.118 266.263 226.277 266.489 226.476 266.676C226.676 266.863 226.912 267.008 227.17 267.1C227.483 267.176 227.813 267.127 228.09 266.962C228.366 266.798 228.567 266.531 228.65 266.22V271.7C230.8 273.99 234.58 271.29 232.88 270.28V268.66C233.47 268.608 234.051 268.484 234.61 268.29C235.102 268.012 235.522 267.623 235.838 267.154C236.154 266.686 236.356 266.15 236.43 265.59C236.977 263.222 237.062 260.77 236.68 258.37C236.25 254.37 232.13 255.46 229.91 257.67C227.69 259.88 228.58 264.13 228.58 264.13Z"
                fill="#FFA8A7"
              />
              <path
                d="M228.54 264.45C228.5 264.466 228.457 264.473 228.414 264.471C228.372 264.469 228.33 264.459 228.291 264.44C228.253 264.421 228.218 264.395 228.191 264.362C228.163 264.329 228.142 264.291 228.13 264.25C228.053 264.015 227.911 263.807 227.72 263.65C227.32 263.33 227.84 259.33 227.84 259.33C227.713 258.878 227.706 258.4 227.82 257.944C227.934 257.488 228.165 257.069 228.49 256.73C228.628 256.577 228.778 256.437 228.94 256.31C229.13 256.15 229.26 255.94 229.45 255.77C229.857 255.435 230.317 255.168 230.81 254.98C231.55 254.69 232.35 254.49 233.07 254.14C233.917 253.575 234.827 253.109 235.78 252.75C235.965 252.689 236.162 252.673 236.355 252.702C236.548 252.732 236.731 252.806 236.89 252.92C237.036 253.071 237.135 253.261 237.174 253.467C237.214 253.673 237.191 253.887 237.11 254.08C236.933 254.46 236.681 254.8 236.37 255.08C236.631 255.181 236.861 255.348 237.036 255.566C237.212 255.784 237.327 256.044 237.37 256.32C237.358 256.601 237.286 256.876 237.161 257.128C237.035 257.38 236.857 257.602 236.64 257.78C235.761 258.349 234.768 258.717 233.731 258.857C232.693 258.997 231.638 258.906 230.64 258.59C230.67 258.967 230.617 259.345 230.486 259.699C230.355 260.053 230.148 260.374 229.88 260.64C229.679 260.809 229.509 261.012 229.38 261.24C229.31 261.446 229.279 261.663 229.29 261.88C229.268 262.56 229.15 263.233 228.94 263.88C228.896 264.08 228.783 264.257 228.62 264.38L228.54 264.45Z"
                fill="#263238"
              />
              <path
                d="M227.84 259.63L226.42 259.13C226.477 258.898 226.621 258.696 226.821 258.566C227.022 258.436 227.265 258.387 227.5 258.43C227.703 258.546 227.852 258.736 227.915 258.961C227.979 259.185 227.952 259.425 227.84 259.63Z"
                fill="#263238"
              />
              <path
                d="M232.93 268.66C231.976 268.706 231.02 268.642 230.08 268.47C229.645 268.313 229.286 267.994 229.08 267.58C229.182 268.024 229.38 268.44 229.66 268.8C230.2 269.45 232.95 269.3 232.95 269.3L232.93 268.66Z"
                fill="#F28F8F"
              />
              <path
                d="M232.42 262.49C232.422 262.624 232.383 262.756 232.308 262.867C232.233 262.978 232.125 263.063 232 263.11C231.76 263.17 231.57 262.99 231.57 262.71C231.57 262.575 231.611 262.443 231.688 262.332C231.764 262.222 231.873 262.137 232 262.09C232.23 262 232.42 262.21 232.42 262.49Z"
                fill="#263238"
              />
              <path
                d="M231.74 260.65L230.84 261.47C230.778 261.318 230.765 261.151 230.803 260.991C230.841 260.832 230.927 260.688 231.05 260.58C231.094 260.528 231.15 260.487 231.213 260.461C231.277 260.436 231.345 260.426 231.413 260.433C231.481 260.44 231.547 260.463 231.604 260.501C231.66 260.539 231.707 260.59 231.74 260.65Z"
                fill="#263238"
              />
              <path
                d="M232.44 265.53L234.03 265.79C233.983 266.043 233.85 266.271 233.653 266.435C233.455 266.6 233.207 266.69 232.95 266.69C232.51 266.62 232.29 266.1 232.44 265.53Z"
                fill="#B16668"
              />
              <path
                d="M232.64 265.85C232.561 265.834 232.479 265.834 232.4 265.85C232.38 266.028 232.424 266.206 232.525 266.353C232.627 266.5 232.777 266.606 232.95 266.65C233.135 266.674 233.323 266.632 233.48 266.53C233.439 266.338 233.333 266.166 233.18 266.042C233.027 265.918 232.837 265.851 232.64 265.85Z"
                fill="#F28F8F"
              />
              <path
                d="M236.29 259.86L235.47 259.35C235.64 259.03 235.96 258.89 236.19 259.03C236.303 259.134 236.376 259.274 236.394 259.427C236.413 259.579 236.376 259.733 236.29 259.86Z"
                fill="#263238"
              />
              <path
                d="M235.93 261.41C235.932 261.544 235.893 261.676 235.818 261.787C235.743 261.898 235.635 261.983 235.51 262.03C235.28 262.09 235.09 261.91 235.09 261.63C235.089 261.497 235.129 261.366 235.204 261.255C235.279 261.144 235.385 261.059 235.51 261.01C235.74 261 235.93 261.13 235.93 261.41Z"
                fill="#263238"
              />
              <path
                d="M233.84 261.58L233.89 264.52L235.41 263.73L233.84 261.58Z"
                fill="#F28F8F"
              />
              <path
                d="M227 278.1C226.249 278.164 225.492 278.086 224.77 277.87C224.152 277.683 223.576 277.381 223.07 276.98C223.597 275.406 224.726 274.104 226.21 273.36C227 274 227.29 276 227 278.1Z"
                fill="#FFA8A7"
              />
              <path
                d="M223.07 277C223.576 277.401 224.152 277.703 224.77 277.89C225.492 278.106 226.249 278.184 227 278.12H227.36C227.46 277.43 227.54 276.81 227.57 276.33C227.72 273.55 227.06 272.81 227.06 272.81C225.754 273.295 224.629 274.172 223.84 275.32C223.52 275.835 223.239 276.373 223 276.93L223.07 277Z"
                fill="#E5C34E"
              />
              <path
                d="M381.4 165.82L254.49 238.93C253.869 239.336 253.353 239.883 252.983 240.525C252.613 241.168 252.399 241.889 252.36 242.63V251.5C252.058 253.144 251.338 254.682 250.269 255.967C249.201 257.253 247.821 258.242 246.26 258.84C246.209 258.858 246.166 258.891 246.135 258.935C246.104 258.979 246.087 259.031 246.087 259.085C246.087 259.139 246.104 259.191 246.135 259.235C246.166 259.279 246.209 259.312 246.26 259.33C248.315 259.737 250.447 259.449 252.32 258.51V260.66C252.32 262.02 253.27 262.58 254.45 261.89L381.33 188.8C381.952 188.394 382.471 187.848 382.844 187.205C383.218 186.563 383.435 185.842 383.48 185.1V167.1C383.53 165.69 382.58 165.14 381.4 165.82Z"
                fill="#E5C34E"
              />
              <path
                d="M257.39 241.94L275.13 231.69C275.72 231.35 276.19 231.59 276.19 232.23C276.164 232.586 276.055 232.931 275.87 233.237C275.686 233.543 275.433 233.801 275.13 233.99L257.39 244.23C256.81 244.57 256.33 244.33 256.33 243.7C256.356 243.344 256.465 242.999 256.649 242.693C256.834 242.387 257.087 242.129 257.39 241.94Z"
                fill="#455A64"
              />
              <path
                d="M261.37 245.19L375.52 179.28C376.11 178.94 376.59 179.18 376.59 179.81C376.564 180.169 376.453 180.516 376.267 180.823C376.081 181.131 375.825 181.39 375.52 181.58L261.37 247.48C260.78 247.82 260.3 247.59 260.3 246.95C260.328 246.593 260.439 246.248 260.625 245.942C260.811 245.637 261.066 245.379 261.37 245.19Z"
                fill="#455A64"
              />
              <path
                d="M261.37 250.78L317.37 218.48C317.96 218.14 318.43 218.38 318.43 219.01C318.407 219.366 318.298 219.712 318.114 220.019C317.929 220.325 317.674 220.582 317.37 220.77L261.37 253.07C260.78 253.41 260.3 253.17 260.3 252.54C260.325 252.182 260.436 251.836 260.622 251.53C260.808 251.224 261.064 250.967 261.37 250.78Z"
                fill="#455A64"
              />
              <path
                d="M385.16 153.67C386.336 153.904 387.495 154.215 388.63 154.6C389.358 154.824 390.011 155.243 390.517 155.813C391.023 156.383 391.363 157.08 391.5 157.83C391.713 158.659 391.757 159.523 391.63 160.37C391.589 160.654 391.467 160.921 391.28 161.14C391.002 161.474 390.662 161.752 390.28 161.96C388.69 162.82 387.46 163.37 386.01 162.25C385.12 161.56 384.29 160.76 383.34 160.13C382.595 159.684 381.79 159.347 380.95 159.13C379.97 158.874 378.963 158.74 377.95 158.73C377.168 158.828 376.42 159.113 375.77 159.56C375.563 159.165 375.494 158.713 375.574 158.274C375.654 157.836 375.878 157.436 376.21 157.14C377.55 155.92 379.65 154.14 381.21 153.64C382.51 153.333 383.865 153.343 385.16 153.67Z"
                fill="#FFA8A7"
              />
              <path
                d="M438.07 171.27L424.75 196.27C424.75 196.27 404.52 196.57 399.17 195.2C397.35 194.74 397.74 193.74 397.17 191.71C396.6 189.68 395.47 189.99 395.47 189.99L395.3 192.68C395.21 194.08 393.63 194.68 392.58 195.2C391.13 195.919 389.567 196.382 387.96 196.57C386.058 196.761 384.17 197.078 382.31 197.52C381.93 197.62 381.45 197.74 381.31 198.13C381.248 198.258 381.221 198.401 381.231 198.543C381.242 198.685 381.29 198.822 381.37 198.94C381.56 199.21 381.91 199.35 382.12 199.6C382.373 199.985 382.518 200.43 382.54 200.89C382.688 201.534 383.006 202.127 383.462 202.605C383.918 203.084 384.494 203.431 385.13 203.61C387.97 204.48 390.95 203.85 393.82 203.54C396.271 203.123 398.767 203.039 401.24 203.29C404.12 203.67 407.58 204.19 410.78 204.74C415.264 205.631 419.799 206.235 424.36 206.55C428.27 206.7 428.66 206.38 431 203.12C432.62 200.84 436.36 194.87 439.55 189.58C442.74 184.29 444.04 180.66 444.13 177.08C444.1 175.22 442.79 172 438.07 171.27Z"
                fill="#FFA8A7"
              />
              <path
                d="M437.34 171C440.84 171.24 441.75 171.86 443.1 173.17C444.45 174.48 445.58 176.6 443.04 183.6C440.5 190.6 431.54 204.15 430.27 205.75C429.19 207.09 425.95 207.01 420.27 206.34C416.8 205.93 413.35 205.17 413.35 205.17C414.429 202.29 414.596 199.148 413.83 196.17L424.49 195.92L431.87 179.92C431.87 179.92 434.53 173.76 437.34 171Z"
                fill="#E5C34E"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 w-full justify-start flex gap-x-4 text-white">
          کامنت های ثبت شده
          <span>{comments.length}</span>
        </h2>

        {comments.length > 0 && (
          <div className="w-full max-w-lg mt-10">
            {comments.map((comments, index) => (
              <CommentCard
                isCommentOrUsernameCorrect={isCommentAndUsernameCorrect}
                key={index}
                name={comments.name}
                description={comments.description}
                comments={comments}
                handleDelete={handleDelete}
                dateTime={comments.addedDate}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogDetail;
