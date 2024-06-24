import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const titleFn = /* @__PURE__ */ createRecipe('title', {
  "variant": "page"
}, [])

const titleVariantMap = {
  "variant": [
    "page",
    "section",
    "subsection"
  ]
}

const titleVariantKeys = Object.keys(titleVariantMap)

export const title = /* @__PURE__ */ Object.assign(memo(titleFn), {
  __recipe__: true,
  __name__: 'title',
  raw: (props) => props,
  variantKeys: titleVariantKeys,
  variantMap: titleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, titleVariantKeys)
  },
})