// 1. 이메일 인증 코드 전송 API
export async function sendEmailVerificationCode(email) {
  try {
    const response = await fetch(
      `http://10.50.46.255:8080/tools/auth/email/verify?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return {
      status: data.status,
      message: data.message || "응답 메시지가 없습니다.",
      data: data.data ?? null,
    };
  } catch (error) {
    return {
      status: 500,
      message: "서버 통신 오류 또는 응답 처리 실패",
      data: null,
    };
  }
}

// 2. 회원가입 API (변경 없음)
export async function signup({ studentId, name, email, password }) {
  const response = await fetch(
    "http://10.50.46.255:8080/tools/members/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, name, email, password }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "회원가입 실패");
  }

  return response.json();
}

// 3. 인증번호 확인 API (변경 없음)
export async function verifyEmailCode({ email, code }) {
  const response = await fetch(
    "http://10.50.46.255:8080/tools/auth/email/confirm",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    }
  );

  let data = { status: 500, message: "서버 오류", data: null };
  try {
    data = await response.json();
  } catch (e) {}

  return data;
}
