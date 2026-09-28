/* =====================================================
   TRỢ LÝ AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
   PHẦN 1 - LOGIC CHATBOT

   Hiện tại:
   - Chưa cần AI API
   - Chưa cần API Key
   - Có thể bấm nút gợi ý
   - Có thể nhập câu hỏi
   - Có phản hồi tự động
   - Có nhận diện một số chủ đề cơ bản
   - Có hiển thị giáo viên tư vấn khi cần
===================================================== */


/* =====================================================
   1. LẤY CÁC PHẦN TỬ
===================================================== */

const chatBox =
    document.getElementById("chatBox");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const typingIndicator =
    document.getElementById("typingIndicator");

const counselorCard =
    document.getElementById("counselorCard");

const newChatButton =
    document.getElementById("newChatButton");

const suggestionButtons =
    document.querySelectorAll(
        ".suggestion-button"
    );


/* =====================================================
   2. TRẠNG THÁI CHAT
===================================================== */

let conversationStarted = false;


/* =====================================================
   3. THÊM TIN NHẮN CỦA NGƯỜI DÙNG
===================================================== */

function addUserMessage(message) {

    const row =
        document.createElement("div");

    row.className =
        "message-row user-row";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        "👤";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message user-message";


    const text =
        document.createElement("div");

    text.className =
        "message-text";

    text.textContent =
        message;


    bubble.appendChild(text);

    row.appendChild(bubble);

    row.appendChild(avatar);

    chatBox.appendChild(row);


    scrollToBottom();

}


/* =====================================================
   4. THÊM TIN NHẮN CỦA CHATBOT
===================================================== */

function addBotMessage(message) {

    const row =
        document.createElement("div");

    row.className =
        "message-row bot-row";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        "🤖";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message bot-message";


    const text =
        document.createElement("div");

    text.className =
        "message-text";


    /*
       Cho phép chatbot xuống dòng
    */

    const paragraphs =
        message.split("\n");


    paragraphs.forEach(
        paragraph => {

            if (
                paragraph.trim() === ""
            ) {
                return;
            }


            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            text.appendChild(p);

        }
    );


    bubble.appendChild(text);

    row.appendChild(avatar);

    row.appendChild(bubble);

    chatBox.appendChild(row);


    scrollToBottom();

}


/* =====================================================
   5. CUỘN XUỐNG CUỐI
===================================================== */

