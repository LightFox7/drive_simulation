export function downloadWithName(name, data = "") {
    var content = "data:text/;charset=utf-8,";
    content += data;
    var encodedUri = encodeURI(content);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
}