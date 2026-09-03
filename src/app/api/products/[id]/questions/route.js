import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id]/questions
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const questions = await prisma.question.findMany({
      where: { productId },
      orderBy: [
        { answeredAt: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      questions,
      totalQuestions: questions.length,
      answeredCount: questions.filter((q) => q.answer).length,
    });
  } catch (error) {
    console.error("GET /api/products/[id]/questions error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch questions" }, { status: 500 });
  }
}

// POST /api/products/[id]/questions
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const body = await request.json();
    const { question, userName, userAvatar, userId } = body;

    if (!question || typeof question !== "string" || question.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Question must be at least 5 characters long" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const newQuestion = await prisma.question.create({
      data: {
        productId,
        userId: userId || null,
        userName: userName ? String(userName).trim() : "Customer",
        userAvatar: userAvatar || null,
        question: question.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      question: newQuestion,
    });
  } catch (error) {
    console.error("POST /api/products/[id]/questions error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit question: " + error.message }, { status: 500 });
  }
}

// PATCH /api/products/[id]/questions (Answer a question)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const body = await request.json();
    const { questionId, answer, answeredBy } = body;

    if (!questionId) {
      return NextResponse.json({ success: false, error: "Missing questionId" }, { status: 400 });
    }

    if (!answer || typeof answer !== "string" || answer.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Answer cannot be empty" }, { status: 400 });
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        answer: answer.trim(),
        answeredBy: answeredBy ? String(answeredBy).trim() : "Finora Official Support",
        answeredAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("PATCH /api/products/[id]/questions error:", error);
    return NextResponse.json({ success: false, error: "Failed to update answer: " + error.message }, { status: 500 });
  }
}

// DELETE /api/products/[id]/questions?questionId=...
export async function DELETE(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json({ success: false, error: "Missing questionId" }, { status: 400 });
    }

    await prisma.question.delete({
      where: { id: questionId },
    });

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/products/[id]/questions error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete question: " + error.message }, { status: 500 });
  }
}
