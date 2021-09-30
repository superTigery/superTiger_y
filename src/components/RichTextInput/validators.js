/* eslint-disable no-useless-catch */
import { EditorState } from 'braft-editor';
import { isNilEmpty } from '@/utils';
import { FormItemProps } from 'antd/lib/form/FormItem';

// type Rule = NonNullable<FormItemProps['rules']>[number];

/**
 * 将多个校验器组合成一个
 * @param rules
 */
export function compose(rules) {
  return {
    async validator(...args) {
      try {
        for (const rule of rules) {
          if ('validator' in rule && rule.validator) {
            await rule.validator(...args);
          }
        }
      } catch (e) {
        throw e;
      }
    },
  };
}

/**
 * 必填
 * @param message
 */
export function required(message = '请输入该字段') {
  return {
    async validator(_rule, value) {
      const text = value?.toText() || '';
      if (isNilEmpty(text)) {
        throw new Error(message);
      }
    },
  };
}

/**
 * 最大长度
 * @param length
 * @param message
 */
export function max(length, message) {
  return {
    async validator(_rule, value) {
      if (!value) return;
      const text = value?.toText();
      if (text.length > length) {
        throw new Error(message ?? `最多${length}个字符`);
      }
    },
  };
}

/**
 * 正则
 * @param regExp
 * @param message
 */
export function regexp(regExp, message = '格式不正确') {
  return {
    async validator(_rule, value) {
      if (!value) return;
      const text = value?.toText();
      if (text && !regExp.test(text)) {
        throw new Error(message);
      }
    },
  };
}
