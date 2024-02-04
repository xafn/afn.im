# 🎨 Personal Portfolio

![mockup](https://github.com/xafn/afn.im/assets/47723802/e6557c66-b781-4ba4-8784-03615a19b84c)

A simple site to showcase the art I've made over the years. Check it out at [afn.im](https://afn.im/).

I decided I needed to finally rewrite my site after staring at my horrid old codebase and design for so long. Made using SvelteKit and SCSS.

## 📝 Notes

- Thanks to [Lanyard API](https://github.com/Phineas/lanyard) for exposing my Discord Rich Presence
- Burn your eyes at [v1.afn.im](https://v1.afn.im/)

## ☁️ Hosting

Steps to follow if you want to replicate the hosting of this site. You may host with whatever service you prefer.

1. Go to [Cloudflare Pages](https://pages.dev/)
2. Create a project and connect your repository
3. Under `Build settings`, select the `SvelteKit` preset
4. Under `Environmental variables (advanced)`, add the following variable:
   - Variable name: `NODE_VERSION`
   - Value: `21`
5. Save and deploy

## ⚖️ Licensing

### Code

All website-related code is distributed under the [AGPL license](LICENSE).

### Art Assets

All art assets (files in `static/art/`) are distributed under the [Creative Commons Attribution 4.0 International](static/art/LICENSE-CC-BY) license. You **must** give attribution if you share or repost these assets.
