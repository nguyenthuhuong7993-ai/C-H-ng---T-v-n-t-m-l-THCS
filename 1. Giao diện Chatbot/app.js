// ============================================================
// CHATBOT AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
// FILE: app.js
// ============================================================


// ============================================================
// 1. LẤY CÁC PHẦN TỬ TRÊN GIAO DIỆN
// ============================================================

const chatBox = document.getElementById("chatBox");

const messageInput =
    document.getElementById("messageInput") ||
    document.getElementById("chatInput");

const sendButton =
    document.getElementById("sendButton") ||
    document.getElementById("sendBtn");

const suggestionButtons =
    document.querySelectorAll(".suggestion-btn, .suggestion");


// ============================================================
// 2. THÔNG TIN GIÁO VIÊN TƯ VẤN
// ============================================================

const COUNSELOR = {
    name: "Cô Nguyễn Thị Thu Hường",
    school: "Trường THCS Phụng Công",
    hours: "7h00 – 22h00",

    // Bạn có thể điền số điện thoại của giáo viên tại đây.
    // Không muốn hiện số điện thoại thì để trống.
    phone: "0989836893"
};


// ============================================================
// 3. BIẾN LƯU LỊCH SỬ TRÒ CHUYỆN
// ============================================================

let conversationHistory = [];

let isWaitingForAI = false;


// ============================================================
// 4. HÀM THÊM TIN NHẮN VÀO KHUNG CHAT
// ============================================================

function addMessage(text, sender = "bot") {

    if (!chatBox) {
        console.error("Không tìm thấy #chatBox");
        return;
    }

    const messageElement = document.createElement("div");

    messageElement.className =
        sender === "user"
            ? "message user-message"
            : "message bot-message";

    messageElement.innerHTML = formatMessage(text);

    chatBox.appendChild(messageElement);

    scrollToBottom();
}


// ============================================================
// 5. ĐỊNH DẠNG NỘI DUNG CHATBOT
// ============================================================

function formatMessage(text) {

    if (!text) return "";

    let safeText = String(text);

    // Chuyển ký tự HTML nguy hiểm thành text
    safeText = safeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Xuống dòng
    safeText = safeText.replace(/\n/g, "<br>");

    // In đậm **text**
    safeText = safeText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    return safeText;
}


// ============================================================
// 6. CUỘN XUỐNG CUỐI KHUNG CHAT
// ============================================================

function scrollToBottom() {

    if (!chatBox) return;

    chatBox.scrollTop = chatBox.scrollHeight;
}


// ============================================================
// 7. HIỂN THỊ "ĐANG SUY NGHĨ..."
// ============================================================

function showTyping() {

    if (!chatBox) return;

    removeTyping();

    const typingElement =
        document.createElement("div");

    typingElement.id = "typingIndicator";

    typingElement.className =
        "message bot-message typing-message";

    typingElement.innerHTML =
        "🤖 <span>Trợ lý đang suy nghĩ...</span>";

    chatBox.appendChild(typingElement);

    scrollToBottom();
}


// ============================================================
// 8. XÓA "ĐANG SUY NGHĨ..."
// ============================================================

function removeTyping() {

    const typing =
        document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }
}


// ============================================================
// 9. HIỂN THỊ THÔNG TIN GIÁO VIÊN TƯ VẤN
// ============================================================

function showCounselor() {

    if (!chatBox) return;

    // Không tạo nhiều thẻ liên tiếp
    const oldCard =
        document.getElementById("counselorCard");

    if (oldCard) {
        oldCard.remove();
    }

    const card =
        document.createElement("div");

    card.id = "counselorCard";

    card.className = "counselor-card";

    let phoneHTML = "";

    if (COUNSELOR.phone &&
        COUNSELOR.phone.trim() !== "") {

        phoneHTML = `
            <div class="counselor-phone">
                📞 <strong>Liên hệ:</strong>
                ${COUNSELOR.phone}
            </div>
        `;
    }

    card.innerHTML = `
        <div class="counselor-title">
            💙 Giáo viên tư vấn tâm lý
        </div>

        <div class="counselor-content">

            <div>
                👩‍🏫 <strong>${COUNSELOR.name}</strong>
            </div>

            <div>
                🏫 ${COUNSELOR.school}
            </div>

            <div>
                🕐 Thời gian hỗ trợ:
                ${COUNSELOR.hours}
            </div>

            ${phoneHTML}

        </div>

        <div class="counselor-note">
            Nếu em cảm thấy vấn đề của mình khó giải quyết
            một mình, em có thể tìm đến cô để được lắng nghe
            và hỗ trợ trực tiếp.
        </div>
    `;

    chatBox.appendChild(card);

    scrollToBottom();
}


