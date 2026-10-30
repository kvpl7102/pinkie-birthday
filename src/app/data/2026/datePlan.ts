/**
 * Date Plan & Birthday Wish Configuration for 2026
 * Feel free to customize any of the text, restaurant details, or Google Maps query below!
 */

export interface DatePlanConfig {
  birthdayWish: {
    badge: string;
    title: string;
    greeting: string;
    messageParagraphs: string[];
    closingWish: string;
    signature: string;
    dateLabel: string;
  };
  restaurant: {
    statusBadge: string;
    title: string;
    name: string;
    cuisineType: string;
    dateTime: string;
    address: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    dressCode: string;
    noteForHer: string;
  };
  albumQuest: {
    badge: string;
    itemName: string;
    description: string;
    inspectButtonLabel: string;
  };
}

export const DATE_PLAN_2026: DatePlanConfig = {
  birthdayWish: {
    badge: 'QUEST COMPLETED - LEVEL 24!',
    title: 'Chúc Mừng Sinh Nhật Phép Màu Yêu Thương của mình',
    greeting: 'Gửi Diệu Linh yêu dấu,',
    messageParagraphs: [
      'Chúc mừng sinh nhật tuổi 24 của cậu! Thêm một tuổi mới, mình chúc cậu luôn giữ được nụ cười trong trẻo, ánh mắt rạng ngời và trái tim ấm áp như ánh nắng mùa thu.',
      'Cảm ơn cậu vì đã luôn ở bên mình, luôn cố gắng vì chúng mình dù cho nhiều lúc tưởng chừng như mọi chuyện đã đổ bể giữa 2 chúng mình, luôn lắng nghe, chia sẻ và mang lại cho mình thật nhiều năng lượng tích cực cùng những khoảnh khắc không thể nào quên được nhất với mình.',
      'Tuổi 24 này, mong rằng mọi ước mơ và những dự định tương lai của cậu đều sẽ nở hoa rực rỡ. Mong rằng, bọn mình vẫn sẽ luôn mãi ở bên nhau, cùng nhau đối diện và vượt qua bất cứ khó khăn nào mà cuộc đời ném ra cho bọn minh, Dù có bất cứ điều gì xảy ra, hãy nhớ rằng cậu luôn có gia đình, bạn bè, người thân, và một người luôn ở đây, sẵn sàng ủng hộ và đồng hành cùng cậu trên mọi nẻo đường.',
    ],
    closingWish: 'Cậu xứng đáng với tất cả những điều ngọt ngào và hạnh phúc nhất trên đời.',
    signature: 'From someone who will always love you',
    dateLabel: 'Hà Nội • Mùa thu 2026',
  },
  restaurant: {
    statusBadge: 'QUEST IN PROGRESS: DINNER RESERVATION',
    title: 'Buổi Hẹn Hò Bí Mật Dành Riêng Cho Cậu',
    name: 'EMBER Kitchen & Bar',
    cuisineType: 'Contemporary Asian Fusion & Cocktails',
    dateTime: 'Chủ Nhật, ngày 1 tháng 11 năm 2026',
    address: '75 Trần Quốc Toản, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội',
    googleMapsUrl: 'https://maps.app.goo.gl/9f4BfsQaB9tpEM9t7',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=EMBER%20Kitchen%20%26%20Bar%2C%2075%20Tr%E1%BA%A7n%20Qu%E1%BB%91c%20To%E1%BA%A3n%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed',
    dressCode: 'Hãy mặc chiếc váy xinh xắn hoặc bất cứ bộ trang phục nào cậu cảm thấy tự tin và thoải mái nhất nha. Well, cậu mặc gì cũng xinh đẹp cả mừ.',
    noteForHer: 'Một không gian yên tĩnh và lãng mạn, cùng nhau những món ăn ngon và tận hưởng buổi tối cùng nhau. Đừng lo lắng về bất cứ điều gì, tối đó cậu chỉ việc làm công chúa mà thôi:>',
  },
  albumQuest: {
    badge: 'SPECIAL REWARD ITEM',
    itemName: "Một chiếc album nho nhỏ:>",
    description: "月が本当に綺麗ですね。",
    inspectButtonLabel: 'OPEN IT?',
  },
};
