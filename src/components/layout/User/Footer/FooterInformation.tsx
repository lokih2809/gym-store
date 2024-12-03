import { usePathname } from "next/navigation";
import React from "react";

const FOOTER_INFORMATION = [
  {
    title: "Quần áo tập luyện & Quần áo phòng gym.",
    content:
      "Quần áo tập luyện được thiết kế để giúp bạn đạt phiên bản tốt nhất của chính mình. Bởi vì khi nói đến việc đạt hiệu suất tối đa, không gì nên cản trở bạn – đặc biệt là quần áo tập luyện.\n Chúng tôi tạo ra những bộ đồ tập vừa tiện dụng vừa thoải mái, phù hợp để bạn đổ mồ hôi. Từ năm 2012, chúng tôi đã thiết kế và tạo nên những bộ quần áo tập luyện mà chính chúng tôi mong muốn mặc, vì việc tập luyện và những con người trong cộng đồng này là điều chúng tôi hiểu rõ nhất.",
  },
  {
    title: "Quần áo phòng gym được tạo nên từ phòng tập tạ.",
    content:
      "Di sản của chúng tôi được xây dựng trong phòng tập tạ. Gymshark được thành lập từ tình yêu dành cho việc tập luyện, và niềm đam mê đó vẫn hiện hữu trong mọi sản phẩm quần áo phòng gym ngày nay. Bạn sẽ tìm thấy những cải tiến mới nhất trong quần áo và phụ kiện gym để giúp bạn đạt hiệu suất tốt nhất và phục hồi phong cách.\n Quần áo tập luyện nam của chúng tôi bao gồm áo tập thấm hút mồ hôi, áo ba lỗ, quần short gym, quần jogger và nhiều hơn nữa. Trong khi đó, quần áo tập luyện nữ được thiết kế phù hợp với đa dạng chuyển động, với công nghệ seamless tinh tế, các đường nét thông minh, và chất liệu bền, thấm hút mồ hôi nhanh khô trên quần legging, áo ngực thể thao và nhiều sản phẩm khác. \n Niềm đam mê với việc nâng tạ là nguồn cảm hứng ban đầu tạo nên thương hiệu này, và chúng tôi không bao giờ quên gốc rễ của mình. Quần áo thể hình dành cho nam và nữ của chúng tôi kết hợp các phong cách cổ điển với kiểu dáng hiện đại và chất liệu sáng tạo để giúp bạn nâng tầm luyện tập.",
  },
  {
    title: "Trang phục thể thao & Thời trang thể thao năng động.",
    content:
      "Chúng tôi tạo ra những công cụ giúp mọi người đạt được phiên bản tốt nhất của chính mình – bất kể môn thể thao nào. Bộ sưu tập Trang phục thể thao của chúng tôi được thiết kế để mang lại sự hỗ trợ cần thiết, giúp bạn đạt hiệu suất tối ưu, dù là trên đường chạy, sàn tập gym hay trong phòng tập studio.\n Trong khi đó, dòng Thời trang thể thao năng động dành cho nam và nữ nâng tầm buổi tập của bạn với những chiếc áo hoodie gym thoải mái nhất, quần legging hỗ trợ tối ưu và áo tập được thiết kế sáng tạo để chuyển động linh hoạt khi cần thiết nhất.",
  },
  {
    title: "Hơn cả trang phục tập luyện tốt nhất của bạn.",
    content:
      "Cộng đồng Gymshark cam kết khai phá tiềm năng thông qua rèn luyện và những gì chúng ta làm hôm nay để sẵn sàng cho ngày mai. Đó là mọi thất bại, bước tiến và cột mốc trên hành trình. Từ trang phục tập luyện đột phá, đồ chạy bộ đến các sản phẩm thiết yếu mặc nhà, tất cả đều không chỉ nằm ở thiết kế mà còn ở những con người khoác lên chúng.",
  },
];

const FooterInformation = () => {
  const pathName = usePathname();

  if (!pathName) return null;
  return (
    <>
      {FOOTER_INFORMATION.map((item) => (
        <div
          key={item.title}
          className={`space-y-4 ${pathName !== "/" ? "hidden" : "block"}`}
        >
          <h1 className={`text-2xl font-bold uppercase`}>{item.title}</h1>
          {item.content.split("\n").map((line, index) => (
            <p className="text-sm leading-8 lg:text-base" key={index}>
              {line}
              <br />
            </p>
          ))}
        </div>
      ))}
    </>
  );
};

export default FooterInformation;
