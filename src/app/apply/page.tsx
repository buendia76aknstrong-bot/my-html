"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    parentSituation: "",
    applicationReason: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age, 10) : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "送信に失敗しました。もう一度お試しください。");
      }
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--section-bg)] flex items-center justify-center">
        <div className="bg-white p-12 rounded-xl shadow-sm text-center max-w-md">
          <div className="text-5xl mb-6 text-green-600">&#10003;</div>
          <h2 className="text-2xl font-bold mb-4">
            お申し込みありがとうございます
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ご入力いただいたメールアドレスに詳細のご案内をお送りいたします。
            <br />
            今しばらくお待ちください。
          </p>
          <Link
            href="/"
            className="text-[var(--primary)] font-bold hover:underline"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--section-bg)]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-[var(--primary)]">
            デジタル・レガシー
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          無料モニター申込フォーム
        </h2>
        <p className="text-center text-gray-600 mb-8">
          サービス改善のため、モニターとしてご参加いただける方を募集しています。
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-sm space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block font-bold mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="山田 太郎"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-bold mb-2">年齢</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="45"
              min="1"
              max="120"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="taro@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-bold mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="090-1234-5678"
            />
          </div>

          {/* Parent Situation */}
          <div>
            <label className="block font-bold mb-2">
              親御さんの状況（簡単に）
            </label>
            <textarea
              name="parentSituation"
              value={formData.parentSituation}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="例: 80歳の母、最近物忘れが増えてきた"
            />
          </div>

          {/* Application Reason */}
          <div>
            <label className="block font-bold mb-2">
              応募理由（100字程度）
            </label>
            <textarea
              name="applicationReason"
              value={formData.applicationReason}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="例: 母の人生の話を形にして残しておきたいと思いました"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>
              お申し込みいただくことで、
              <Link href="/terms" className="underline">
                利用規約
              </Link>
              および
              <Link href="/privacy" className="underline">
                プライバシーポリシー
              </Link>
              に同意いただいたものとします。
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-lg text-lg hover:bg-[var(--primary-light)] transition disabled:opacity-50"
          >
            {loading ? "送信中..." : "申し込む"}
          </button>
        </form>
      </div>
    </div>
  );
}
