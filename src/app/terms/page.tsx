import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-8">利用規約</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-6 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第1条（サービスの概要）
            </h2>
            <p>
              本サービス「デジタル・レガシー」（以下「本サービス」）は、利用者（以下「お客様」）の語りをもとに、AIが自分史（書籍PDF）を作成するサービスです。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第2条（サービスの内容）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>電話インタビューによるお話の録音・文字起こし</li>
              <li>AI（人工知能）による自分史の執筆</li>
              <li>AIによるプライバシーリスクチェック</li>
              <li>PDF形式での納品</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第3条（録音・データの取扱い）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                インタビューの録音は、毎回通話冒頭においてお客様の同意を取得した上で行います。
              </li>
              <li>
                録音データおよび文字起こしデータは、本サービスの制作・納品・品質管理の目的にのみ使用します。
              </li>
              <li>
                お客様の音声データ・文章データをAIの学習目的に使用することはありません。
              </li>
              <li>
                録音データおよび関連データは、納品完了後1年で自動的に削除されます。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第4条（AI生成物の特性）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスで生成される自分史は、AIによる自動生成物であり、出版品質を保証するものではありません。
              </li>
              <li>
                プライバシー保護のため、第三者の実名や特定可能な情報は自動的に修正される場合があります。
              </li>
              <li>
                AIによる表現調整のため、お客様の語りと完全に一致しない場合があります。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第5条（家族代理申込）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ご家族がお客様に代わって申し込む場合、本人の録音同意を別途取得する必要があります。
              </li>
              <li>代理申込者は、代理人であることを明示する必要があります。</li>
              <li>
                認知症等により判断能力に疑義がある場合、サービスの提供をお断りすることがあります。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第6条（返金・キャンセル）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                インタビュー開始前のキャンセルについては、全額返金いたします。
              </li>
              <li>
                インタビュー開始後のキャンセルについては、進行状況に応じた返金を行います。
              </li>
              <li>
                PDF納品後の返金は原則としてお受けしておりません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第7条（免責事項）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスは「家庭内・贈答で安全」なレベルの品質を目指しますが、法的な完全保証は行いません。
              </li>
              <li>
                AI生成物の内容に起因する損害について、当社は一切の責任を負いません。
              </li>
              <li>
                印刷・製本はお客様ご自身の責任で行っていただきます。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第8条（規約の変更）
            </h2>
            <p>
              当社は、必要に応じて本規約を変更することがあります。変更後の規約は、本ウェブサイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <p className="text-gray-400 mt-8">制定日: 2025年1月1日</p>
        </div>
      </div>
    </div>
  );
}
