import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactBody = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildEmailHtml(name: string, email: string, message: string): string {
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1E2937;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0F172A;padding:24px 32px;border-bottom:2px solid #06B6D4;">
            <p style="margin:0;color:#06B6D4;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">
              Portfolio Contact
            </p>
            <p style="margin:6px 0 0;color:#F8FAFC;font-size:18px;font-weight:700;">
              新しいお問い合わせが届きました
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">

            <!-- 送信者情報 -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#0F172A;border-radius:8px;border:1px solid rgba(6,182,212,0.15);margin-bottom:24px;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid rgba(6,182,212,0.1);">
                  <p style="margin:0;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                    お名前
                  </p>
                  <p style="margin:4px 0 0;color:#F8FAFC;font-size:15px;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                    メールアドレス
                  </p>
                  <p style="margin:4px 0 0;">
                    <a href="mailto:${email}" style="color:#06B6D4;font-size:15px;text-decoration:none;">${email}</a>
                  </p>
                </td>
              </tr>
            </table>

            <!-- メッセージ -->
            <p style="margin:0 0 8px;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
              メッセージ
            </p>
            <div style="background:#0F172A;border-radius:8px;border:1px solid rgba(6,182,212,0.15);
                        padding:16px 20px;color:#F8FAFC;font-size:14px;line-height:1.7;">
              ${escapedMessage}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid rgba(100,116,139,0.2);">
            <p style="margin:0;color:#64748B;font-size:11px;text-align:center;">
              このメールはポートフォリオサイトのお問い合わせフォームから送信されました
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません" },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  // サーバーサイドバリデーション
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "お名前、メールアドレス、メッセージは必須です" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "メールアドレスの形式が正しくありません" },
      { status: 400 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: "メッセージは10文字以上で入力してください" },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `【ポートフォリオ】${name}様よりお問い合わせ`,
      html: buildEmailHtml(name.trim(), email.trim(), message.trim()),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "メールの送信に失敗しました。しばらく経ってからお試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }
}
