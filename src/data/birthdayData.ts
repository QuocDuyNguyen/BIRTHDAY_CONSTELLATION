import type { BirthdayData } from "../types";

/**
 * Chỉnh file này để đổi người nhận, ngày sinh, tuổi chúc mừng và nội dung thiệp.
 * Tuổi mặc định được tính bằng năm hiện tại trừ năm sinh.
 */
export const birthdayData: BirthdayData = {
  receiverName: "Hồng Ngọc",
  birthDate: "2005-09-16",
  cakeTheme: "strawberry",
  music: "https://res.cloudinary.com/ly6xwuwk/video/upload/v1789654659/Music_ffj3yg.mp3",
  card: {
    title: "Happy Birthday",
    paragraphs: ["Làm web xong tự nhiên hết văn r bạn ơi =)))"],
    closing: "Tuổi mới thật rực rỡ ✨",
  },
};
