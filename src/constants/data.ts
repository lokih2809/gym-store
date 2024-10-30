import { PaymentMethodEnum } from "@/types/common";

export const KEYWORD_SEARCH = [
  "t shirt",
  "short",
  "joggers",
  "leggings",
  "hoodie",
  "compression",
  "oversized",
  "mini bag",
  "socks",
  "pants",
];

export const PRODUCT_CATEGORIES = [
  {
    name: "women's",
    images: [
      "/Product Categories/women1.avif",
      "/Product Categories/women2.avif",
    ],
    poster: "/posterWomen.avif",
  },
  {
    name: "men's",
    images: ["/Product Categories/men1.avif", "/Product Categories/men2.avif"],
    poster: "/posterMen.avif",
  },
  {
    name: "accessories",
    images: ["/Product Categories/accessories.avif"],
    poster: "/Featured Posters/popularWomen6.avif",
  },
];

export const CATEGORIES = ["WOMEN", "MEN", "ACCESSORIES"];

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export const PRODUCT_COLORS = [
  "Black",
  "White",
  "Gray",
  "Navy",
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Brown",
  "Beige",
  "Olive",
  "Orange",
  "Pink",
  "Purple",
];

export const PRODUCT_FITS = [
  "Slim Fit",
  "Regular Fit",
  "Relaxed Fit",
  "Loose Fit",
  "Tapered Fit",
  "Athletic Fit",
];

export const RECOMMENDED_CATEGORIES = [
  "popular",
  "products",
  "explore",
  "ACCESSORIES",
  "sale",
];

export const ADDITIONAL_OPTIONS = [
  "accessibility statement",
  "Help",
  "email sign up",
  "blog",
];

export const FOOTER_INFORMATION = [
  {
    title: "Workout Clothes & Gym Clothes",
    content:
      "Workout Clothes designed to help you become your personal best. Because when it comes to performing at your max, there should be no obstacles – least of all your workout clothes. \nFunctional and comfortable, we create workout clothing you'll sweat in. Since 2012, we've designed and created the workout clothes we want to wear, because training and its people are what we know best.",
  },
  {
    title: "Gym Clothes built in the weight room",
    content:
      "Our legacy was built in the weight room. Gymshark was founded with a love for training and that passion continues into all our gym clothes today. You'll find the latest innovation in gym clothing and accessories to help you perform at your best and recover in style. \nOur Men's Workout Clothes feature sweat wicking workout shirts and tank tops, gym shorts, sweatpants and more. Whilst our Women's Workout Clothes are designed for a range of movements and feature sophisticated seamless technology, clever contouring and durable, quick-dry sweat wicking fabrics on leggings, sports bras and more. \nAn obsession with lifting is what started this brand, and we haven't forgotten our roots. Our Women's and Men's Bodybuilding clothes feature classic styles, with modern cuts and innovative fabrics to help you raise the bar.",
  },
  {
    title: "Activewear & Athleisure",
    content:
      "We create the tools that help everyone become their personal best – no matter the sport. Our range of Activewear is designed to give you the support you need to perform at your best, whether that's on the track, on the gym floor or in the studio. \nWhilst our men's and women's athleisure elevates your workouts with the most comfortable gym hoodies, the most supportive gym leggings and the most innovatively designed workout shirts that are made to move when it matters most.",
  },
  {
    title: "More than your best workout clothing",
    content:
      "The Gymshark community is devoted to unlocking potential through conditioning and the things we do today to prepare for tomorrow. It's every setback, step-up and milestone along the way. Game-changing workout clothing, running clothes and loungewear essentials. It's not just in the designs, it's in the people who wear them.",
  },
];

export const FOOTER_LINKS = [
  {
    title: "help",
    links: [
      "FAQ",
      "Delivery Information",
      "Returns Policy",
      "Make A Return",
      "Orders",
      "Submit a Fake",
    ],
  },
  {
    title: "My Account",
    links: ["Login", "Register"],
  },
  {
    title: "Pages",
    links: [
      "Gymshark Central",
      "Careers",
      "About Us",
      "Student Discount",
      "Factory List",
    ],
  },
];

export const NOTIFICATION_MESSAGES = [
  "10% student discount",
  "free 30-day return policy. *exclusive apply ",
  "shipping: please refer to our delivery information",
];