// ============================================================
// 10. HIỂN THỊ NÚT GỢI Ý
// ============================================================

function showSuggestions() {

    const suggestionContainer =
        document.getElementById("suggestions");

    if (!suggestionContainer) return;

    suggestionContainer.style.display = "flex";
}


// ============================================================
// 11. ẨN NÚT GỢI Ý
// ============================================================

function hideSuggestions() {

    const suggestionContainer =
        document.getElementById("suggestions");

    if (!suggestionContainer) return;

    suggestionContainer.style.display = "none";
}


// ============================================================
// 12. TRẠNG THÁI NÚT GỬI
// ============================================================

function setSendingState(state) {

    isWaitingForAI = state;

    if (sendButton) {

        sendButton.disabled = state;

        if (state) {

            sendButton.dataset.oldText =
                sendButton.innerText;

            sendButton.innerText =
                "Đang gửi...";

        } else {

            sendButton.innerText =
                sendButton.dataset.oldText ||
                "Gửi";
        }
    }
}


// ============================================================
// 13. PHÂN TÍCH TIN NHẮN HỌC SINH
// ============================================================

function analyzeMessage(message) {

    try {

        if (
            typeof analyzeStudentMessage ===
            "function"
        ) {

            return analyzeStudentMessage(message);
        }

    } catch (error) {

        console.error(
            "Lỗi analyzeStudentMessage:",
            error
        );
    }


    // Nếu counselingRules.js chưa tải được
    // thì vẫn cho chatbot hoạt động.

    return {
        risk: {
            level: "GREEN",
            reasons: []
        },

        emotion: {
            name: "unknown"
        },

        topics: [],

        primaryTopic: "general",

        mode: "normal"
    };
}


// ============================================================
// 14. KIỂM TRA CÓ PHẢI TÌNH HUỐNG NGUY HIỂM KHÔNG
// ============================================================

function isHighRisk(analysis) {

    if (!analysis) return false;

    if (
        analysis.risk &&
        analysis.risk.level
    ) {

        const level =
            String(
                analysis.risk.level
            ).toUpperCase();

        return level === "RED" ||
               level === "HIGH";
    }

    return false;
}


// ============================================================
// 15. KIỂM TRA CÓ NÊN HIỆN GIÁO VIÊN KHÔNG
// ============================================================

function shouldContactCounselor(analysis) {

    if (!analysis) return false;

    if (isHighRisk(analysis)) {
        return true;
    }

    if (
        analysis.risk &&
        analysis.risk.level
    ) {

        const level =
            String(
                analysis.risk.level
            ).toUpperCase();

        if (
            level === "YELLOW" ||
            level === "MEDIUM"
        ) {
            return true;
        }
    }

    return false;
}


// ============================================================
// 16. PHẢN HỒI AN TOÀN KHI CÓ NGUY CƠ CAO
// ============================================================

function getSafetyResponse() {

    return `
Mình rất tiếc vì em đang phải trải qua một cảm xúc hoặc tình huống khó khăn như vậy. 💙

Điều quan trọng nhất lúc này là **em không nên phải đối mặt với chuyện này một mình**.

Nếu em đang cảm thấy mình có thể làm tổn thương bản thân, đang bị đe dọa hoặc đang ở trong tình huống không an toàn:

• Hãy đến gần một người lớn mà em tin tưởng ngay bây giờ.
• Hãy nói rõ với người đó rằng em đang cần được giúp đỡ.
• Nếu em đang ở trong tình huống nguy hiểm trước mắt, hãy tìm sự trợ giúp khẩn cấp tại nơi em đang ở.
• Em không cần phải giải quyết tất cả mọi chuyện ngay lúc này.

Cô rất muốn lắng nghe em và giúp em tìm bước tiếp theo an toàn hơn. 💙
`;
}