function scrollToBottom() {

    setTimeout(() => {

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 50);

}


/* =====================================================
   6. HIỂN THỊ CHATBOT ĐANG SUY NGHĨ
===================================================== */

function showTyping() {

    typingIndicator.style.display =
        "flex";

    scrollToBottom();

}


/* =====================================================
   7. ẨN CHATBOT ĐANG SUY NGHĨ
===================================================== */

function hideTyping() {

    typingIndicator.style.display =
        "none";

}


/* =====================================================
   8. HIỂN THỊ GIÁO VIÊN TƯ VẤN
===================================================== */

function showCounselor() {

    counselorCard.style.display =
        "flex";

}


/* =====================================================
   9. PHÂN TÍCH NỘI DUNG
===================================================== */

function analyzeMessage(message) {

    const text =
        message
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    /* =========================
       NGUY CƠ CAO
    ========================= */

    const highRiskKeywords = [

        "muon chet",

        "khong muon song",

        "tu tu",

        "tu sat",

        "tu lam hai",

        "lam hai ban than",

        "ket thuc cuoc doi",

        "chet di",

        "em muon chet",

        "em khong muon song",

        "bi danh",

        "bi bao hanh",

        "bi xam hai",

        "xam hai",

        "dang nguy hiem",

        "bi de doa"

    ];


    for (
        const keyword
        of highRiskKeywords
    ) {

        if (
            text.includes(keyword)
        ) {

            return "HIGH";

        }

    }


    /* =========================
       CẦN QUAN TÂM
    ========================= */

    const mediumRiskKeywords = [

        "rat buon",

        "buon lam",

        "khoc",

        "mat ngu",

        "khong ngu duoc",

        "mat tap trung",

        "khong muon di hoc",

        "so di hoc",

        "ap luc",

        "cang thang",

        "lo lang",

        "co don",

        "khong ai hieu em",

        "bi bat nat",

        "bi treu",

        "bi che",

        "khong co ban",

        "chan hoc",

        "met moi",

        "that vong"

    ];


    for (
        const keyword
        of mediumRiskKeywords
    ) {

        if (
            text.includes(keyword)
        ) {

            return "MEDIUM";

        }

    }


    return "LOW";

}


/* =====================================================
   10. NHẬN DIỆN CHỦ ĐỀ
===================================================== */

function detectTopic(message) {

    const text =
        message
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    if (
        text.includes("hoc") ||
        text.includes("diem") ||
        text.includes("thi") ||
        text.includes("bai tap") ||
        text.includes("giao vien")
    ) {

        return "study";

    }


    if (
        text.includes("ban") ||
        text.includes("choi") ||
        text.includes("lop") ||
        text.includes("bat nat") ||
        text.includes("treu")
    ) {

        return "friend";

    }


    if (
        text.includes("bo me") ||
        text.includes("cha me") ||
        text.includes("gia dinh") ||
        text.includes("me") ||
        text.includes("bo")
    ) {

        return "family";

    }


    if (
        text.includes("thich") ||
        text.includes("yeu") ||
        text.includes("tinh cam") ||
        text.includes("crush")
    ) {

        return "love";

    }


    if (
        text.includes("lo") ||
        text.includes("so") ||
        text.includes("cang thang") ||
        text.includes("stress")
    ) {

        return "anxiety";

    }


    if (
        text.includes("buon") ||
        text.includes("khoc") ||
        text.includes("chan") ||
        text.includes("co don")
    ) {

        return "sad";

    }


    return "general";

}


/* =====================================================
   11. PHẢN HỒI NGUY CƠ CAO
===================================================== */

function highRiskResponse() {

    showCounselor();


    return `
Mình rất tiếc vì bạn đang phải trải qua một chuyện nghiêm trọng như vậy.

Điều quan trọng nhất lúc này là bạn không nên ở một mình với tình huống nguy hiểm.

Bạn hãy tìm ngay một người lớn mà bạn tin tưởng như bố mẹ, người thân, giáo viên hoặc giáo viên tư vấn tâm lý và nói cho họ biết bạn đang gặp chuyện.

Nếu bạn đang ở trong tình huống nguy hiểm ngay lúc này, hãy tìm đến nơi an toàn và nhờ người lớn hỗ trợ ngay.

Mình có thể tiếp tục lắng nghe bạn, nhưng mình không muốn bạn phải tự đối mặt với chuyện này một mình.

Bạn đang ở nơi an toàn lúc này chứ?
`;

}


/* =====================================================
   12. PHẢN HỒI ÁP LỰC HỌC TẬP
===================================================== */

function studyResponse() {

    return `
Mình hiểu. Áp lực học tập có thể khiến chúng ta cảm thấy rất mệt mỏi, lo lắng hoặc sợ mình không đạt được điều mình mong muốn.

Bạn không cần phải giải quyết tất cả mọi việc cùng một lúc.

Bạn có thể thử:

• Chọn một việc quan trọng nhất để làm trước.
• Chia bài học thành những phần nhỏ.
• Nghỉ ngắn giữa các khoảng học.
• Nếu cảm thấy quá tải, hãy chia sẻ với bố mẹ hoặc thầy cô.

Mình muốn hiểu bạn hơn một chút.

Điều khiến bạn áp lực nhất hiện nay là điểm số, bài tập, kỳ thi hay sự kỳ vọng của người khác?
`;

}


/* =====================================================
   13. PHẢN HỒI VỀ BẠN BÈ
===================================================== */

function friendResponse() {

    showCounselor();


    return `
Chuyện với bạn bè đôi khi có thể khiến mình rất buồn hoặc cảm thấy cô đơn.

Trước hết, cảm xúc của bạn là điều đáng được lắng nghe.

Nếu đang xảy ra mâu thuẫn, bạn có thể thử bình tĩnh và tránh đáp trả bằng lời nói hoặc hành động làm mọi việc nghiêm trọng hơn.

Nếu bạn đang bị bắt nạt hoặc bị đe dọa, hãy nói với một người lớn đáng tin cậy như giáo viên chủ nhiệm, bố mẹ hoặc giáo viên tư vấn.

Bạn có thể kể cho mình biết chuyện gì đã xảy ra với bạn không?
`;

}


/* =====================================================
   14. PHẢN HỒI VỀ GIA ĐÌNH
===================================================== */

function familyResponse() {

    showCounselor();


    return `
Mình nghe bạn.

Chuyện xảy ra trong gia đình đôi khi rất khó nói, đặc biệt khi bạn cảm thấy người lớn không hiểu mình.

Bạn không cần phải ngay lập tức giải quyết tất cả.

Trước tiên, hãy thử xác định điều gì đang khiến bạn buồn hoặc khó chịu nhất.

Nếu có thể, hãy lựa chọn một thời điểm cả hai bên bình tĩnh để nói chuyện.

Bạn muốn kể cho mình biết điều gì đang xảy ra ở nhà không?
`;

}


/* =====================================================
   15. PHẢN HỒI VỀ TÌNH CẢM
===================================================== */

function loveResponse() {

    return `
Những cảm xúc như thích một người, nhớ một người hoặc bối rối về tình cảm là điều có thể xuất hiện trong tuổi học trò.

Điều quan trọng là bạn luôn tôn trọng bản thân và tôn trọng người khác.

Một mối quan hệ lành mạnh cần có sự tôn trọng, không ép buộc và không làm điều gì khiến bạn cảm thấy không an toàn.

Đặc biệt, bạn không nên gửi hoặc chia sẻ hình ảnh riêng tư của mình cho người khác.

Bạn đang gặp chuyện gì trong tình cảm vậy?
`;

}


/* =====================================================
   16. PHẢN HỒI LO LẮNG
===================================================== */

function anxietyResponse() {

    return `
Mình hiểu cảm giác lo lắng có thể khiến cơ thể và suy nghĩ đều rất mệt.

Trước mắt, bạn hãy thử cùng mình làm một việc nhỏ:

Hít vào thật chậm...

Giữ một chút...

Sau đó thở ra từ từ.

Bạn có thể lặp lại vài lần.

Sau đó hãy nói cho mình biết:

Điều gì đang khiến bạn lo lắng nhất lúc này?
`;

}


/* =====================================================
   17. PHẢN HỒI KHI BUỒN
===================================================== */

function sadResponse() {

    showCounselor();


    return `
Mình nghe bạn.

Buồn là một cảm xúc bình thường và bạn không cần phải xấu hổ vì mình đang buồn.

Mình ở đây để lắng nghe bạn.

Bạn không cần kể tất cả ngay lập tức.

Bạn có thể bắt đầu bằng một câu rất đơn giản:

“Điều làm em buồn nhất là...”

Bạn muốn kể cho mình chuyện gì đã xảy ra không?
`;

}


/* =====================================================
   18. PHẢN HỒI CHUNG
===================================================== */

function generalResponse() {

    return `
Mình đang lắng nghe bạn. 🌷

Bạn có thể kể cho mình bất cứ điều gì đang khiến bạn suy nghĩ hoặc cảm thấy khó xử.

Không cần phải viết thật dài.

Bạn có thể bắt đầu bằng:

“Em đang cảm thấy...”

hoặc

“Điều làm em lo nhất là...”

Mình sẽ cùng bạn tìm hiểu từng bước.
`;

}


/* =====================================================
   19. PHẢN HỒI "KHÔNG BIẾT"
===================================================== */

function dontKnowResponse() {

    return `
Không sao cả. Bạn không nhất thiết phải biết chính xác mình đang cảm thấy gì.

Bạn có thể chọn một trong những cảm giác gần với mình nhất:

😔 Buồn

😰 Lo lắng

😡 Tức giận

😞 Thất vọng

😴 Mệt mỏi

😢 Cô đơn

😕 Bối rối

Bạn đang cảm thấy gần với điều nào nhất?
`;

}


/* =====================================================
   20. TẠO PHẢN HỒI
===================================================== */

function generateResponse(message) {

    const risk =
        analyzeMessage(message);


    /*
       Nếu nguy cơ cao
       => ưu tiên an toàn
    */

    if (
        risk === "HIGH"
    ) {

        return highRiskResponse();

    }


    const topic =
        detectTopic(message);


    switch (topic) {

        case "study":

            return studyResponse();


        case "friend":

            return friendResponse();


        case "family":

            return familyResponse();


        case "love":

            return loveResponse();


        case "anxiety":

            return anxietyResponse();


        case "sad":

            return sadResponse();


        default:

            return generalResponse();

    }

}


/* =====================================================
   21. GỬI TIN NHẮN
===================================================== */

function sendMessage(message = null) {

    const userMessage =
        message !== null
            ? message.trim()
            : messageInput.value.trim();


    if (
        userMessage === ""
    ) {

        return;

    }


    /*
       Không cho gửi quá dài
    */

    if (
        userMessage.length > 2000
    ) {

        alert(
            "Nội dung quá dài. Bạn hãy viết ngắn hơn nhé."
        );

        return;

    }


    conversationStarted = true;


    /*
       Hiện tin nhắn người dùng
    */

    addUserMessage(
        userMessage
    );


    /*
       Xóa ô nhập
    */

    messageInput.value = "";

    messageInput.style.height =
        "auto";


    /*
       Ẩn các nút gợi ý
       sau khi bắt đầu trò chuyện
    */

    const suggestions =
        document.getElementById(
            "suggestions"
        );

    suggestions.style.display =
        "none";


    /*
       Hiển thị trạng thái đang suy nghĩ
    */

    showTyping();


    /*
       Tạo phản hồi
    */

    setTimeout(
        () => {

            hideTyping();


            const response =
                generateResponse(
                    userMessage
                );


            addBotMessage(
                response
            );

        },
        700
    );

}


/* =====================================================
   22. NÚT GỢI Ý
===================================================== */

suggestionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const message =
                    button.dataset.message;


                sendMessage(
                    message
                );

            }
        );

    }
);


