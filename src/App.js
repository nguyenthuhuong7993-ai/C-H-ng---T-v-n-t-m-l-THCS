import React, { useState, useEffect, useRef } from "react";

import {
  COUNSELOR_INFO,
  COUNSELING_RULES,
  TOPICS,
  KNOWLEDGE_BASE,
  HIGH_RISK_PATTERNS,
  MEDIUM_RISK_PATTERNS,
  QUICK_REPLIES
} from "./knowledgeBase";

import "./App.css";


// ============================================================
// CHUẨN HÓA VĂN BẢN
// ============================================================

function normalizeText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();

}


// ============================================================
// NHẬN DIỆN NGUY CƠ
// ============================================================

function detectRisk(text) {

  const value = normalizeText(text);

  const high = HIGH_RISK_PATTERNS.some(pattern =>
    value.includes(normalizeText(pattern))
  );

  if (high) {
    return "HIGH";
  }

  const medium = MEDIUM_RISK_PATTERNS.some(pattern =>
    value.includes(normalizeText(pattern))
  );

  if (medium) {
    return "MEDIUM";
  }

  return "LOW";
}


// ============================================================
// NHẬN DIỆN CHỦ ĐỀ
// ============================================================

function detectTopic(text) {

  const value = normalizeText(text);

  const keywordMap = {

    emotion: [
      "buon",
      "lo",
      "lo lang",
      "so hai",
      "tuc gian",
      "co don",
      "tu ti",
      "khoc",
      "stress",
      "cang thang",
      "met moi",
      "chan"
    ],

    study: [
      "hoc",
      "diem",
      "thi",
      "kiem tra",
      "bai tap",
      "mat tap trung",
      "diem kem",
      "ap luc hoc"
    ],

    friendship: [
      "ban",
      "ban be",
      "cai nhau",
      "hieu lam",
      "co lap",
      "noi xau",
      "bo roi"
    ],

    family: [
      "bo",
      "me",
      "bo me",
      "cha me",
      "gia dinh",
      "anh",
      "chi",
      "em"
    ],

    love: [
      "thich",
      "yeu",
      "crush",
      "nguoi yeu",
      "chia tay",
      "tinh cam",
      "ghen"
    ],

    bullying: [
      "bat nat",
      "danh",
      "chui",
      "de doa",
      "lam nhuc",
      "uc hiep",
      "danh nhau"
    ],

    socialMedia: [
      "facebook",
      "tiktok",
      "zalo",
      "instagram",
      "mang xa hoi",
      "dien thoai",
      "game"
    ],

    lifeSkills: [
      "tu tin",
      "giao tiep",
      "tu choi",
      "quan ly thoi gian",
      "ky nang",
      "giai quyet van de"
    ],

    sleep: [
      "mat ngu",
      "khong ngu duoc",
      "ngu muon",
      "kho ngu"
    ],

    selfImage: [
      "ngoai hinh",
      "xau",
      "beo",
      "gay",
      "tu ti",
      "khong tu tin"
    ]

  };


  let bestTopic = "emotion";
  let bestScore = 0;


  Object.entries(keywordMap).forEach(([topic, keywords]) => {

    let score = 0;

    keywords.forEach(keyword => {

      if (value.includes(keyword)) {
        score++;
      }

    });

    if (score > bestScore) {

      bestScore = score;
      bestTopic = topic;

    }

  });


  return bestTopic;
}


// ============================================================
// KIỂM TRA NGUY CƠ CAO TRƯỚC KHI GỌI AI
// ============================================================

