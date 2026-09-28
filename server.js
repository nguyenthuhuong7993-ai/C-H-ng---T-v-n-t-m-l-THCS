// ============================================================
// SERVER - AI API
// TRỢ LÝ AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
// ============================================================

import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";


// ============================================================
// KHỞI TẠO
// ============================================================

const app = express();

const PORT = process.env.PORT || 3001;


const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json({
  limit: "1mb"
}));


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {

  res.json({

    ok: true,

    service:
      "School Counseling AI"

  });

});


// ============================================================
// CHAT API
// ============================================================

app.post("/api/chat", async (req, res) => {

  try {

    const {
      systemPrompt,
      messages
    } = req.body;


    if (!systemPrompt) {

      return res.status(400).json({

        error:
          "Thiếu systemPrompt."

      });

    }


    if (
      !Array.isArray(messages) ||
      messages.length === 0
    ) {

      return res.status(400).json({

        error:
          "Thiếu nội dung cuộc trò chuyện."

      });

    }


    // ======================================================
    // GIỚI HẠN SỐ TIN NHẮN
    // ======================================================

    const safeMessages =
      messages.slice(-12);


    // ======================================================
    // GỌI OPENAI RESPONSES API
    // ======================================================

    const response =
      await openai.responses.create({

        model:
          process.env.OPENAI_MODEL ||
          "gpt-5.6-luna",

        instructions:
          systemPrompt,

        input:
          safeMessages.map(message => ({

            role:
              message.role === "assistant"
                ? "assistant"
                : "user",

            content: [

              {

                type: "input_text",

                text:
                  String(message.content || "")

              }

            ]

          })),

        store: false

      });


    // ======================================================
    // LẤY OUTPUT
    // ======================================================

    const reply =
      response.output_text ||
      "Cô đang lắng nghe em. Em có thể chia sẻ thêm nhé.";


    res.json({

      reply

    });

  }


  catch (error) {

    console.error(
      "OPENAI ERROR:",
      error
    );


    res.status(500).json({

      error:
        "Không thể kết nối với AI.",

      message:
        error?.message || ""

    });

  }

});


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log(
      `School Counseling AI running at http://localhost:${PORT}`
    );

  }
);
