/**
 * Dữ liệu Bài 8: Thực hành nâng cao sử dụng thư điện tử và mạng xã hội
 * Sách giáo khoa Tin học 11 - Kết nối tri thức với cuộc sống
 */

export interface MCQQuestion {
  id: number;
  question: string;
  options: [string, string, string, string]; // A, B, C, D có độ dài tương ứng nhau
  correctIndex: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  reference: string;
}

export interface TrueFalseSubItem {
  id: string; // 'a' | 'b' | 'c' | 'd'
  statement: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: number;
  context: string;
  items: TrueFalseSubItem[];
  reference: string;
}

export interface ShortAnswerQuestion {
  id: number;
  title: string;
  prompt: string;
  sampleAnswer: string;
  keyPoints: string[];
  maxScore: number;
  reference: string;
}

export interface InfographicStation {
  id: number;
  stationNumber: string;
  title: string;
  subtitle: string;
  color: string;
  badge: string;
  icon: string;
  keyConcepts: { title: string; desc: string }[];
  steps: string[];
  importantNotes: string[];
  examTips: string;
}

// 20 CÂU TRẮC NGHIỆM ABCD VỚI CÁC ĐÁP ÁN ĐỘ DÀI TƯƠNG ĐƯƠNG NHAU
export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    question: "Dấu hiệu nhận biết một thư điện tử quan trọng trong hộp thư Gmail có biểu tượng màu gì?",
    options: [
      "Biểu tượng mũi tên hình dấu màu vàng rực rỡ.",
      "Biểu tượng ngôi sao năm cánh có viền màu đỏ tươi.",
      "Biểu tượng kẹp ghim đính kèm tài liệu màu xanh lam.",
      "Biểu tượng lá cờ ưu tiên hiển thị màu lục thẫm."
    ],
    correctIndex: 0,
    explanation: "Gmail hỗ trợ tự động xác định và đánh dấu thư thuộc loại quan trọng bằng dấu màu vàng (Hình 8.1 SGK trang 39).",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 2,
    question: "Hệ thống Gmail tự động đánh giá và gắn dấu thư quan trọng dựa trên dấu hiệu chủ yếu nào?",
    options: [
      "Dựa vào người gửi thư và tần suất tương tác gửi thư.",
      "Dựa vào kích thước dung lượng của tệp tin đính kèm.",
      "Dựa vào khung giờ mà bức thư được phát đi trong ngày.",
      "Dựa vào kiểu phông chữ và kích thước chữ soạn thảo thư."
    ],
    correctIndex: 0,
    explanation: "Gmail tự động xác định dựa vào: người gửi và tần suất gửi cho một người; thư được mở và trả lời; từ khoá thường xuyên đọc; thư được gắn sao, lưu trữ,...",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 3,
    question: "Để lọc và hiển thị tất cả các thư điện tử được đánh dấu quan trọng trong Gmail, ta nhập cú pháp nào?",
    options: [
      "Nhập cú pháp tìm kiếm chính xác là: is:important.",
      "Nhập cú pháp tìm kiếm chính xác là: is:starred_mail.",
      "Nhập cú pháp tìm kiếm chính xác là: is:unread_message.",
      "Nhập cú pháp tìm kiếm chính xác là: is:category_forum."
    ],
    correctIndex: 0,
    explanation: "Bước 3 SGK trang 39 hướng dẫn: Thực hiện tìm kiếm 'is: important' trong Gmail để hiển thị danh sách tất cả thư điện tử quan trọng.",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 4,
    question: "Muốn thay đổi trạng thái của một thư từ quan trọng thành không quan trọng, người dùng thao tác ra sao?",
    options: [
      "Nháy chuột trực tiếp vào biểu tượng dấu quan trọng.",
      "Kéo thả bức thư vào bên trong danh mục thư rác ngay.",
      "Thực hiện xoá vĩnh viễn bức thư ra khỏi hòm thư đến.",
      "Đổi tiêu đề bức thư rồi nhấn tổ hợp phím lưu dữ liệu."
    ],
    correctIndex: 0,
    explanation: "Bước 2 SGK trang 39: Nháy chuột vào dấu quan trọng để thay đổi trạng thái quan trọng/không quan trọng của thư điện tử đó.",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 5,
    question: "Tính năng Nhãn (Label) trong hộp thư điện tử Gmail được thiết kế nhằm mục đích trọng tâm nào?",
    options: [
      "Phân loại, sắp xếp thư để tiết kiệm thời gian tìm kiếm.",
      "Tự động chuyển tiếp thư nhận được tới người dùng khác.",
      "Thay đổi phông chữ và màu nền cho giao diện hòm thư đến.",
      "Ngăn chặn mọi thư điện tử có chứa tập tin ảnh dung lượng lớn."
    ],
    correctIndex: 0,
    explanation: "Sử dụng Nhãn (Label) để sắp xếp, phân loại thư trong hộp thư đến giúp tiết kiệm thời gian khi tìm kiếm lại các thư, tránh thất lạc thông tin.",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 6,
    question: "Khác biệt bản chất giữa Nhãn (Label) trong Gmail và Thư mục (Folder) trong hệ điều hành máy tính là gì?",
    options: [
      "Xoá thư ở một nhãn sẽ xoá thư ở mọi nhãn và hộp thư đến.",
      "Một thư chỉ được phép gán duy nhất vào một nhãn xác định.",
      "Nhãn không hỗ trợ việc tìm kiếm nội dung bằng từ khoá ngắn.",
      "Nhãn chỉ được sử dụng khi máy tính ngắt kết nối mạng Internet."
    ],
    correctIndex: 0,
    explanation: "Lưu ý SGK trang 39: Nhãn khác với thư mục. Khi em xoá một thư, thư đó sẽ bị xoá khỏi mọi nhãn đính kèm cũng như trong hộp thư đến.",
    reference: "SGK Tin học 11 (KNTT) - Trang 39"
  },
  {
    id: 7,
    question: "Để khởi tạo một nhãn mới trong giao diện Gmail, người dùng thực hiện thao tác ban đầu tại đâu?",
    options: [
      "Nháy chọn 'Danh sách mở rộng' ở bên trái rồi 'Tạo nhãn mới'.",
      "Bấm nút 'Soạn thư' rồi nhập tên của nhãn vào ô địa chỉ nhận.",
      "Vào danh mục 'Thư đã gửi' rồi bấm chuột phải lên màn hình.",
      "Nháy vào ảnh đại diện cá nhân rồi bấm chọn dòng 'Đổi tên nhãn'."
    ],
    correctIndex: 0,
    explanation: "Bước 1 SGK trang 40: Truy cập Gmail, nháy chuột vào 'Danh sách mở rộng' ở bên trái cửa sổ; nháy chuột vào 'Tạo nhãn mới'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 40"
  },
  {
    id: 8,
    question: "Thao tác nào sau đây là bước chuẩn xác để gán nhãn cho một hoặc nhiều thư đã chọn trong Gmail?",
    options: [
      "Nháy biểu tượng Nhãn trên thanh công cụ rồi chọn nhãn muốn gán.",
      "Kéo tệp đính kèm của bức thư thả vào biểu tượng thùng rác máy tính.",
      "Nhấn phím F5 trên bàn phím để hệ thống tự động gán nhãn mặc định.",
      "Chuyển tiếp bức thư cho hòm thư quản trị viên để được cấp phép nhãn."
    ],
    correctIndex: 0,
    explanation: "Bước 2 SGK trang 40: 1. Chọn thư cần gán nhãn; 2. Nháy chuột để mở danh sách nhãn; 3. Chọn nhãn muốn gán.",
    reference: "SGK Tin học 11 (KNTT) - Trang 40"
  },
  {
    id: 9,
    question: "Trang Fanpage trên mạng xã hội Facebook được thiết kế chủ yếu nhằm phục vụ mục đích gì?",
    options: [
      "Giúp tổ chức, doanh nghiệp quảng bá hình ảnh, sản phẩm rộng rãi.",
      "Chỉ phục vụ việc nhắn tin bí mật riêng tư giữa hai cá nhân với nhau.",
      "Dùng làm nơi lưu trữ dữ liệu cá nhân không cho bất kỳ ai truy cập.",
      "Thay thế hoàn toàn cho hệ thống trang thông tin điện tử của quốc gia."
    ],
    correctIndex: 0,
    explanation: "Nhiệm vụ 3 SGK trang 40: Fanpage là trang web trên Facebook giúp các tổ chức, doanh nghiệp quảng bá hình ảnh, thương hiệu và sản phẩm.",
    reference: "SGK Tin học 11 (KNTT) - Trang 40"
  },
  {
    id: 10,
    question: "Để bắt đầu các bước tạo một trang Fanpage mới trên Facebook, người dùng nhấn vào biểu tượng nào?",
    options: [
      "Biểu tượng Menu chứa chín dấu chấm tròn rồi chọn lệnh 'Trang'.",
      "Biểu tượng hình chiếc chuông thông báo hoạt động gần đây của bạn.",
      "Biểu tượng hình kính lúp tìm kiếm bạn bè ở góc trên của màn hình.",
      "Biểu tượng bánh răng cắm sâu vào mục trợ giúp của nhà phát triển."
    ],
    correctIndex: 0,
    explanation: "Bước 1 SGK trang 40: Nháy chuột vào biểu tượng Menu (9 dấu chấm) để mở danh sách các lệnh. Trong mục Tạo, chọn 'Trang'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 40"
  },
  {
    id: 11,
    question: "Khi khởi tạo một Fanpage Facebook, hai trường thông tin nào bắt buộc người dùng phải cung cấp?",
    options: [
      "Tên trang cần tạo và Hạng mục phù hợp mô tả lĩnh vực hoạt động.",
      "Số tài khoản ngân hàng và Mã số chứng minh nhân dân chủ sở hữu.",
      "Địa chỉ nhà riêng cụ thể và Số điện thoại di động của các thành viên.",
      "Giấy phép kinh doanh có công chứng và Chữ ký số điện tử của trường."
    ],
    correctIndex: 0,
    explanation: "Hình 8.3 SGK trang 40 chỉ rõ 4 bước tạo trang: 1. Nhập tên trang cần tạo; 2. Chọn hạng mục phù hợp trong danh sách; 3. Nhập mô tả; 4. Chọn Tạo trang.",
    reference: "SGK Tin học 11 (KNTT) - Trang 40"
  },
  {
    id: 12,
    question: "Để thiết lập những ai có thể xem các bài viết của mình trong tương lai trên Facebook, ta vào mục nào?",
    options: [
      "Đăng nhập tài khoản, vào phần 'Cài đặt' rồi chọn 'Quyền riêng tư'.",
      "Vào danh mục trò chơi trực tuyến rồi chọn mục chia sẻ kết quả điểm.",
      "Mở cửa sổ chat Messenger cá nhân rồi bấm nút chặn người lạ gọi tới.",
      "Vào mục lưu trữ tin nhắn rác rồi xóa bỏ hoàn toàn các liên kết lạ."
    ],
    correctIndex: 0,
    explanation: "Bước 1 SGK trang 41: Chọn Cài đặt -> Quyền riêng tư để mở trang thông tin, hướng dẫn thiết lập ai xem bài viết tương lai.",
    reference: "SGK Tin học 11 (KNTT) - Trang 41"
  },
  {
    id: 13,
    question: "Tùy chọn đối tượng nào sau đây trên Facebook cho phép tất cả mọi người trên mạng đều xem được bài viết?",
    options: [
      "Lựa chọn chế độ đối tượng là: 'Công khai' (Public) cho bài viết.",
      "Lựa chọn chế độ đối tượng là: 'Bạn bè' (Friends) trong danh bạ.",
      "Lựa chọn chế độ đối tượng là: 'Bạn bè ngoại trừ...' một số người.",
      "Lựa chọn chế độ đối tượng là: 'Chỉ mình tôi' (Only me) bảo mật."
    ],
    correctIndex: 0,
    explanation: "Hình 8.4 SGK trang 41: 'Công khai: Mọi người trên hoặc ngoài Facebook'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 41"
  },
  {
    id: 14,
    question: "Nếu muốn đăng bài viết cho hầu hết bạn bè xem nhưng loại trừ vài người cụ thể, ta chọn thiết lập nào?",
    options: [
      "Thiết lập tuỳ chọn đối tượng xem bài: 'Bạn bè ngoại trừ...'.",
      "Thiết lập tuỳ chọn đối tượng xem bài: 'Bạn bè của bạn bè...'.",
      "Thiết lập tuỳ chọn đối tượng xem bài: 'Tất cả nhóm công khai'.",
      "Thiết lập tuỳ chọn đối tượng xem bài: 'Khách vãng lai truy cập'."
    ],
    correctIndex: 0,
    explanation: "Hình 8.4 SGK trang 41 liệt kê rõ lựa chọn 'Bạn bè ngoại trừ...'",
    reference: "SGK Tin học 11 (KNTT) - Trang 41"
  },
  {
    id: 15,
    question: "Tính năng 'Xét duyệt bài viết có gắn thẻ bạn' trên Facebook mang lại lợi ích quan trọng nào?",
    options: [
      "Kiểm soát bài viết gắn thẻ trước khi nó xuất hiện trên trang cá nhân.",
      "Tự động gửi tin nhắn cảm ơn tới người vừa thực hiện gắn thẻ tên mình.",
      "Xóa toàn bộ các bình luận tiêu cực của người lạ trên các trang nhóm.",
      "Tăng gấp đôi số lượng người theo dõi trang cá nhân trong vòng một tuần."
    ],
    correctIndex: 0,
    explanation: "Hình 8.5 SGK trang 42 mục Xem lại: 'Xét duyệt bài viết có gắn thẻ bạn trước khi bài viết đó xuất hiện trên trang cá nhân của bạn'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 41-42"
  },
  {
    id: 16,
    question: "Công cụ 'Chế độ xem' (View As) trong phần cài đặt Trang cá nhân và gắn thẻ dùng để làm gì?",
    options: [
      "Kiểm tra xem trang cá nhân hiển thị như thế nào với những người khác.",
      "Tự động phóng to kích cỡ ảnh đại diện để nhận diện khuôn mặt rõ hơn.",
      "Chuyển đổi giao diện hiển thị Facebook sang chế độ nền tối ban đêm.",
      "Ghi lại toàn bộ lịch sử các cuộc gọi video giữa hai tài khoản bạn bè."
    ],
    correctIndex: 0,
    explanation: "Hình 8.5 SGK trang 42: 'Kiểm tra xem trang cá nhân của bạn hiển thị thế nào với những người khác. Dùng Chế độ xem để biết Mọi người có thể thấy những gì'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 42"
  },
  {
    id: 17,
    question: "Tùy chọn 'Ẩn bình luận chứa một số từ nhất định khỏi trang cá nhân' hữu ích nhất trong trường hợp nào?",
    options: [
      "Ngăn chặn ngôn từ phản cảm, quấy rối hoặc từ khóa tiêu cực xuất hiện.",
      "Tăng số lượng lượt chia sẻ bài viết lên các hội nhóm học tập của trường.",
      "Giảm bớt lưu lượng pin tiêu thụ khi lướt mạng xã hội trên điện thoại.",
      "Tự động phát hiện lỗi chính tả tiếng Việt trong bài đăng của người khác."
    ],
    correctIndex: 0,
    explanation: "Hình 8.5 SGK trang 42 có mục 'Ẩn bình luận chứa một số từ nhất định khỏi trang cá nhân của bạn' nhằm lọc nội dung độc hại.",
    reference: "SGK Tin học 11 (KNTT) - Trang 42"
  },
  {
    id: 18,
    question: "Thao tác nào sau đây giúp người dùng ngăn chặn Facebook thu thập hành vi để phát tán quảng cáo mục tiêu?",
    options: [
      "Xoá lịch sử hoạt động ngoài Facebook trong mục cài đặt bảo mật.",
      "Đăng tải liên tục nhiều bài viết có kèm liên kết trang web quảng cáo.",
      "Thay đổi ảnh bìa cá nhân liên tục vào các khung giờ đêm muộn mỗi ngày.",
      "Tắt âm thanh thông báo của các nhóm có đông thành viên tham gia thảo luận."
    ],
    correctIndex: 0,
    explanation: "Mục Vận dụng câu 2a SGK trang 42: 'Xoá lịch sử hoạt động Facebook để ngăn Facebook phát tán quảng cáo đến người dùng'.",
    reference: "SGK Tin học 11 (KNTT) - Trang 42"
  },
  {
    id: 19,
    question: "Để bảo vệ an toàn thông tin vị trí cá nhân khỏi các nguy cơ theo dõi trên mạng xã hội, ta nên làm gì?",
    options: [
      "Bật, tắt dịch vụ vị trí hợp lý và hạn chế chia sẻ toạ độ định vị.",
      "Luôn luôn bật tính năng check-in vị trí ở mọi địa điểm em từng ghé qua.",
      "Gửi toạ độ GPS nơi ở của bản thân cho tất cả các hội nhóm kết bạn lạ.",
      "Công khai toàn bộ lịch trình chuyến đi xa của gia đình trước khi khởi hành."
    ],
    correctIndex: 0,
    explanation: "Mục Vận dụng câu 2b SGK trang 42: Bật, tắt dịch vụ vị trí của người dùng để bảo vệ quyền riêng tư cá nhân.",
    reference: "SGK Tin học 11 (KNTT) - Trang 42"
  },
  {
    id: 20,
    question: "Sự khác biệt cốt lõi giữa Dấu sao (Starred) và Dấu quan trọng (Important) trong Gmail là gì?",
    options: [
      "Dấu sao do người dùng chủ động gắn, dấu quan trọng do thuật toán đề xuất.",
      "Dấu sao có màu vàng kim, còn dấu quan trọng luôn luôn mang màu đỏ sẫm.",
      "Dấu sao không thể tìm kiếm, còn dấu quan trọng có thể tìm kiếm rất nhanh.",
      "Dấu sao tự động biến mất sau 24 giờ, còn dấu quan trọng lưu vĩnh viễn mãi."
    ],
    correctIndex: 0,
    explanation: "Mục Vận dụng câu 1 SGK trang 42: Dấu sao (Starred) do người dùng tự quyết định gắn thủ công, còn Dấu quan trọng (Important) được Gmail hỗ trợ tự động xác định dựa trên tần suất và hành vi đọc/trả lời.",
    reference: "SGK Tin học 11 (KNTT) - Trang 39, 42"
  }
];