function emergencyResponse() {

  return `
🆘 CÔ MUỐN EM ƯU TIÊN AN TOÀN TRƯỚC TIÊN.

Những điều em vừa chia sẻ rất quan trọng.

Em không cần phải đối mặt với điều này một mình.

Nếu em đang có nguy cơ làm tổn thương bản thân, đang bị bạo lực hoặc đang ở trong một tình huống nguy hiểm ngay lúc này:

• Hãy đến gần một người lớn mà em tin tưởng.
• Hãy nói rõ rằng em đang cần được giúp đỡ.
• Không ở một mình nếu em cảm thấy mình có thể làm điều nguy hiểm.
• Nếu đang ở nơi nguy hiểm, hãy tìm cách rời khỏi đó và tìm sự hỗ trợ khẩn cấp tại địa phương.

Em có thể nói:

"Em đang không cảm thấy an toàn và em cần người giúp em."

👩‍🏫 Giáo viên tư vấn:
${COUNSELOR_INFO.name}

🏫 ${COUNSELOR_INFO.school}

📞 ${COUNSELOR_INFO.phone}

🕐 ${COUNSELOR_INFO.workingTime}
`;

}


// ============================================================
// TẠO CONTEXT CHO AI
// ============================================================

function buildKnowledgeContext(topic) {

  const data = KNOWLEDGE_BASE[topic];

  if (!data) {
    return "";
  }


  return `
CHỦ ĐỀ:
${TOPICS[topic]?.name || topic}

MÔ TẢ:
${TOPICS[topic]?.description || ""}

NGUYÊN TẮC:
${data.principles?.join("\n- ") || ""}

CÂU HỎI GỢI MỞ:
${data.questions?.join("\n- ") || ""}

KỸ THUẬT:
${data.techniques?.join("\n- ") || ""}
`;

}


// ============================================================
// SYSTEM PROMPT
// ============================================================

function buildSystemPrompt(topic) {

  return `
Bạn là "Trợ lý AI Tư vấn Tâm lý Học đường".

Bạn hỗ trợ học sinh THCS tại Việt Nam.

Tên giáo viên tư vấn:
${COUNSELOR_INFO.name}

Trường:
${COUNSELOR_INFO.school}

Vai trò:
${COUNSELOR_INFO.role}

Thời gian hỗ trợ:
${COUNSELOR_INFO.workingTime}

Số điện thoại:
${COUNSELOR_INFO.phone}


MỤC TIÊU:

- Lắng nghe.
- Đồng cảm.
- Giúp học sinh hiểu cảm xúc.
- Giúp học sinh xác định vấn đề.
- Đưa ra những bước nhỏ, an toàn và thực tế.
- Khuyến khích kết nối với giáo viên, cha mẹ hoặc người lớn đáng tin cậy khi cần.


QUY TẮC BẮT BUỘC:

${COUNSELING_RULES.map(rule => "- " + rule).join("\n")}


TUYỆT ĐỐI KHÔNG:

- Chẩn đoán bệnh tâm thần.
- Tự nhận là bác sĩ.
- Đưa ra kết luận y khoa.
- Khuyến khích tự làm hại bản thân.
- Hướng dẫn hành vi nguy hiểm.
- Khuyến khích trả thù hoặc bạo lực.
- Yêu cầu ảnh nhạy cảm.
- Yêu cầu mật khẩu.
- Yêu cầu thông tin cá nhân không cần thiết.
- Hứa giữ bí mật tuyệt đối khi có nguy cơ an toàn.


CÁCH TRẢ LỜI:

1. Trước tiên hãy thể hiện rằng bạn đã lắng nghe.
2. Phản hồi ngắn gọn và phù hợp với học sinh THCS.
3. Không dùng ngôn ngữ quá học thuật.
4. Không đưa quá nhiều lời khuyên cùng lúc.
5. Có thể hỏi một câu hỏi mở để hiểu thêm.
6. Kết thúc bằng một bước nhỏ mà học sinh có thể thực hiện.


KIẾN THỨC CHỦ ĐỀ:

${buildKnowledgeContext(topic)}


KHI HỌC SINH CÓ DẤU HIỆU NGUY HIỂM:

Ưu tiên an toàn.

Khuyến khích học sinh tìm ngay người lớn đáng tin cậy và hỗ trợ trực tiếp tại địa phương.

Không tranh luận với học sinh.

Không làm học sinh cảm thấy có lỗi.

Không cung cấp hướng dẫn tự làm hại.


PHONG CÁCH:

Ấm áp.
Bình tĩnh.
Tôn trọng.
Không phán xét.
Giống một giáo viên tư vấn tâm lý học đường đang lắng nghe học sinh.
`;
}


