import { useEffect, useState } from "react";
import superagent from "superagent";
import { KEY_TOKEN } from "@/config/constant";
import Cookies from "js-cookie";
export const useUploadFile = (file, thumbFile) => {
  const [mediaResponse, setMediaResponse] = useState();

  useEffect(() => {
    if (file && thumbFile) {
      superagent
        .post(process.env.NEXT_PUBLIC_BASE_URL + "api/v1/file/upload-video")
        .set("Authorization", "Bearer " + Cookies.get(KEY_TOKEN))
        .attach("videoFile", file)
        .attach("thumbFile", thumbFile)
        .end((err, res) => {
          if (res) {
            setMediaResponse({ ...res.body.body });
          }
        });
    }
  }, [file, thumbFile]);

  return [mediaResponse, setMediaResponse];
};