// 4 CÂU ĐÚNG / SAI (MỖI CÂU 4 Ý a, b, c, d - CHUẨN ĐỀ THI ĐỔI MỚI THPT)
export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 1,
    context: "Khi thực hành quản lý và phân loại thư điện tử trong hộp thư đến Gmail:",
    items: [
      {
        id: "a",
        statement: "Gmail chỉ tự động đánh dấu quan trọng đối với các thư có chứa từ khoá 'Khẩn cấp' trong tiêu đề.",
        isCorrect: false,
        explanation: "Sai. Gmail tự động xác định dựa trên nhiều tiêu chí: người gửi và tần suất gửi, thư được mở và trả lời, từ khoá trong thư thường xuyên đọc, thư được gắn sao/lưu trữ/xoá."
      },
      {
        id: "b",
        statement: "Người dùng có thể gõ cụm từ 'is: important' vào thanh tìm kiếm Gmail để hiển thị toàn bộ thư quan trọng.",
        isCorrect: true,
        explanation: "Đúng. Đây là cú pháp chính thức được hướng dẫn tại Bước 3 Nhiệm vụ 1 (SGK trang 39)."
      },
      {
        id: "c",
        statement: "Gán một Nhãn (Label) cho bức thư sẽ tạo ra thêm một bản sao chép mới của bức thư đó trong hòm thư.",
        isCorrect: false,
        explanation: "Sai. Nhãn hoạt động như một thẻ đánh dấu phân loại (tag), không hề nhân bản hay tạo tệp thư trùng lặp."
      },
      {
        id: "d",
        statement: "Khi người dùng xoá một bức thư, thư đó sẽ bị xoá khỏi mọi nhãn đính kèm cũng như trong hộp thư đến.",
        isCorrect: true,
        explanation: "Đúng. Lưu ý đặc biệt của SGK trang 39: 'Khi em xoá một thư, thư đó sẽ bị xoá khỏi mọi nhãn đính kèm cũng như trong hộp thư đến'."
      }
    ],
    reference: "SGK Tin học 11 - Trang 39, 40"
  },
  {
    id: 2,
    context: "Trong nhiệm vụ tạo và quản lý Fanpage trên Facebook cho lớp học:",
    items: [
      {
        id: "a",
        statement: "Chỉ các tổ chức, doanh nghiệp có đăng ký thương mại mới được quyền tạo Fanpage trên Facebook.",
        isCorrect: false,
        explanation: "Sai. Bất kỳ cá nhân nào cũng có thể tạo Fanpage phục vụ lớp học, câu lạc bộ, cộng đồng (SGK tr.40)."
      },
      {
        id: "b",
        statement: "Hai thông tin bắt buộc phải nhập khi khởi tạo trang mới là Tên trang (Page name) và Hạng mục (Category).",
        isCorrect: true,
        explanation: "Đúng. Hình 8.3 SGK trang 40: 1. Nhập tên trang; 2. Chọn hạng mục phù hợp trong danh mục."
      },
      {
        id: "c",
        statement: "Sau khi tạo trang hoàn tất, quản trị viên không thể chỉnh sửa mô tả hay ảnh bìa của trang Fanpage.",
        isCorrect: false,
        explanation: "Sai. Quản trị viên hoàn toàn có quyền cập nhật ảnh bìa, avatar, thông tin giới thiệu và bài viết bất cứ lúc nào."
      },
      {
        id: "d",
        statement: "Việc tạo và quản lý Fanpage cho một lớp học hay một tổ chức thương mại điện tử có quy trình thực hiện tương tự nhau.",
        isCorrect: true,
        explanation: "Đúng. Lưu ý SGK trang 41: 'Việc tạo và quản lý các Fanpage để quảng bá thương hiệu của một tổ chức hay trang thương mại điện tử được thực hiện tương tự'."
      }
    ],
    reference: "SGK Tin học 11 - Trang 40, 41"
  },
  {
    id: 3,
    context: "Khi tìm hiểu và thiết lập quyền riêng tư các bài viết trên mạng xã hội Facebook:",
    items: [
      {
        id: "a",
        statement: "Chế độ 'Công khai' cho phép cả những người không có tài khoản Facebook vẫn có thể xem được nội dung bài viết.",
        isCorrect: true,
        explanation: "Đúng. Hình 8.4 SGK trang 41 chú thích: 'Mọi người trên hoặc ngoài Facebook'."
      },
      {
        id: "b",
        statement: "Lựa chọn 'Bạn bè ngoại trừ...' dùng khi muốn bài viết hiển thị cho toàn bộ người theo dõi nhưng chặn một số bạn bè cụ thể.",
        isCorrect: false,
        explanation: "Sai. Lựa chọn này áp dụng trong phạm vi danh sách bạn bè: chia sẻ cho bạn bè nhưng loại trừ một số người cụ thể được chỉ định."
      },
      {
        id: "c",
        statement: "Cài đặt quyền riêng tư bài viết trong tương lai sẽ tự động thay đổi đối tượng xem của tất cả bài viết cũ trong quá khứ.",
        isCorrect: false,
        explanation: "Sai. Thiết lập này chỉ áp dụng cho các bài viết chuẩn bị đăng trong tương lai; các bài viết cũ giữ nguyên quyền riêng tư ban đầu."
      },
      {
        id: "d",
        statement: "Chế độ 'Chỉ mình tôi' là tuỳ chọn đảm bảo mức độ riêng tư cao nhất cho bài viết trên dòng thời gian.",
        isCorrect: true,
        explanation: "Đúng. Chỉ có chủ tài khoản mới nhìn thấy bài viết này trên trang cá nhân."
      }
    ],
    reference: "SGK Tin học 11 - Trang 41"
  },
  {
    id: 4,
    context: "Về việc thiết lập Trang cá nhân, Gắn thẻ và An toàn dữ liệu người dùng:",
    items: [
      {
        id: "a",
        statement: "Bật xét duyệt bài viết có gắn thẻ giúp ngăn chặn bài viết của người khác tự động xuất hiện trên dòng thời gian cá nhân của em.",
        isCorrect: true,
        explanation: "Đúng. Tính năng 'Xem lại' cho phép em kiểm duyệt trước khi đồng ý cho bài xuất hiện (Hình 8.5 SGK trang 42)."
      },
      {
        id: "b",
        statement: "Công cụ 'Chế độ xem' (View As) cho phép em kiểm tra trang cá nhân của mình hiển thị thế nào dưới góc nhìn người khác.",
        isCorrect: true,
        explanation: "Đúng. Giúp phát hiện các bài viết hoặc thông tin nhạy cảm vô tình bị để ở chế độ công khai."
      },
      {
        id: "c",
        statement: "Facebook không theo dõi hoạt động của người dùng ngoài ứng dụng Facebook để phân phối quảng cáo.",
        isCorrect: false,
        explanation: "Sai. Facebook theo dõi lịch sử hoạt động ngoài Facebook để phát tán quảng cáo mục tiêu (SGK mục Vận dụng trang 42)."
      },
      {
        id: "d",
        statement: "Luôn bật dịch vụ định vị vị trí 24/7 và check-in chi tiết địa điểm sinh sống là thói quen tốt để tăng cường bảo mật tài khoản.",
        isCorrect: false,
        explanation: "Sai. Thói quen này làm lộ bí mật đời tư, lịch trình di chuyển và tạo cơ hội cho kẻ xấu theo dõi, đột nhập."
      }
    ],
    reference: "SGK Tin học 11 - Trang 41, 42"
  }
];

