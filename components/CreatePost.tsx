import React from 'react'
import Image from "next/image";
import { useState, useRef } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
// import { addPost, selectPost } from "../public/src/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from '@/public/src/features/postSlice';
import { createPost } from '@/pages/api/service';

const CreatePost = () => {
    const {data : session} = useSession();
    const inputRef = useRef<any>(null);
    const hiddenFileInput = useRef<any>(null);
    const [imgToPost, setImgPost] = useState<string | ArrayBuffer | null | Blob>(null);
    const dispatch = useDispatch();

    const handleClick = () => {
        if(hiddenFileInput?.current)
            hiddenFileInput.current.click();
    }

    const addImageToPost = (e:any) => {
        const reader = new FileReader();
        if(e?.target?.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (el) => {
                if(el.target?.result)
                    setImgPost(el.target?.result);
            }
        }
    }

    const removeImage = () => {
        setImgPost(null);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!(inputRef?.current?.value)) return;
        const formData = new FormData();
        const i:any = imgToPost;
        if(session) {
            formData.append("file", i);
            console.log("i: " + i);
            formData.append("post", inputRef.current.value);
            formData.append("name", session?.user?.name || '');
            formData.append("email", session?.user?.email || '');
            formData.append("profilePic", session?.user?.image || '');
        
            createPost(formData)
              .then((response) => {
                inputRef.current.value = "";
                dispatch(addPost(response.data));
                console.log(response.data);
                removeImage();
              })
              .catch((error) => {
                console.log(error);
              });
        }
      };

    return (
        <div className="bg-white rounded-md shadow-md text-gray-500 p-2 divide-y">
            <div className="flex p-4 space-x-2 items-center">
            <Image
                src={session?.user?.image || ''}
                alt='user-img'
                height={40}
                width={40}
                className="rounded-full cursor-pointer"
                />
                <form className="flex flex-1">
                <input
                    className="rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4"
                    type="text"
                    ref={inputRef}
                    placeholder={`What's on your mind, ${session?.user?.name}?`}></input>
                <button
                type='button' 
                onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </button>
                </form>
            </div>
            {/* div to preview img */}
            {imgToPost && (
                <div
                onClick={() => removeImage()}
                className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer">
                <Image alt='img' width={200} height={200} src={'' + imgToPost} className="h-10 object-contain" />
                <RiDeleteBin6Line className="h-8 hover:text-red-500" />
                </div>
            )}
            {/* bottom icons */}
            <div className="flex justify-evenly py-2">
                <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
                <HiOutlineVideoCamera className="text-red-500" size={20} />
                <p className="font-semibold text-gray-600">Live Video</p>
                </div>
                <div
                onClick={() => handleClick()}
                className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
                <IoMdPhotos className="text-green-500" size={20} />
                <p className="font-semibold text-gray-600">Photo/Video</p>
                <input
                    ref={hiddenFileInput}
                    onChange={(e) => addImageToPost(e)}
                    type="file"
                    accept="image/*"
                    hidden
                />
                </div>
                <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
                <BsEmojiSmile className="text-yellow-400" size={20} />
                <p className="font-semibold text-gray-600">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
