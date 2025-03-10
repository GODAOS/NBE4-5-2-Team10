"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);

  useEffect(() => {
    // Check if user just registered
    const registered = searchParams.get("registered");
    if (registered) {
      setShowRegisteredMessage(true);

      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setShowRegisteredMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear the error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Email validation
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual login API
      console.log("로그인 데이터:", formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to home page after successful login
      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      setErrors({
        ...errors,
        general: "이메일 또는 비밀번호가 일치하지 않습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            트래블메이트 로그인
          </h2>

          {showRegisteredMessage && (
            <div className="mb-6 bg-green-100 text-green-700 p-3 rounded-lg">
              회원가입이 완료되었습니다. 이제 로그인할 수 있습니다.
            </div>
          )}

          {errors.general && (
            <div className="mb-6 bg-red-100 text-red-700 p-3 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  비밀번호
                </label>
                <Link
                  href="/member/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className="text-gray-700">
                  로그인 상태 유지
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-lg font-medium transition duration-300 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href="/member/signup"
                className="text-blue-600 hover:underline"
              >
                회원가입
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">
              또는 소셜 계정으로 로그인
            </p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google로 로그인
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
