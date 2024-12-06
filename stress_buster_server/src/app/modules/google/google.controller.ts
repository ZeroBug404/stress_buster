import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { googleServices } from "./google.services";

const getResult = catchAsync(async (req, res) => {
  const result = await googleServices.getResult(req.body?.prompt);

  res.status(httpStatus.OK).json({
    success: true,
    message: " fetched successfully ",
    data: result,
  });
});

const getImageResult = catchAsync(async (req, res) => {
  console.log(req.file);
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;
  const { prompt } = req.body;
  const result = await googleServices.getImagePromptResult(
    prompt,
    filePath,
    mimeType
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: " fetched successfully ",
    data: result,
  });
});

const geminiChat = catchAsync(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Prompt is required",
    });
  }

  const aiResponse = await googleServices.geminiChat({ prompt });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Chat processed successfully",
    data: aiResponse,
  });
});

const getChatHistory = catchAsync(async (req, res) => {
  const chatHistory = await googleServices.getChatHistory();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Chat history fetched successfully",
    data: chatHistory,
  });
});

//
export const googleController = {
  getResult,
  getImageResult,
  geminiChat,
  getChatHistory,
};