// ============================================================
// 17. PHẢN HỒI KHI HỌC SINH KHÔNG MUỐN NÓI
// ============================================================

function getReluctantResponse() {

    return `
Không sao đâu em. 💙

Em không cần phải kể tất cả mọi chuyện ngay lập tức.

Nếu khó nói thành lời, em chỉ cần cho cô biết một điều nhỏ thôi:

👉 Hiện tại em đang cảm thấy **buồn, lo lắng, tức giận, cô đơn, sợ hãi hay áp lực**?

Em cũng có thể chỉ cần nói:
“Em đang rất mệt.”

Mình có thể bắt đầu từ đó.
`;
}


// ============================================================
// 18. PHẢN HỒI CƠ BẢN KHI CHƯA KẾT NỐI ĐƯỢC AI
// ============================================================

function getFallbackResponse(message, analysis) {

    const topic =
        analysis &&
        analysis.primaryTopic
            ? analysis.primaryTopic
            : "general";


    switch (topic) {

        case "study":

            return `
Cô hiểu rằng chuyện học tập đôi khi có thể khiến em rất áp lực. 💙

Em không cần phải giải quyết tất cả cùng một lúc.

Em có thể thử chia việc học thành những phần nhỏ hơn và ưu tiên một việc quan trọng nhất trước.

Nếu em muốn, em có thể kể cho cô biết:

👉 Điều gì trong chuyện học tập đang khiến em áp lực nhất?
`;


        case "friendship":

            return `
Các mối quan hệ bạn bè ở tuổi học sinh đôi khi có thể khiến mình vui nhưng cũng có lúc rất buồn.

Em có thể kể cho cô nghe chuyện gì đã xảy ra với bạn của em không?

Cô sẽ lắng nghe mà không vội phán xét em. 💙
`;


        case "bullying":

            return `
Nếu em đang bị trêu chọc, xúc phạm, cô lập hoặc bắt nạt, trước hết em cần biết rằng em không phải tự chịu đựng chuyện đó một mình.

Em hãy tìm một người lớn mà em tin tưởng để chia sẻ.

Nếu chuyện xảy ra trên mạng, em cũng nên lưu lại những bằng chứng phù hợp và không trả đũa bằng cách làm tổn thương người khác.

Em có thể kể cho cô biết chuyện đó xảy ra ở trường hay trên mạng không?
`;


        case "family":

            return `
Chuyện trong gia đình đôi khi rất khó nói vì mình vừa yêu thương người thân vừa có thể cảm thấy tổn thương hoặc không được hiểu.

Em không cần phải chọn ngay ai đúng hay ai sai.

Em có thể kể cho cô điều gì đã xảy ra và điều gì khiến em buồn nhất không?
`;


        case "anxiety":

            return `
Cô hiểu cảm giác lo lắng có thể khiến mình rất mệt mỏi.

Trước mắt, em thử hít vào chậm, thở ra chậm vài lần và cho bản thân một chút thời gian.

Sau đó em có thể nói cho cô biết:

👉 Em đang lo lắng về chuyện gì nhất?
`;


        case "love":

            return `
Những cảm xúc đặc biệt dành cho một người ở tuổi học sinh là điều có thể xảy ra và em không cần phải xấu hổ vì cảm xúc của mình. 💙

Điều quan trọng là hai người cần tôn trọng nhau, không ép buộc nhau và biết giữ những ranh giới riêng tư.

Em đang gặp khó khăn ở chuyện gì trong mối quan hệ này?
`;


        case "sleep":

            return `
Giấc ngủ có ảnh hưởng khá lớn đến tâm trạng và khả năng học tập.

Em có thể thử hạn chế sử dụng điện thoại trước khi ngủ, giữ giờ ngủ tương đối ổn định và tạo một không gian yên tĩnh để nghỉ ngơi.

Nếu tình trạng mất ngủ kéo dài hoặc ảnh hưởng nhiều đến cuộc sống, em nên chia sẻ với người lớn mà em tin tưởng.

Em thường khó ngủ vì suy nghĩ về điều gì?
`;


        case "selfEsteem":

            return `
Có những lúc chúng ta cảm thấy mình không đủ tốt, nhưng một cảm giác như vậy không có nghĩa rằng em thật sự không có giá trị.

Em thử nghĩ về một điều nhỏ mà em đã cố gắng làm tốt gần đây.

Nếu muốn, em hãy kể cho cô biết điều gì khiến em cảm thấy mình chưa đủ tốt.
`;


        case "puberty":

            return `
Tuổi dậy thì có thể đem đến rất nhiều thay đổi về cơ thể, cảm xúc và suy nghĩ.

Những thay đổi đó có thể khiến em tò mò, bối rối hoặc lo lắng.

Em có thể hỏi cô điều em đang thắc mắc. Cô sẽ cố gắng giải thích bằng cách phù hợp với lứa tuổi và an toàn.
`;


        case "socialMedia":

            return `
Mạng xã hội có thể giúp chúng ta kết nối với mọi người nhưng đôi khi cũng tạo ra áp lực.

Em không cần phải so sánh mình với những hình ảnh hoặc cuộc sống mà người khác đăng trên mạng.

Nếu có ai làm em khó chịu trên mạng, em có thể chặn, báo cáo và nói với người lớn mà em tin tưởng.

Chuyện gì trên mạng đang khiến em khó chịu?
`;


        default:

            return `
Cô đang lắng nghe em. 💙

Em có thể kể cho cô thêm một chút về điều đang khiến em suy nghĩ hoặc khó chịu.

Em không cần phải viết thật dài.

Chỉ cần bắt đầu bằng:

👉 “Điều làm em buồn là...”

hoặc

👉 “Điều em đang lo là...”
`;
    }
}


