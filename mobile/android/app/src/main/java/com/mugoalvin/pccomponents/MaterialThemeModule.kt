package com.mugoalvin.pccomponents

import android.os.Build
import android.content.Context
import androidx.annotation.RequiresApi
import androidx.core.content.res.ResourcesCompat
import com.facebook.react.bridge.*

class MaterialThemeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "MaterialTheme"

    @ReactMethod
    fun getPrimaryColor(promise: Promise) {
        try {
            val context: Context = reactApplicationContext
            val attrs = intArrayOf(android.R.attr.colorPrimary)
            val typedArray = context.theme.obtainStyledAttributes(attrs)
            val color = typedArray.getColor(0, 0)
            typedArray.recycle()

            val hexColor = String.format("#%06X", (0xFFFFFF and color))
            promise.resolve(hexColor)
        } catch (e: Exception) {
            promise.reject("ERR_COLOR", e)
        }
    }
}