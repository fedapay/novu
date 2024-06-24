import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const textFn = /* @__PURE__ */ createRecipe('text', {
  "variant": "main"
}, [])

const textVariantMap = {
  "variant": [
    "main",
    "secondary",
    "mono",
    "strong"
  ]
}

const textVariantKeys = Object.keys(textVariantMap)

export const text = /* @__PURE__ */ Object.assign(memo(textFn), {
  __recipe__: true,
  __name__: 'text',
  raw: (props) => props,
  variantKeys: textVariantKeys,
  variantMap: textVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, textVariantKeys)
  },
})