import Foundation
import WebKit
import UniformTypeIdentifiers

/// Custom URL scheme handler that serves local bundle files under `app://localhost/`
/// This allows ES Modules (<script type="module">), CSS, fonts and images to load
/// seamlessly in WKWebView without CORS or local file URL restrictions.
class LocalAppSchemeHandler: NSObject, WKURLSchemeHandler {
    
    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(NSError(domain: "UrociSchemeHandler", code: 400, userInfo: nil))
            return
        }
        
        var path = url.path
        if path.isEmpty || path == "/" {
            path = "/index.html"
        }
        
        // Remove leading slash
        let cleanPath = path.hasPrefix("/") ? String(path.dropFirst()) : path
        
        // Look inside Bundle for www subdirectory
        let bundleURL: URL?
        if let wwwBundle = Bundle.main.url(forResource: "www", withExtension: nil) {
            bundleURL = wwwBundle.appendingPathComponent(cleanPath)
        } else if let resourceURL = Bundle.main.resourceURL {
            bundleURL = resourceURL.appendingPathComponent("www").appendingPathComponent(cleanPath)
        } else {
            bundleURL = nil
        }
        
        guard let fileURL = bundleURL, FileManager.default.fileExists(atPath: fileURL.path) else {
            // Fallback to index.html for SPA client-side routing
            if let fallbackURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www"),
               let data = try? Data(contentsOf: fallbackURL) {
                let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: [
                    "Content-Type": "text/html; charset=utf-8",
                    "Access-Control-Allow-Origin": "*"
                ])!
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
                return
            }
            
            urlSchemeTask.didFailWithError(NSError(domain: "UrociSchemeHandler", code: 404, userInfo: nil))
            return
        }
        
        do {
            let data = try Data(contentsOf: fileURL)
            let mimeType = mimeType(for: fileURL.pathExtension)
            
            let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: [
                "Content-Type": mimeType,
                "Content-Length": "\(data.count)",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache"
            ])!
            
            urlSchemeTask.didReceive(response)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } catch {
            urlSchemeTask.didFailWithError(error)
        }
    }
    
    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        // Task cancelled
    }
    
    private func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "js", "mjs": return "application/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json; charset=utf-8"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "gif": return "image/gif"
        case "svg": return "image/svg+xml"
        case "ico": return "image/x-icon"
        case "woff": return "font/woff"
        case "woff2": return "font/woff2"
        case "ttf": return "font/ttf"
        case "pdf": return "application/pdf"
        default: return "application/octet-stream"
        }
    }
}
