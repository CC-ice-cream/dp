export enum NKLoadingMode {
    /**
     * 背景
     */
    BG,
    /**
     * 图标
     */
    ICON
}
export interface NKLoadingProps {
    show?: boolean,
    /**
     * 模式
     */
    mode?: NKLoadingMode;
    /**
     * 延迟
     */
    delay?: number
}