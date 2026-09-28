/* =========================================================
   COUNSELING RULES
   TRỢ LÝ AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG THCS

   PHẦN 3:
   - Phân tích cảm xúc
   - Phân tích chủ đề
   - Nhận diện nguy cơ
   - Chọn chế độ tư vấn
   - Quy tắc phản hồi
   - Quy tắc an toàn
========================================================= */


/* =========================================================
   1. CẤU HÌNH CHUNG
========================================================= */

const COUNSELING_RULES = {

    version: "1.0",

    targetAge: "11-15",

    language: "vi",

    defaultRisk: "GREEN",

    defaultMode: "LISTENING",

    maxQuestionsPerResponse: 2,

    maxSuggestionsPerResponse: 3

};


/* =========================================================
   2. CHUẨN HÓA TIẾNG VIỆT
========================================================= */

function normalizeVietnamese(text) {

    if (!text) {
        return "";
    }

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /đ/g,
            "d"
        )
        .trim();

}


/* =========================================================
   3. TỪ KHÓA NGUY CƠ CAO
========================================================= */

const HIGH_RISK_PATTERNS = [

    "muon chet",

    "muon tu tu",

    "muon tu sat",

    "khong muon song",

    "khong muon ton tai",

    "muon bien mat",

    "ket thuc cuoc doi",

    "chet di",

    "em muon chet",

    "em khong muon song",

    "tu lam hai",

    "lam hai ban than",

    "lam dau ban than",

    "tu thuong",

    "tu huy hoai",

    "em dang lam dau minh",

    "em dang lam hai minh",

    "bi xam hai",

    "dang bi xam hai",

    "bi bao hanh",

    "dang bi bao hanh",

    "bi danh",

    "dang bi danh",

    "bi de doa",

    "dang bi de doa",

    "dang gap nguy hiem",

    "khong an toan",

    "co nguoi muon hai em",

    "co nguoi dang hai em"

];


/* =========================================================
   4. TỪ KHÓA CẦN QUAN TÂM
========================================================= */

const MEDIUM_RISK_PATTERNS = [

    "rat buon",

    "buon lam",

    "buon nhieu",

    "khoc nhieu",

    "khoc moi ngay",

    "mat ngu",

    "khong ngu duoc",

    "ngu rat it",

    "khong muon di hoc",

    "so di hoc",

    "khong muon gap ai",

    "khong muon noi chuyen",

    "co don",

    "khong ai hieu em",

    "khong co ban",

    "bi bat nat",

    "bi treu",

    "bi che",

    "bi co lap",

    "bi noi xau",

    "ap luc",

    "rat ap luc",

    "qua tai",

    "met moi",

    "rat met",

    "chan hoc",

    "khong con hung thu",

    "khong muon lam gi",

    "lo lang",

    "rat lo",

    "hoang so",

    "cang thang",

    "stress",

    "that vong",

    "cam thay vo dung",

    "vo dung",

    "khong co gia tri",

    "tu ti",

    "mac cam",

    "so bi danh gia"

];


/* =========================================================
   5. TỪ KHÓA CẢM XÚC
========================================================= */

const EMOTION_PATTERNS = {

    sadness: [

        "buon",

        "khoc",

        "that vong",

        "trong rong",

        "chan",

        "co don",

        "dau long"

    ],

    anxiety: [

        "lo",

        "lo lang",

        "so",

        "hoang",

        "cang thang",

        "stress",

        "hoi hop",

        "bat an"

    ],

    anger: [

        "tuc",

        "gian",

        "buc",

        "uc che",

        "kho chiu",

        "dien"

    ],

    loneliness: [

        "co don",

        "khong ai",

        "khong co ban",

        "bi bo roi",

        "khong ai hieu"

    ],

    disappointment: [

        "that vong",

        "khong dat",

        "rot",

        "diem thap",

        "khong thanh cong"

    ],

    fear: [

        "so",

        "hai",

        "khiep",

        "hoang so",

        "khong dam"

    ],

    pressure: [

        "ap luc",

        "qua tai",

        "met moi",

        "cang thang",

        "stress"

    ],

    confusion: [

        "khong biet",

        "boi roi",

        "khong hieu",

        "khong biet phai lam gi"

    ]

};