/* =====================================================
   23. NÚT GỬI
===================================================== */

sendButton.addEventListener(
    "click",
    () => {

        sendMessage();

    }
);


/* =====================================================
   24. ENTER ĐỂ GỬI
===================================================== */

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


/* =====================================================
   25. TỰ ĐỘNG TĂNG CHIỀU CAO Ô NHẬP
===================================================== */

messageInput.addEventListener(
    "input",
    () => {

        messageInput.style.height =
            "auto";

        messageInput.style.height =
            Math.min(
                messageInput.scrollHeight,
                120
            ) + "px";

    }
);


/* =====================================================
   26. CUỘC TRÒ CHUYỆN MỚI
===================================================== */

newChatButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Bạn có muốn bắt đầu cuộc trò chuyện mới không?"
            );


        if (!confirmed) {

            return;

        }


        /*
           Xóa các tin nhắn cũ
        */

        const messages =
            chatBox.querySelectorAll(
                ".message-row"
            );


        messages.forEach(
            message => {

                message.remove();

            }
        );


        /*
           Hiện lại lời chào
        */

        const welcomeRow =
            document.createElement(
                "div"
            );

        welcomeRow.className =
            "message-row bot-row";


        welcomeRow.innerHTML = `

            <div class="message-avatar">
                🤖
            </div>

            <div class="message bot-message">

                <div class="message-text">

                    <strong>
                        Chào bạn! 🌷
                    </strong>

                    <p>
                        Chúng ta bắt đầu một cuộc trò chuyện mới nhé.
                    </p>

                    <p>
                        Bạn đang muốn chia sẻ điều gì?
                    </p>

                </div>

            </div>

        `;


        chatBox.insertBefore(
            welcomeRow,
            typingIndicator
        );


        /*
           Hiện lại gợi ý
        */

        const suggestions =
            document.getElementById(
                "suggestions"
            );

        suggestions.style.display =
            "flex";


        /*
           Ẩn giáo viên tư vấn
        */

        counselorCard.style.display =
            "none";


        /*
           Xóa ô nhập
        */

        messageInput.value = "";

        messageInput.style.height =
            "auto";


        conversationStarted =
            false;


        scrollToBottom();

    }
);


/* =====================================================
   27. KHỞI TẠO
===================================================== */

console.log(
    "🤖 Trợ lý AI Tư vấn Tâm lý Học đường đã khởi động."
);

console.log(
    "PHẦN 1: Giao diện + Chatbot cơ bản"
);