// ============================================================
// GỌI AI API
// ============================================================

async function askAI(messages, topic) {

  const response = await fetch("/api/chat", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      topic,

      systemPrompt: buildSystemPrompt(topic),

      messages: messages.map(message => ({
        role:
          message.sender === "user"
            ? "user"
            : "assistant",

        content: message.text
      }))

    })

  });


  if (!response.ok) {

    throw new Error(
      "Không thể kết nối tới máy chủ AI."
    );

  }


  const data = await response.json();

  return data.reply;

}


// ============================================================
// COMPONENT THÔNG TIN GIÁO VIÊN
// ============================================================

function CounselorInfo() {

  return (

    <div className="counselor-card">

      <div className="counselor-avatar">
        👩‍🏫
      </div>

      <div>

        <strong>
          {COUNSELOR_INFO.name}
        </strong>

        <div>
          {COUNSELOR_INFO.role}
        </div>

        <div>
          🏫 {COUNSELOR_INFO.school}
        </div>

        <div>
          📞 {COUNSELOR_INFO.phone}
        </div>

        <div>
          🕐 {COUNSELOR_INFO.workingTime}
        </div>

      </div>

    </div>

  );

}


// ============================================================
// APP
// ============================================================

export default function App() {

  const [messages, setMessages] = useState([

    {

      sender: "bot",

      text: `
👋 Chào em!

Cô là Trợ lý AI Tư vấn Tâm lý Học đường.

Cô có thể lắng nghe và cùng em trao đổi về:

😟 Cảm xúc
📚 Học tập
👥 Bạn bè
🏠 Gia đình
💕 Tình cảm
🛡️ Bắt nạt học đường
📱 Mạng xã hội
🌱 Kỹ năng sống

Em có thể chọn một chủ đề bên dưới hoặc viết trực tiếp điều em muốn chia sẻ.

Em không cần phải kể tất cả ngay một lúc.
`
    }

  ]);


  const [messageInput, setMessageInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const [currentRisk, setCurrentRisk] = useState("LOW");

  const chatMessagesRef = useRef(null);


  // ========================================================
  // CUỘN CHAT
  // ========================================================

  useEffect(() => {

    if (chatMessagesRef.current) {

      chatMessagesRef.current.scrollTop =
        chatMessagesRef.current.scrollHeight;

    }

  }, [messages, isTyping]);


  // ========================================================
  // GỬI TIN NHẮN
  // ========================================================

  async function sendMessage(text = messageInput) {

    const content = text.trim();

    if (!content || isTyping) {
      return;
    }


    const risk = detectRisk(content);

    const topic = detectTopic(content);


    const userMessage = {

      sender: "user",

      text: content

    };


    const newMessages = [

      ...messages,

      userMessage

    ];


    setMessages(newMessages);

    setMessageInput("");

    setCurrentRisk(risk);


    // ======================================================
    // NGUY CƠ CAO
    // Không gọi AI để tránh AI làm loãng thông điệp an toàn
    // ======================================================

    if (risk === "HIGH") {

      setTimeout(() => {

        setMessages(prev => [

          ...prev,

          {

            sender: "bot",

            text: emergencyResponse(),

            risk: "HIGH"

          }

        ]);

      }, 400);

      return;

    }


    // ======================================================
    // GỌI AI
    // ======================================================

    setIsTyping(true);


    try {

      const reply = await askAI(

        newMessages.slice(-12),

        topic

      );


      setMessages(prev => [

        ...prev,

        {

          sender: "bot",

          text: reply,

          risk

        }

      ]);

    }

    catch (error) {

      console.error(error);


      // ====================================================
      // FALLBACK
      // ====================================================

      const fallback = KNOWLEDGE_BASE[topic];

      let fallbackText = `

Cô vẫn đang lắng nghe em.

${fallback?.principles?.[0] || "Điều em đang cảm thấy rất đáng được quan tâm."}

Em có thể kể thêm cho cô điều khiến em khó khăn nhất lúc này.

👩‍🏫 Nếu em muốn được hỗ trợ trực tiếp, em có thể liên hệ với giáo viên tư vấn.
`;


      setMessages(prev => [

        ...prev,

        {

          sender: "bot",

          text: fallbackText

        }

      ]);

    }


    finally {

      setIsTyping(false);

    }

  }


  // ========================================================
  // NÚT GỢI Ý
  // ========================================================

  function sendSuggestion(text) {

    sendMessage(text);

  }


  // ========================================================
  // KHẨN CẤP
  // ========================================================

  function handleEmergency() {

    setCurrentRisk("HIGH");


    setMessages(prev => [

      ...prev,

      {

        sender: "user",

        text: "🆘 Em cần được giúp đỡ ngay."

      },

      {

        sender: "bot",

        text: emergencyResponse(),

        risk: "HIGH"

      }

    ]);

  }


  // ========================================================
  // ENTER
  // ========================================================

  function handleKeyDown(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }


  return (

    <div className="app">


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="chat-header">

        <div className="header-icon">
          🧠
        </div>

        <div>

          <h1>
            Trợ lý AI Tư vấn Tâm lý Học đường
          </h1>

          <p>
            Luôn lắng nghe • Không phán xét • Đồng hành cùng em
          </p>

        </div>

      </header>


      {/* ==================================================
          CHAT
      ================================================== */}

      <main className="chat-container">


        <div
          className="chat-messages"
          ref={chatMessagesRef}
        >

          {messages.map((message, index) => (

            <div
              key={index}
              className={
                message.sender === "user"
                  ? "message user-message"
                  : "message bot-message"
              }
            >

              <div className="message-avatar">

                {message.sender === "user"
                  ? "👧"
                  : "🧠"}

              </div>


              <div className="message-content">

                <div className="message-bubble">

                  {message.text}

                </div>


                {message.risk === "HIGH" && (

                  <CounselorInfo />

                )}

              </div>

            </div>

          ))}


          {isTyping && (

            <div className="message bot-message">

              <div className="message-avatar">
                🧠
              </div>

              <div className="message-bubble typing">

                Cô đang suy nghĩ...

              </div>

            </div>

          )}

        </div>


        {/* ==================================================
            GỢI Ý NHANH
        ================================================== */}

        <div className="quick-replies">

          {QUICK_REPLIES.map(
            (item, index) => (

              <button
                key={index}
                onClick={() =>
                  sendSuggestion(item.text)
                }
              >

                {item.label}

              </button>

            )
          )}

        </div>


        {/* ==================================================
            NÚT KHẨN CẤP
        ================================================== */}

        <button
          className="emergency-button"
          onClick={handleEmergency}
        >

          🆘 Em cần được giúp đỡ ngay

        </button>


        {/* ==================================================
            NHẬP TIN NHẮN
        ================================================== */}

        <div className="input-area">

          <textarea

            id="messageInput"

            value={messageInput}

            onChange={event =>
              setMessageInput(event.target.value)
            }

            onKeyDown={handleKeyDown}

            placeholder="Em hãy viết điều em muốn chia sẻ..."

          />


          <button
            id="sendBtn"
            onClick={() => sendMessage()}
            disabled={isTyping}
          >

            ➤

          </button>

        </div>


        {/* ==================================================
            THÔNG TIN
        ================================================== */}

        <div className="counselor-footer">

          👩‍🏫 Giáo viên tư vấn:
          <strong>
            {" "}{COUNSELOR_INFO.name}
          </strong>

          {" • "}

          📞 {COUNSELOR_INFO.phone}

          {" • "}

          🕐 {COUNSELOR_INFO.workingTime}

        </div>


        <div className="privacy-note">

          🔒 Không cung cấp mật khẩu, thông tin tài khoản
          hoặc thông tin cá nhân không cần thiết.

        </div>

      </main>

    </div>

  );

}