// 4 CÂU TỰ LUẬN (TRẢ LỜI NGẮN GỌN, CÓ ĐÁP ÁN CHUẨN & TIÊU CHÍ CHẤM ĐIỂM)
export const SHORT_ANSWER_QUESTIONS: ShortAnswerQuestion[] = [
  {
    id: 1,
    title: "Phân biệt Nhãn (Label) trong Gmail và Thư mục (Folder) máy tính",
    prompt: "Nêu điểm khác biệt cơ bản giữa Nhãn (Label) trong Gmail so với Thư mục (Folder) trong hệ điều hành máy tính. Điều gì sẽ xảy ra nếu em xoá một bức thư đang có gắn 2 nhãn khác nhau?",
    sampleAnswer: "1. Thư mục (Folder) máy tính: Mỗi tệp tin chỉ nằm trong đúng 1 thư mục duy nhất (muốn ở nhiều nơi phải nhân bản sao chép tệp). Ngược lại, Nhãn (Label) trong Gmail hoạt động như thẻ phân loại (tag): một bức thư có thể gắn đồng thời nhiều nhãn khác nhau mà không tốn dung lượng sao chép.\n2. Khi xoá một bức thư: Bức thư đó sẽ bị xoá khỏi mọi nhãn đính kèm và biến mất khỏi hộp thư đến (chuyển vào thùng rác), không còn tồn tại ở bất kỳ nhãn nào nữa.",
    keyPoints: [
      "Một thư có thể gắn đồng thời nhiều nhãn (thư mục chỉ chứa 1 tệp duy nhất nếu không sao chép)",
      "Nhãn không làm tăng dung lượng lưu trữ (không nhân bản tệp)",
      "Khi xoá thư: thư bị xoá khỏi toàn bộ nhãn đính kèm và hộp thư đến"
    ],
    maxScore: 25,
    reference: "SGK Tin học 11 - Trang 39, 40"
  },
  {
    id: 2,
    title: "Cú pháp tìm kiếm và Dấu hiệu nhận biết thư quan trọng trong Gmail",
    prompt: "Để lọc nhanh toàn bộ các thư điện tử quan trọng trong Gmail, em sử dụng cú pháp tìm kiếm nào? Hãy nêu ít nhất 3 dấu hiệu mà Gmail tự động dựa vào để xác định một thư là quan trọng.",
    sampleAnswer: "1. Cú pháp tìm kiếm trong Gmail: is:important\n2. 3 dấu hiệu Gmail tự động dựa vào để đánh dấu thư quan trọng:\n- Người gửi và tần suất gửi thư cho một người.\n- Thư điện tử được người dùng mở ra đọc và trả lời thường xuyên.\n- Các từ khoá có trong thư điện tử mà người dùng hay đọc; hoặc các thư được gắn dấu sao, lưu trữ.",
    keyPoints: [
      "Cú pháp chính xác: is:important",
      "Người gửi và tần suất gửi thư tương tác",
      "Thư được mở và trả lời thường xuyên",
      "Từ khóa thường xuyên đọc / gắn dấu sao / lưu trữ"
    ],
    maxScore: 25,
    reference: "SGK Tin học 11 - Trang 39"
  },
  {
    id: 3,
    title: "Mục đích tạo Fanpage Facebook và các thông tin khởi tạo bắt buộc",
    prompt: "Fanpage trên Facebook khác với Tài khoản cá nhân như thế nào về mục đích sử dụng? Để khởi tạo một Fanpage cho lớp 11A, em cần cung cấp những thông tin bắt buộc nào?",
    sampleAnswer: "1. Sự khác biệt về mục đích:\n- Tài khoản cá nhân: Phục vụ cá nhân kết nối bạn bè, trò chuyện riêng tư, giới hạn số lượng bạn bè (5000 bạn).\n- Fanpage: Dành cho tổ chức, doanh nghiệp, tập thể (như lớp học, CLB) để quảng bá hình ảnh, thương hiệu, sự kiện ra công chúng; không giới hạn số lượng người theo dõi.\n2. Hai thông tin bắt buộc khi khởi tạo:\n- Tên trang cần tạo (ví dụ: Lớp 11A - THPT Lê Lợi)\n- Hạng mục phù hợp (ví dụ: Giáo dục / Lớp học / Trường học)",
    keyPoints: [
      "Fanpage dùng để quảng bá hình ảnh, thương hiệu, sự kiện của tổ chức/tập thể",
      "Tài khoản cá nhân phục vụ giao tiếp cá nhân riêng tư",
      "Thông tin bắt buộc: Tên trang (Page name) và Hạng mục (Category)"
    ],
    maxScore: 25,
    reference: "SGK Tin học 11 - Trang 40, 41"
  },
  {
    id: 4,
    title: "Bảo vệ danh tính với Xét duyệt gắn thẻ và Chế độ xem (View As)",
    prompt: "Hãy giải thích tác dụng của hai tính năng: 'Xét duyệt bài viết có gắn thẻ' và 'Chế độ xem (View As)' trên Facebook. Vì sao học sinh cần chủ động kích hoạt hai tính năng này?",
    sampleAnswer: "1. Xét duyệt bài viết có gắn thẻ: Cho phép người dùng kiểm duyệt bài viết người khác gắn thẻ mình trước khi nó được hiển thị công khai trên dòng thời gian cá nhân. Giúp ngăn chặn bài viết quảng cáo rác, thông tin bịa đặt hoặc hình ảnh phản cảm bôi nhọ danh dự.\n2. Chế độ xem (View As): Cho phép kiểm tra trang cá nhân của mình hiển thị như thế nào dưới mắt của người lạ hoặc công chúng. Giúp phát hiện kịp thời các thông tin nhạy cảm (số điện thoại, địa chỉ, ảnh riêng tư) bị để lộ công khai để điều chỉnh bảo mật.",
    keyPoints: [
      "Xét duyệt gắn thẻ: Ngăn chặn bài rác, nội dung phản cảm xuất hiện trên dòng thời gian",
      "Chế độ xem (View As): Rà soát góc nhìn của người lạ để bảo vệ bí mật đời tư",
      "Bảo vệ uy tín số và an toàn thông tin cá nhân trên môi trường mạng"
    ],
    maxScore: 25,
    reference: "SGK Tin học 11 - Trang 41, 42"
  }
];