/* =========================================================
   6. CHỦ ĐỀ
========================================================= */

const TOPIC_PATTERNS = {

    study: [

        "hoc",

        "bai",

        "bai tap",

        "diem",

        "kiem tra",

        "thi",

        "thi cu",

        "giao vien",

        "mon hoc",

        "hoc them",

        "truong"

    ],

    friendship: [

        "ban",

        "ban be",

        "ban than",

        "cai nhau",

        "mau thuan",

        "hieu lam",

        "bo roi",

        "noi xau"

    ],

    bullying: [

        "bat nat",

        "treu",

        "che",

        "co lap",

        "danh",

        "dam",

        "da",

        "chui",

        "de doa",

        "buc hiep"

    ],

    family: [

        "gia dinh",

        "bo me",

        "cha me",

        "bo",

        "me",

        "anh",

        "chi",

        "em",

        "nguoi than",

        "ly hon"

    ],

    love: [

        "thich",

        "yeu",

        "crush",

        "tinh cam",

        "nguoi yeu",

        "chia tay",

        "ghen"

    ],

    puberty: [

        "day thi",

        "co the",

        "ngoai hinh",

        "kinh nguyet",

        "giong noi",

        "mun",

        "chieu cao",

        "can nang"

    ],

    socialMedia: [

        "facebook",

        "tiktok",

        "instagram",

        "mang xa hoi",

        "online",

        "tren mang",

        "tai khoan",

        "binh luan",

        "anh rieng tu"

    ],

    sleep: [

        "mat ngu",

        "kho ngu",

        "thuc khuya",

        "ngu muon",

        "buon ngu"

    ],

    selfEsteem: [

        "tu ti",

        "mac cam",

        "xau",

        "vo dung",

        "kem coi",

        "khong gioi",

        "khong ai thich"

    ],

    anxiety: [

        "lo lang",

        "lo",

        "so",

        "cang thang",

        "stress",

        "hoi hop"

    ],

    safety: [

        "tu tu",

        "tu sat",

        "muon chet",

        "khong muon song",

        "tu lam hai",

        "xam hai",

        "bao hanh",

        "bao luc",

        "nguy hiem",

        "de doa"

    ]

};


/* =========================================================
   7. TÌNH TRẠNG "KHÔNG MUỐN NÓI"
========================================================= */

const RELUCTANT_PATTERNS = [

    "khong muon noi",

    "khong muon ke",

    "khong biet noi gi",

    "khong muon chia se",

    "em khong muon noi",

    "thoi",

    "khong co gi",

    "khong sao",

    "bo qua di"

];


/* =========================================================
   8. TÌNH TRẠNG "KHÔNG BIẾT"
========================================================= */

const CONFUSED_PATTERNS = [

    "khong biet",

    "em khong biet",

    "khong biet nua",

    "chac em cung khong biet",

    "khong biet phai lam gi"

];


/* =========================================================
   9. PHÂN TÍCH NGUY CƠ
========================================================= */

function detectRisk(message) {

    const text =
        normalizeVietnamese(message);


    /*
       RED
    */

    for (
        const pattern
        of HIGH_RISK_PATTERNS
    ) {

        if (
            text.includes(pattern)
        ) {

            return {

                level: "RED",

                reason:
                    "Phát hiện dấu hiệu có thể liên quan đến an toàn hoặc nguy cơ bị làm hại.",

                priority: 100

            };

        }

    }


    /*
       YELLOW
    */

    for (
        const pattern
        of MEDIUM_RISK_PATTERNS
    ) {

        if (
            text.includes(pattern)
        ) {

            return {

                level: "YELLOW",

                reason:
                    "Phát hiện dấu hiệu cảm xúc hoặc khó khăn cần được quan tâm.",

                priority: 50

            };

        }

    }


    /*
       GREEN
    */

    return {

        level: "GREEN",

        reason:
            "Chưa phát hiện dấu hiệu nguy cơ rõ ràng.",

        priority: 10

    };

}


/* =========================================================
   10. PHÂN TÍCH CẢM XÚC
========================================================= */

