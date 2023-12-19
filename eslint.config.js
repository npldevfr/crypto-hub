import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/valid-template-root': 'off',
    'node/prefer-global/process': 'off',
  },
})
