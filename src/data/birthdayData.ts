import type { BirthdayData } from "../types";

/**
 * Chỉnh file này để đổi người nhận, ngày sinh, tuổi chúc mừng và nội dung thiệp.
 * Tuổi mặc định được tính bằng năm hiện tại trừ năm sinh.
 */
export const birthdayData: BirthdayData = {
  receiverName: "Mỹ Phụng",
  birthDate: "2003-10-29",
  cakeTheme: "strawberry",
  music: "https://res.cloudinary.com/ly6xwuwk/video/upload/v1789654659/Music_ffj3yg.mp3",
  card: {
    title: "Happy Birthday",
    paragraphs: ["Kiêu lên Slay lên xinh, tươi như z tự tin lên!!!"],
    closing: "Tuổi mới thật rực rỡ ✨",
  },
};
