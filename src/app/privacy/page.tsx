import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--section-bg)]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-[var(--primary)]">
            デジタル・レガシー
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-6 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              1. 収集する情報
            </h2>
            <p>本サービスでは、以下の情報を収集します：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>お名前、年齢、メールアドレス、電話番号</li>
              <li>インタビュー時の音声データ</li>
              <li>音声データの文字起こしテキスト</li>
              <li>AI生成による自分史の原稿データ</li>
              <li>サービス利用に関するフィードバック</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              2. 情報の利用目的
            </h2>
            <p>収集した情報は、以下の目的にのみ使用します：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>自分史の制作・納品</li>
              <li>サービスの品質管理・改善</li>
              <li>お客様への連絡・ご案内</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              3. AI学習への不使用
            </h2>
            <p>
              お客様の音声データ、文字起こしデータ、生成された文章データを、AIモデルの学習（トレーニング）に使用することは一切ありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              4. データの保存と削除
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                音声データ、文字起こしデータ、原稿データは暗号化して保存します。
              </li>
              <li>
                納品完了後1年を経過した時点で、すべてのデータを自動的に削除します。
              </li>
              <li>
                お客様のご要望により、納品後いつでもデータの即時削除が可能です。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              5. 第三者への提供
            </h2>
            <p>
              収集した個人情報を、お客様の同意なく第三者に提供することはありません。ただし、法令に基づく場合を除きます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              6. 録音同意の取得
            </h2>
            <p>
              インタビューの録音は、毎回の通話冒頭においてお客様の音声による同意を取得した上で行います。同意の音声ログは、データの適切な管理のために保存されます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              7. プライバシー保護措置
            </h2>
            <p>
              生成される自分史においては、AIによるリスクチェックにより以下の措置を自動的に実施します：
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>第三者の実名・特定可能な情報の匿名化</li>
              <li>差別的表現の修正</li>
              <li>名誉毀損に該当しうる表現の軟化</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              8. お問い合わせ
            </h2>
            <p>
              個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
            </p>
            <p className="mt-2">
              デジタル・レガシー運営事務局
              <br />
              メール: privacy@digital-legacy.example.com
            </p>
          </section>

          <p className="text-gray-400 mt-8">制定日: 2025年1月1日</p>
        </div>
      </div>
    </div>
  );
}
