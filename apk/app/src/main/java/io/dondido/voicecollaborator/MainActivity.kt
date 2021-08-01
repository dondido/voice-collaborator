package io.dondido.voicecollaborator

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val webView: WebView = findViewById(R.id.webview)

    val webSettings: WebSettings = webView.getSettings()
    webSettings.javaScriptEnabled = true
    webSettings.javaScriptCanOpenWindowsAutomatically = true
    webSettings.domStorageEnabled = true
    webSettings.setMediaPlaybackRequiresUserGesture(false)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      val permissions: MutableList<String> = ArrayList()
      permissions.add(Manifest.permission.RECORD_AUDIO)
      permissions.add(Manifest.permission.MODIFY_AUDIO_SETTINGS)
      requestPermissions(permissions.toTypedArray(), 111)
      WebView.setWebContentsDebuggingEnabled(true)
    }

    webView.setWebChromeClient(object : WebChromeClient() {
      // Grant permissions
      override fun onPermissionRequest(request: PermissionRequest) {
        request.grant(request.resources)
      }
    })

    webView.loadUrl("https://dondido.github.io/voice-collaborator/")
  }
  override fun onBackPressed() {
    val webView: WebView = findViewById(R.id.webview)
    if (webView.canGoBack()) {
      webView.goBack()
    } else {
      super.onBackPressed()
    }
  }
}
