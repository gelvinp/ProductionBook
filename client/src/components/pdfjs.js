export default class PDFJs {
  init(source, element) {
    const iframe = document.createElement('iframe')

    var url = URL.createObjectURL(source)

    iframe.src = `/web/viewer.html?file=${encodeURIComponent(url)}`
    iframe.width = '100%'
    iframe.height = '100%'

    element.appendChild(iframe)
  }
  update(source, element) {
    const iframe = element.children[0]

    var url = URL.createObjectURL(source)

    iframe.src = `/web/viewer.html?file=${encodeURIComponent(url)}`
  }
}
