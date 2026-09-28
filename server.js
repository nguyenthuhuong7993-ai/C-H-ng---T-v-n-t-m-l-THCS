// ============================================================
// CHATBOT AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
// SERVER.JS
// ============================================================

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";


// ============================================================
// 1. ĐỌC FILE .ENV
// ============================================================

dotenv.config();


// ============================================================
// 2. CẤU HÌNH EXPRESS
// ============================================================

const app = express();

const PORT =
    process.env.PORT || 3000;


// ============================================================
// 3. XÁC ĐỊNH THƯ MỤC HIỆN TẠI
// ============================================================

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);


// ============================================================
// 4. KIỂM TRA OPENAI API KEY
// ============================================================

if (!process.env.OPENAI_API_KEY) {

    console.error(
        "❌ CHƯA CÓ OPENAI_API_KEY trong file .env"
    );

    console.error(
        "Hãy tạo file .env và thêm:"
    );

    console.error(
        "OPENAI_API_KEY=YOUR_API_KEY"
    );

    process.exit(1);
}


// ============================================================
// 5. KẾT NỐI OPENAI
// ============================================================

const openai = new OpenAI({

    apiKey:
        process.env.OPENAI_API_KEY

});


// ============================================================
// 6. MODEL AI
// ============================================================

const MODEL =
    process.env.OPENAI_MODEL ||
    "gpt-5.6-luna";


// ============================================================
// 7. MIDDLEWARE
// ============================================================

app.use(
    express.json({
        limit: "100kb"
    })
);


// ============================================================
// 8. CHO PHÉP TRUY CẬP GIAO DIỆN
// ============================================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ============================================================
// 9. PROMPT HỆ THỐNG CHO CHATBOT
// ============================================================

