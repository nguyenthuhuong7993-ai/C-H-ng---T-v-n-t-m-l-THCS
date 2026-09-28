// ============================================================
// KNOWLEDGE BASE
// TRỢ LÝ AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
// ============================================================

export const COUNSELOR_INFO = {
  name: "Cô Nguyễn Thị Thu Hường",
  school: "Trường THCS Phụng Công",
  role: "Giáo viên tư vấn tâm lý học đường",
  phone: "0989836893",
  workingTime: "7h00 – 22h00",
};


// ============================================================
// NGUYÊN TẮC TƯ VẤN
// ============================================================

export const COUNSELING_RULES = [

  "Luôn lắng nghe học sinh bằng thái độ tôn trọng và không phán xét.",

  "Không chế giễu, trách móc, đổ lỗi hoặc làm học sinh cảm thấy xấu hổ.",

  "Không khẳng định học sinh mắc bệnh tâm thần hoặc đưa ra chẩn đoán y khoa.",

  "Không tự nhận là bác sĩ hoặc chuyên gia y tế.",

  "Không ép học sinh phải kể những điều các em chưa sẵn sàng chia sẻ.",

  "Không yêu cầu mật khẩu, số tài khoản hoặc thông tin cá nhân không cần thiết.",

  "Không yêu cầu học sinh gửi ảnh nhạy cảm hoặc nội dung riêng tư.",

  "Khuyến khích học sinh tìm kiếm sự hỗ trợ từ người lớn đáng tin cậy.",

  "Nếu phát hiện dấu hiệu nguy hiểm, phải ưu tiên an toàn trước việc tư vấn thông thường.",

  "Nếu học sinh có nguy cơ tự làm hại bản thân hoặc người khác, cần khuyến khích tìm sự hỗ trợ trực tiếp ngay lập tức.",

  "Không hứa giữ bí mật tuyệt đối trong trường hợp có nguy cơ an toàn.",

  "Luôn sử dụng ngôn ngữ phù hợp với học sinh THCS.",

  "Trả lời bằng tiếng Việt trừ khi học sinh yêu cầu ngôn ngữ khác.",

  "Không phán xét hoàn cảnh gia đình, học tập hoặc các mối quan hệ của học sinh.",

  "Khuyến khích học sinh thực hiện từng bước nhỏ và thực tế.",
];


// ============================================================
// NHÓM CHỦ ĐỀ
// ============================================================

export const TOPICS = {

  emotion: {
    name: "Cảm xúc",
    description:
      "Buồn, lo lắng, tức giận, sợ hãi, cô đơn, tự ti, căng thẳng, mất động lực.",
  },

  study: {
    name: "Học tập",
    description:
      "Áp lực điểm số, thi cử, mất tập trung, trì hoãn, sợ điểm kém.",
  },

  friendship: {
    name: "Bạn bè",
    description:
      "Mâu thuẫn, hiểu lầm, cô lập, không có bạn thân, bị nói xấu.",
  },

  family: {
    name: "Gia đình",
    description:
      "Mâu thuẫn với cha mẹ, áp lực gia đình, cảm giác không được thấu hiểu.",
  },

  love: {
    name: "Tình cảm tuổi học trò",
    description:
      "Thích bạn, tình cảm, chia tay, ghen, bị từ chối, ranh giới cá nhân.",
  },

  bullying: {
    name: "Bắt nạt học đường",
    description:
      "Bị đánh, chửi, đe dọa, cô lập, làm nhục hoặc bắt nạt trực tuyến.",
  },

  socialMedia: {
    name: "Mạng xã hội",
    description:
      "Điện thoại, game, TikTok, Facebook, bình luận tiêu cực, cyberbullying.",
  },

  lifeSkills: {
    name: "Kỹ năng sống",
    description:
      "Giao tiếp, tự tin, từ chối, quản lý thời gian, giải quyết vấn đề.",
  },

  sleep: {
    name: "Giấc ngủ",
    description:
      "Khó ngủ, ngủ muộn, suy nghĩ nhiều trước khi ngủ.",
  },

  selfImage: {
    name: "Tự tin và hình ảnh bản thân",
    description:
      "Tự ti về ngoại hình, năng lực, thành tích hoặc cảm giác kém cỏi.",
  },

};


// ============================================================
// KIẾN THỨC TƯ VẤN
// ============================================================

