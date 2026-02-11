"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CHAPTER_TEMPLATES, INTERVIEW_SESSIONS } from "@/prompts/interview-questions";

interface Interview {
  id: string;
  sessionNumber: number;
  status: string;
  transcription: string | null;
  completedAt: string | null;
}

interface Manuscript {
  id: string;
  chapterNumber: number;
  status: string;
  rawContent: string | null;
  riskCheckedContent: string | null;
  riskCheckLog: Array<{
    category: string;
    original: string;
    modified: string;
    reason: string;
  }> | null;
}

interface Deliverable {
  id: string;
  deliveredAt: string | null;
}

interface Customer {
  id: string;
  name: string;
  age: number | null;
  email: string;
  phone: string;
  parentSituation: string | null;
  applicationReason: string | null;
  status: string;
  createdAt: string;
  interviews: Interview[];
  manuscripts: Manuscript[];
  deliverables: Deliverable[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [manualText, setManualText] = useState("");
  const [selectedSession, setSelectedSession] = useState(1);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchCustomer = useCallback(async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(
          (c: Customer) => c.id === customerId
        );
        setCustomer(found || null);
      }
    } catch {
      setMessage({ type: "error", text: "データの取得に失敗しました" });
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const handleTranscribe = async () => {
    if (!manualText.trim()) return;
    setActionLoading("transcribe");
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("customerId", customerId);
      formData.append("sessionNumber", selectedSession.toString());
      formData.append("manualText", manualText);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `セッション${selectedSession}のテキストを保存しました` });
        setManualText("");
        fetchCustomer();
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "エラーが発生しました" });
    } finally {
      setActionLoading("");
    }
  };

  const handleGenerate = async (chapterNumber: number) => {
    if (!customer) return;
    setActionLoading(`generate-${chapterNumber}`);
    setMessage({ type: "", text: "" });

    const transcriptions = customer.interviews
      .filter((i) => i.status === "completed" && i.transcription)
      .map((i) => i.transcription as string);

    if (transcriptions.length === 0) {
      setMessage({ type: "error", text: "文字起こしデータがありません" });
      setActionLoading("");
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          chapterNumber,
          transcriptions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          text: `第${chapterNumber}章の原稿を生成しました`,
        });
        fetchCustomer();
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "エラーが発生しました" });
    } finally {
      setActionLoading("");
    }
  };

  const handleRiskCheck = async (manuscript: Manuscript) => {
    setActionLoading(`risk-${manuscript.id}`);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/risk-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manuscriptId: manuscript.id,
          content: manuscript.rawContent,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          text: `第${manuscript.chapterNumber}章のリスクチェックが完了しました`,
        });
        fetchCustomer();
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "エラーが発生しました" });
    } finally {
      setActionLoading("");
    }
  };

  const handleGeneratePdf = async () => {
    if (!customer) return;
    setActionLoading("pdf");
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          authorName: customer.name,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${customer.name}_jibunshi.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage({ type: "success", text: "PDFを生成・ダウンロードしました" });
        fetchCustomer();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "エラーが発生しました" });
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">顧客が見つかりません</p>
          <Link
            href="/admin"
            className="text-[var(--primary)] hover:underline"
          >
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm opacity-75 hover:underline"
            >
              &larr; 一覧へ戻る
            </Link>
            <h1 className="text-xl font-bold">{customer.name} さんの詳細</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Message */}
        {message.text && (
          <div
            className={`px-4 py-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">顧客情報</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">名前:</span>
              <p className="font-medium">{customer.name}</p>
            </div>
            <div>
              <span className="text-gray-500">年齢:</span>
              <p className="font-medium">{customer.age || "未入力"}</p>
            </div>
            <div>
              <span className="text-gray-500">メール:</span>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <span className="text-gray-500">電話:</span>
              <p className="font-medium">{customer.phone}</p>
            </div>
            {customer.parentSituation && (
              <div className="col-span-2">
                <span className="text-gray-500">親御さんの状況:</span>
                <p className="font-medium">{customer.parentSituation}</p>
              </div>
            )}
            {customer.applicationReason && (
              <div className="col-span-2">
                <span className="text-gray-500">応募理由:</span>
                <p className="font-medium">{customer.applicationReason}</p>
              </div>
            )}
          </div>
        </div>

        {/* Interview Input */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">
            インタビューテキスト入力（MVP: 手動入力）
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                セッション番号
              </label>
              <select
                value={selectedSession}
                onChange={(e) =>
                  setSelectedSession(parseInt(e.target.value, 10))
                }
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                {INTERVIEW_SESSIONS.map((s) => (
                  <option key={s.sessionNumber} value={s.sessionNumber}>
                    第{s.sessionNumber}回: {s.theme}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                文字起こしテキスト
              </label>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                placeholder="インタビューの文字起こしテキストをここに貼り付けてください..."
              />
            </div>
            <button
              onClick={handleTranscribe}
              disabled={actionLoading === "transcribe" || !manualText.trim()}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-light)] transition disabled:opacity-50"
            >
              {actionLoading === "transcribe" ? "保存中..." : "テキストを保存"}
            </button>
          </div>

          {/* Interview Status */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-bold mb-3">インタビュー状況</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {INTERVIEW_SESSIONS.map((session) => {
                const interview = customer.interviews.find(
                  (i) => i.sessionNumber === session.sessionNumber
                );
                const isCompleted = interview?.status === "completed";
                return (
                  <div
                    key={session.sessionNumber}
                    className={`text-center p-2 rounded-lg text-xs ${
                      isCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <div className="font-medium">
                      第{session.sessionNumber}回
                    </div>
                    <div>{isCompleted ? "完了" : "未実施"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Manuscript Generation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">原稿生成</h2>
          <div className="space-y-4">
            {CHAPTER_TEMPLATES.map((chapter) => {
              const manuscript = customer.manuscripts.find(
                (m) => m.chapterNumber === chapter.number
              );
              return (
                <div
                  key={chapter.number}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">
                      第{chapter.number}章: {chapter.title}（
                      {chapter.description}）
                    </h3>
                    <div className="flex items-center gap-2">
                      {manuscript && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            manuscript.status === "checked"
                              ? "bg-green-100 text-green-800"
                              : manuscript.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {manuscript.status === "checked"
                            ? "チェック済"
                            : manuscript.status === "draft"
                              ? "下書き"
                              : manuscript.status}
                        </span>
                      )}
                      <button
                        onClick={() => handleGenerate(chapter.number)}
                        disabled={
                          actionLoading === `generate-${chapter.number}`
                        }
                        className="bg-[var(--primary)] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-[var(--primary-light)] transition disabled:opacity-50"
                      >
                        {actionLoading === `generate-${chapter.number}`
                          ? "生成中..."
                          : manuscript
                            ? "再生成"
                            : "生成"}
                      </button>
                      {manuscript?.rawContent &&
                        manuscript.status === "draft" && (
                          <button
                            onClick={() => handleRiskCheck(manuscript)}
                            disabled={
                              actionLoading === `risk-${manuscript.id}`
                            }
                            className="bg-orange-500 text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-orange-600 transition disabled:opacity-50"
                          >
                            {actionLoading === `risk-${manuscript.id}`
                              ? "チェック中..."
                              : "リスクチェック"}
                          </button>
                        )}
                    </div>
                  </div>
                  {manuscript?.riskCheckedContent && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-40 overflow-y-auto whitespace-pre-line">
                      {manuscript.riskCheckedContent.slice(0, 500)}
                      {(manuscript.riskCheckedContent?.length ?? 0) > 500 && "..."}
                    </div>
                  )}
                  {manuscript?.riskCheckLog &&
                    manuscript.riskCheckLog.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-bold text-orange-600">
                          修正ログ ({manuscript.riskCheckLog.length}件)
                        </p>
                        <ul className="text-xs text-gray-500 mt-1 space-y-1">
                          {manuscript.riskCheckLog.map((log, i) => (
                            <li key={i}>
                              [{log.category}] &quot;{log.original}&quot; →
                              &quot;{log.modified}&quot;
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PDF Generation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">PDF生成・納品</h2>
          <p className="text-sm text-gray-500 mb-4">
            リスクチェック済みの原稿からPDFを生成します。少なくとも1章のリスクチェックが完了している必要があります。
          </p>
          <button
            onClick={handleGeneratePdf}
            disabled={
              actionLoading === "pdf" ||
              customer.manuscripts.filter((m) => m.status === "checked").length === 0
            }
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {actionLoading === "pdf"
              ? "PDF生成中..."
              : "PDFを生成・ダウンロード"}
          </button>
          {customer.deliverables.length > 0 && (
            <p className="text-sm text-green-600 mt-3">
              最終納品日:{" "}
              {new Date(
                customer.deliverables[customer.deliverables.length - 1]
                  .deliveredAt || ""
              ).toLocaleDateString("ja-JP")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
