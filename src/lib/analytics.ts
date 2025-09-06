export function injectAnalytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const ga = process.env.NEXT_PUBLIC_GA_ID
  if (typeof window === "undefined") return

  if (plausible) {
    const s = document.createElement("script")
    s.defer = true
    s.setAttribute("data-domain", plausible)
    s.src = "https://plausible.io/js/script.js"
    document.head.appendChild(s)
  }

  if (ga) {
    const s = document.createElement("script")
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`
    document.head.appendChild(s)
    const inline = document.createElement("script")
    inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`
    document.head.appendChild(inline)
  }
}
