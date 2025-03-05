/*
 * @Author: xiaoman
 * @Date: 2024-04-20 17:02:05
 * @LastEditors: xiaoman
 * @Description: 工具类
 */

import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

/**
 * 在开发模式下，让useEffect可以安全的执行一次
 * @param effect effect 副作用函数
 * @param callback callback effect的回调函数 可以用来清楚副作用
 */
function useOnMountUnsafe<T>(effectFunc: ((() => Promise<T>)) | EffectCallback, callback?: () => void) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effectFunc()

      if (callback) {
        return callback
      }
    }
  }, [])
}

export { useOnMountUnsafe };

