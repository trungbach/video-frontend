import * as config from '@/config/constant';
import { message } from 'antd';
import axios from 'axios';
import cookies from 'js-cookie';
import queryString from 'query-string';
import { ErrorResponse } from 'types/app';
import { KEY_TOKEN } from './constant';
export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: cookies.get(KEY_TOKEN)
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get(KEY_TOKEN)}`,
      }
    : {
        "Content-Type": "application/json",
      },
    paramsSerializer: params => {
        return queryString.stringify(params)
    }

});

export const handleError = (error?: ErrorResponse) => {
  console.log("handleError api config", error);
  if (error?.status == 400) {
    message.error(error.data.message);
  }  else {
    message.error("Error undefined");
  }
};

