#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appDir = path.join(root, 'app');
const firebaseConfig = path.join(root, 'firebaseConfig.js');

const fileDescriptions = {
  'firebaseConfig.js': [
    '// Firebase の初期化コードです。',
    '// このファイルを import すると、アプリ全体で Firebase の接続、',
    '// Firestore、Storage、認証を使えるようになります。',
    '// React Native の AsyncStorage を使って、ログイン状態を保持します。'
  ].join('\n'),
  'app/_layout.tsx': [
    '// アプリ全体のルートレイアウトです。',
    '// `AuthProvider` で認証状態を共有し、',
    '// `login` と `(tabs)` の画面を切り替えます。'
  ].join('\n'),
  'app/index.tsx': [
    '// アプリ起動時の画面です。',
    '// 認証状態を見て、ログイン画面かタブ画面へ自動で遷移します。'
  ].join('\n'),
  'app/login.tsx': [
    '// ログイン画面です。',
    '// メールアドレスとパスワードを受け取り、',
    '// Firebase Auth でサインインします。'
  ].join('\n'),
  'app/register.tsx': [
    '// 新規登録画面です。',
    '// メールアドレスとパスワードを受け取り、',
    '// Firebase Auth で新しいユーザーを作成します。'
  ].join('\n'),
  'app/modal.tsx': [
    '// モーダル表示用のサンプル画面です。',
    '// `expo-router` の `Link` と `dismissTo` で閉じる動作を示します。'
  ].join('\n'),
  'app/auth/AuthProvider.tsx': [
    '// Firebase 認証状態をアプリ全体で共有するコンポーネントです。',
    '// `useAuth()` から現在のユーザー情報と読み込み状態を取得できます。'
  ].join('\n'),
  'app/(tabs)/_layout.tsx': [
    '// ログイン後のタブナビゲーションを定義する画面です。',
    '// `name` に対応するタブ画面を `app/(tabs)` から読み込みます。'
  ].join('\n'),
  'app/(tabs)/index.tsx': [
    '// タブ画面のホームです。',
    '// プロフィールとお気に入りの友達一覧を表示します。'
  ].join('\n'),
  'app/(tabs)/spot.tsx': [
    '// スポット投稿画面です。',
    '// Firestore から投稿を読み込み、投稿を保存できます。'
  ].join('\n'),
  'app/(tabs)/baito.tsx': [
    '// バイト情報を表示するタブ画面です。',
    '// 今は簡易的なプレースホルダ表示になっています。'
  ].join('\n'),
  'app/(tabs)/profile.tsx': [
    '// プロフィール画面です。',
    '// ユーザー情報を表示・編集するための場所として用意しています。'
  ].join('\n')
};

const watchedPatterns = [
  path.join(appDir, '**', '*.tsx'),
  firebaseConfig
];

function normalizeKey(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function hasHeaderComment(content) {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;
    return trimmed.startsWith('//') || trimmed.startsWith('/*');
  }
  return false;
}

function getHeaderComment(filePath) {
  const key = normalizeKey(filePath);
  if (fileDescriptions[key]) {
    return fileDescriptions[key];
  }

  const basename = path.basename(filePath);
  if (basename === 'firebaseConfig.js') {
    return fileDescriptions['firebaseConfig.js'];
  }

  if (basename.endsWith('.tsx')) {
    return `// ${basename} のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。`;
  }

  return null;
}

function annotateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const comment = getHeaderComment(filePath);
  if (!comment) return;

  const content = fs.readFileSync(filePath, 'utf8');
  if (hasHeaderComment(content)) return;

  const output = `${comment}\n${content}`;
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`✅ 追加説明コメントを挿入しました: ${normalizeKey(filePath)}`);
}

function scanExistingFiles() {
  annotateFile(firebaseConfig);
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
        annotateFile(fullPath);
      }
    }
  };
  walk(appDir);
}

if (process.argv.includes('--once')) {
  scanExistingFiles();
  process.exit(0);
}

console.log('👀 変更を監視して説明コメントを自動で追加します。');
scanExistingFiles();

// node の標準 API だけでファイル変更を監視します。
const watchedFiles = new Set();
const addWatchedFile = (filePath) => {
  const normalized = path.normalize(filePath);
  watchedFiles.add(normalized);
};

const watchDir = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      watchDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      addWatchedFile(fullPath);
    }
  }
};

watchDir(appDir);
addWatchedFile(firebaseConfig);

const watchers = [];
for (const filePath of watchedFiles) {
  const dir = path.dirname(filePath);
  const watcher = fs.watch(dir, (eventType, filename) => {
    if (!filename) return;
    const fullPath = path.join(dir, filename);
    if (!watchedFiles.has(path.normalize(fullPath))) return;
    if (eventType === 'change' || eventType === 'rename') {
      try {
        annotateFile(fullPath);
      } catch (err) {
        console.error(`監視中のエラー: ${err.message}`);
      }
    }
  });
  watchers.push(watcher);
}

process.on('SIGINT', () => {
  for (const watcher of watchers) {
    watcher.close();
  }
  process.exit(0);
});