export const KNOWLEDGE_BASE = {

  emotion: {

    principles: [
      "Cảm xúc buồn, lo lắng hoặc tức giận có thể xuất hiện khi học sinh gặp áp lực.",
      "Không nên phủ nhận cảm xúc bằng những câu như 'Có gì đâu mà buồn'.",
      "Khuyến khích học sinh gọi tên cảm xúc.",
      "Giúp học sinh xác định nguyên nhân gần nhất.",
      "Chia vấn đề lớn thành những bước nhỏ."
    ],

    questions: [
      "Điều gì khiến em cảm thấy như vậy?",
      "Cảm xúc này bắt đầu từ khi nào?",
      "Điều gì đang khiến em khó chịu nhất?",
      "Em đã chia sẻ chuyện này với ai chưa?"
    ],

    techniques: [
      "Hít thở chậm và sâu.",
      "Viết cảm xúc ra giấy.",
      "Tạm rời khỏi tình huống gây căng thẳng nếu an toàn.",
      "Nói chuyện với người mà em tin tưởng.",
      "Thực hiện một hoạt động nhẹ nhàng mà em yêu thích."
    ]
  },


  study: {

    principles: [
      "Điểm số không quyết định giá trị của một con người.",
      "Áp lực học tập cần được chia thành những nhiệm vụ nhỏ.",
      "Nên xây dựng lịch học phù hợp với khả năng.",
      "Nghỉ ngơi và ngủ đủ cũng là một phần của việc học hiệu quả."
    ],

    questions: [
      "Điều gì trong việc học khiến em áp lực nhất?",
      "Em đang lo điểm số hay phản ứng của bố mẹ?",
      "Môn học nào khiến em khó khăn nhất?",
      "Em thường học vào thời gian nào?"
    ],

    techniques: [
      "Chọn một nhiệm vụ nhỏ để bắt đầu.",
      "Học tập trung khoảng 20–25 phút rồi nghỉ ngắn.",
      "Viết danh sách việc cần làm.",
      "Ưu tiên việc quan trọng trước.",
      "Trao đổi với giáo viên nếu không hiểu bài."
    ]
  },


  friendship: {

    principles: [
      "Mâu thuẫn bạn bè là điều có thể xảy ra.",
      "Nên trao đổi khi cả hai đã bình tĩnh.",
      "Nói về cảm xúc của bản thân thay vì công kích người khác.",
      "Nếu có dấu hiệu bắt nạt hoặc đe dọa thì cần báo người lớn."
    ],

    questions: [
      "Chuyện giữa em và bạn bắt đầu như thế nào?",
      "Em mong muốn điều gì xảy ra?",
      "Em đã thử nói chuyện với bạn chưa?",
      "Em có cảm thấy mình đang bị cô lập không?"
    ],

    techniques: [
      "Chọn thời điểm phù hợp để nói chuyện.",
      "Dùng câu bắt đầu bằng 'Mình cảm thấy...'.",
      "Không tranh luận khi đang quá tức giận.",
      "Nhờ giáo viên hỗ trợ nếu không thể tự giải quyết."
    ]
  },


  family: {

    principles: [
      "Mâu thuẫn gia đình có thể khiến học sinh cảm thấy áp lực.",
      "Cha mẹ và con cái đôi khi có cách nhìn khác nhau.",
      "Nên chọn thời điểm mọi người bình tĩnh để trao đổi.",
      "Nếu khó nói trực tiếp, có thể viết thư hoặc nhờ một người lớn đáng tin cậy hỗ trợ."
    ],

    questions: [
      "Điều gì khiến em khó nói chuyện với bố mẹ?",
      "Em mong bố mẹ hiểu điều gì?",
      "Hai bên thường tranh luận về vấn đề gì?",
      "Có người lớn nào em cảm thấy dễ chia sẻ hơn không?"
    ],

    techniques: [
      "Chọn thời điểm cả hai bên bình tĩnh.",
      "Nói về cảm xúc thay vì chỉ trích.",
      "Nói từng vấn đề một.",
      "Nhờ giáo viên hoặc người thân hỗ trợ khi cần."
    ]
  },


  love: {

    principles: [
      "Có tình cảm với một người là điều tự nhiên.",
      "Mọi mối quan hệ cần có sự tôn trọng và tự nguyện.",
      "Học sinh có quyền nói không với điều khiến mình không thoải mái.",
      "Không nên gửi hoặc chia sẻ hình ảnh riêng tư vì áp lực tình cảm."
    ],

    questions: [
      "Điều gì khiến em băn khoăn nhất?",
      "Em đang vui, buồn hay lo lắng?",
      "Em có cảm thấy mình đang bị ép buộc điều gì không?",
      "Chuyện này có ảnh hưởng đến việc học hoặc cuộc sống của em không?"
    ]
  },


  bullying: {

    principles: [
      "Bắt nạt không phải là lỗi của học sinh bị bắt nạt.",
      "Không nhất thiết phải đối đầu trực tiếp với người bắt nạt.",
      "Cần tìm người lớn đáng tin cậy.",
      "Nếu có nguy hiểm thể chất cần ưu tiên rời khỏi nơi nguy hiểm.",
      "Bắt nạt trực tuyến cũng cần được xem xét nghiêm túc."
    ],

    questions: [
      "Chuyện xảy ra ở đâu?",
      "Chuyện xảy ra một lần hay nhiều lần?",
      "Ai đang thực hiện hành vi đó?",
      "Em có cảm thấy mình đang gặp nguy hiểm không?",
      "Có giáo viên hoặc người lớn nào biết chuyện chưa?"
    ]
  },


  socialMedia: {

    principles: [
      "Mạng xã hội có thể tạo ra áp lực và ảnh hưởng đến cảm xúc.",
      "Không nên chia sẻ mật khẩu hoặc thông tin riêng tư.",
      "Không nên đáp trả các lời đe dọa bằng hành vi nguy hiểm.",
      "Có thể lưu lại bằng chứng phù hợp và báo người lớn."
    ],

    questions: [
      "Điều gì trên mạng xã hội khiến em khó chịu?",
      "Em sử dụng điện thoại khoảng bao lâu mỗi ngày?",
      "Có ai đang nhắn tin đe dọa hoặc xúc phạm em không?",
      "Điều này ảnh hưởng đến việc học hoặc giấc ngủ của em như thế nào?"
    ]
  },


  lifeSkills: {

    principles: [
      "Kỹ năng có thể được rèn luyện từng bước.",
      "Không cần thay đổi mọi thứ cùng lúc.",
      "Mục tiêu nhỏ dễ thực hiện hơn mục tiêu quá lớn."
    ],

    techniques: [
      "Xác định một mục tiêu.",
      "Viết ra bước đầu tiên.",
      "Thực hiện trong khoảng thời gian ngắn.",
      "Đánh giá kết quả.",
      "Điều chỉnh và tiếp tục."
    ]
  },


  sleep: {

    principles: [
      "Giấc ngủ có vai trò quan trọng với sức khỏe và việc học.",
      "Nên duy trì giờ ngủ và giờ thức tương đối ổn định.",
      "Hạn chế sử dụng thiết bị điện tử ngay trước khi ngủ.",
      "Nếu khó ngủ kéo dài hoặc ảnh hưởng nghiêm trọng đến sinh hoạt, nên nói với người lớn và tìm sự hỗ trợ phù hợp."
    ],

    techniques: [
      "Tạo không gian ngủ yên tĩnh.",
      "Hạn chế điện thoại trước giờ ngủ.",
      "Thư giãn và hít thở chậm.",
      "Không cố ép mình phải ngủ ngay."
    ]
  },


  selfImage: {

    principles: [
      "Mỗi người có điểm mạnh và điểm chưa hoàn thiện.",
      "Không nên đánh giá toàn bộ bản thân chỉ dựa vào ngoại hình hoặc điểm số.",
      "So sánh bản thân với người khác trên mạng xã hội có thể tạo áp lực."
    ],

    techniques: [
      "Viết ra ba điều mình làm được.",
      "Ghi nhận tiến bộ nhỏ.",
      "Tập trung vào khả năng có thể phát triển.",
      "Hạn chế so sánh bản thân với hình ảnh trên mạng."
    ]
  }

};


