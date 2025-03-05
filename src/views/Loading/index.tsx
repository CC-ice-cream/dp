/*
 * @Author: xiaoman
 * @Date: 2024-05-07 11:43:40
 * @LastEditors: xiaoman
 * @Description: Loading
 */
import React, { FC, useEffect, useRef, useState } from "react";
import "./index.scss";
import { useOnMountUnsafe } from "@/utils/func";
import { Spin } from "antd";
import { NKLoadingMode, NKLoadingProps } from "./type";

const NKLoading: FC<NKLoadingProps> = React.memo((props) => {
  const { show = true, mode = NKLoadingMode.BG, delay = 0 } = props;
  const timer = useRef<NodeJS.Timeout | null>(null);
  const _delay = useRef(delay);
  const [_show, setShow] = useState(show);

  useEffect(() => {
    setShow(show);
  }, [show])

  useOnMountUnsafe(() => {
    if (delay !== 0) {
      timer.current = setTimeout(() => {
        setShow(true);
      }, _delay.current)
    }

    return () => {
      _show && setShow(false);
      timer.current && clearTimeout(timer.current);
    }
  });

  return (
    <>
      {
        mode === NKLoadingMode.BG ?
          _show ?
            <div className="loading_body">
              {/* <img src={bg} className="loading_body_bg" /> */}
              {/* <Spin size="large" delay={300} /> */}
              {/* <img src={SpinGif} className="loading_body_icon" /> */}
              <span className="loading_body_tips">正在准备中，请耐心等待一下</span>
            </div > : <></>
          :
          <div className="loading_iconBody">
            <Spin size="large" delay={_delay.current} />
          </div >
      }
    </>
  );
});
export default NKLoading;