function detectEmotion(message) {

    const text =
        normalizeVietnamese(message);


    const scores = {};


    for (
        const emotion
        in EMOTION_PATTERNS
    ) {

        scores[emotion] = 0;


        for (
            const pattern
            of EMOTION_PATTERNS[emotion]
        ) {

            if (
                text.includes(pattern)
            ) {

                scores[emotion]++;

            }

        }

    }


    let bestEmotion =
        "neutral";

    let bestScore =
        0;


    for (
        const emotion
        in scores
    ) {

        if (
            scores[emotion] > bestScore
        ) {

            bestEmotion =
                emotion;

            bestScore =
                scores[emotion];

        }

    }


    return {

        emotion: bestEmotion,

        score: bestScore,

        allScores: scores

    };

}


/* =========================================================
   11. PHÂN TÍCH CHỦ ĐỀ
========================================================= */

function detectTopics(message) {

    const text =
        normalizeVietnamese(message);


    const results = [];


    for (
        const topic
        in TOPIC_PATTERNS
    ) {

        let score = 0;


        for (
            const pattern
            of TOPIC_PATTERNS[topic]
        ) {

            if (
                text.includes(pattern)
            ) {

                score++;

            }

        }


        if (
            score > 0
        ) {

            results.push({

                topic,

                score

            });

        }

    }


    results.sort(
        (a, b) =>
            b.score - a.score
    );


    return results;

}


/* =========================================================
   12. CHỦ ĐỀ CHÍNH
========================================================= */

function detectPrimaryTopic(message) {

    const topics =
        detectTopics(message);


    if (
        topics.length === 0
    ) {

        return "general";

    }


    return topics[0].topic;

}


/* =========================================================
   13. KIỂM TRA KHÔNG MUỐN NÓI
========================================================= */

function isReluctant(message) {

    const text =
        normalizeVietnamese(message);


    return RELUCTANT_PATTERNS.some(
        pattern =>
            text.includes(pattern)
    );

}


/* =========================================================
   14. KIỂM TRA "KHÔNG BIẾT"
========================================================= */

function isConfused(message) {

    const text =
        normalizeVietnamese(message);


    return CONFUSED_PATTERNS.some(
        pattern =>
            text.includes(pattern)
    );

}


/* =========================================================
   15. CHỌN CHẾ ĐỘ TƯ VẤN
========================================================= */

function selectCounselingMode(
    risk,
    emotion,
    topic,
    message
) {

    /*
       RED = SAFETY
    */

    if (
        risk.level === "RED"
    ) {

        return "SAFETY";

    }


    /*
       YELLOW = SUPPORT
    */

    if (
        risk.level === "YELLOW"
    ) {

        return "SUPPORT";

    }


    /*
       Học sinh không muốn nói
    */

    if (
        isReluctant(message)
    ) {

        return "LISTENING";

    }


    /*
       Không biết cảm xúc
    */

    if (
        isConfused(message)
    ) {

        return "EXPLORATION";

    }


    /*
       Hỏi kiến thức
    */

    if (
        topic !== "general"
    ) {

        return "COUNSELING";

    }


    /*
       Mặc định
    */

    return "LISTENING";

}


/* =========================================================
   16. CHỌN CÁCH PHẢN HỒI
========================================================= */

function getResponseStrategy(
    riskLevel,
    counselingMode
) {

    if (
        riskLevel === "RED"
    ) {

        return {

            empathy: true,

            safetyFirst: true,

            advice: false,

            questions: 2,

            counselor: true,

            adultSupport: true

        };

    }


    if (
        riskLevel === "YELLOW"
    ) {

        return {

            empathy: true,

            safetyFirst: false,

            advice: true,

            questions: 2,

            counselor: true,

            adultSupport: true

        };

    }


    if (
        counselingMode === "LISTENING"
    ) {

        return {

            empathy: true,

            safetyFirst: false,

            advice: false,

            questions: 1,

            counselor: false,

            adultSupport: false

        };

    }


    if (
        counselingMode === "EXPLORATION"
    ) {

        return {

            empathy: true,

            safetyFirst: false,

            advice: false,

            questions: 2,

            counselor: false,

            adultSupport: false

        };

    }


    return {

        empathy: true,

        safetyFirst: false,

        advice: true,

        questions: 1,

        counselor: false,

        adultSupport: false

    };

}


