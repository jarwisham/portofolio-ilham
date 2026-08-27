import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request);
}

async function handleRevalidation(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret") || request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET || "portofolio-secret";

  if (secret !== expectedSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Secret tidak valid. Gunakan ?secret=...",
      },
      { status: 401 }
    );
  }

  try {
    // Revalidate seluruh layout dan halaman
    revalidatePath("/", "layout");
    revalidatePath("/projects", "page");
    revalidatePath("/projects/[slug]", "page");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "Cache berhasil di-revalidate secara instan!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Gagal me-revalidate cache",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
