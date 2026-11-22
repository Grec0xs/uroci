import SwiftUI

struct ContentView: View {
    @State private var isLoading = false
    @AppStorage("customServerURL") private var customServerURL: String = ""
    @AppStorage("useCustomServer") private var useCustomServer: Bool = false
    @State private var showSettings = false
    @State private var tempURLString = ""
    
    var currentURL: URL {
        if useCustomServer, let url = URL(string: customServerURL), !customServerURL.isEmpty {
            return url
        }
        return URL(string: "app://localhost/index.html")!
    }
    
    var body: some View {
        ZStack {
            // Adaptive background matching Apple Mail / Uroci dark & light modes
            Color(uiColor: .systemBackground)
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                WebView(url: currentURL, isLoading: $isLoading)
                    .ignoresSafeArea(.keyboard, edges: .bottom)
            }
            
            // Subtle loading indicator at top
            if isLoading {
                VStack {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: Color.purple))
                        .scaleEffect(0.8)
                        .padding(8)
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12))
                        .padding(.top, 4)
                    Spacer()
                }
                .transition(.opacity)
            }
        }
        // Shake gesture or settings sheet
        .sheet(isPresented: $showSettings) {
            SettingsSheet(
                useCustomServer: $useCustomServer,
                customServerURL: $customServerURL,
                onSave: {
                    showSettings = false
                }
            )
        }
        .onReceive(NotificationCenter.default.publisher(for: UIDevice.deviceDidShakeNotification)) { _ in
            showSettings = true
        }
    }
}

// Shake gesture detector extension for iOS
extension UIDevice {
    static let deviceDidShakeNotification = Notification.Name(rawValue: "deviceDidShakeNotification")
}

extension UIWindow {
    open override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        if motion == .motionShake {
            NotificationCenter.default.post(name: UIDevice.deviceDidShakeNotification, object: nil)
        }
    }
}

struct SettingsSheet: View {
    @Binding var useCustomServer: Bool
    @Binding var customServerURL: String
    var onSave: () -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var inputURL = ""
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Modo de Ejecución"), footer: Text("Por defecto, Uroci Mail corre 100% nativo desde los archivos incluidos en la app. Si activas Servidor Remoto, puedes ingresar la IP local de tu Mac (ej. http://192.168.1.15:5173) o la URL de Render para sincronizar en vivo.")) {
                    Toggle("Conectar a Servidor / Wi-Fi", isOn: $useCustomServer)
                    
                    if useCustomServer {
                        TextField("http://192.168.1.X:5173", text: $inputURL)
                            .keyboardType(.URL)
                            .autocapitalization(.none)
                            .disableAutocorrection(true)
                    }
                }
                
                Section(header: Text("Acerca de")) {
                    HStack {
                        Text("Versión")
                        Spacer()
                        Text("1.0.0 (Native iOS)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Consejo")
                        Spacer()
                        Text("Agita el iPhone para abrir este menú")
                            .foregroundColor(.secondary)
                            .font(.caption)
                    }
                }
            }
            .navigationTitle("Ajustes de Servidor")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Guardar") {
                        customServerURL = inputURL.trimmingCharacters(in: .whitespacesAndNewlines)
                        onSave()
                        dismiss()
                    }
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") {
                        dismiss()
                    }
                }
            }
            .onAppear {
                inputURL = customServerURL.isEmpty ? "http://localhost:5173" : customServerURL
            }
        }
    }
}