/* =========================================================
   17. KIỂM TRA CÓ CẦN GIÁO VIÊN
========================================================= */

function shouldShowCounselor(
    riskLevel,
    topic,
    message
) {

    /*
       RED
       Luôn ưu tiên kết nối người lớn
    */

    if (
        riskLevel === "RED"
    ) {

        return true;

    }


    /*
       YELLOW
    */

    if (
        riskLevel === "YELLOW"
    ) {

        return true;

    }


    /*
       Các chủ đề nhạy cảm
    */

    const sensitiveTopics = [

        "bullying",

        "family",

        "safety",

        "socialMedia"

    ];


    if (
        sensitiveTopics.includes(topic)
    ) {

        return true;

    }


    /*
       Nội dung có dấu hiệu nguy cơ
    */

    const text =
        normalizeVietnamese(message);


    const sensitiveWords = [

        "de doa",

        "bao luc",

        "xam hai",

        "bat nat",

        "khong an toan"

    ];


    return sensitiveWords.some(
        word =>
            text.includes(word)
    );

}


/* =========================================================
   18. CÂU HỎI KIỂM TRA AN TOÀN
========================================================= */

function getSafetyQuestions() {

    return [

        "Bạn đang ở nơi an toàn lúc này chứ?",

        "Có người lớn đáng tin cậy nào đang ở gần bạn không?",

        "Bạn có thể đến gần người đó ngay bây giờ không?"

    ];

}


/* =========================================================
   19. CÂU HỎI KHI HỌC SINH BUỒN
========================================================= */

function getSadnessQuestions() {

    return [

        "Điều gì khiến bạn buồn nhất lúc này?",

        "Bạn đã cảm thấy như vậy trong bao lâu?",

        "Có ai bạn tin tưởng mà bạn có thể chia sẻ không?"

    ];

}


/* =========================================================
   20. CÂU HỎI KHI ÁP LỰC HỌC TẬP
========================================================= */

function getStudyQuestions() {

    return [

        "Điều gì trong việc học khiến bạn áp lực nhất?",

        "Áp lực này xuất hiện từ khi nào?",

        "Bạn muốn điều gì thay đổi trước tiên?"

    ];

}


/* =========================================================
   21. CÂU HỎI KHI BỊ BẮT NẠT
========================================================= */

function getBullyingQuestions() {

    return [

        "Chuyện này xảy ra ở trường hay trên mạng?",

        "Bạn có đang ở nơi an toàn không?",

        "Có người lớn nào bạn có thể nói chuyện ngay không?"

    ];

}


/* =========================================================
   22. CÂU HỎI VỀ GIA ĐÌNH
========================================================= */

function getFamilyQuestions() {

    return [

        "Điều gì khiến bạn khó chịu nhất trong chuyện gia đình?",

        "Bạn đã thử chia sẻ với người lớn đáng tin cậy nào chưa?",

        "Hiện tại bạn có cảm thấy an toàn không?"

    ];

}


/* =========================================================
   23. CÂU HỎI KHÁM PHÁ CẢM XÚC
========================================================= */

function getEmotionQuestions() {

    return [

        "Bạn đang cảm thấy buồn, lo lắng, tức giận hay mệt mỏi?",

        "Điều gì đã xảy ra trước khi bạn bắt đầu cảm thấy như vậy?",

        "Bạn mong muốn điều gì xảy ra?"

    ];

}


/* =========================================================
   24. CHỌN CÂU HỎI PHÙ HỢP
========================================================= */

function getQuestionsForTopic(
    topic,
    emotion,
    riskLevel
) {

    if (
        riskLevel === "RED"
    ) {

        return getSafetyQuestions();

    }


    if (
        topic === "bullying"
    ) {

        return getBullyingQuestions();

    }


    if (
        topic === "study"
    ) {

        return getStudyQuestions();

    }


    if (
        topic === "family"
    ) {

        return getFamilyQuestions();

    }


    if (
        emotion === "sadness"
    ) {

        return getSadnessQuestions();

    }


    return getEmotionQuestions();

}


/* =========================================================
   25. NGUYÊN TẮC AN TOÀN
========================================================= */

