/* =========================================================
   CÔ HƯỜNG - CHATBOT TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
   Dành cho học sinh THCS

   Phiên bản giao diện:
   - Đơn giản
   - Thân thiện
   - Dễ sử dụng
   - Phù hợp học sinh THCS
   - Có kết nối API /api/chat
   ========================================================= */


/* =========================================================
   1. THÔNG TIN GIÁO VIÊN TƯ VẤN
   ========================================================= */

const COUNSELOR = {
    name: "Cô Hường",
    fullName: "Nguyễn Thị Thu Hường",
    title: "Giáo viên Tư vấn Tâm lý Học đường",
    school: "Trường THCS Phụng Công",
    hours: "7h00 – 22h00",

    // Khi bạn muốn hiển thị số điện thoại,
    // hãy điền số vào đây.
    phone: ""
};


/* =========================================================
   2. BIẾN TOÀN CỤC
   ========================================================= */

let conversationHistory = [];

let isSending = false;

let firstMessageShown = false;


/* =========================================================
   3. LẤY CÁC THÀNH PHẦN GIAO DIỆN
   ========================================================= */

const chatBox =
    document.getElementById("chatBox");

const messageInput =
    document.getElementById("messageInput") ||
    document.getElementById("chatInput");

const sendButton =
    document.getElementById("sendButton") ||
    document.getElementById("sendBtn");

const suggestionButtons =
    document.querySelectorAll(
        ".suggestion-btn, .suggestion"
    );


/* =========================================================
   4. KIỂM TRA GIAO DIỆN
   ========================================================= */

if (!chatBox) {
    console.warn(
        "Không tìm thấy phần tử #chatBox."
    );
}

if (!messageInput) {
    console.warn(
        "Không tìm thấy ô nhập tin nhắn."
    );
}

if (!sendButton) {
    console.warn(
        "Không tìm thấy nút gửi."
    );
}


/* =========================================================
   5. THÊM TIN NHẮN VÀO KHUNG CHAT
   ========================================================= */

function addMessage(
    sender,
    message,
    options = {}
) {

    if (!chatBox) return null;

    const messageRow =
        document.createElement("div");

    messageRow.className =
        `message-row ${sender}`;

    if (options.extraClass) {
        messageRow.classList.add(
            options.extraClass
        );
    }


    /* Avatar */

    const avatar =
        document.createElement("div");

    avatar.className = "message-avatar";


    if (sender === "assistant") {

        avatar.innerHTML = "👩🏻‍🏫";

    } else {

        avatar.innerHTML = "👤";
    }


    /* Nội dung */

    const bubble =
        document.createElement("div");

    bubble.className = "message-bubble";


    /* Format nội dung */

    bubble.innerHTML =
        formatMessage(message);


    messageRow.appendChild(avatar);

    messageRow.appendChild(bubble);

    chatBox.appendChild(messageRow);


    scrollToBottom();


    return messageRow;
}


/* =========================================================
   6. FORMAT TIN NHẮN
   ========================================================= */

function formatMessage(message) {

    if (!message) return "";


    let text =
        String(message);


    /*
       Nếu backend trả về HTML,
       giữ lại các thẻ cơ bản.
    */

    text = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br>");


    return text;
}


/* =========================================================
   7. CUỘN XUỐNG CUỐI KHUNG CHAT
   ========================================================= */