// INFOGRAPHIC TRẠM KIẾN THỨC BÀI 8 (DÙNG ĐỂ THUYẾT TRÌNH VÀ TỔNG HỢP KIẾN THỨC)
export const INFOGRAPHIC_STATIONS: InfographicStation[] = [
  {
    id: 1,
    stationNumber: "Trạm 01",
    title: "Dấu Hiệu Thư Quan Trọng Trong Gmail",
    subtitle: "Tự động phân loại bằng thuật toán thông minh & Cú pháp lọc nhanh",
    color: "from-amber-500 to-yellow-400",
    badge: "Gmail Thông Minh",
    icon: "MailWarning",
    keyConcepts: [
      {
        title: "Dấu quan trọng màu vàng",
        desc: "Biểu tượng hình dấu màu vàng phía trước người gửi để phân biệt thư quan trọng với thư thông thường."
      },
      {
        title: "Thuật toán nhận biết tự động",
        desc: "Dựa vào người gửi & tần suất gửi, thư được mở & trả lời, từ khóa thường đọc, thư được gắn sao hoặc lưu trữ."
      },
      {
        title: "Cú pháp tìm kiếm siêu tốc",
        desc: "Gõ 'is:important' vào thanh tìm kiếm để lọc tất cả các thư được đánh dấu quan trọng trong hòm thư."
      }
    ],
    steps: [
      "Bước 1: Rê chuột vào dấu quan trọng màu vàng để xem lý do Gmail gắn dấu.",
      "Bước 2: Nháy chuột vào dấu quan trọng để bật/tắt thủ công theo ý muốn.",
      "Bước 3: Nhập lệnh tìm kiếm 'is:important' để hiển thị toàn bộ thư quan trọng."
    ],
    importantNotes: [
      "Dấu quan trọng (Important) do Gmail tự động đề xuất, khác với Dấu sao (Starred) do người dùng chủ động gắn.",
      "Người dùng có thể can thiệp để dạy lại thuật toán Gmail bằng cách nháy đổi trạng thái."
    ],
    examTips: "Nhớ chính xác biểu tượng màu VÀNG và cú pháp 'is:important' (chú ý dấu hai chấm không có dấu cách sau 'is:')."
  },
  {
    id: 2,
    stationNumber: "Trạm 02",
    title: "Phân Loại Thư Bằng Nhãn (Label)",
    subtitle: "Tối ưu hóa hộp thư đến, tránh thất lạc và phân biệt rõ với Thư mục",
    color: "from-blue-600 to-cyan-500",
    badge: "Tổ Chức Hộp Thư",
    icon: "Tags",
    keyConcepts: [
      {
        title: "Bản chất của Nhãn (Label)",
        desc: "Là thẻ đánh dấu (tag) phân loại thư, không phải thư mục (folder). Một thư có thể có nhiều nhãn."
      },
      {
        title: "Tiết kiệm dung lượng",
        desc: "Không tạo bản sao dữ liệu. Việc gán nhiều nhãn không làm tăng dung lượng chiếm dụng của hòm thư."
      },
      {
        title: "Quy tắc Xóa Thư Vàng ngọc",
        desc: "Khi xóa một thư, thư đó sẽ bị xoá khỏi MỌI NHÃN đính kèm và biến mất khỏi hộp thư đến!"
      }
    ],
    steps: [
      "Tạo nhãn: Mở rộng menu trái -> Nháy 'Tạo nhãn mới' -> Đặt tên nhãn -> Bấm Save.",
      "Gán nhãn: Chọn thư cần gán -> Nháy biểu tượng Nhãn trên thanh công cụ -> Chọn nhãn -> Bấm Áp dụng (Apply).",
      "Tìm kiếm: Nhập 'label:tên_nhãn' hoặc nháy trực tiếp vào tên nhãn ở cột bên trái."
    ],
    importantNotes: [
      "Nhãn khác với thư mục: Thư mục chỉ chứa 1 bản sao, còn 1 thư Gmail gắn được vô số nhãn.",
      "Cẩn trọng khi xóa thư: Đừng nhầm lẫn giữa việc 'gỡ nhãn' và 'xóa thư' vào thùng rác."
    ],
    examTips: "Câu hỏi bẫy thi cử hay hỏi về hậu quả khi xóa thư có gắn nhãn: Thư bị xóa hoàn toàn khỏi mọi nhãn!"
  },
  {
    id: 3,
    stationNumber: "Trạm 03",
    title: "Tạo & Quản Lý Fanpage Facebook",
    subtitle: "Xây dựng kênh truyền thông tập thể cho lớp học, CLB và tổ chức",
    color: "from-indigo-600 to-purple-600",
    badge: "Truyền Thông Số",
    icon: "LayoutDashboard",
    keyConcepts: [
      {
        title: "Mục đích của Fanpage",
        desc: "Quảng bá hình ảnh, thương hiệu, sự kiện của tổ chức, doanh nghiệp, trường học và lớp học ra công chúng."
      },
      {
        title: "2 Thông tin bắt buộc ban đầu",
        desc: "1. Tên trang cần tạo (ví dụ: Lớp 11A) và 2. Hạng mục phù hợp (ví dụ: Giáo dục, CLB trường học)."
      },
      {
        title: "Phân quyền quản trị linh hoạt",
        desc: "Cho phép nhiều thành viên trong ban cán sự lớp cùng tham gia quản trị, đăng bài và tương tác."
      }
    ],
    steps: [
      "Bước 1: Đăng nhập Facebook -> Nháy biểu tượng Menu (9 dấu chấm) -> Chọn 'Trang' trong mục Tạo.",
      "Bước 2: Điền Tên trang -> Chọn Hạng mục -> Nhập Mô tả -> Nháy 'Tạo trang'.",
      "Bước 3: Tải ảnh đại diện, ảnh bìa, cập nhật thông tin giới thiệu và chia sẻ trang với bạn bè.",
      "Bước 4: Khám phá các công cụ quản lý trang để theo dõi tương tác và phê duyệt bài viết."
    ],
    importantNotes: [
      "Tạo Fanpage cho lớp hoàn toàn tương tự như việc tạo Fanpage cho doanh nghiệp thương mại điện tử.",
      "Fanpage hoạt động độc lập, không làm thay đổi hay mất danh sách bạn bè của tài khoản cá nhân người tạo."
    ],
    examTips: "Ghi nhớ icon mở menu là 9 dấu chấm, và 2 thông tin bắt buộc là 'Tên trang' cùng 'Hạng mục'."
  },
  {
    id: 4,
    stationNumber: "Trạm 04",
    title: "Cài Đặt Quyền Riêng Tư & An Toàn Số",
    subtitle: "Kiểm soát hiển thị bài viết, quản lý gắn thẻ và bảo mật thông tin",
    color: "from-rose-600 to-pink-500",
    badge: "Bảo Mật Cá Nhân",
    icon: "ShieldCheck",
    keyConcepts: [
      {
        title: "Cấp độ hiển thị đối tượng",
        desc: "Công khai (Ai cũng xem được), Bạn bè, Bạn bè ngoại trừ..., Bạn bè cụ thể, Chỉ mình tôi."
      },
      {
        title: "Xét duyệt gắn thẻ (Tag Review)",
        desc: "Kiểm duyệt mọi bài viết gắn thẻ bạn trước khi cho phép xuất hiện trên dòng thời gian cá nhân."
      },
      {
        title: "Chế độ xem (View As) & Lọc từ ngữ",
        desc: "Kiểm tra góc nhìn của người lạ để rà soát rò rỉ dữ liệu, ẩn bình luận chứa từ ngữ thô tục tiêu cực."
      }
    ],
    steps: [
      "Thiết lập bài viết tương lai: Cài đặt -> Quyền riêng tư -> Ai có thể xem bài viết của bạn trong tương lai.",
      "Cài đặt trang cá nhân & gắn thẻ: Cài đặt -> Trang cá nhân và gắn thẻ -> Bật 'Xét duyệt bài viết có gắn thẻ'.",
      "Kiểm tra bảo mật: Bấm 'Chế độ xem' (View As) để xem trang cá nhân dưới góc nhìn công chúng.",
      "Nâng cao: Xoá lịch sử hoạt động ngoài Facebook để chống quảng cáo và tắt dịch vụ vị trí khi không cần."
    ],
    importantNotes: [
      "Cài đặt quyền riêng tư bài viết tương lai KHÔNG tự động thay đổi các bài viết cũ trong quá khứ.",
      "Tắt dịch vụ vị trí giúp tránh bị kẻ xấu theo dõi thói quen sinh hoạt và lịch trình di chuyển."
    ],
    examTips: "Phân biệt rõ: 'Bạn bè ngoại trừ...' (loại trừ vài người) với 'Bạn bè cụ thể' (chỉ định duy nhất vài người được xem)."
  }
];