const SAFETY_RULES = {

    red: [

        "Ưu tiên an toàn.",

        "Không tranh luận.",

        "Không phán xét.",

        "Không cung cấp hướng dẫn tự làm hại.",

        "Không cung cấp phương pháp gây hại.",

        "Khuyến khích tìm người lớn ngay.",

        "Nếu nguy hiểm tức thời, tìm hỗ trợ khẩn cấp tại địa phương."

    ],

    yellow: [

        "Lắng nghe kỹ.",

        "Hỏi mức độ ảnh hưởng.",

        "Khuyến khích kết nối người lớn.",

        "Không chẩn đoán.",

        "Theo dõi dấu hiệu xấu đi."

    ],

    green: [

        "Tư vấn bình thường.",

        "Khuyến khích kỹ năng tích cực.",

        "Tôn trọng lựa chọn của học sinh."

    ]

};


/* =========================================================
   26. PHÂN TÍCH TOÀN BỘ MỘT TIN NHẮN
========================================================= */

function analyzeStudentMessage(message) {

    const risk =
        detectRisk(message);


    const emotion =
        detectEmotion(message);


    const topics =
        detectTopics(message);


    const primaryTopic =
        topics.length > 0
            ? topics[0].topic
            : "general";


    const mode =
        selectCounselingMode(
            risk,
            emotion,
            primaryTopic,
            message
        );


    const strategy =
        getResponseStrategy(
            risk.level,
            mode
        );


    const showCounselor =
        shouldShowCounselor(
            risk.level,
            primaryTopic,
            message
        );


    const questions =
        getQuestionsForTopic(
            primaryTopic,
            emotion.emotion,
            risk.level
        );


    return {

        originalMessage:
            message,

        normalizedMessage:
            normalizeVietnamese(message),

        risk: risk,

        emotion: emotion,

        topics: topics,

        primaryTopic:
            primaryTopic,

        counselingMode:
            mode,

        responseStrategy:
            strategy,

        showCounselor:
            showCounselor,

        suggestedQuestions:
            questions,

        safetyRules:
            SAFETY_RULES[

                risk.level === "RED"
                    ? "red"
                    : risk.level === "YELLOW"
                        ? "yellow"
                        : "green"

            ]

    };

}


/* =========================================================
   27. HƯỚNG DẪN CHO AI
========================================================= */

function buildAIInstruction(analysis) {

    const instruction = {

        role:
            "Bạn là Trợ lý AI Tư vấn Tâm lý Học đường dành cho học sinh THCS.",

        riskLevel:
            analysis.risk.level,

        emotion:
            analysis.emotion.emotion,

        topic:
            analysis.primaryTopic,

        counselingMode:
            analysis.counselingMode,

        showCounselor:
            analysis.showCounselor,

        rules: [

            "Luôn trả lời bằng tiếng Việt.",

            "Sử dụng ngôn ngữ phù hợp học sinh THCS.",

            "Lắng nghe trước khi đưa lời khuyên.",

            "Không phán xét.",

            "Không chẩn đoán bệnh tâm lý.",

            "Không tự nhận là bác sĩ hoặc chuyên gia trị liệu.",

            "Không cung cấp hướng dẫn tự làm hại.",

            "Không khuyến khích bạo lực hoặc trả thù.",

            "Không yêu cầu mật khẩu hoặc thông tin riêng tư.",

            "Không ép học sinh phải chia sẻ.",

            "Chỉ đưa một vài gợi ý thiết thực.",

            "Kết thúc bằng một câu hỏi nhẹ nhàng khi phù hợp."

        ],

        safetyRules:
            analysis.safetyRules,

        suggestedQuestions:
            analysis.suggestedQuestions

    };


    return JSON.stringify(
        instruction,
        null,
        2
    );

}


/* =========================================================
   28. EXPORT RA WINDOW
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.COUNSELING_RULES =
        COUNSELING_RULES;

    window.detectRisk =
        detectRisk;

    window.detectEmotion =
        detectEmotion;

    window.detectTopics =
        detectTopics;

    window.detectPrimaryTopic =
        detectPrimaryTopic;

    window.analyzeStudentMessage =
        analyzeStudentMessage;

    window.buildAIInstruction =
        buildAIInstruction;

    window.shouldShowCounselor =
        shouldShowCounselor;

}
