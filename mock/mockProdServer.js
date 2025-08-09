import { createProdMockServer } from 'vite-plugin-mock/client';

// 导入所有 mock 模块
import { data } from './data';
// ... 导入其他 mock 模块 ...

// 创建 mock 服务器
export function setupProdMockServer() {
  createProdMockServer(data);
}