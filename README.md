'''# 格安SIM乗り換え未来予想アプリ

このアプリは、格安SIMへの乗り換えを検討しているユーザーが、乗り換えによって将来的にどれだけの経済的メリットを得られるかをシミュレーションするためのWebアプリケーションです。

## 機能

- 現在と乗り換え後の月額料金、初期費用（解約金・MNP手数料）、乗り換えタイミングを入力することで、将来の累計支払額をシミュレーションします。
- 「乗り換えた場合」と「乗り換えなかった場合」の累計支払額を折れ線グラフで比較し、損益分岐点を可視化します。
- 長期的な節約額（投資可能額）をテキストで分かりやすく表示します。

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Chart.js](https://www.chartjs.org/) - グラフ描画ライブラリ
- [Vercel](https://vercel.com/) - デプロイプラットフォーム

## セットアップ

1.  リポジトリをクローンします。

```bash
git clone https://github.com/iidaatcnt/sim-transfer-app.git
```

2.  プロジェクトディレクトリに移動します。

```bash
cd sim-transfer-app
```

3.  依存関係をインストールします。

```bash
npm install
```

4.  開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 仕様

詳細な仕様については、[SPECIFICATION.md](SPECIFICATION.md) を参照してください。
'''