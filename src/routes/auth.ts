import { useAppSelector } from "@/store/hook"

export const useAuth = () => {
  const user = useAppSelector(state => state.user.userInfo)
  return {
    user
  }
}