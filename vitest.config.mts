import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // jsdom은 Node 20.19 이상이 필요하다. 컴포넌트 테스트 파일에서는 `// @vitest-environment jsdom`으로 지정한다.
    environment: 'node',
  },
});
