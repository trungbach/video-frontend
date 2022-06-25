import { useEffect, useState } from "react";
import superagent from "superagent";
import { KEY_TOKEN } from "@/config/constant";
import Cookies from "js-cookie";
export const useUploadImage = (file) => {
  const [mediaResponse, setMediaResponse] = useState();

  useEffect(() => {
    if (file) {
      superagent
        .post(process.env.NEXT_PUBLIC_BASE_URL + "api/v1/file/upload-image")
        .set("Authorization", "Bearer " + Cookies.get(KEY_TOKEN))
        .attach("file", file)
        .end((err, res) => {
          if (res) {
            setMediaResponse({ ...res.body.body });
          }
        });
    }
  }, [file]);

  return [mediaResponse, setMediaResponse];
};
