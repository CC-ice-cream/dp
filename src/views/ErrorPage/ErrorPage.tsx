/*
 * @Author: xiaoman
 * @Date: 2024-04-20 13:11:27
 * @LastEditors: xiaoman
 * @Description: 404
 */

import { ErrorResponse, useRouteError } from "react-router-dom";
import styles from './index.module.css'

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse & Error;
  console.error(error);

  return (
    <div id="error-page" className={styles.errorPage}>
      {/* <h1>哇哦!</h1>
      <p>很抱歉，您所访问的页面已失联</p> */}
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
}