const SYSTEM_PROMPT = `

BẠN LÀ:
Trợ lý AI Tư vấn Tâm lý Học đường dành cho học sinh THCS.

ĐỐI TƯỢNG:
Học sinh khoảng 11–15 tuổi.

MỤC TIÊU:
- Lắng nghe học sinh.
- Giúp học sinh diễn đạt cảm xúc.
- Hỗ trợ học sinh nhìn nhận vấn đề bình tĩnh hơn.
- Đưa ra những gợi ý nhỏ, an toàn và phù hợp với lứa tuổi.
- Khuyến khích học sinh tìm đến giáo viên, cha mẹ hoặc người lớn đáng tin cậy khi cần.
- Không phán xét.
- Không làm học sinh cảm thấy xấu hổ hoặc có lỗi vì cảm xúc của mình.

PHONG CÁCH:
- Nói tiếng Việt.
- Thân thiện.
- Nhẹ nhàng.
- Ngắn gọn.
- Dễ hiểu với học sinh THCS.
- Không dùng ngôn ngữ quá chuyên môn.
- Không trả lời như một bác sĩ.
- Không dùng giọng dạy đời.
- Không trách mắng.
- Không ép học sinh phải kể chuyện.

QUY TẮC QUAN TRỌNG:

1. KHÔNG CHẨN ĐOÁN BỆNH TÂM LÝ.

Nếu học sinh hỏi:
"Em có bị trầm cảm không?"
"Em có bị rối loạn lo âu không?"

Không được kết luận rằng học sinh mắc bệnh.

Có thể nói:
"Những điều em đang cảm thấy đáng được quan tâm, nhưng chatbot không thể chẩn đoán bệnh. Nếu tình trạng kéo dài hoặc ảnh hưởng nhiều đến cuộc sống, em nên chia sẻ với người lớn đáng tin cậy hoặc chuyên gia."

2. KHÔNG YÊU CẦU:
- Mật khẩu.
- OTP.
- Thông tin tài khoản ngân hàng.
- Địa chỉ nhà chính xác.
- Ảnh riêng tư/nhạy cảm.
- Thông tin cá nhân không cần thiết.

3. VỚI BẮT NẠT HỌC ĐƯỜNG:

Không khuyến khích trả thù.

Không khuyến khích đánh nhau.

Khuyến khích:
- Rời khỏi nơi nguy hiểm.
- Tìm người lớn đáng tin cậy.
- Báo giáo viên/nhà trường.
- Lưu bằng chứng phù hợp nếu bắt nạt xảy ra trên mạng.

4. VỚI MÂU THUẪN GIA ĐÌNH:

Không tự động kết luận cha mẹ đúng hoặc học sinh đúng.

Hãy lắng nghe hoàn cảnh.

Khuyến khích học sinh tìm một người lớn đáng tin cậy để hỗ trợ.

5. VỚI TÌNH CẢM TUỔI HỌC SINH:

Thừa nhận cảm xúc của học sinh là bình thường.

Nhấn mạnh:
- Tôn trọng.
- Ranh giới cá nhân.
- Không ép buộc.
- Không chia sẻ ảnh riêng tư.
- Không gây áp lực cho người khác.

6. VỚI MẠNG XÃ HỘI:

Khuyến khích sử dụng mạng xã hội an toàn.

Không chia sẻ thông tin cá nhân.

Nếu bị quấy rối/bắt nạt:
- Chặn.
- Báo cáo.
- Lưu bằng chứng phù hợp.
- Nói với người lớn đáng tin cậy.

7. VỚI HỌC TẬP:

Không nói:
"Em phải cố lên."

Thay vào đó:
- Chia nhỏ nhiệm vụ.
- Xác định việc quan trọng nhất.
- Nghỉ ngắn.
- Tìm sự hỗ trợ từ giáo viên/người lớn.

8. VỚI CẢM XÚC:

Có thể hướng dẫn:
- Hít thở chậm.
- Nghỉ một chút.
- Viết ra điều đang lo.
- Nói chuyện với người đáng tin cậy.
- Chia vấn đề thành từng bước nhỏ.

9. TRƯỜNG HỢP NGUY HIỂM:

Nếu học sinh nói về:
- Tự tử.
- Muốn chết.
- Tự làm đau bản thân.
- Đang chuẩn bị làm hại bản thân.
- Bị người khác đe dọa nghiêm trọng.
- Bị bạo lực.
- Đang ở nơi không an toàn.

ƯU TIÊN AN TOÀN.

Không được cung cấp:
- Phương pháp tự tử.
- Cách tự làm đau bản thân.
- Cách che giấu việc tự làm đau.
- Hướng dẫn bạo lực.

Hãy khuyến khích học sinh:
- Không ở một mình nếu đang có nguy cơ.
- Đến gần một người lớn đáng tin cậy.
- Nói rõ rằng mình đang cần được giúp đỡ.
- Nếu nguy hiểm trước mắt, tìm hỗ trợ khẩn cấp tại nơi đang ở.

10. BẢO MẬT:

Không hứa:
"Em nói gì cô cũng giữ bí mật tuyệt đối."

Thay vào đó:
"Cô tôn trọng sự riêng tư của em. Nhưng nếu em đang gặp nguy hiểm, điều quan trọng là phải có người lớn đáng tin cậy biết để giúp bảo vệ em."

11. CÁCH TRẢ LỜI:

Ưu tiên cấu trúc:

- Công nhận cảm xúc.
- Nói ngắn gọn.
- Đưa ra 1–3 gợi ý thực tế.
- Đặt một câu hỏi mở để hiểu thêm.

Ví dụ:

"Nghe em kể, cô nghĩ chuyện này đang khiến em khá buồn.

Em không cần phải giải quyết tất cả ngay lúc này.

Em có thể thử nói chuyện với một người em tin tưởng.

Nếu em muốn, em kể cho cô biết điều gì khiến em buồn nhất được không?"

12. KHÔNG ĐƯỢC GIẢ VỜ:

Không nói:
"Cô đã biết hoàn cảnh của em."

Không nói:
"Cô hiểu chính xác em đang nghĩ gì."

Không nói:
"Cô là chuyên gia tâm lý."

Hãy nói:
"Cô có thể lắng nghe và cùng em tìm cách xử lý."

13. KHI HỌC SINH KHÔNG MUỐN NÓI:

Không ép.

Có thể nói:

"Không sao đâu em. Em không cần kể tất cả ngay bây giờ.

Em có thể bắt đầu bằng một từ thôi:
buồn, lo, tức giận, sợ, cô đơn hoặc áp lực."

14. GIÁO VIÊN TƯ VẤN:

Nếu vấn đề nghiêm trọng, kéo dài hoặc học sinh cần hỗ trợ trực tiếp, khuyến khích liên hệ:

Cô Nguyễn Thị Thu Hường
Trường THCS Phụng Công
Thời gian hỗ trợ: 7h00 – 22h00

Không tự ý đưa ra số điện thoại nếu hệ thống chưa được cấu hình số điện thoại.

15. NGUYÊN TẮC CUỐI CÙNG:

Bạn không thay thế:
- Giáo viên tư vấn.
- Nhà tâm lý.
- Bác sĩ.
- Cha mẹ/người giám hộ.
- Dịch vụ hỗ trợ khẩn cấp.

Bạn là công cụ hỗ trợ bước đầu.

`;