export const FEATURED_POSTERS = [
  // Men
  {
    name: "shorts tập gym cho nam",
    desc: "Ưu điểm: Bộ sưu tập shorts tập gym đa dạng và chất lượng nhất. Nhược điểm: Không còn lý do để bỏ lỡ ngày tập chân.",
    image: "/Featured Posters/popularMen1.avif",
    tag: "MEN",
  },
  {
    name: "học kỳ mới. phong cách mới hơn.",
    desc: "Môi trường mới, tham vọng lớn, cảm giác lo lắng ngày đầu tiên. Đến mùa tập gym mới rồi.",
    image: "/Featured Posters/popularMen2.avif",
    tag: "MEN",
  },
  {
    name: "hình ảnh lớn hơn",
    desc: "Áo có thiết kế đồ họa lớn để tạo động lực cho bạn.",
    image: "/Featured Posters/popularMen3.avif",
    tag: "MEN",
  },
  {
    name: "bộ đồ chạy club",
    desc: "Các câu lạc bộ chạy chú trọng vào kết nối và cộng đồng. Nhưng một bộ đồ đẹp và phù hợp cũng rất quan trọng.",
    image: "/Featured Posters/popularMen4.avif",
    tag: "MEN",
  },
  {
    name: "phụ kiện",
    desc: "Những món phụ kiện nhỏ nhưng lại rất quan trọng cho việc tập luyện và phong cách của bạn.",
    image: "/Featured Posters/popularMen5.avif",
    tag: "MEN",
  },
  {
    name: "sức mạnh trong từng cú đẩy",
    desc: "Bộ sưu tập này không chỉ bền bỉ theo thời gian mà còn chịu được sức bền cao. Được thiết kế để chịu đựng cùng bạn cho đến khi bạn thành công.",
    image: "/Featured Posters/popularMen6.avif",
    tag: "MEN",
  },

  // Women
  {
    name: "áo ngực thể thao",
    desc: "Tìm ngay chiếc áo ngực thể thao phù hợp với các mức độ hỗ trợ khác nhau, chắc chắn hơn cả người yêu cũ của bạn.",
    image: "/Featured Posters/popularWomen1.avif",
    tag: "WOMEN",
  },
  {
    name: "học kỳ mới. phong cách mới hơn.",
    desc: "Môi trường mới, tham vọng mới, cảm giác lo lắng ngày đầu tiên. Đến mùa tập gym mới rồi.",
    image: "/Featured Posters/popularWomen2.avif",
    tag: "WOMEN",
  },
  {
    name: "legging có vòng eo nhúng màu",
    desc: "Những chiếc legging với vòng eo nhúng màu đang rất hot. Nhanh tay sắm ngay khi còn hàng.",
    image: "/Featured Posters/popularWomen3.avif",
    tag: "WOMEN",
  },
  {
    name: "dành cho các đối thủ cạnh tranh",
    desc: "Chúng tôi có những bộ đồ lý tưởng cho các sự kiện thể dục chức năng. Hãy thử sức với những bộ đồ được thiết kế để giữ bạn luôn mạnh mẽ.",
    image: "/Featured Posters/popularWomen4.avif",
    tag: "WOMEN",
  },
  {
    name: "phong cách boost mới",
    desc: "Những chiếc áo này sẽ làm nổi bật công sức bạn đã bỏ ra với các chi tiết nhăn và xếp lớp.",
    image: "/Featured Posters/popularWomen5.avif",
    tag: "WOMEN",
  },
  {
    name: "phụ kiện",
    desc: "Những món phụ kiện nhỏ nhưng rất quan trọng để nâng cao hiệu quả tập luyện và phong cách của bạn.",
    image: "/Featured Posters/popularWomen6.avif",
    tag: "WOMEN",
  },
  {
    name: "hình ảnh lớn, tập luyện tốt hơn",
    desc: "Sở hữu ngay một chiếc áo graphic baby tee và tập luyện hết mình.",
    image: "/Featured Posters/popularWomen7.avif",
    tag: "WOMEN",
  },
];

