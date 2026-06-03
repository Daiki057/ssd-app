import Animated from 'react-native-reanimated';

// 短いアニメーション付きの手振りアイコンです。
// 初期サンプル画面など、軽いアクセントを入れたい場所で使います。
export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
