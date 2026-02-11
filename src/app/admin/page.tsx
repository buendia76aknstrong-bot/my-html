"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

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
  status: string;
  createdAt: string;
  interviews: Interview[];
  manuscripts: Manuscript[];
  deliverables: Deliverable[];
}

const STATUS_LABELS: Record<string, string> = {
  applied: "申込済",
  interviewing: "インタビュー中",
  writing: "執筆中",
  reviewing: "レビュー中",
  delivered: "納品済",
};

const STATUS_COLORS: Record<string, string> = {
  applied: "bg-blue-100 text-blue-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  writing: "bg-purple-100 text-purple-800",
  reviewing: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data);
      } else {
        setError("データの取得に失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const stats = {
    total: customers.length,
    applied: customers.filter((c) => c.status === "applied").length,
    inProgress: customers.filter((c) =>
      ["interviewing", "writing", "reviewing"].includes(c.status)
    ).length,
    delivered: customers.filter((c) => c.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            デジタル・レガシー 管理ダッシュボード
          </h1>
          <Link href="/" className="text-sm opacity-75 hover:underline">
            サイトへ戻る
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "総申込数", value: stats.total, color: "bg-blue-500" },
            { label: "新規申込", value: stats.applied, color: "bg-indigo-500" },
            {
              label: "処理中",
              value: stats.inProgress,
              color: "bg-yellow-500",
            },
            { label: "納品済", value: stats.delivered, color: "bg-green-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-500">読み込み中...</div>
        )}

        {/* Customer List */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">顧客一覧</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      名前
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      メール
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      電話
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ステータス
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      インタビュー
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      原稿
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      申込日
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        まだ顧客データがありません
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {customer.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {customer.phone}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[customer.status] || "bg-gray-100"}`}
                          >
                            {STATUS_LABELS[customer.status] || customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {customer.interviews.filter(
                            (i) => i.status === "completed"
                          ).length}
                          /6
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {customer.manuscripts.filter(
                            (m) => m.status !== "draft"
                          ).length}
                          /5
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(customer.createdAt).toLocaleDateString(
                            "ja-JP"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/customers/${customer.id}`}
                            className="text-[var(--primary)] text-sm font-medium hover:underline"
                          >
                            詳細
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