// ============================================================
// 19. GỬI TIN NHẮN ĐẾN AI
// ============================================================

async function askAI(message, analysis) {

    try {

        const response =
            await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    message: message,

                    analysis: analysis,

                    history:
                        conversationHistory
                            .slice(-10)
                })
            });


        if (!response.ok) {

            throw new Error(
                "API trả về lỗi: " +
                response.status
            );
        }


        const data =
            await response.json();


        if (!data.reply) {

            throw new Error(
                "API không trả về nội dung."
            );
        }


        return data;


    } catch (error) {

        console.error(
            "Lỗi kết nối AI:",
            error
        );

        return {
            success: false,
            reply: null,
            showCounselor:
                shouldContactCounselor(
                    analysis
                )
        };
    }
}


// ============================================================
// 20. HÀM XỬ LÝ TIN NHẮN CHÍNH
// ============================================================

async function generateResponse(message) {

    if (!message) return;


    message =
        String(message).trim();


    if (!message) return;


    // ------------------------------------------
    // Phân tích tin nhắn
    // ------------------------------------------

    const analysis =
        analyzeMessage(message);


    console.log(
        "Phân tích học sinh:",
        analysis
    );


    // ------------------------------------------
    // Nếu là nguy cơ cao
    // ------------------------------------------

    if (isHighRisk(analysis)) {

        addMessage(
            getSafetyResponse(),
            "bot"
        );

        showCounselor();

        return;
    }


    // ------------------------------------------
    // Nếu học sinh không muốn nói
    // ------------------------------------------

    const lowerMessage =
        message.toLowerCase();


    if (
        lowerMessage.includes(
            "không muốn nói"
        ) ||
        lowerMessage.includes(
            "không muốn kể"
        ) ||
        lowerMessage.includes(
            "không biết nói gì"
        )
    ) {

        addMessage(
            getReluctantResponse(),
            "bot"
        );

        showCounselor();

        return;
    }


    // ------------------------------------------
    // Nếu chưa có API
    // ------------------------------------------

    showTyping();


    const result =
        await askAI(
            message,
            analysis
        );


    removeTyping();


    // ------------------------------------------
    // Nếu AI trả lời thành công
    // ------------------------------------------

    if (
        result &&
        result.reply
    ) {

        addMessage(
            result.reply,
            "bot"
        );


        // Lưu lịch sử
        conversationHistory.push({

            role: "user",

            content: message

        });


        conversationHistory.push({

            role: "assistant",

            content: result.reply

        });


        // Chỉ giữ 20 tin nhắn gần nhất
        if (
            conversationHistory.length > 20
        ) {

            conversationHistory =
                conversationHistory.slice(-20);
        }


        // Hiển thị giáo viên nếu cần
        if (
            result.showCounselor === true ||
            shouldContactCounselor(analysis)
        ) {

            showCounselor();
        }


        return;
    }


    // ------------------------------------------
    // Nếu API chưa hoạt động
    // ------------------------------------------

    const fallback =
        getFallbackResponse(
            message,
            analysis
        );


    addMessage(
        fallback,
        "bot"
    );


    if (
        shouldContactCounselor(
            analysis
        )
    ) {

        showCounselor();
    }
}