// ============================================================
// TỪ KHÓA NHẬN DIỆN NGUY CƠ CAO
// ============================================================

export const HIGH_RISK_PATTERNS = [

  "muốn chết",
  "muốn tự tử",
  "tự tử",
  "tự sát",
  "không muốn sống",
  "không muốn tồn tại",
  "muốn kết thúc cuộc đời",
  "muốn chết đi",
  "giết mình",
  "tự làm hại",
  "tự làm đau",
  "cắt tay",
  "chuẩn bị tự tử",
  "sắp tự tử",
  "đang tự làm hại",
  "bị xâm hại",
  "đang bị xâm hại",
  "bị cưỡng ép",
  "đang bị đánh",
  "đang bị bạo hành",
  "đang bị đe dọa nghiêm trọng"
];


// ============================================================
// TỪ KHÓA CẦN QUAN TÂM
// ============================================================

export const MEDIUM_RISK_PATTERNS = [

  "nhiều ngày",
  "nhiều tuần",
  "mất ngủ",
  "không ngủ được",
  "không muốn đi học",
  "sợ đi học",
  "không muốn gặp ai",
  "không muốn nói chuyện",
  "khóc thường xuyên",
  "buồn rất nhiều",
  "quá mệt mỏi",
  "áp lực rất lớn",
  "bị cô lập",
  "bị bắt nạt",
  "bị đe dọa",
  "không còn hứng thú"
];


// ============================================================
// GỢI Ý NHANH
// ============================================================

export const QUICK_REPLIES = [

  {
    label: "😟 Em đang buồn",
    text: "Em đang cảm thấy rất buồn và không biết phải làm gì."
  },

  {
    label: "📚 Áp lực học tập",
    text: "Em đang cảm thấy rất áp lực về việc học và điểm số."
  },

  {
    label: "👥 Vấn đề bạn bè",
    text: "Em đang có vấn đề với bạn bè và không biết giải quyết thế nào."
  },

  {
    label: "🏠 Gia đình",
    text: "Em đang gặp khó khăn khi nói chuyện với bố mẹ."
  },

  {
    label: "💕 Tình cảm",
    text: "Em đang có vấn đề về tình cảm và muốn được chia sẻ."
  },

  {
    label: "🛡️ Bị bắt nạt",
    text: "Em đang bị các bạn bắt nạt và không biết phải làm gì."
  },

  {
    label: "📱 Mạng xã hội",
    text: "Mạng xã hội đang khiến em cảm thấy áp lực."
  },

  {
    label: "🌱 Kỹ năng sống",
    text: "Em muốn học cách tự tin hơn và quản lý cảm xúc tốt hơn."
  }

];
