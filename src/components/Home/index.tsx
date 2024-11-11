"use client";

import { PRODUCT_CATEGORIES } from "@/constants/data";
import Banner from "./Banner";
import TrendingItemsSection from "./TrendingItemsSection";
import PosterShop from "./PosterShop";
import { ProductInfo } from "@/types/common";

const FEATURED_POSTERS = [
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

const UPCOMING_POSTERS = [
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

const Homepage = ({ listProducts }: { listProducts: ProductInfo[] }) => {
  // Men products
  const listProductsMen = listProducts?.filter(
    (item) => item.category === "MEN",
  );

  return (
    <>
      {/* TOP */}
      <div>
        <Banner bannerLarge="/bannerLarge.jpg" bannerSmall="/bannerSmall.jpg" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4">
        {/* Random 10 products */}
        <TrendingItemsSection
          type="products"
          productsRandom={listProducts}
          title="NEW SEASON + NEW DROPS = MORE PROGRESS"
        />
        {/* Featured post */}
        <TrendingItemsSection
          type="posts"
          posts={FEATURED_POSTERS}
          categories={["MEN", "WOMEN"]}
          title="ĐANG HOT HIỆN TẠI"
        />
        {/* poster */}
        <PosterShop data={PRODUCT_CATEGORIES} />
        {/* Upcoming posts */}
        <TrendingItemsSection
          type="posts"
          posts={UPCOMING_POSTERS}
          categories={["trending", "styling", "training", "apps"]}
          title="WAIT THERE’S MORE…"
        />
        {/* Men products */}
        <TrendingItemsSection
          type="products"
          productsRandom={listProductsMen}
          title="SHOP CBUM’S TOP PICKS"
          listFor="Mens"
        />
      </div>
    </>
  );
};

export default Homepage;