function scrollToBottom() {

    if (!chatBox) return;

    setTimeout(() => {

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 50);
}


/* =========================================================
   8. HIỆN HIỆU ỨNG "CÔ HƯỜNG ĐANG GÕ..."
   ========================================================= */

function showTyping() {

    if (!chatBox) return;


    removeTyping();


    const typingRow =
        document.createElement("div");

    typingRow.id =
        "typingIndicator";

    typingRow.className =
        "message-row assistant";


    typingRow.innerHTML = `
        <div class="message-avatar">👩🏻‍🏫</div>

        <div class="message-bubble typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;


    chatBox.appendChild(
        typingRow
    );


    scrollToBottom();
}


/* =========================================================
   9. XÓA HIỆU ỨNG ĐANG GÕ
   ========================================================= */

function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );

    if (typing) {

        typing.remove();

    }
}


/* =========================================================
   10. HIỆN THÔNG TIN CÔ HƯỜNG
   ========================================================= */

function showCounselor() {

    if (!chatBox) return;


    /*
       Không tạo quá nhiều thẻ liên hệ
    */

    const oldCard =
        document.getElementById(
            "counselorCard"
        );

    if (oldCard) {

        oldCard.remove();

    }


    const card =
        document.createElement("div");

    card.id =
        "counselorCard";

    card.className =
        "counselor-card";


    let phoneHTML = "";


    if (COUNSELOR.phone) {

        phoneHTML = `
            <div class="counselor-phone">
                📞 ${COUNSELOR.phone}
            </div>
        `;

    }


    card.innerHTML = `

        <div class="counselor-card-title">
            👩🏻‍🏫 Cô Hường có thể hỗ trợ em
        </div>

        <div class="counselor-card-name">
            ${COUNSELOR.name}
        </div>

        <div class="counselor-card-role">
            ${COUNSELOR.title}
        </div>

        <div class="counselor-card-school">
            🏫 ${COUNSELOR.school}
        </div>

        <div class="counselor-card-hours">
            🕐 Thời gian hỗ trợ: ${COUNSELOR.hours}
        </div>

        ${phoneHTML}

        <div class="counselor-card-note">
            Nếu em cảm thấy khó nói với chatbot,
            em có thể tìm gặp hoặc nhắn trực tiếp
            với cô khi phù hợp.
        </div>
    `;


    chatBox.appendChild(card);


    scrollToBottom();
}


/* =========================================================
   11. ẨN CÁC NÚT GỢI Ý
   ========================================================= */

function hideSuggestions() {

    const suggestions =
        document.getElementById(
            "suggestions"
        );

    if (!suggestions) return;

    suggestions.style.display =
        "none";
}


/* =========================================================
   12. HIỆN LẠI NÚT GỢI Ý
   ========================================================= */

function showSuggestions() {

    const suggestions =
        document.getElementById(
            "suggestions"
        );

    if (!suggestions) return;

    suggestions.style.display =
        "";
}


/* =========================================================
   13. KHÓA / MỞ NÚT GỬI
   ========================================================= */

function setSendingState(sending) {

    isSending = sending;


    if (sendButton) {

        sendButton.disabled =
            sending;

        if (sending) {

            sendButton.dataset.oldText =
                sendButton.innerHTML;

            sendButton.innerHTML =
                "…";

        } else {

            sendButton.innerHTML =
                sendButton.dataset.oldText ||
                "Gửi";

        }
    }


    if (messageInput) {

        messageInput.disabled =
            sending;

    }
}


/* =========================================================
   14. PHÂN TÍCH TIN NHẮN
   ========================================================= */

function analyzeMessage(message) {

    /*
       Ưu tiên sử dụng counselingRules.js
       nếu file này đã được tải.
    */

    try {

        if (
            typeof window.analyzeStudentMessage ===
            "function"
        ) {

            return window.analyzeStudentMessage(
                message
            );

        }

    } catch (error) {

        console.warn(
            "Không thể phân tích bằng counselingRules.js:",
            error
        );
    }


    /*
       Phân tích dự phòng đơn giản
    */

    const text =
        message.toLowerCase();


    const highRiskWords = [
        "tự tử",
        "muốn chết",
        "chết đi",
        "tự sát",
        "tự làm đau",
        "tự hại",
        "cắt tay",
        "không muốn sống",
        "muốn kết thúc cuộc đời"
    ];


    const mediumRiskWords = [
        "bắt nạt",
        "cô lập",
        "mất ngủ",
        "không muốn đi học",
        "không muốn đến trường",
        "khóc nhiều",
        "quá áp lực",
        "stress",
        "buồn rất lâu",
        "không còn hứng thú"
    ];


    let riskLevel = "GREEN";


    if (
        highRiskWords.some(
            word =>
                text.includes(word)
        )
    ) {

        riskLevel = "RED";

    } else if (
        mediumRiskWords.some(
            word =>
                text.includes(word)
        )
    ) {

        riskLevel = "YELLOW";
    }


    return {
        riskLevel,
        topics: [],
        emotions: []
    };
}


/* =========================================================
   15. KIỂM TRA NGUY CƠ CAO
   ========================================================= */

function isHighRisk(analysis) {

    if (!analysis) return false;


    return (
        analysis.riskLevel === "RED" ||
        analysis.risk === "RED" ||
        analysis.level === "RED"
    );
}


/* =========================================================
   16. KIỂM TRA CÓ NÊN GIỚI THIỆU CÔ HƯỜNG
   ========================================================= */

function shouldContactCounselor(
    analysis,
    message = ""
) {

    if (!analysis) return false;


    if (
        isHighRisk(analysis)
    ) {

        return true;

    }


    if (
        analysis.riskLevel === "YELLOW" ||
        analysis.risk === "YELLOW" ||
        analysis.level === "YELLOW"
    ) {

        return true;

    }


    const text =
        message.toLowerCase();


    const counselorWords = [
        "cô tư vấn",
        "gặp cô",
        "muốn gặp cô",
        "nói chuyện với cô",
        "cần cô",
        "cô hường",
        "giáo viên tư vấn",
        "tư vấn trực tiếp"
    ];


    return counselorWords.some(
        word =>
            text.includes(word)
    );
}


/* =========================================================
   17. PHẢN HỒI KHI CÓ NGUY CƠ CAO
   ========================================================= */

function getSafetyResponse() {

    return `
        <strong>Cô rất quan tâm đến điều em vừa chia sẻ.</strong>
        <br><br>

        Nếu em đang có nguy hiểm ngay lúc này,
        em hãy tìm đến một người lớn mà em tin tưởng
        và ở bên họ, đừng ở một mình.
        <br><br>

        Em có thể tìm gặp trực tiếp
        <strong>Cô Hường – Giáo viên Tư vấn Tâm lý Học đường</strong>
        để được hỗ trợ.
        <br><br>

        Điều quan trọng nhất lúc này
        là em được an toàn.
    `;
}


/* =========================================================
   18. PHẢN HỒI KHI HỌC SINH KHÔNG MUỐN NÓI
   ========================================================= */

function getReluctantResponse() {

    const responses = [

        `
        Không sao đâu em. 🌷
        Em không cần phải kể hết ngay.
        <br><br>
        Nếu muốn, em chỉ cần nói cho cô biết:
        <strong>Điều gì đang khiến em khó chịu nhất lúc này?</strong>
        `,

        `
        Cô hiểu. Em có thể bắt đầu thật ngắn thôi. 🌱
        <br><br>
        Ví dụ:
        <strong>“Em đang buồn”</strong>,
        <strong>“Em đang rất áp lực”</strong>
        hoặc
        <strong>“Em không biết phải làm gì.”</strong>
        `,

        `
        Em không cần phải tìm đúng từ đâu.
        Cứ nói theo cách của em nhé. 💙
        <br><br>
        Cô đang lắng nghe em.
        `
    ];


    return responses[
        Math.floor(
            Math.random() *
            responses.length
        )
    ];
}


/* =========================================================
   19. PHẢN HỒI DỰ PHÒNG
   ========================================================= */

function getFallbackResponse() {

    return `
        Cô đang lắng nghe em. 🌷
        <br><br>

        Em có thể kể cho cô biết thêm một chút
        về điều đang khiến em buồn,
        lo lắng hoặc khó xử không?
        <br><br>

        Em không cần kể tất cả.
        Chỉ cần bắt đầu từ điều em cảm thấy
        khó nói nhất.
    `;
}


/* =========================================================
   20. GỌI BACKEND AI
   ========================================================= */

async function askAI(
    message,
    analysis
) {

    try {

        const response =
            await fetch(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message,

                        analysis,

                        history:
                            conversationHistory
                                .slice(-10)
                    })
                }
            );


        /*
           Kiểm tra lỗi HTTP
        */

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        /*
           Backend trả về reply
        */

        if (
            data &&
            data.reply
        ) {

            return data;

        }


        return {
            reply:
                getFallbackResponse(),

            showCounselor:
                false,

            riskLevel:
                analysis?.riskLevel ||
                "GREEN"
        };


    } catch (error) {

        console.error(
            "Lỗi kết nối Chatbot:",
            error
        );


        /*
           Không để học sinh thấy
           thông báo kỹ thuật dài dòng.
        */

        return {

            reply: `
                Cô vẫn đang ở đây với em. 🌷
                <br><br>
                Hiện tại hệ thống đang gặp
                một chút trục trặc.
                <br><br>
                Em có thể thử gửi lại tin nhắn
                sau một chút nhé.
            `,

            showCounselor:
                false,

            riskLevel:
                analysis?.riskLevel ||
                "GREEN",

            error: true
        };
    }
}


/* =========================================================
   21. TẠO PHẢN HỒI
   ========================================================= */

async function generateResponse(
    message
) {

    const cleanMessage =
        String(message || "")
            .trim();


    if (!cleanMessage) {

        return;

    }


    /*
       Phân tích nội dung
    */

    const analysis =
        analyzeMessage(
            cleanMessage
        );


    /*
       Nếu nguy cơ cao:
       không cần gọi AI trước.
    */

    if (
        isHighRisk(analysis)
    ) {

        return {

            reply:
                getSafetyResponse(),

            showCounselor:
                true,

            riskLevel:
                "RED"
        };
    }


    /*
       Gọi AI
    */

    const result =
        await askAI(
            cleanMessage,
            analysis
        );


    /*
       Quyết định hiện thông tin cô Hường
    */

    const showCounselorCard =
        Boolean(
            result.showCounselor
        ) ||
        shouldContactCounselor(
            analysis,
            cleanMessage
        );


    return {

        reply:
            result.reply ||
            getFallbackResponse(),

        showCounselor:
            showCounselorCard,

        riskLevel:
            result.riskLevel ||
            analysis.riskLevel ||
            "GREEN"
    };
}


/* =========================================================
   22. GỬI TIN NHẮN
   ========================================================= */

async function sendMessage(
    customMessage = null
) {

    /*
       Không cho gửi liên tục
    */

    if (isSending) {

        return;
    }


    /*
       Lấy nội dung
    */

    const message =
        customMessage !== null
            ? String(customMessage).trim()
            : String(
                messageInput?.value || ""
              ).trim();


    /*
       Không gửi tin nhắn rỗng
    */

    if (!message) {

        return;
    }


    /*
       Xóa nội dung ô nhập
    */

    if (
        customMessage === null &&
        messageInput
    ) {

        messageInput.value = "";

        messageInput.style.height =
            "auto";
    }


    /*
       Ẩn lời gợi ý sau tin nhắn đầu tiên
    */

    hideSuggestions();


    /*
       Hiện tin nhắn học sinh
    */

    addMessage(
        "user",
        message
    );


    /*
       Lưu lịch sử
    */

    conversationHistory.push({

        role: "user",

        content: message
    });


    /*
       Bắt đầu trạng thái gửi
    */

    setSendingState(true);


    /*
       Hiệu ứng đang trả lời
    */

    showTyping();


    try {

        const result =
            await generateResponse(
                message
            );


        /*
           Xóa hiệu ứng
        */

        removeTyping();


        /*
           Hiện câu trả lời
        */

        addMessage(
            "assistant",
            result.reply
        );


        /*
           Lưu lịch sử AI
        */

        conversationHistory.push({

            role: "assistant",

            content: result.reply
        });


        /*
           Nếu cần,
           hiện thông tin cô Hường
        */

        if (
            result.showCounselor
        ) {

            showCounselor();

        }


    } catch (error) {

        console.error(
            error
        );


        removeTyping();


        addMessage(
            "assistant",
            getFallbackResponse()
        );

    } finally {

        setSendingState(false);


        /*
           Đưa con trỏ về ô nhập
        */

        if (messageInput) {

            messageInput.focus();

        }
    }
}


/* =========================================================
   23. XỬ LÝ NÚT GỢI Ý
   ========================================================= */

function setupSuggestionButtons() {

    suggestionButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const message =
                        button.dataset.message ||
                        button.getAttribute(
                            "data-message"
                        );


                    if (!message) return;


                    sendMessage(
                        message
                    );
                }
            );

        }
    );
}


/* =========================================================
   24. XỬ LÝ PHÍM ENTER
   ========================================================= */

function setupInput() {

    if (!messageInput) return;


    messageInput.addEventListener(
        "keydown",
        event => {

            /*
               Enter = gửi
               Shift + Enter = xuống dòng
            */

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }
        }
    );


    /*
       Tự động tăng chiều cao ô nhập
    */

    messageInput.addEventListener(
        "input",
        () => {

            messageInput.style.height =
                "auto";

            messageInput.style.height =
                Math.min(
                    messageInput.scrollHeight,
                    140
                ) + "px";
        }
    );
}


/* =========================================================
   25. XỬ LÝ NÚT GỬI
   ========================================================= */

function setupSendButton() {

    if (!sendButton) return;


    sendButton.addEventListener(
        "click",
        () => {

            sendMessage();

        }
    );
}


/* =========================================================
   26. LỜI CHÀO BAN ĐẦU
   ========================================================= */

function showWelcomeMessage() {

    /*
       Không hiện nhiều phần giới thiệu.
       Chỉ một lời chào ngắn gọn.
    */

    if (firstMessageShown) {

        return;
    }


    firstMessageShown = true;


    const welcomeMessage = `

        <strong>Cô Hường - Giáo viên Tư vấn Tâm lý Học đường</strong>
        chào em 👋

        <br><br>

        Em có thể chia sẻ những điều đang khiến em
        buồn, lo lắng, áp lực hoặc khó xử.

        <br><br>

        Em không cần phải kể tất cả.
        Hãy bắt đầu bằng điều em cảm thấy khó nói nhất.

    `;


    addMessage(
        "assistant",
        welcomeMessage
    );
}


/* =========================================================
   27. KHỞI ĐỘNG CHATBOT
   ========================================================= */

function initChatbot() {

    console.log(
        "Cô Hường Chatbot đang khởi động..."
    );


    /*
       Thiết lập các thành phần
    */

    setupSuggestionButtons();

    setupInput();

    setupSendButton();


    /*
       Lời chào đầu tiên
    */

    showWelcomeMessage();


    /*
       Đưa con trỏ vào ô nhập
    */

    if (messageInput) {

        setTimeout(
            () => {

                messageInput.focus();

            },
            300
        );
    }


    console.log(
        "Cô Hường Chatbot đã sẵn sàng."
    );
}


/* =========================================================
   28. KHỞI ĐỘNG KHI TRANG ĐÃ TẢI
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initChatbot
    );

} else {

    initChatbot();

}


/* =========================================================
   29. CHO PHÉP CÁC FILE KHÁC GỌI HÀM
   ========================================================= */

window.sendMessage =
    sendMessage;

window.generateResponse =
    generateResponse;

window.showCounselor =
    showCounselor;

window.showWelcomeMessage =
    showWelcomeMessage;
