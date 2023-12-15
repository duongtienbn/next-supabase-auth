import UsersList from "@/components/userList";
import { PrismaClient } from "@prisma/client";

export const getTime = (time?: Date) : string | undefined => {
  if (time) {
    const currentTime = new Date();
    const createdAt = new Date(time);
    const timeDiff = Number(currentTime) - Number(createdAt);
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12));
    if (yearsDiff > 0) {
      return `${yearsDiff == 1 ? '先月' : `${yearsDiff} 年前`}`
    } else {
      if (monthsDiff > 0) {
        return `${monthsDiff == 1 ? '先月' : `${monthsDiff} 月前`}`
      } else {
        if (daysDiff > 0) {
          return `${daysDiff == 1 ? '昨日' : `${daysDiff} 日前`}`
        } else {
          if (hoursDiff > 0) {
            return `${hoursDiff == 1 ? '一時間前' : `${hoursDiff} 時間前`}`
          } else if (minutesDiff > 0) {
            return `${minutesDiff == 1 ? '一分前' : `${minutesDiff} 分前`}`
          } else {
            return `${secondsDiff <= 1 ? '一秒前' : `${secondsDiff} 秒前`}`
          }
        }
      }
    }
  }
}
export default async function Users() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  //change createAt
  const modifiedUsers = users.map((user) =>{
    const time = new Date(user.createdAt);
    return {
      ...user,
      createdAt: getTime(time)
    }
  })

  return <UsersList userList={modifiedUsers}/>;
}