// ============================================================
// 10. HÀM KIỂM TRA NGUY CƠ CƠ BẢN
// ============================================================

function detectHighRisk(message) {

    const text =
        String(message)
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    const patterns = [

        "muon chet",
        "muốn chết",

        "tu tu",
        "tự tử",

        "tu sat",
        "tự sát",

        "tu lam hai",
        "tự làm hại",

        "lam hai ban than",
        "làm hại bản thân",

        "tu lam dau",
        "tự làm đau",

        "khong muon song",
        "không muốn sống",

        "chet di",
        "chết đi",

        "tu hai",
        "tự hại",

        "bi danh",
        "bị đánh",

        "bi bao hanh",
        "bị bạo hành",

        "dang bi de doa",
        "đang bị đe dọa",

        "dang nguy hiem",
        "đang nguy hiểm"
    ];


    return patterns.some(
        pattern =>
            text.includes(
                pattern
            )
    );
}


// ============================================================
// 11. KIỂM TRA MỨC ĐỘ CẦN GIÁO VIÊN HỖ TRỢ
// ============================================================

function shouldShowCounselor(
    message,
    analysis
) {

    if (
        detectHighRisk(message)
    ) {
        return true;
    }


    const text =
        String(message)
            .toLowerCase();


    const patterns = [

        "bị bắt nạt",
        "bi bat nat",

        "bắt nạt",
        "bat nat",

        "áp lực",
        "ap luc",

        "quá buồn",
        "qua buon",

        "mất ngủ",
        "mat ngu",

        "không muốn đi học",
        "khong muon di hoc",

        "sợ đi học",
        "so di hoc",

        "khóc nhiều",
        "khoc nhieu",

        "cô đơn",
        "co don",

        "không muốn sống",
        "khong muon song",

        "gia đình đánh",
        "gia dinh danh"
    ];


    if (
        patterns.some(
            pattern =>
                text.includes(pattern)
        )
    ) {
        return true;
    }


    if (
        analysis &&
        analysis.risk &&
        (
            analysis.risk.level ===
            "RED" ||

            analysis.risk.level ===
            "YELLOW"
        )
    ) {
        return true;
    }


    return false;
}


// ============================================================
// 12. XÂY DỰNG LỊCH SỬ HỘI THOẠI
// ============================================================

function buildConversation(history) {

    if (!Array.isArray(history)) {
        return "";
    }


    const recent =
        history.slice(-10);


    return recent
        .map(item => {

            if (
                !item ||
                !item.role ||
                !item.content
            ) {
                return "";
            }


            const role =
                item.role === "user"
                    ? "Học sinh"
                    : "Trợ lý";


            return (
                role +
                ": " +
                String(
                    item.content
                ).slice(0, 2000)
            );

        })
        .filter(Boolean)
        .join("\n");
}


// ============================================================
// 13. API /api/chat
// ============================================================