// ============================================================
// 21. HÀM GỬI TIN NHẮN
// ============================================================

async function sendMessage() {

    if (isWaitingForAI) return;


    if (!messageInput) {

        console.error(
            "Không tìm thấy ô nhập tin nhắn."
        );

        return;
    }


    const message =
        messageInput.value.trim();


    if (!message) return;


    // Hiện tin nhắn học sinh
    addMessage(
        message,
        "user"
    );


    // Xóa ô nhập
    messageInput.value = "";


    // Ẩn gợi ý
    hideSuggestions();


    // Gửi AI
    setSendingState(true);


    try {

        await generateResponse(
            message
        );

    } catch (error) {

        console.error(error);

        removeTyping();

        addMessage(
            `
Xin lỗi em, hiện tại trợ lý đang gặp một chút sự cố.

Em có thể thử gửi lại tin nhắn sau ít phút.

Nếu em đang gặp một vấn đề khiến em cảm thấy không an toàn, hãy tìm ngay một người lớn mà em tin tưởng để được hỗ trợ.
            `,
            "bot"
        );

        showCounselor();

    } finally {

        setSendingState(false);
    }
}


// ============================================================
// 22. NÚT GỬI
// ============================================================

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );
}


// ============================================================
// 23. NHẤN ENTER ĐỂ GỬI
// ============================================================

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();
            }
        }
    );
}


// ============================================================
// 24. CÁC NÚT GỢI Ý
// ============================================================

suggestionButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const text =
                    button.dataset.message ||
                    button.innerText.trim();


                if (!text) return;


                if (messageInput) {

                    messageInput.value =
                        text;
                }


                sendMessage();
            }
        );
    }
);


// ============================================================
// 25. CHÀO HỌC SINH KHI MỞ CHATBOT
// ============================================================

function showWelcomeMessage() {

    if (!chatBox) return;


    // Không hiển thị lại nếu đã có tin nhắn
    if (
        chatBox.children.length > 0
    ) {
        return;
    }


    const welcome = `
Chào em! 👋💙

Cô là **Trợ lý AI Tư vấn Tâm lý Học đường**.

Em có thể chia sẻ với cô về:

• 📚 Chuyện học tập và áp lực học tập
• 👭 Bạn bè và các mối quan hệ
• 🏫 Chuyện ở trường
• 😔 Buồn, lo lắng, căng thẳng
• 👨‍👩‍👧 Chuyện gia đình
• 💕 Những cảm xúc tuổi mới lớn
• 📱 Mạng xã hội
• 😴 Giấc ngủ
• 💪 Sự tự tin và cách quản lý cảm xúc

Em không cần phải viết thật dài.

Chỉ cần nói điều em đang nghĩ hoặc đang cảm thấy.

**Cô sẽ lắng nghe em. 💙**
`;


    addMessage(
        welcome,
        "bot"
    );
}


// ============================================================
// 26. KHỞI ĐỘNG CHATBOT
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showWelcomeMessage();

        console.log(
            "✅ Chatbot tư vấn tâm lý đã khởi động."
        );

        console.log(
            "📚 Knowledge Base:",
            typeof KNOWLEDGE_BASE !==
            "undefined"
                ? "Đã tải"
                : "Chưa tải"
        );

        console.log(
            "🧠 Counseling Rules:",
            typeof analyzeStudentMessage ===
            "function"
                ? "Đã tải"
                : "Chưa tải"
        );

    }
);


// ============================================================
// 27. CHO PHÉP GỌI generateResponse TỪ BÊN NGOÀI
// ============================================================

window.generateResponse =
    generateResponse;


window.sendMessage =
    sendMessage;


window.showCounselor =
    showCounselor;


// ============================================================
// KẾT THÚC FILE app.js
// ============================================================
