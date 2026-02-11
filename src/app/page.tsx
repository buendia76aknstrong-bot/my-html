import Link from "next/link";

const SAMPLE_CHAPTER = `私が生まれたのは、山あいの小さな町でした。春には桜が町中を薄紅色に染め、夏には蛍が川沿いを舞う、そんな穏やかな場所です。

家族は、父と母、そして三つ上の兄と私の四人家族でした。父は寡黙な人でしたが、休みの日になると必ず私たち兄弟を川へ連れて行ってくれました。川の水は冷たくて、石の上を走るとよく滑って転んだものです。

母はいつも笑顔で、近所の人たちからも慕われていました。台所からは、いつも味噌汁のいい香りが漂っていたように記憶しています...`;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--primary)]">
            デジタル・レガシー
          </h1>
          <nav className="flex gap-6 text-sm">
            <a href="#about" className="hover:text-[var(--accent)] transition">
              サービスについて
            </a>
            <a href="#flow" className="hover:text-[var(--accent)] transition">
              ご利用の流れ
            </a>
            <a href="#sample" className="hover:text-[var(--accent)] transition">
              サンプル
            </a>
            <a href="#price" className="hover:text-[var(--accent)] transition">
              料金
            </a>
            <a href="#faq" className="hover:text-[var(--accent)] transition">
              よくある質問
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-light)] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            書かずに残す、
            <br />
            あなたの人生
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            電話で話すだけで、AIがあなたの人生を
            <br className="hidden md:block" />
            やさしい言葉の書籍PDFにまとめます。
          </p>
          <Link
            href="/apply"
            className="inline-block bg-white text-[var(--primary)] font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition"
          >
            無料モニターに申し込む
          </Link>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[var(--section-bg)]">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            大切な人生の記録を、本に残す
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">こんな方に</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    親御さんの人生の話を、形にして残しておきたい方
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    文章を書くのが苦手でも、話すことならできるという方
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    家族への贈り物として、自分史を贈りたい方
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    認知症の兆候があり、今のうちに記録を残したい方
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">できること</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    電話で話すだけ。書く作業は一切不要です
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    AIが温かい「聞き書き」文体で自分史を執筆
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    プライバシーに配慮した安全な内容チェック
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-1">&#9679;</span>
                  <span>
                    A4・約30ページのPDFでお届け
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            ご利用の流れ
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "お電話でお話",
                desc: "30分程度のインタビューを最大6回。思い出を自由にお話しください。質問に沿って、やさしくお聞きします。",
              },
              {
                step: "2",
                title: "AIが執筆",
                desc: "お話の内容をもとに、AIが5章構成の自分史を執筆。温かい聞き書き調の文章に仕上げます。",
              },
              {
                step: "3",
                title: "PDFでお届け",
                desc: "プライバシーチェック済みの自分史PDFをメールでお届け。ご自宅で印刷・製本もできます。",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center bg-[var(--section-bg)] p-8 rounded-xl"
              >
                <div className="w-16 h-16 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample */}
      <section id="sample" className="py-20 bg-[var(--section-bg)]">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">
            サンプル章のご紹介
          </h3>
          <p className="text-center text-gray-600 mb-8">
            第1章「はじまりの記憶」より抜粋
          </p>
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
            <h4 className="text-xl font-bold mb-6 text-[var(--primary)]">
              第1章　はじまりの記憶
            </h4>
            <div className="text-gray-700 leading-loose whitespace-pre-line">
              {SAMPLE_CHAPTER}
            </div>
          </div>
        </div>
      </section>

      {/* Price */}
      <section id="price" className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">料金プラン</h3>
          <div className="bg-white border-2 border-[var(--primary)] rounded-xl p-8 md:p-12">
            <h4 className="text-2xl font-bold mb-2">ベーシックプラン</h4>
            <div className="text-5xl font-bold text-[var(--primary)] my-6">
              80,000
              <span className="text-xl">円（税抜）</span>
            </div>
            <ul className="text-left max-w-md mx-auto space-y-3 text-gray-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>電話インタビュー最大6回（各30分）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>AI自動執筆（5章構成・約30ページ）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>プライバシーリスクチェック</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>PDF納品（メール送付）</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 font-bold">
                現在、無料モニターを募集中です
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                サービス改善のため、アンケートへのご協力をお願いしています
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-block bg-[var(--primary)] text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-[var(--primary-light)] transition"
            >
              無料モニターに申し込む
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[var(--section-bg)]">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            よくある質問
          </h3>
          <div className="space-y-6">
            {[
              {
                q: "電話でうまく話せるか不安です。",
                a: "ご安心ください。AIが質問を一つずつお聞きしますので、思い出したことを自由にお話しいただくだけで大丈夫です。うまく話す必要はありません。",
              },
              {
                q: "認知症の親でも利用できますか？",
                a: "軽度認知障害（MCI）の初期段階で、ご本人がお話しになれる場合はご利用いただけます。ただし、録音のご同意をいただけることが条件です。ご家族の方からのお申し込みも受け付けています。",
              },
              {
                q: "プライバシーは大丈夫ですか？",
                a: "AIが自動でプライバシーチェックを行い、第三者の実名や特定可能な情報は自動的に匿名化されます。また、音声データはAIの学習には一切使用しません。納品後1年で自動削除されます。",
              },
              {
                q: "完成までどのくらいかかりますか？",
                a: "インタビュー完了後、約1〜2週間でPDFを納品いたします。インタビューのスケジュールはご都合に合わせて調整可能です。",
              },
              {
                q: "印刷や製本はしてもらえますか？",
                a: "現在はPDF納品のみとなっております。お手元のプリンターでの印刷や、オンライン製本サービスのご利用をご案内しています。",
              },
              {
                q: "内容を修正してもらうことはできますか？",
                a: "MVP版では自動生成・自動チェックのみとなっております。重大な事実誤認があった場合は個別にご対応いたします。",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-lg mb-2">Q. {item.q}</h4>
                <p className="text-gray-600 leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--primary)] text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-lg font-bold mb-2">デジタル・レガシー</h4>
              <p className="text-sm opacity-75">
                書かずに残す、あなたの人生
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:underline opacity-75">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:underline opacity-75">
                プライバシーポリシー
              </Link>
            </div>
          </div>
          <div className="text-center text-sm opacity-50 mt-8">
            &copy; {new Date().getFullYear()} デジタル・レガシー All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