// DỮ LIỆU BAN ĐẦU CỦA 4 TỔ THI ĐUA
export interface Team {
  id: number;
  name: string;
  shortName: string;
  avatarIcon: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  score: number;
  streak: number;
  starActive: boolean; // Ngôi sao hy vọng (x2 điểm)
  buzzerRank?: number; // Thứ tự bấm chuông
  buzzerTime?: number;
}

export const INITIAL_TEAMS: Team[] = [
  {
    id: 1,
    name: "Tổ 1: Biệt Đội Gmail",
    shortName: "Tổ 1",
    avatarIcon: "⚡",
    colorBg: "bg-blue-600",
    colorBorder: "border-blue-500",
    colorText: "text-blue-500",
    score: 0,
    streak: 0,
    starActive: false
  },
  {
    id: 2,
    name: "Tổ 2: Chiến Binh Fanpage",
    shortName: "Tổ 2",
    avatarIcon: "🚀",
    colorBg: "bg-emerald-600",
    colorBorder: "border-emerald-500",
    colorText: "text-emerald-500",
    score: 0,
    streak: 0,
    starActive: false
  },
  {
    id: 3,
    name: "Tổ 3: Hiệp Sĩ Riêng Tư",
    shortName: "Tổ 3",
    avatarIcon: "🛡️",
    colorBg: "bg-purple-600",
    colorBorder: "border-purple-500",
    colorText: "text-purple-500",
    score: 0,
    streak: 0,
    starActive: false
  },
  {
    id: 4,
    name: "Tổ 4: Đại Sứ An Toàn",
    shortName: "Tổ 4",
    avatarIcon: "🔥",
    colorBg: "bg-amber-600",
    colorBorder: "border-amber-500",
    colorText: "text-amber-500",
    score: 0,
    streak: 0,
    starActive: false
  }
];
