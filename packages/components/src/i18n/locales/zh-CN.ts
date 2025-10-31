import type { LocaleDefinition } from "./en";

export const zhCN = {
  header: {
    navigation: {
      label: "主导航"
    },
    actions: {
      label: "头部操作"
    }
  },
  button: {
    label: {
      default: "按钮"
    },
    states: {
      loading: "加载中..."
    }
  },
  page: {
    accessibility: {
      skipToContent: "跳转到主要内容"
    },
    footer: {
      legal: "版权所有。"
    }
  }
} as const satisfies LocaleDefinition;
