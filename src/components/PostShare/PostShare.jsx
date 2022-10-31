import React from "react";
import cx from "./PostShare.module.scss";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import {
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";

function PostShare(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { setModalOpened } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleShare = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const storageRef = ref(storage, `Images/${Date.now()}-${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newPost.image = downloadURL;
            console.log(newPost);
          });
        }
      );
    }

    setTimeout(() => {
      dispatch(uploadPost(newPost));
    }, 1500);
    reset();
    setModalOpened(false);
  };
  return (
    <div className={cx.PostShare}>
      <img
        className={cx.avatar}
        src={
          user.profileImage
            ? user.profileImage
            : serverPublic + "defaultProfile.jpg"
        }
        alt=""
      />
      <div className={cx.boxPost}>
        <div className={cx.input}>
          <input
            type="text"
            placeholder="What's happening"
            ref={desc}
            required
          />
        </div>
        <div className={cx.PostOptions}>
          <div
            className={cx.option}
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className={cx.option} style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className={cx.option} style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className={cx.option} style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className={`button ${cx.psBtn}`}
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "loading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className={cx.previewImage}>
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="imagePreview" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