app.post(
    "/api/chat",
    async (req, res) => {

        try {

            const {
                message,
                history,
                analysis
            } = req.body;


            // --------------------------------------
            // Kiểm tra dữ liệu
            // --------------------------------------

            if (
                typeof message !==
                "string"
            ) {

                return res.status(400)
                    .json({

                        success: false,

                        error:
                            "Tin nhắn không hợp lệ."

                    });
            }


            const cleanMessage =
                message.trim();


            if (!cleanMessage) {

                return res.status(400)
                    .json({

                        success: false,

                        error:
                            "Tin nhắn đang trống."

                    });
            }


            // Giới hạn độ dài tin nhắn
            if (
                cleanMessage.length >
                5000
            ) {

                return res.status(400)
                    .json({

                        success: false,

                        error:
                            "Tin nhắn quá dài."

                    });
            }


            // --------------------------------------
            // Kiểm tra nguy cơ trước khi gọi AI
            // --------------------------------------

            const highRisk =
                detectHighRisk(
                    cleanMessage
                );


            if (highRisk) {

                return res.json({

                    success: true,

                    reply: `
Mình rất tiếc vì em đang phải trải qua một tình huống khó khăn như vậy. 💙

Điều quan trọng nhất lúc này là em không nên ở một mình nếu em cảm thấy mình có thể bị tổn thương.

Em hãy đến gần một người lớn mà em tin tưởng và nói rõ rằng em đang cần được giúp đỡ.

Nếu em đang ở trong tình huống nguy hiểm trước mắt, hãy tìm sự trợ giúp khẩn cấp tại nơi em đang ở.

Em có thể tìm đến cô Nguyễn Thị Thu Hường, giáo viên tư vấn tại Trường THCS Phụng Công, trong thời gian hỗ trợ 7h00 – 22h00.
                    `,

                    showCounselor: true,

                    riskLevel: "RED"

                });
            }


            // --------------------------------------
            // Lịch sử
            // --------------------------------------

            const conversation =
                buildConversation(
                    history
                );


            // --------------------------------------
            // Thông tin phân tích
            // --------------------------------------

            let analysisText = "";

            if (analysis) {

                try {

                    analysisText =
                        JSON.stringify(
                            analysis
                        );

                } catch {

                    analysisText = "";
                }
            }


            // --------------------------------------
            // TẠO INPUT CHO OPENAI
            // --------------------------------------

            let userPrompt = "";


            if (conversation) {

                userPrompt += `
LỊCH SỬ HỘI THOẠI:

${conversation}

`;
            }


            if (analysisText) {

                userPrompt += `
PHÂN TÍCH BAN ĐẦU CỦA HỆ THỐNG:

${analysisText}

`;
            }


            userPrompt += `
TIN NHẮN MỚI CỦA HỌC SINH:

${cleanMessage}

Hãy trả lời học sinh theo đúng nguyên tắc tư vấn tâm lý học đường ở trên.
`;


            // --------------------------------------
            // GỌI OPENAI RESPONSES API
            // --------------------------------------

            const response =
                await openai.responses.create({

                    model: MODEL,

                    instructions:
                        SYSTEM_PROMPT,

                    input:
                        userPrompt,

                    max_output_tokens:
                        800

                });


            // --------------------------------------
            // LẤY CÂU TRẢ LỜI
            // --------------------------------------

            const reply =
                response.output_text ||
                "Cô đang lắng nghe em. Em có thể kể thêm một chút về điều đang khiến em lo lắng không?";


            // --------------------------------------
            // KIỂM TRA HIỂN THỊ GIÁO VIÊN
            // --------------------------------------

            const showCounselor =
                shouldShowCounselor(
                    cleanMessage,
                    analysis
                );


            // --------------------------------------
            // TRẢ KẾT QUẢ VỀ APP.JS
            // --------------------------------------

            return res.json({

                success: true,

                reply: reply,

                showCounselor:
                    showCounselor,

                riskLevel:
                    highRisk
                        ? "RED"
                        : (
                            analysis &&
                            analysis.risk
                                ? analysis.risk.level
                                : "GREEN"
                        )

            });


        } catch (error) {

            console.error(
                "❌ LỖI /api/chat:",
                error
            );


            return res.status(500)
                .json({

                    success: false,

                    error:
                        "Không thể kết nối với AI.",

                    message:
                        "Máy chủ AI đang gặp sự cố."

                });
        }
    }
);


// ============================================================
// 14. API KIỂM TRA SERVER
// ============================================================

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            message:
                "Chatbot AI server đang hoạt động.",

            model:
                MODEL

        });
    }
);


// ============================================================
// 15. MỞ TRANG CHỦ
// ============================================================

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "public",
                "index.html"
            )
        );
    }
);


// ============================================================
// 16. KHỞI ĐỘNG SERVER
// ============================================================

app.listen(
    PORT,
    () => {

        console.log("");
        console.log(
            "=========================================="
        );

        console.log(
            "🤖 CHATBOT AI TƯ VẤN TÂM LÝ"
        );

        console.log(
            "=========================================="
        );

        console.log(
            `🌐 http://localhost:${PORT}`
        );

        console.log(
            `🧠 Model: ${MODEL}`
        );

        console.log(
            "✅ Server đã khởi động."
        );

        console.log(
            "=========================================="
        );

        console.log("");
    }
);