export const UPCOMING_POSTERS = [
  // Trending
  {
    name: "hướng dẫn shorts tập gym cho nam",
    desc: "Mọi thứ bạn cần biết về những chiếc shorts tập gym tốt nhất, từ tập luyện, chạy bộ, đến ngày nghỉ.",
    image: "/Upcoming Posters/futureTrending1.avif",
    tag: "trending",
    more: "Hướng dẫn shorts",
  },
  {
    name: "cardio ấm áp là gì? xu hướng tik tok được khám phá.",
    desc: "Cardio theo cách ấm áp - nhưng cardio ấm áp thực sự là gì và nó có hiệu quả không?",
    image: "/Upcoming Posters/futureTrending2.avif",
    tag: "trending",
    more: "Khám phá cardio ấm áp",
  },
  {
    name: "hướng dẫn leggings",
    desc: "Đừng tìm kiếm nữa; hãy bắt đầu tìm những chiếc leggings bạn cần. Dù bạn tập luyện thế nào, hay phong cách của bạn ra sao, chúng tôi có một lựa chọn phù hợp.",
    image: "/Upcoming Posters/futureTrending3.avif",
    tag: "trending",
    more: "Hướng dẫn leggings",
  },
  {
    name: "hướng dẫn áo ngực thể thao",
    desc: "Tìm chiếc áo ngực thể thao với các mức độ hỗ trợ cao, trung bình và nhẹ, đáng tin cậy hơn cả người yêu cũ của bạn.",
    image: "/Upcoming Posters/futureTrending4.avif",
    tag: "trending",
    more: "Hướng dẫn áo ngực thể thao",
  },
  {
    name: "cách chọn trang phục cho ngày đầu tiên vào đại học",
    desc: "Lo lắng ngày đầu tiên? Chuẩn bị trang phục đại học của bạn với GymShark.",
    image: "/Upcoming Posters/futureTrending5.avif",
    tag: "trending",
    more: "Chuẩn bị sẵn sàng",
  },

  // Styling
  {
    name: "cách phối đồ với quần cargo | ý tưởng trang phục cho nam",
    desc: "Như một chiếc quần jeans thiết yếu - nhưng có nhiều túi hơn. Học cách phối đồ với quần cargo cho nam...",
    image: "/Upcoming Posters/futureStyling1.avif",
    tag: "styling",
    more: "Cách phối quần cargo",
  },
  {
    name: "cách phối áo thun oversized",
    desc: "Khi phối đồ với áo oversized: càng rộng càng tốt. Khám phá 7 mẹo phối đồ để nâng cấp trang phục tập gym của bạn.",
    image: "/Upcoming Posters/futureStyling2.avif",
    tag: "styling",
    more: "Đi theo phong cách oversized",
  },
  {
    name: "pump cover là gì? tất cả những gì bạn cần biết",
    desc: "Đã đến lúc tiết lộ thêm về Pump Cover - xu hướng thời trang đang chiếm ưu thế trong thế giới thể hình online...",
    image: "/Upcoming Posters/futureStyling3.avif",
    tag: "styling",
    more: "Khám phá pump covers",
  },
  {
    name: "shorts hoochie daddy là gì?",
    desc: "Có ai đó nhắc đến shorts ngắn? Khám phá thêm về những chiếc shorts nam ngắn đến viral.",
    image: "/Upcoming Posters/futureStyling4.avif",
    tag: "styling",
    more: "Thử phong cách ngắn hơn",
  },
  {
    name: "du lịch phong cách với trang phục sân bay thoải mái của chúng tôi",
    desc: "Sắp đi nghỉ? Lấy cảm hứng từ cách phối đồ sân bay tốt nhất và biến sân bay thành sàn diễn thời trang.",
    image: "/Upcoming Posters/futureStyling5.avif",
    tag: "styling",
    more: "Xem lookbook",
  },

  // Training
  {
    name: "các bài tập bụng tốt nhất để xây dựng cơ bụng mạnh",
    desc: "Muốn có cơ bụng sáu múi? Đây là sáu bài tập bạn cần để tạo cơ bụng và tăng cường cơ lõi.",
    image: "/Upcoming Posters/futureTraining1.avif",
    tag: "training",
    more: "Xây dựng cơ lõi mạnh",
  },
  {
    name: "cách xây dựng chương trình tập luyện hybrid",
    desc: "Đây là loại tập luyện mà mọi người đang nói đến, nhưng làm thế nào để bạn xây dựng kế hoạch tập luyện hybrid của riêng mình?",
    image: "/Upcoming Posters/futureTraining2.avif",
    tag: "training",
    more: "Tập luyện hybrid",
  },
  {
    name: "các bài tập tay tốt nhất cho buổi tập tay tiếp theo của bạn",
    desc: "Chán việc tập các bài curl cũ? Thay đổi với những bài tập tốt nhất cho cơ bắp tay và cơ tam đầu của bạn.",
    image: "/Upcoming Posters/futureTraining3.avif",
    tag: "training",
    more: "Có cánh tay lớn hơn",
  },
  {
    name: "các bài tập tốt nhất để phát triển cơ mông",
    desc: "Muốn phát triển cơ mông? Chúng tôi có những bài tập tốt nhất dành cho bạn...",
    image: "/Upcoming Posters/futureTraining4.avif",
    tag: "training",
    more: "Các bài tập mông tốt nhất",
  },
  {
    name: "phát triển chân to hơn | các bài tập leg day tốt nhất",
    desc: "Yêu leg day? Tạo hình cơ đùi, phát triển cơ mông và tăng cường cơ gân kheo với các bài tập chân tốt nhất này.",
    image: "/Upcoming Posters/futureTraining5.avif",
    tag: "training",
    more: "Phát triển chân to hơn",
  },

  // Apps
  {
    name: "tốt nhất của gymshark bất cứ lúc nào, ở bất kỳ đâu",
    desc: "Tải ứng dụng Gymshark để mua sắm mọi lúc, nhận các sản phẩm độc quyền và truy cập Gymshark Regent St.",
    image: "/Upcoming Posters/futureApps1.avif",
    tag: "apps",
    more: "Ứng dụng Gymshark",
  },
  {
    name: "theo dõi tiến bộ của bạn với ứng dụng tập luyện",
    desc: "Tập luyện như một vận động viên hoặc cá nhân hóa kế hoạch tập luyện của bạn. Sau đó, hãy đạt tiến bộ. À, và nó hoàn toàn miễn phí.",
    image: "/Upcoming Posters/futureApps2.avif",
    tag: "apps",
    more: "Ứng dụng tập luyện Gymshark",
  },
];

export const PAYMENT_METHOD = [
  {
    name: PaymentMethodEnum.SHIPCOD,
    logo: "/Logo-ShipCod.png",
  },
  {
    name: PaymentMethodEnum.VNPAY,
    logo: "/Logo-VnPay.webp",
  },
];

export const STATUS = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];
